/*
 * @Description: 
 * @Author: zhaofeixiang
 * @LastEditors: zhaofeixiang
 * @Date: 2019-05-08 14:30:21
 * @LastEditTime: 2019-05-10 14:16:38
 */

import $store from '../module/demo1/index'
import { add } from '../module/demo1/actions/counter'
export default (function () {
    let UTILS = {
      name:'zfx',
      getName () {
        return this.name
      }
    }
    // const p1 = ()=>{
    //   return new Promise((resolve,reject)=>{
    //     resolve({name:'1111111'});
    //   })
    // }
    
    
    // const asyncFn = async ()=>{
    //   const p = await p1();
    //   console.log(p,'p-----',_utils)
    // }
    
    // asyncFn()

    setInterval(()=>{
      $store.dispatch(add()).then(state=>{
        console.log(state,'state')
      })
    },1000)



    
  return UTILS;
})()