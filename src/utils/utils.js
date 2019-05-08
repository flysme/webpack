/*
 * @Description: 
 * @Author: zhaofeixiang
 * @LastEditors: zhaofeixiang
 * @Date: 2019-05-08 14:30:21
 * @LastEditTime: 2019-05-08 18:29:37
 */
export default (function () {
    let UTILS = {
      name:'zfx',
      getName () {
        return this.name
      }
    }
    const p1 = ()=>{
      return new Promise((resolve,reject)=>{
        resolve({name:'1111111'});
      })
    }
    
    
    const asyncFn = async ()=>{
      const p = await p1();
      console.log(p,'p-----',_utils)
    }
    
    asyncFn()
    
  return UTILS;
})()