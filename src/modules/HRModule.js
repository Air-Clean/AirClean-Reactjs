import { createActions , handleActions } from "redux-actions"

export const EMPLOYEE = 'EMPLOYEE'
export const BRANCH = 'BRANCH'
export const DRIVER = 'DRIVER'
export const BRANCH_WITHOUT_OWNER = 'BRANCH_WITHOUT_OWNER'

const initState = [];

createActions({
    [EMPLOYEE] : ()=>{},
    [BRANCH] : ()=>{},
    [DRIVER] : ()=>{},
    [BRANCH_WITHOUT_OWNER] : ()=>{},
})

export const humanReducer = handleActions({
    [EMPLOYEE] : (state,{payload})=>{
        return payload;
    },
    [BRANCH] : (state,{payload})=>{
        return payload
    },
    [DRIVER] : (state,{payload})=>{
        return payload
    }
},initState)

export const humanBranchReducer = handleActions({
    [BRANCH_WITHOUT_OWNER] : (state,{payload})=>{
        return payload;
    }
},initState)

