// apis/DetergentInfoAPICalls.js
import { DETERGENTSINFO, PARTSINFO, HEADSTOCKHISTORY, BRANCHSTOCKHISTORY } from "../modules/StockModule"
import jwtDecode from "jwt-decode";

export const callDetergentsInfoAPI = () => {

    const members  = jwtDecode(window.localStorage.getItem('accessToken'));
    console.log('members 보기',members);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/company/stock/detergents?memberName=${members.memberName}&memberRole=${members.memberRole}&sub=${members.sub}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            }
        }
        ).then((response) => response.json());

        // 응답 데이터 로그
        console.log('Detergents API 응답:', result.data);

        // 액션 디스패치
        dispatch({type: DETERGENTSINFO, payload: result.data})
    };

}

export const callPartsInfoAPI = () => {

    const members  = jwtDecode(window.localStorage.getItem('accessToken'));
    console.log('members 보기',members);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/company/stock/parts?memberName=${members.memberName}&memberRole=${members.memberRole}&sub=${members.sub}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            }
        }
        ).then((response) => response.json());

        console.log('Parts API 응답:', result.data);

        // 액션 디스패치
        dispatch({type: PARTSINFO, payload: result.data})
    };

}

export const callHeadStockHistoryAPI = () => {

    const members  = jwtDecode(window.localStorage.getItem('accessToken'));
    console.log('members 보기',members);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/company/stock/application`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            }
        }
        ).then((response) => response.json());

        console.log('Parts API 응답:', result.data);

        // 액션 디스패치
        dispatch({type: HEADSTOCKHISTORY, payload: result.data})
    };

}

export const callBranchStockHistoryAPI = () => {

    const members  = jwtDecode(window.localStorage.getItem('accessToken'));
    console.log('members 보기',members);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/company/stock/branchApplication`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            }
        }
        ).then((response) => response.json());

        console.log('BranchHistory API 응답:', result.data);

        // 액션 디스패치
        dispatch({type: BRANCHSTOCKHISTORY, payload: result.data})
    };

}