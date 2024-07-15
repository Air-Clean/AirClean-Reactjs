import {createActions , handleActions} from 'redux-actions'

// 초기값
const initState = [];

// 액션
export const POST_LOGIN = 'member/POST_LOGIN';

const actions = createActions({
    [POST_LOGIN] : ()=>{},
})

const memberReducer = handleActions({
    [POST_LOGIN] : (state,{payload})=>{
        return payload;
    }
},initState)

export default memberReducer;