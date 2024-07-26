import { createActions, handleActions } from "redux-actions";

// 초기값
const initialState = [];

export const DETERGENTSINFO = 'DETERGENTSINFO'
export const PARTSINFO = 'PARTSINFO'
export const HEADSTOCKHISTORY = 'HEADSTOCKHISTORY'

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

const headStockHistoryReducer = handleActions({
    [HEADSTOCKHISTORY]: (state, {payload}) => {
        console.log('본사 재고내역 payload: ', payload)
        return payload;
    }
}, initialState)





export {detergentsInfoReducer, partsInfoReducer, headStockHistoryReducer};