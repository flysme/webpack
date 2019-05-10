/*
 * @Description: 
 * @Author: zhaofeixiang
 * @LastEditors: zhaofeixiang
 * @Date: 2019-05-08 14:30:21
 * @LastEditTime: 2019-05-10 17:37:35
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

    // setInterval(()=>{
    //   $store.dispatch(add()).then(state=>{
    //     console.log(state,'state')
    //   })
    // },1000)


    const dest = 3 
    const array = [1, 4, 5, 6, 29, 40, 33, 3, 2] 


    // 冒泡排序
    function bubbleSort (arr) {
      for (let i=0;i<arr.length;i++) {
        for (let j =0;j<arr.length - i;j++) {
          if (arr[j] > arr[j+1]) {
            var temp = arr[j];
            arr[j] = arr[j+1];
            arr[j+1] = temp;
          }
        }
      }
      return arr;
    }

    // console.log(bubbleSort(array),'bubble--sort')

    // 快速排序
    function quickSort (arr) {
        if (arr.length <=1)return  arr;
        let middle = arr[0];
        let left = [];
        let right = [];
        for (let i =1;i<arr.length;i++){
          if (arr[i] < middle) {
            left.push(arr[i])
          } else {
            right.push(arr[i])
          }
        }
       return  quickSort(left).concat(middle,quickSort(right))
    }


    let newarr = quickSort(array);


     console.log(newarr,'newarr--')
      // 二分法查找   事先数组经过排序
     function binSearch (arr,data) {
        let lowerIndex = 0;
        let highIndex = arr.length - 1;

        while (lowerIndex <= highIndex) {
          console.log(lowerIndex,'---lowerIndex--',highIndex)
          const middle = Math.floor((lowerIndex + highIndex) / 2)

          if (arr[middle] < data) {
            lowerIndex = middle + 1;
          } else if (arr[middle] > data) {
            highIndex = middle - 1;
          } else {
            return middle;
          }
        }
        return -1;

     } 
     binSearch(newarr,4)
    return UTILS;
})()