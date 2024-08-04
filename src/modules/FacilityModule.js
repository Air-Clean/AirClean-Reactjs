import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const FACILITYDETAIL = 'FACILITYDETAIL'

createActions({
    [FACILITYDETAIL]: ()=>{}
})

const facilityDetailInfoReducer = handleActions({
    [FACILITYDETAIL]: (state, {payload}) => {
        console.log('시설물상세리듀서 payload : ', payload)
        return payload;
    }
}, initialState)

export default facilityDetailInfoReducer;