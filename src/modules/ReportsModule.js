import { createActions, handleActions } from "redux-actions";


// 초기값
const initialState = [];

export const BRANCHSALES = 'BRANCHSALES'
export const DETAILBRANCHSALES = 'DETAILBRANCHSALES'
export const VEHICLEREPAIR = 'VEHICLEREPAIR'
export const EXPENSE = 'EXPENSE'


createActions({
    [BRANCHSALES]: ()=>[],
    [DETAILBRANCHSALES]: () => [],
    [VEHICLEREPAIR] : () => [],
    [EXPENSE] : () => [],
})

// 지출보고서 전체 조회
const branchSalesReducer = handleActions({
    [BRANCHSALES]: (state, {payload}) => {
        console.log('리듀서 payload :', payload)
        return payload;
    }
}, initialState
   
)

// 지출보고서 부분 조회
const detailBranchSalesReducer = handleActions({
    [DETAILBRANCHSALES]: (state, {payload}) => {
        console.log('지출보고서 부분 조회 리듀서 payload :', payload)
        return payload;
    }
}, initialState
   
)

// 수리보고서 전체 조회
const vehicleRepairReducer = handleActions({
    [VEHICLEREPAIR] : (state, {payload}) => {
        console.log('리듀서 payload : ', payload)
        return payload
    }
}, initialState)

// 매출보고서 전체 조회
const expenseReducer = handleActions({
    [EXPENSE] : (state, {payload}) => {
        console.log('expense reducer 나오니? :', payload)
        return payload
    }
}, initialState)

export  {branchSalesReducer, vehicleRepairReducer, expenseReducer, detailBranchSalesReducer, };