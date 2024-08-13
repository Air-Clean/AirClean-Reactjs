
import { handleActions , createActions } from "redux-actions";

// const intitValue = [];

const initialState = {
    monthRevenue: 0,
    annual: 0,
    month : '',
    loading: false,
    error: null
};

export const REVENUE = 'REVENUE'
export const UTILITY = 'UTILITY'
export const MAINTENACNE = 'MAINTENANCE'
export const RANKING = 'RANKING'

createActions({
    [REVENUE] : ()=>{},
    [UTILITY] : ()=>{},
    [MAINTENACNE] : ()=>{},
    [RANKING] : ()=>{},
})

export const revenueReducer=handleActions({
    [REVENUE] : (state , {payload})=>{
        return payload;
    }
},initialState)

const initValue = []
export const utilityReducer = handleActions({
    [UTILITY] : (state , {payload})=>{
        return payload;
    }
},initValue)

export const maintainReducer = handleActions({
    [MAINTENACNE] :  (state , {payload})=>{
        return payload;
    }
},initValue)

// export const rankReducer = handleActions({
//     [RANK] : (state,{payload})=>{
//         return payload;
//     }
// },initValue)


export const rankingReducer = handleActions({
    [RANKING] :  (state , {payload})=>{
        return payload;
    }
},initValue)
