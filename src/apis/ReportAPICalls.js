// apis/ReportAPICalls.js
import { BRANCHSALES } from "../modules/ReportsModule";

export const callFindBranchSalesAPI = () => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/paper/company/reports`;

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
      },
    }).then((response) => response.json());

    // 응답 데이터 로그 출력
    console.log('API 응답:', result);

    // 액션 디스패치
    dispatch({ type: BRANCHSALES, payload: result.data });
  };
};
