// src/modules/CarModule.js

import {createActions, handleActions} from "redux-actions";

const initialState = [];

export const CARINFOLIST = 'CARINFOLIST';

createActions({
    [CARINFOLIST]: ()=>[]
})

// 리듀서 정의
const carReducer = (state = initialState, action) => {
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

export default carReducer;
