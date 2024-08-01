// apis/ReportAPICalls.js
import { 
  BRANCHSALES, DETAILBRANCHSALES, NEWBRANCHSALES
  // UPDATEBRANCHSALES
  , VEHICLEREPAIR, DETAILVEHICLEREPAIR
  , EXPENSE, DETAILEXPENSE, NEWEXPENSE
  , REPAIR, DETAILREPAIR
  , NEWVEHICLEREPAIR
  , CARMEMBERS

} from "../modules/ReportsModule";


// 매출보고서 전체 조회 API
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
    console.log('매출 보고서 API 응답:', branchSalesResult);

    // 액션 디스패치
    dispatch({ type: BRANCHSALES, payload: branchSalesResult.data });
  };
};

// 매출보고서 상세 조회
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
    console.log('매출보고서 부분조회 API 응답:', detailBranchSalesResult);

    // 액션 디스패치
    dispatch({ type: DETAILBRANCHSALES, payload: detailBranchSalesResult.data})
}
}

// 매출보고서 등록 

export const callNewBranchSalesAPI = (data) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/paper/location/reports`; 

  return async (dispatch, getState) => {
    const newBranchSalesResult = await fetch(requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
      },
      body: JSON.stringify(data) 
    }).then((response) => response.json())

    console.log('매출보고서 등록 API 응답하니? :', newBranchSalesResult)

    if(newBranchSalesResult.status === 200){
    dispatch({type: NEWBRANCHSALES, payload: newBranchSalesResult.data})
  }
}
}

// 매출 보고서 수정
export const callUpdateBranchSalesAPI = ({branchReportCode, data}) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/paper/location/reports/${branchReportCode}`; 
  return async (dispatch, getState) => {
    try {
      const updateBranchSalesResult = await fetch(requestURL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(data)
      });

      console.log('매출보고서 수정 API : ', updateBranchSalesResult)

      if (updateBranchSalesResult.status === 200) {
        const data = await updateBranchSalesResult.json();
        dispatch({ type: 'UPDATEBRANCHSALES', payload: data });
      } else {
        console.error('매출보고서 수정 실패: ', updateBranchSalesResult.statusText);
      }

      return updateBranchSalesResult;
    } catch (error) {
      console.error('Error during API call:', error);
      return { ok: false, status: 500 };
    }
  };
};
// 매출 보고서 삭제


// 지출보고서 전체 조회 API
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

    console.log('지출보고서 API 나오나? :', expenseResult)

    dispatch({type: EXPENSE, payload: expenseResult.data})
  }
}

// 지출보고서 상세조회 API
export const callDetailExpenseAPI = ({expenseReportCode}) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/paper/company/detailExpenseReports/${expenseReportCode}`; 

  return async (dispatch, getState) => {
    const detailExpenseResult = await fetch(requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
      },
    }).then((response) => response.json())

    console.log('지출보고서 부분조회 API 나오나? :', detailExpenseResult)

    dispatch({type: DETAILEXPENSE, payload: detailExpenseResult.data})
  }
}

// 지출보고서 등록 
export const callNewExpenseAPI = (data) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/paper/newExpense`; 

  return async (dispatch, getState) => {
    const newExpenseResult = await fetch(requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
      },
      body: JSON.stringify(data) 
    }).then((response) => response.json())

    console.log('지출보고서 등록 API 응답하니? :', newExpenseResult)

    if(newExpenseResult.status === 200){
    dispatch({type: NEWEXPENSE, payload: newExpenseResult.data})
  }
}
}


// 차량 수리보고서 전체 조회 API 
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

    console.log('차량수리보고서 API 응답하니? :', result);

    dispatch({type: VEHICLEREPAIR, payload: result.data})
  }
}

// 차량수리 보고서 세부 조회 API
export const callDetailVehicleRepairAPI = ({vehicleReportCode}) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/paper/company/detailVehicleRepair/${vehicleReportCode}`;

  return async (dispatch, getState) => {
    const detailVehicleRepairResult = await fetch(requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
      },
    }).then((response) => response.json());

    console.log('차량 수리보고서 세부조회 API 응답하니? :', detailVehicleRepairResult);

    dispatch({type: DETAILVEHICLEREPAIR, payload: detailVehicleRepairResult.data})
  }
}

// 차량 수리 보고서 차량, 차량기사 조회
export const callCarMembersAPI = () => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/paper/driver/numbers`;

  return async (dispatch, getState) => {
    const carMembersResult = await fetch(requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
      },
    }).then((response) => response.json());

    console.log('차량기사, 차 번호 가지고 오니 API 응답하니? :', carMembersResult);

    dispatch({type: CARMEMBERS, payload: carMembersResult.data})
  }
}


// 차량수리보고서 등록 API
export const callNewVehicleRepairAPI = ({form}) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/paper/vehicle-repair`; 

  console.log('[formdata ]', form.get("beforeImage"))
  console.log('[formdata ]', form.get("afterImage"))
  
  return async (dispatch, getState) => {
    try{
      const newVehicleRepairResult = await fetch(requestURL, {
        method: 'POST',
        headers: {
          Accept: '*/*',
          Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
        },
        body: form
      })

      console.log('차량수리보고서 등록 API 응답하니? :', newVehicleRepairResult);
      
      if(newVehicleRepairResult.status === 200){
        const data = await newVehicleRepairResult.json();
        console.log('응답 데이터:', data); // 데이터를 사용하는 예시
        dispatch({type: NEWVEHICLEREPAIR, payload: data})
      }else{
        console.error('차량수리보고서 등록 실패', newVehicleRepairResult.statusText)
      }
      return newVehicleRepairResult;
    } catch(error){
      console.error('Error during API call:', error);
      return { ok: false, status: 500 };
    }
  };
};


// 지점 수리보고서 전체조회 API
export const callFindRepairAPI = () => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/paper/company/repair`; 

  return async (dispatch, getState) => {
    const repairResult = await fetch(requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
      },
    }).then((response) => response.json());

    console.log('지점 수리보고서 API 응답하니? :', repairResult);

    dispatch({type: REPAIR, payload: repairResult.data})
  }

}

// 지점 수리보고서 상세조회 API
export const callDetailRepairAPI = ({repairReportCode}) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/paper/company/repair/${repairReportCode}`;

  return async (dispatch, getState) => {
    const detailRepairResult = await fetch(requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
      },
    }).then((response) => response.json());

    console.log('지점 수리보고서 세부조회 API 응답하니? :', detailRepairResult);

    dispatch({type: DETAILREPAIR, payload: detailRepairResult.data})
  }
}

// 수리보고서 등록 API
export const callNewRepairAPI = ({ form }) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/paper/location/newRepair`;

  console.log('[formdata ]', form.get("repairImage"))


  return async (dispatch, getState) => {
    try {
      const newRepirResult = await fetch(requestURL, {
        method: 'POST',
        headers: {
          Accept: '*/*',
          Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
        },
        body: form
      });

      console.log('수리보고서 등록 API 응답하니? :', newRepirResult);

      if (newRepirResult.status === 200) {
        const data = await newRepirResult.json();
        dispatch({ type: 'NEWREPAIR', payload: data });
      } else {
        console.error('수리보고서 등록 실패: ', newRepirResult.statusText);
      }

      return newRepirResult;
    } catch (error) {
      console.error('Error during API call:', error);
      return { ok: false, status: 500 };
    }
  };
};
