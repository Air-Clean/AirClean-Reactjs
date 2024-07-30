import { createActions, handleActions } from 'redux-actions';

// 액션 타입 정의
export const SET_WATER_LEVEL = 'SET_WATER_LEVEL';

// 초기 상태 정의
const initState = {
    level: null
};

// 액션 생성자 정의
export const { setWaterLevel } = createActions({
    [SET_WATER_LEVEL]: payload => payload,
});

export const waterLevelReducer = handleActions({
    [SET_WATER_LEVEL]: (state, { payload }) => ({
        ...state,
        level: payload
    })
}, initState);
