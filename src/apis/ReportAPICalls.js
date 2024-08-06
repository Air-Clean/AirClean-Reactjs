// apis/ReportAPICalls.js
import { 
  BRANCHSALES, DETAILBRANCHSALES, NEWBRANCHSALES, BRANCHSALESMEMBERNAME
  // UPDATEBRANCHSALES, DELETEBRANCHSALES
  , VEHICLEREPAIR, DETAILVEHICLEREPAIR
  , EXPENSE, DETAILEXPENSE, NEWEXPENSE, EXPENSEMEMBERNAME
  // ,UPDATEEXPENSE,DELETEEXPENSE
  , REPAIR, DETAILREPAIR, REPAIRMEMBERNAME
  // , UPDATEREPAIR,DELETEREPAIR
  , NEWVEHICLEREPAIR
  , CARMEMBERS
  ,WATER_COST


} from "../modules/ReportsModule";


// 매출보고서 전체 조회 API
export const callFindBranchSalesAPI = ({current}) => {

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/paper/company/reports?offset=${current}`;

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

// 매출보고서 필터링페이지처리 전체조회
export const callFindByMemberNameBranchSalesAPI = ({current, memberName}) => {

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/paper/location/branch-sales?offset=${current}&memberName=${memberName}`;

  return async (dispatch, getState) => {
    const branchSalesMemberNameResult = await fetch(requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
      },
    }).then((response) => response.json());

    // 응답 데이터 로그 출력
    console.log('매출 필텅링 API 응답:', branchSalesMemberNameResult);

    // 액션 디스패치
    dispatch({ type: BRANCHSALESMEMBERNAME, payload: branchSalesMemberNameResult.data });
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
export const callDeleteBranchSalesAPI = ({branchReportCode, data}) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/paper/location/reports/${branchReportCode}`; 
  return async (dispatch, getState) => {
    try {
      const deleteBranchSalesResult = await fetch(requestURL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(data)
      });

      console.log('매출보고서 삭제 API : ', deleteBranchSalesResult)

      if (deleteBranchSalesResult.status === 200) {
        const data = await deleteBranchSalesResult.json();
        dispatch({ type: 'DELETEBRANCHSALES', payload: data });
      } else {
        console.error('매출보고서 삭제 실패: ', deleteBranchSalesResult.statusText);
      }

      return deleteBranchSalesResult;
    } catch (error) {
      console.error('Error during API call:', error);
      return { ok: false, status: 500 };
    }
  };
};

// 지출보고서 전체 조회 API
export const callFindExpenseAPI = ({current}) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/paper/company/expenseReports?offset=${current}`; 

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

// 지출보고서 필터링페이지처리 전체조회
export const callFindByMemberNameExpenseAPI = ({current, memberName}) => {

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/paper/location/expense?offset=${current}&memberName=${memberName}`;

  return async (dispatch, getState) => {
    const expenseMemberNameResult = await fetch(requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
      },
    }).then((response) => response.json());

    // 응답 데이터 로그 출력
    console.log('지출 필텅링 API 응답:', expenseMemberNameResult);

    // 액션 디스패치
    dispatch({ type: EXPENSEMEMBERNAME, payload: expenseMemberNameResult.data });
  };
};

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

// 지출보고서 수정
export const callUpdateExpenseAPI = ({expenseReportCode, data}) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/paper/updateExpense/${expenseReportCode}`; 
  return async (dispatch, getState) => {
    try {
      const updateExpenseResult = await fetch(requestURL, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(data)
      });

      console.log('지출보고서 수정 API : ', updateExpenseResult)

      if (updateExpenseResult.status === 200) {
        const data = await updateExpenseResult.json();
        dispatch({ type: 'UPDATEEXPENSE', payload: data });
      } else {
        console.error('지출보고서 수정 실패: ', updateExpenseResult.statusText);
      }

      return updateExpenseResult;
    } catch (error) {
      console.error('Error during API call:', error);
      return { ok: false, status: 500 };
    }
  };
};

// 지출보고서 삭제
export const callDeleteExpenseAPI = ({expenseReportCode, data}) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/paper/deleteExpense/${expenseReportCode}`; 
  return async (dispatch, getState) => {
    try {
      const deleteExpenseResult = await fetch(requestURL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(data)
      });

      console.log('지출보고서 삭제 API : ', deleteExpenseResult)

      if (deleteExpenseResult.status === 200) {
        const data = await deleteExpenseResult.json();
        dispatch({ type: 'DELETEEXPENSE', payload: data });
      } else {
        console.error('지출보고서 삭제 실패: ', deleteExpenseResult.statusText);
      }

      return deleteExpenseResult;
    } catch (error) {
      console.error('Error during API call:', error);
      return { ok: false, status: 500 };
    }
  };
};


// 차량 수리보고서 전체 조회 API 
export const callFindVehicleRepairAPI = ({current}) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/paper/company/newReports?offset=${current}`; 

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


// 시설물수리보고서 전체조회 API
export const callFindRepairAPI = ({current}) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/paper/company/repair?offset=${current}`; 

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

// 시설물수리보고서 필터링페이지처리 전체조회
export const callFindByMemberNameRepairAPI = ({current, memberName}) => {

  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/paper/location/repair?offset=${current}&memberName=${memberName}`;

  return async (dispatch, getState) => {
    const repairMemberNameResult = await fetch(requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: '*/*',
        Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
      },
    }).then((response) => response.json());

    // 응답 데이터 로그 출력
    console.log('시설물수리 필텅링 API 응답:', repairMemberNameResult);

    // 액션 디스패치
    dispatch({ type: REPAIRMEMBERNAME, payload: repairMemberNameResult.data });
  };
};



// 시설물수리보고서 상세조회 API
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

// 시설물수리보고서 등록 API
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

// 시설물수리보고서 수정
export const callUpdateRepairAPI = ({repairReportCode, data}) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/paper/location/repair/${repairReportCode}`; 

  // console.log('[formdata ]', form.get("repairImage"))
  return async (dispatch, getState) => {
    try {
      const updateRepairResult = await fetch(requestURL, {
        method: 'PUT',
        headers: {
          // 'Content-Type': 'application/json',
          Accept: '*/*',
          Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
        },
        body: data
      });

      console.log('시설물수리보고서 수정 API : ', updateRepairResult)

      if (updateRepairResult.status === 200) {
        const data = await updateRepairResult.json();
        dispatch({ type: 'UPDATEREPAIR', payload: data });
      } else {
        console.error('시설물수리보고서 수정 실패: ', updateRepairResult.statusText);
      }

      return updateRepairResult;
    } catch (error) {
      console.error('Error during API call:', error);
      return { ok: false, status: 500 };
    }
  };
};

// 시설물수리보고서 삭제
export const callDeleteRepairAPI = ({repairReportCode, data}) => {
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/paper/location/repair/${repairReportCode}`; 
  return async (dispatch, getState) => {
    try {
      const deleteRepairResult = await fetch(requestURL, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(data)
      });

      console.log('시설물수리보고서 삭제 API : ', deleteRepairResult)

      if (deleteRepairResult.status === 200) {
        const data = await deleteRepairResult.json();
        dispatch({ type: 'DELETEREPAIR', payload: data });
      } else {
        console.error('시설물수리보고서 삭제 실패: ', deleteRepairResult.statusText);
      }

      return deleteRepairResult;
    } catch (error) {
      console.error('Error during API call:', error);
      return { ok: false, status: 500 };
    }
  };
};


// 수도세 확인
export function callWaterCost({branchCode, month}){
  console.log("callWaterCost",branchCode)

  console.log('month',month)
  const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/location/water/cost?branchCode=${branchCode}&month=${month}`

  return async (dispatch,getState)=>{
    const result = await fetch(requestURL,{
      method : "GET",
      headers : {
        'Content-Type' : 'application/json',
        Accept : '*/*',
        Authorization : 'Bearer '+window.localStorage.getItem('accessToken')
      }

    }).then(res=>res.json())

    console.log("callWaterCost result 값",result)

    if(result.status===200){
      dispatch({type : WATER_COST , payload : result.data})
    }
  }
}