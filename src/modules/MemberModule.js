import {createActions , handleActions} from 'redux-actions'

// 초기값
const initState = [];

// 액션
export const POST_LOGIN = 'member/POST_LOGIN';
export const AFTER_LOGIN = 'AFTER_LOGIN'

createActions({
    [POST_LOGIN] : ()=>{},
})

export const memberReducer = handleActions({
    [POST_LOGIN] : (state,{payload})=>{
        return payload;
    },
    
},initState)

export const getBranchReducer = handleActions({
    [AFTER_LOGIN] : (state,{payload})=>{
        return payload;
    }
},initState)

