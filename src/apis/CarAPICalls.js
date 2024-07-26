import { CARINFOLIST } from "../modules/CarModule";
import jwtDecode from "jwt-decode";

    // 매출보고서 전체 조회 API
export const callCarInfoListAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/carsservice/company/cars`;
  
    return async (dispatch, getState) => {
        console.log('ddddd')
      const carResult = await fetch(requestURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
        },
      }).then((response) => response.json());
  
      // 응답 데이터 로그 출력
      console.log('API 응답:', carResult);
  
      // 액션 디스패치
      dispatch({ type: CARINFOLIST, payload: carResult.data });
    };
  };
