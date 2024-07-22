// apis/ReportAPICalls.js
import { BRANCHSALES, VEHICLEREPAIR, EXPENSE, DETAILBRANCHSALES } from "../modules/ReportsModule";

// 지출보고서 전체 조회 API
export const callFindBranchSalesAPI = () => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/paper/company/reports`;

  return async (dispatch, getState) => {
    const branchSalesResult = await fetch(requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
      },
    }).then((response) => response.json());

    // 응답 데이터 로그 출력
    console.log('API 응답:', branchSalesResult);

    // 액션 디스패치
    dispatch({ type: BRANCHSALES, payload: branchSalesResult.data });
  };
};

// 지출보고서 상세 조회
export const calldetailBranchSalesAPI = ({branchReportCode}) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/paper/company/${branchReportCode}/detailBranch`;

  return async (dispatch, getState) => {
    const detailBranchSalesResult = await fetch(requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
      },
    }).then((response) => response.json());

    // 응답 데이터 로그 출력
    console.log('지출 부분조회 API 응답:', detailBranchSalesResult);

    // 액션 디스패치
    dispatch({ type: DETAILBRANCHSALES, payload: detailBranchSalesResult.data})
}
}


// 수리보고서 전체 조회 API 
export const callFindVehicleRepairAPI = () => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/paper/company/newReports`; 

  return async (dispatch, getState) => {
    const result = await fetch(requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
      },
    }).then((response) => response.json());

    console.log('API 응답하니? :', result);

    dispatch({type: VEHICLEREPAIR, payload: result.data})
  }
}

// 매출보고서 전체 조회 API
export const callFindExpenseAPI = () => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/paper/company/expenseReports`; 

  return async (dispatch, getState) => {
    const expenseResult = await fetch(requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
      },
    }).then((response) => response.json())

    console.log('expense API 나오나? :', expenseResult)

    dispatch({type: EXPENSE, payload: expenseResult.data})
  }
}