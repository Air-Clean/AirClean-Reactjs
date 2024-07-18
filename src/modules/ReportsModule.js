import { createActions, handleActions } from "redux-actions";

// 초기값
const initialState = [];

export const BRANCHSALES = 'BRANCHSALES'

const actions = createActions({
    [BRANCHSALES]: ()=>[]
})

const branchSalesReducer = handleActions({
    [BRANCHSALES]: (state, {payload}) => {
        console.log('리듀서 payload :', payload)
        return payload;
    }
}, initialState
   
)

export default branchSalesReducer;