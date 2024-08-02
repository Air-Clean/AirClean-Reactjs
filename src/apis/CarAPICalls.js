import { CARINFOLIST } from "../modules/CarModule";

// 매출보고서 전체 조회 API
export const callCarInfoListAPI = ({current}) => {

    let requestURL = null;
    if(current){
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/carsservice/company/cars?offset=${current}`;

    }else{
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/carsservice/company/cars`;

    }

    console.log('주소',requestURL)
    

    return async (dispatch, getState) => {
        try {
            const response = await fetch(requestURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                },
            });
            const carResult = await response.json();

            // 응답 데이터 로그 출력
            console.log('API 응답:', carResult);

            // 액션 디스패치
            dispatch({ type: CARINFOLIST, payload: carResult.data });
        } catch (error) {
            console.error('API 호출 에러:', error);
        }
    };
};
