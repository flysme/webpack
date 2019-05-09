/*
 * @Description: 
 * @Author: zhaofeixiang
 * @LastEditors: zhaofeixiang
 * @Date: 2019-05-08 09:28:01
 * @LastEditTime: 2019-05-09 18:51:09
 */

import './css/main.css'

import { greeter } from './greeter'
import UTILS from './utils/utils'

console.log(UTILS.getName(),'UTILS')


// document.querySelector('#root').appendChild(greeter());


function flatten(arr) {
  return [].concat.apply([], arr);
}

function h(tag, props, ...children) {
  return {
      tag, 
      props: props || {}, 
      children: flatten(children) || []
  };
}





// 创建dom元素
function createElement(vdom) {
  var doc = document;
  // 如果vdom是字符串或者数字类型，则创建文本节点，比如“Hello World”
  if (typeof vdom === 'string' || typeof vdom === 'number') {
      return doc.createTextNode(vdom);
  }

  const {tag, props, children} = vdom;

  // 1. 创建元素
  const element = doc.createElement(tag);


  
  // 2. 属性赋值
  setProps(element, props);

  // 3. 创建子元素
  // appendChild在执行的时候，会检查当前的this是不是dom对象，因此要bind一下
  children.length && children.map(item=>{
    element.appendChild(createElement(item))
  })
  return element;
}

// 属性赋值
function setProps(element, props) {
  for (let key in props) {
      element.setAttribute(key, props[key]);
  }
}

var state = {
  num:1,
  name:['王思聪','刘小罐']
};
var timer;

const nodePatchTypes = {
  CREATE: 'create node',
  REMOVE: 'remove node',
  REPLACE: 'replace node',
  UPDATE: 'update node'
}

const propPatchTypes = {
  REMOVE: 'remove prop',
  UPDATE: 'update prop'
}

function view() {
  return h(
      'div',
      {name:'son'},
      `Hello ${state.name[Math.floor(Math.random() *2)]}`,
      h(
          'ul',
          null,
          h(
              'li',
              { id: '1', 'class': 'li-1' },
              `${state.num}`
          )
      )
  );
}




function render (element) {
  var vdom = view();
   var preDom =  createElement(vdom);
   element.appendChild(preDom) 
}



function tickTask (element,preDom) {
  const newDom = view();
  let patchObj = diff(preDom,newDom);
  patch(element,patchObj,1)
}


function diff (preDom,newDom){
  if (preDom === undefined){
    return {
      type:nodePatchTypes.CREATE,
      vdom:newDom
    }
  }
  if (newDom === undefined) {
    return {
      type:nodePatchTypes.REMOVE
    }
  }

  
  if (typeof preDom!=typeof newDom || ((typeof preDom === 'string' || typeof preDom === 'number') && preDom !== newDom) || preDom.tag !== newDom.tag) {
    return {
      type:nodePatchTypes.REPLACE,
      vdom:newDom
    }
  }


  // 更新 node
  if (preDom.tag) {
    // 比较 props 的变化
    const propsDiff = diffProps(preDom, newDom);

    // 比较 children 的变化
    const childrenDiff = diffChildren(preDom, newDom);
    console.log(childrenDiff,'childrenDiff')
    // 如果 props 或者 children 有变化，才需要更新
    if (propsDiff.length || childrenDiff.some( patchObj => (patchObj !== undefined) )) {
        return {
            type: nodePatchTypes.UPDATE,
            props: propsDiff,
            children: childrenDiff
        }   
    }
    
  }
}


// 比较 props 的变化
function diffProps(oldVDom, newVDom) {
  const patches = [];

  const allProps = {...oldVDom.props, ...newVDom.props};

  // 获取新旧所有属性名后，再逐一判断新旧属性值
  Object.keys(allProps).forEach((key) => {
          const oldValue = oldVDom.props[key];
          const newValue = newVDom.props[key];

          // 删除属性
          if (newValue == undefined) {
              patches.push({
                  type: propPatchTypes.REMOVE,
                  key
              });
          } 
          // 更新属性
          else if (oldValue == undefined || oldValue !== newValue) {
              patches.push({
                  type: propPatchTypes.UPDATE,
                  key,
                  value: newValue
              });
          }
      }
  )

  return patches;
}

// 比较 children 的变化
function diffChildren(oldVDom, newVDom) {
  const patches = [];
  
  // 获取子元素最大长度
  const childLength = Math.max(oldVDom.children.length, newVDom.children.length);
  // 遍历并diff子元素
  for (let i = 0; i < childLength; i++) {
    let diffEle = diff(oldVDom.children[i], newVDom.children[i]);
    patches.push(diffEle);

  }
  return patches;
}


// 给 DOM 打个补丁
function patch(parent, patchObj, index=0) {
  if (!patchObj) {
      return;
  }

  // 新建元素
  if (patchObj.type === nodePatchTypes.CREATE) {
      return parent.appendChild(createElement(patchObj.vdom));
  }

  const element = parent.childNodes[index];

  // 删除元素
  if (patchObj.type === nodePatchTypes.REMOVE) {
      return parent.removeChild(element);
  }

  // 替换元素
  if (patchObj.type === nodePatchTypes.REPLACE) {
      return parent.replaceChild(createElement(patchObj.vdom), element);
  }

  // 更新元素
  if (patchObj.type === nodePatchTypes.UPDATE) {
      const {props, children} = patchObj;

      // 更新属性
      patchProps(element, props);

      // 更新子元素
      children.forEach( (patchObj, i) => {
          // 更新子元素时，需要将子元素的序号传入
          patch(element, patchObj, i)
      });
  }
}

// 更新属性
function patchProps(element, props) {
  if (!props) {
      return;
  }

  props.forEach( patchObj => {
      // 删除属性
      if (patchObj.type === propPatchTypes.REMOVE) {
          element.removeAttribute(patchObj.key);
      } 
      // 更新或新建属性
      else if (patchObj.type === propPatchTypes.UPDATE) {
          element.setAttribute(patchObj.key, patchObj.value);
      }
  })
}


// render(document.querySelector('#root'))



class React {
  constructor () {
    this.created && this.created();
    this.element  =  document.querySelector(this.el)
    this.vdom = this.render && this.render();
    this.init();
  }
  init () {
    var preDom =  createElement(this.vdom);
    this.element.appendChild(preDom) 
  }
  tick () {
    const newVDom = this.render();
    const patchObj = diff(this.vdom,newVDom);
    patch(this.element,patchObj,1);

  }
  setState (obj) {
    this.state = Object.assign({},this.state,obj);
    this.tick()
  }
}



class Test extends React {
  created () {
    this.el = '#root'
    this.state = {
      num:1,
      name:['王思聪','刘易斯']
    }
    timer = setInterval(()=>{
      this.setState({
        num:++this.state.num
      })
    },1000)
  }
  render () {
    return h(
          'div',
          {name:'son'},
          `Hello ${this.state.name[Math.floor(Math.random() *2)]}`,
          h(
              'ul',
              null,
              h(
                  'li',
                  { id: '1', 'class': 'li-1' },
                  `${this.state.num}`
              )
          )
    );
  }
}
new Test();