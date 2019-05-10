/*
 * @Description: 
 * @Author: zhaofeixiang
 * @LastEditors: zhaofeixiang
 * @Date: 2019-05-10 09:50:21
 * @LastEditTime: 2019-05-10 15:04:30
 */




function createStore (replaceReducer) {
  let state = {};
  let listeners = [];
  let dispatch = (action) => {
    if (typeof action !== 'object') throw Error('Expected the action to be a object');
    if (action.type == undefined ) throw Error('The action.type is not defined');
    state = replaceReducer(state,action)
    listeners.length && listeners.forEach(listener=>listener());
    return Promise.resolve(state);
  }
  let subscribe = (listener) => {
    if (typeof listener !== 'function') {
      throw new Error('Expected listener to be a function.')
    }
    listeners.push(listener)
  }

  let getState = () => {
    return state;
  }

  return {
    dispatch,
    subscribe,
    getState
  }
}

export {
  createStore
}