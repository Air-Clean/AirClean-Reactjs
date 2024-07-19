import { createActions, handleActions } from "redux-actions";


// 초기값
const initialState = [];

export const BRANCHSALES = 'BRANCHSALES'
export const VEHICLEREPAIR = 'VEHICLEREPAIR'


createActions({
    [BRANCHSALES]: ()=>[],
    [VEHICLEREPAIR] : () => [],
})

const branchSalesReducer = handleActions({
    [BRANCHSALES]: (state, {payload}) => {
        console.log('리듀서 payload :', payload)
        return payload;
    }
}, initialState
   
)

const vehicleRepairReducer = handleActions({
    [VEHICLEREPAIR] : (state, {payload}) => {
        console.log('리듀서 payload : ', payload)
        return payload
    }
}, initialState)



export  {branchSalesReducer, vehicleRepairReducer};