// src/modules/CarModule.js

import {createActions, handleActions} from "redux-actions";

const initialState = [];

export const CARINFOLIST = 'CARINFOLIST';
export const CARDRIVER = 'CARDRIVER';

createActions({
    [CARINFOLIST]: ()=>[]
})

createActions({
    [CARDRIVER] : ()=>{}
})

// 리듀서 정의
export const carReducer = (state = initialState, action) => {
    switch (action.type) {
        case CARINFOLIST:
            return {
                ...state,
                carList: action.payload,
            };
        default:
            return state;
    }
};

export const carDriverReducer= handleActions({
    [CARDRIVER] : (state , {payload})=>{
        return payload;
    }
},initialState)




