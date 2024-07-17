import { createActions , handleActions } from "redux-actions"

export const EMPLOYEE = 'EMPLOYEE'
export const BRANCH = 'BRANCH'
export const DRIVER = 'DRIVER'

const initState = [];

const actions = createActions({
    [EMPLOYEE] : ()=>{},
    [BRANCH] : ()=>{},
    [DRIVER] : ()=>{},
})

const humanReducer = handleActions({
    [EMPLOYEE] : (state,{payload})=>{
        return payload;
    }
},initState)

export default humanReducer;