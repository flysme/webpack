/*
 * @Description: 
 * @Author: zhaofeixiang
 * @LastEditors: zhaofeixiang
 * @Date: 2019-05-10 10:08:07
 * @LastEditTime: 2019-05-10 10:09:33
 */
import * as counter from '../types/counter'


export const add = () => {
  return {
    type:counter.ADD
  }
}