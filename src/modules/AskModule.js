import {createActions , handleActions} from 'redux-actions'

const initState = [];

export const FIND_MEMBER = 'member/FIND_MEMBER';

const actions = createActions({
    [FIND_MEMBER] : ()=>{},
})

const askReducer = handleActions({
    [FIND_MEMBER] : (state,{payload})=>{
        return payload;
    },
    
},initState)

export default askReducer;
