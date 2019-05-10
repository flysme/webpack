/*
 * @Description: 
 * @Author: zhaofeixiang
 * @LastEditors: zhaofeixiang
 * @Date: 2019-05-10 10:03:15
 * @LastEditTime: 2019-05-10 14:50:21
 */
import * as counter from '../types/counter'
import { handleActions } from '../../../utils/handleActions'



export default handleActions({
  [counter.ADD] (state) {
    return {
      ...state,
      count:state.count + 1
    }
  }
},{
  count:0
})



/** 默认模式*/ 

// const defaultState = {
//   count:0
// }

// export default (state = defaultState,action) => {
//   switch (action.type) {
//     case counter.ADD : 
//       return {
//         ...state,
//         count:state.count + 1
//       }
//     default :
//       return state
//   }
// }