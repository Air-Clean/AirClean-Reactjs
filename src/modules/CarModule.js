import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const CARINFOLIST = 'CARINFOLIST'

createActions({
    [CARINFOLIST]: ()=>{}
})

const carInfoReducer = handleActions({
    [CARINFOLIST]: (state, {payload}) => {
        console.log('차량정보리스트리듀서 payload : ', payload)
        return payload;
    }
}, initialState)

export default carInfoReducer;
