import { createActions, handleActions } from "redux-actions";


// 초기값
const initialState = [];

export const BRANCHSALES = 'BRANCHSALES'
export const DETAILBRANCHSALES = 'DETAILBRANCHSALES'
export const VEHICLEREPAIR = 'VEHICLEREPAIR'
export const EXPENSE = 'EXPENSE'
export const DETAILEXPENSE = 'DETAILEXPENSE'
export const DETAILVEHICLEREPAIR = 'DETAILVEHICLEREPAIR'
export const REPAIR = 'REPAIR'
export const DETAILREPAIR = 'DETAILREPAIR'
export const CARMEMBERS = 'CARMEMBERS'
export const NEWVEHICLEREPAIR = 'NEWVEHICLEREPAIR'



createActions({
    [BRANCHSALES]: ()=>[],
    [DETAILBRANCHSALES]: () => [],
    [VEHICLEREPAIR] : () => [],
    [EXPENSE] : () => [],
    [DETAILEXPENSE] : () => [],
    [DETAILVEHICLEREPAIR] : () => [],
    [REPAIR] : () => [],
    [DETAILREPAIR] : () => [],
    [CARMEMBERS] : () => [],
    // [REGISTVEHICLEREPAIR] : () => [],
    [NEWVEHICLEREPAIR] : () => [],

})

// 매출보고서 전체 조회
const branchSalesReducer = handleActions({
    [BRANCHSALES]: (state, {payload}) => {
        console.log('리듀서 payload :', payload)
        return payload;
    }
}, initialState
   
)

// 매출보고서 부분 조회
const detailBranchSalesReducer = handleActions({
    [DETAILBRANCHSALES]: (state, {payload}) => {
        console.log('지출보고서 부분 조회 리듀서 payload :', payload)
        return payload;
    }
}, initialState
   
)


// 지출보고서 전체 조회
const expenseReducer = handleActions({
    [EXPENSE] : (state, {payload}) => {
        console.log('expense reducer 나오니? :', payload)
        return payload
    }
}, initialState)

// 지출보고서 상세 조회 
const detailExpenseReducer = handleActions({

    [DETAILEXPENSE] : (state, {payload}) => {
        console.log('expense 부분조회 reducer 나오니? :', payload)
        return payload
    }
    }, initialState)

// 차량수리보고서 전체 조회
const vehicleRepairReducer = handleActions({
    [VEHICLEREPAIR] : (state, {payload}) => {
        console.log('리듀서 payload : ', payload)
        return payload
    }
}, initialState)

// 차량수리보고서 상세 조회
const detailVehicleRepairReducer = handleActions({

    [DETAILVEHICLEREPAIR] : (state, {payload}) => {
        console.log("차량수리보고서 세부조회 reducer : ", payload)
        return payload;
    }
}, initialState)

// 차량수리보고서 차량, 차량기사 조회
const carMembersReducer = handleActions({

    [CARMEMBERS] : (state, {payload}) => {
        console.log("차량, 차량기사 reducer : ", payload)
        return payload;
    }
}, initialState)


// 차량수리보고서 등록
const newVehicleRepairReducer = handleActions({

    [NEWVEHICLEREPAIR] : (state, {payload}) => {
        console.log("차량보고서 등록 reducer : ", payload)
        return{
            ...state,
            ...payload,
        }
    }
}, initialState)

// 지점 수리보고서 전체조회
const findAllRepairReducer = handleActions({

    [REPAIR] : (state, {payload}) => {
        console.log("지점 수리보고서  전체조회 reducer : ", payload)
        return payload;
    }
}, initialState)

// 지점 수리보고서 세부조회
const detailRepairReducer = handleActions({

    [DETAILREPAIR] : (state, {payload}) => {
        console.log("지점 수리보고서  세부조회 reducer : ", payload)
        return payload;
    }
}, initialState)



export  {branchSalesReducer , detailBranchSalesReducer
    , vehicleRepairReducer , detailVehicleRepairReducer,newVehicleRepairReducer
    , expenseReducer, detailExpenseReducer
    , findAllRepairReducer, detailRepairReducer
    , carMembersReducer
};