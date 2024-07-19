import { createActions, handleActions } from "redux-actions";

// 초기값
const initialState = [];

export const DETERGENTSINFO = 'DETERGENTSINFO'

createActions({
    [DETERGENTSINFO]: ()=>{}
})

const detergentsInfoReducer = handleActions({
    [DETERGENTSINFO]: (state, {payload}) => {
        console.log('용품리듀서 payload : ', payload)
        return payload;
    }
}, initialState)



export default detergentsInfoReducer;