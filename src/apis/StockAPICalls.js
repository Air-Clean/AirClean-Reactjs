// apis/DetergentInfoAPICalls.js
import { DETERGENTSINFO } from "../modules/DetergentInfoModule";
import { PARTSINFO } from "../modules/PartInfoModule";
import jwtDecode from "jwt-decode";

export const callDetergentAPI = () => {

    const members  = jwtDecode(window.localStorage.getItem('accessToken'));
    console.log('members 보기',members);
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/company/h-stock/detergents?memberName=${members.memberName}
    &memberRole=${members.memberRole}&sub=${members.sub}`;

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
        console.log('API 응답:', result.data);

        // 액션 디스패치
        dispatch({type: DETERGENTSINFO, payload: result.data})
    };

}

export const callPartAPI = () => {

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/company/h-stock/parts`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }
        ).then((response) => response.json());

        // 응답 데이터 로그
        console.log('API 응답:', result);

        // 액션 디스패치
        dispatch({type: PARTSINFO, payload: result.data})
    };

}