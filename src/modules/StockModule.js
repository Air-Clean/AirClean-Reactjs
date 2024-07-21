import { createActions, handleActions } from "redux-actions";

// 초기값
const initialState = [];

export const DETERGENTSINFO = 'DETERGENTSINFO'
export const PARTSINFO = 'PARTSINFO'

createActions({
    [DETERGENTSINFO]: ()=>{},
    [PARTSINFO]: ()=>{}
})

const detergentsInfoReducer = handleActions({
    [DETERGENTSINFO]: (state, {payload}) => {
        console.log('세탁용품리듀서 payload : ', payload)
        return payload;
    }
}, initialState)

const partsInfoReducer = handleActions({
    [PARTSINFO]: (state, {payload}) => {
        console.log('부품 payload: ', payload)
        return payload;
    }
}, initialState)



export {detergentsInfoReducer, partsInfoReducer};