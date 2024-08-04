import {createActions , handleActions} from 'redux-actions'

const initState = [];

export const FIND_MEMBER = 'member/FIND_MEMBER';
export const ALARM_MESSAGE = 'ALARM_MESSAGE'

createActions({
    [FIND_MEMBER] : ()=>{},
    [ALARM_MESSAGE] : ()=>{},
})

export const askReducer = handleActions({
    [FIND_MEMBER] : (state,{payload})=>{
        return payload;
    },
    
},initState)


export const alarmMessageReducer = handleActions({
    [ALARM_MESSAGE] : (state, {payload})=>{
        return  payload;
    }
},initState)
