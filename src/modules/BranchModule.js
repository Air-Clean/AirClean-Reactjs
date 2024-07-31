import { createActions ,handleActions } from "redux-actions"

export const MAIN_BRANCH = 'main_BRANCH'
export const BRANCH_INFO = 'BRANCH_INFO'
export const BRANCH_FACILITY_INFO = 'BRANCH_FACILITY_INFO'
export const BRANCH_MANAGER = 'BRANCH_MANAGER'

const initState = []

createActions({
    [MAIN_BRANCH] : ()=>{}
})

export const branchReducer = handleActions({
    [MAIN_BRANCH] : (state,{payload})=>{
        return payload;
    },
    
},initState)

export const branchInfoReducer = handleActions({
    [BRANCH_INFO] : (state,{payload})=>{
        return payload;
    }
},initState)

export const branchFacilityInfoReducer= handleActions({
    [BRANCH_FACILITY_INFO] :(state,{payload})=>{
        
        return payload;
    }
},initState)

export const branchManagerReducer= handleActions({
    [BRANCH_MANAGER] : (state , {payload})=>{
        return payload;
    }
},initState)

