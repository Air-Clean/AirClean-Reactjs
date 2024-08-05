import { createActions , handleActions } from "redux-actions"

export const EMPLOYEE = 'EMPLOYEE'
export const BRANCH = 'BRANCH'
export const DRIVER = 'DRIVER'
export const BRANCH_WITHOUT_OWNER = 'BRANCH_WITHOUT_OWNER'
export const BRANCH_COUNT = 'BRANCH_COUNT'

const initState = [];

createActions({
    [EMPLOYEE] : ()=>{},
    [BRANCH] : ()=>{},
    [DRIVER] : ()=>{},
    [BRANCH_WITHOUT_OWNER] : ()=>{},
    [BRANCH_COUNT] : ()=>{},
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


export const branchCountReducer = handleActions({
    [BRANCH_COUNT] : (state,{payload})=>{
        return payload;
    }
},initState)
