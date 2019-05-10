/*
 * @Description: 
 * @Author: zhaofeixiang
 * @LastEditors: zhaofeixiang
 * @Date: 2019-05-10 14:34:58
 * @LastEditTime: 2019-05-10 14:57:05
 */
export const handleActions = (actionList = {},defaultstate = {}) => {
  return (state=defaultstate,action)=>{
    return action.type && actionList[action.type](state) || state;
  }
}

