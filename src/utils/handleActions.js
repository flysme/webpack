/*
 * @Description: 
 * @Author: zhaofeixiang
 * @LastEditors: zhaofeixiang
 * @Date: 2019-05-10 14:34:58
 * @LastEditTime: 2019-05-10 18:29:26
 */
export const handleActions = (actionList = {},defaultstate = {}) => {
  return (state=defaultstate,action)=>{
    const actionFn = actionList[action.type];
    return action.type && actionFn(state) || state;
  }
}

