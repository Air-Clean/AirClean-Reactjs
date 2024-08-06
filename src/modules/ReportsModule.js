import { createActions, handleActions } from "redux-actions";


// 초기값
const initialState = {
    content: [],
    totalPages: 1,
    currentPage: 1
    };

export const BRANCHSALES = 'BRANCHSALES'
export const BRANCHSALESMEMBERNAME = 'BRANCHSALESMEMBERNAME'
export const DETAILBRANCHSALES = 'DETAILBRANCHSALES'
export const NEWBRANCHSALES = 'NEWBRANCHSALES'
export const UPDATEBRANCHSALES = 'UPDATEBRANCHSALES'
export const DELETEBRANCHSALES = 'DELETEBRANCHSALES'
export const EXPENSE = 'EXPENSE'
export const EXPENSEMEMBERNAME = 'EXPENSEMEMBERNAME'
export const DETAILEXPENSE = 'DETAILEXPENSE'
export const NEWEXPENSE = 'NEWEXPENSE'
export const UPDATEEXPENSE = 'UPDATEEXPENSE'
export const DELETEEXPENSE = 'DELETEEXPENSE'
export const VEHICLEREPAIR = 'VEHICLEREPAIR'
export const DETAILVEHICLEREPAIR = 'DETAILVEHICLEREPAIR'
export const NEWVEHICLEREPAIR = 'NEWVEHICLEREPAIR'
export const REPAIR = 'REPAIR'
export const REPAIRMEMBERNAME = 'REPAIRMEMBERNAME'
export const DETAILREPAIR = 'DETAILREPAIR'
export const UPDATEREPAIR = 'UPDATEREPAIR'
export const DELETEREPAIR = 'DELETEREPAIR'
export const NEWREPAIR = 'NEWREPAIR'
export const CARMEMBERS = 'CARMEMBERS'


export const WATER_COST = 'WATER_COST'




createActions({
    [BRANCHSALES]: ()=>[],
    [BRANCHSALESMEMBERNAME] : () => [],
    [DETAILBRANCHSALES]: () => [],
    [NEWBRANCHSALES]: () => [],
    [DELETEBRANCHSALES]: () => [],
    [UPDATEBRANCHSALES]: () => [],
    [NEWBRANCHSALES]: () => [],
    [EXPENSEMEMBERNAME]: () => [],
    [UPDATEEXPENSE]: () => [],
    [DELETEEXPENSE]: () => [],
    [VEHICLEREPAIR] : () => [],
    [DETAILVEHICLEREPAIR] : () => [],
    [NEWVEHICLEREPAIR] : () => [],
    [EXPENSE] : () => [],
    [DETAILEXPENSE] : () => [],
    [NEWEXPENSE] : () => [],
    [REPAIR] : () => [],
    [REPAIRMEMBERNAME] : () => [],
    [DETAILREPAIR] : () => [],
    [UPDATEREPAIR] : () => [],
    [DELETEREPAIR] : () => [],
    [NEWREPAIR] : () => [],
    [CARMEMBERS] : () => [],

    [WATER_COST] : ()=>{}
})



// 매출보고서 전체 조회
export const branchSalesReducer = handleActions({
    [BRANCHSALES]: (state, { payload }) => {
        console.log('리듀서 payload :', payload);
        return {
            ...state,
            branchSalesList: payload.content,
            totalPages: payload.totalPages,
            currentPage: payload.currentPage,
        };
    }
}, initialState);


// 매출보고서 부분 조회
const detailBranchSalesReducer = handleActions({
    [DETAILBRANCHSALES]: (state, {payload}) => {
        console.log('지출보고서 부분 조회 리듀서 payload :', payload)
        return payload;
    }
}, initialState
)

// 매출보고서 필터링 페이징 조회
const branchSalesMemberNameReducer = handleActions({
    [BRANCHSALESMEMBERNAME]: (state, {payload}) => {
        console.log('매출보고서 필터링 리듀서 payload :', payload)
        return {
            ...state,
            branchSalesList: payload.content,
            totalPages: payload.totalPages,
            currentPage: payload.currentPage,
        }
    }
}, initialState
)

// 매출보고서 등록
const newBranchSalesReducer = handleActions({
    [NEWBRANCHSALES]: (state, {payload}) => {
        console.log('매출보고서 등록 리듀서 payload :', payload)
        return {
            ...state,
            ...payload
        }
    }
}, initialState
)

// 매출보고서 수정
const updateBranchSalesReducer = handleActions({
    [UPDATEBRANCHSALES]: (state, {payload}) => {
        console.log('매출보고서 수정 리듀서 payload :', payload)
        return {
            ...state,
            ...payload
        }
    }
}, initialState
)

// 매출보고서 삭제
const deleteBranchSalesReducer = handleActions({
    [DELETEBRANCHSALES]: (state, {payload}) => {
        console.log('매출보고서 삭제 리듀서 payload :', payload)
        return {
            ...state,
            ...payload
        }
    }
}, initialState
)

// 지출보고서 전체 조회
export const expenseReducer = handleActions({
    [EXPENSE]: (state, {payload}) => {
        return{
            ...state,
            expenseList: payload.content,
            totalPages: payload.totalPages,
            currentPage: payload.currentPage,
        }
    }
}, initialState)

// 지출보고서 필터링 페이징 조회
const expenseMemberNameReducer = handleActions({
    [EXPENSEMEMBERNAME]: (state, {payload}) => {
        console.log('지출보고서 필터링 리듀서 payload :', payload)
        return {
            ...state,
            expenseList: payload.content,
            totalPages: payload.totalPages,
            currentPage: payload.currentPage,
        }
    }
}, initialState
)

// 지출보고서 상세 조회 
const detailExpenseReducer = handleActions({

    [DETAILEXPENSE] : (state, {payload}) => {
        console.log('expense 부분조회 reducer 나오니? :', payload)
        return payload
    }
    }, initialState)

// 지출보고서 등록
const newExpenseReducer = handleActions({

    [NEWEXPENSE] : (state, {payload}) => {
        console.log('expense 등록 reducer 나오니? :', payload)
        return {
            ...state,
            ...payload
        }
    }
    }, initialState)

// 지출보고서 수정
const updateEXpenseReducer = handleActions({

    [UPDATEEXPENSE] : (state, {payload}) => {
        console.log('expense 수정 reducer 나오니? :', payload)
        return {
            ...state,
            ...payload
        }
    }
    }, initialState)


 // 지출보고서 삭제
const deleteEXpenseReducer = handleActions({

    [DELETEEXPENSE] : (state, {payload}) => {
        console.log('expense 삭제 reducer 나오니? :', payload)
        return {
            ...state,
            ...payload
        }
    }
    }, initialState)



// 차량수리보고서 전체 조회
export const vehicleRepairReducer = handleActions({
    [VEHICLEREPAIR]: (state, {payload}) => {
        return{
            ...state,
            vehicleRepairList: payload.content,
            totalPages: payload.totalPages,
            currentPage: payload.currentPage,
        }
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

// 시설물 수리보고서 전체조회
export const findAllRepairReducer = handleActions({
    [REPAIR]: (state, {payload}) => {
        return{
            ...state,
            repairList: payload.content,
            totalPages: payload.totalPages,
            currentPage: payload.currentPage,
        }
    }
}, initialState)

// 시설물수리보고서 필터링 페이징 조회
const repairMemberNameReducer = handleActions({
    [REPAIRMEMBERNAME]: (state, {payload}) => {
        console.log('시설물수리보고서 필터링 리듀서 payload :', payload)
        return {
            ...state,
            repairList: payload.content,
            totalPages: payload.totalPages,
            currentPage: payload.currentPage,
        }
    }
}, initialState
)


// 시설물 수리보고서 세부조회
const detailRepairReducer = handleActions({

    [DETAILREPAIR] : (state, {payload}) => {
        console.log("지점 수리보고서  세부조회 reducer : ", payload)
        return payload;
    }
}, initialState)

// 시설물수리보고서 등록
const newRepairReducer = handleActions({

    [NEWREPAIR] : (state, {payload}) => {
        console.log("시설물수리보고서 등록 reducer : ", payload)
        return{
            ...state,
            ...payload,
        }
    }
}, initialState)

// 시설물수리보고서 수정
const updateRepairReducer = handleActions({

    [UPDATEREPAIR] : (state, {payload}) => {
        console.log("시설물수리보고서 수정 reducer : ", payload)
        return{
            ...state,
            ...payload,
        }
    }
}, initialState)

// 시설물수리보고서 삭제
const deleteRepairReducer = handleActions({

    [DELETEREPAIR] : (state, {payload}) => {
        console.log("시설물수리보고서 삭제 reducer : ", payload)
        return{
            ...state,
            ...payload,
        }
    }
}, initialState)

const waterCostReducer = handleActions({
    [WATER_COST] : (state,{payload})=>{
        return payload
    }
},initialState)


export  {
    // branchSalesReducer,
      detailBranchSalesReducer, newBranchSalesReducer, updateBranchSalesReducer, deleteBranchSalesReducer  ,branchSalesMemberNameReducer
    // , vehicleRepairReducer 
    , detailVehicleRepairReducer,newVehicleRepairReducer
    // , expenseReducer, 
    , detailExpenseReducer, newExpenseReducer, updateEXpenseReducer, deleteEXpenseReducer, expenseMemberNameReducer
    // , findAllRepairReducer
    , detailRepairReducer, newRepairReducer, updateRepairReducer,deleteRepairReducer, repairMemberNameReducer
    , carMembersReducer , waterCostReducer
   
};