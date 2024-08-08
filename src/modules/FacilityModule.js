import { createActions, handleActions } from "redux-actions";

const initialState = [];

export const FACILITYDETAIL = 'FACILITYDETAIL'
export const FACILITYLAUNDRYWAY = 'FACILITYLAUNDRYWAY'

createActions({
    [FACILITYDETAIL]: ()=>{},
    [FACILITYLAUNDRYWAY]: ()=>{}
})

const facilityDetailInfoReducer = handleActions({
    [FACILITYDETAIL]: (state, {payload}) => {
        console.log('시설물상세리듀서 payload : ', payload)
        return payload;
    }
}, initialState)

const facilityLaundryWayReducer = handleActions({
    [FACILITYLAUNDRYWAY]: (state, {payload}) => {
        console.log('시설 세탁방법 도출 리듀서 payload : ', payload)
        return payload;
    }
}, initialState)

export {facilityDetailInfoReducer, facilityLaundryWayReducer};