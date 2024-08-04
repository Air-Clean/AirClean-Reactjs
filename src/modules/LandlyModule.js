import { createActions, handleActions } from 'redux-actions';

// 액션 타입 정의
export const SET_WATER_LEVEL = 'SET_WATER_LEVEL';

// 초기 상태 정의
const initState = {
    waterTanks: []
};

// 액션 생성자 정의
export const { setWaterLevel } = createActions({
    [SET_WATER_LEVEL]: payload => payload,
});

export const waterLevelReducer = handleActions({
    [SET_WATER_LEVEL]: (state, { payload }) => ({
        ...state,
        waterTanks: payload || [] // payload가 없을 경우 빈 배열로 설정
    })
}, initState);


// 수질 관련

// 액션 타입 정의
export const LOCATION_WATER = 'LOCATION_WATER';

// 초기 상태 정의
const initialState = {
    waterCondition: null,
};

// 액션 생성자 정의
export const { locationWater } = createActions({
    [LOCATION_WATER]: payload => payload,
});

// 리듀서 정의
export const selectLocationWater = handleActions({
    [LOCATION_WATER]: (state, { payload }) => {
        return {
            ...state,
            waterCondition: payload // 서버에서 받아온 데이터를 payload에 저장
        };
    }
}, initialState);



// waterSupply 관련 액션 타입 정의
export const SET_WATER_SUPPLY = 'SET_WATER_SUPPLY';

// 초기 상태 정의
const initialState2 = {
    waterCondition: null,
};

// 액션 생성자 정의
export const { setWaterSupply } = createActions({
    [SET_WATER_SUPPLY]: payload => payload,
});

// 리듀서 정의
export const selectWaterSupply = handleActions({
    [SET_WATER_SUPPLY]: (state, { payload }) => {
        // console.log('리듀서 호출: SET_WATER_SUPPLY', payload);
        return {
            ...state,
            waterSupply: payload // 서버에서 받아온 데이터를 payload에 저장
        };
    }
}, initialState2);




// laundrySelect 관련 액션 타입 정의
export const SET_LAUNDRY_SELECT = 'SET_LAUNDRY_SELECT';

// 초기 상태 정의
const initialState3 = {
    waterSupply: [], // 초기 상태를 올바르게 설정
};

// 액션 생성자 정의
export const { setLaundrySelect } = createActions({
    [SET_LAUNDRY_SELECT]: payload => payload,
});

// 리듀서 정의
export const selectLaundry = handleActions({
    [SET_LAUNDRY_SELECT]: (state, { payload }) => {
        console.log('리듀서 호출: SET_LAUNDRY_SELECT', payload);
        return {
            ...state,
            waterSupply: payload // 서버에서 받아온 데이터를 payload에 저장
        };
    }
}, initialState3);