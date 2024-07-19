import { createActions, handleActions } from "redux-actions";

// 초기값
const initialState = [];

export const PARTSINFO = 'PARTSINFO'

createActions({
    [PARTSINFO]: ()=>{}
})

const partsInfoReducer = handleActions({
    [PARTSINFO]: (state, {payload}) => {
        console.log('부품 리듀서 payload : ', payload)
        return payload;
    }
}, initialState
)

export default partsInfoReducer;