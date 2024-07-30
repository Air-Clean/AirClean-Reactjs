import { createActions ,handleActions } from "redux-actions"

export const MAIN_BRANCH = 'main_BRANCH'
export const BRANCH_INFO = 'branch_INFO';

const initState = []

createActions({
    [MAIN_BRANCH] : ()=>{},
    [BRANCH_INFO] : ()=>{},
})

export const branchReducer = handleActions({
    [MAIN_BRANCH] : (state,{payload})=>{
        return payload;
    },
    
},initState)

export const branchMapReducer = handleActions({
    [BRANCH_INFO] : (state,{payload})=>{
        return payload
    }
},initState)
