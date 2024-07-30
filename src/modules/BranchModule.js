import { createActions ,handleActions } from "redux-actions"

export const MAIN_BRANCH = 'main_BRANCH'

const initState = []

createActions({
    [MAIN_BRANCH] : ()=>{}
})

export const branchReducer = handleActions({
    [MAIN_BRANCH] : (state,{payload})=>{
        return payload;
    },
    
},initState)