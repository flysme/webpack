/*
 * @Description: 
 * @Author: zhaofeixiang
 * @LastEditors: zhaofeixiang
 * @Date: 2019-05-10 09:58:01
 * @LastEditTime: 2019-05-10 15:15:09
 */

import reducers from './reducers/index'

import { createStore } from '../../utils/redux_store'



function combineReducers (reducers) {
  return (state={},action) => {
    let newState = {};
    let finalReducers = {};
    for(let key in reducers) {
      if (typeof reducers[key] == 'function') {
        finalReducers[key] = reducers[key];
      }
    }
    const finalReducersKey = Object.keys(finalReducers);

    finalReducersKey.length && finalReducersKey.forEach(key=>{
      const previousState = state[key];
      const reducer = finalReducers[key];
      newState[key] = reducer(previousState,action)
    })

    return newState;
  }
}



export default createStore(combineReducers(reducers))
