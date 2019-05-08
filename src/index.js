/*
 * @Description: 
 * @Author: zhaofeixiang
 * @LastEditors: zhaofeixiang
 * @Date: 2019-05-08 09:28:01
 * @LastEditTime: 2019-05-08 14:45:08
 */

import './css/main.css'

import { greeter } from './greeter'
import UTILS from './utils/utils'

console.log(UTILS.getName(),'UTILS')


document.querySelector('#root').appendChild(greeter());