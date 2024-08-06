import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callFindBranchSalesAPI, callFindExpenseAPI, callFindVehicleRepairAPI, callFindRepairAPI, callCarMembersAPI } from '../../../../apis/ReportAPICalls';
import { useNavigate, useLocation } from 'react-router-dom'; 
import './BranchSales.css';
import Paging from '../../../../components/paging/Paging';

function BranchSales() {
  const location = useLocation();
  const [activeTable, setActiveTable] = useState(location.state?.activeTable || '매출'); // 초기값을 '매출'로 설정
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);

  // 매출보고서 
  const branchSalesResult = useSelector(state => state.branchSalesReducer);
  const branchSalesList = branchSalesResult.branchSalesList || [];
  const branchSalesTotalPages = branchSalesResult.totalPages || 1;


  // 매출보고서 페이지 이동
  const navigate = useNavigate();

  // 지출보고서 
  const expenseResult = useSelector(state => state.expenseReducer);
  const expenseList = expenseResult.expenseList || [];
  const expenseTotalPages = expenseResult.totalPages || 1;

  // 차량수리보고서
  const vehicleRepairResult = useSelector(state => state.vehicleRepairReducer);
  const vehicleRepairList = vehicleRepairResult.vehicleRepairList || [];
  const vehicleRepairTotalPages = vehicleRepairResult.totalPages || 1;

  // 지점 수리보고서 
  const repairResult = useSelector(state => state.findAllRepairReducer);
  const repairList = repairResult.repairList || [];
  const repairTotalPages = repairResult.totalPages || 1;

  useEffect(() => {
    console.log('리덕스 상태 result:', { branchSalesResult, expenseResult, vehicleRepairResult, repairResult });
    if (activeTable === '매출') {
      dispatch(callFindBranchSalesAPI({ current }));
    } else if (activeTable === '지출') {
      dispatch(callFindExpenseAPI({ current }));
    } else if (activeTable === '차량수리비') {
      dispatch(callFindVehicleRepairAPI({ current }));
      dispatch(callCarMembersAPI());
    } else if (activeTable === '시설물수리') {
      dispatch(callFindRepairAPI({ current }));
    }
    
    // 이 주석은 ESLint 경고를 비활성화합니다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTable, dispatch, current]); // result를 의존성 배열에 포함

  const renderTable = () => {
    switch (activeTable) {
      case '매출':
        return (
          <table className="report-table">
            <thead>
              <tr>
                <th>보고서번호</th>
                <th>지점명</th>
                <th>제출일</th>
                <th>상태</th>
                <th>상세보기</th>
              </tr>
            </thead>
            <tbody>
              {branchSalesList.map((item) => (
                <tr key={item.branchReportCode}>
                  <td>{item.branchReportCode}</td>
                  <td>{item.branchName}</td>     
                  <td>{new Date(item.branchSubmissionDate).toLocaleDateString()}</td>
                  <td>{
                      (()=>{
                        if(item.branchReportStatus==='N'){
                          return('접수')
                        }else if(item.branchReportApprove==="Y"){
                          return('승인')
                        }else{
                          return('반려')
                        }
                      })()
                    }</td>
                  <td><button onClick={() => navigate(`/company/paper/reports/branchSales/${item.branchReportCode}`)}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case '지출':
        return (
          <table className="report-table">
            <thead>
              <tr>
                <th>보고서번호</th>
                <th>지점명</th>
                <th>제출일</th>
                <th>상태</th>
                <th>상세보기</th>
              </tr>
            </thead>
            <tbody>
              {expenseList.map((expense) => (
                <tr key={expense.expenseReportCode}>
                  <td>{expense.expenseReportCode}</td>
                  <td>{expense.branchName}</td>  
                  <td>{new Date(expense.expenseSubmissionDate).toLocaleDateString()}</td>
                  <td>{
                      (()=>{
                        if(expense.expenseReportStatus==='N'){
                          return('접수')
                        }else if(expense.expenseApprove==="Y"){
                          return('승인')
                        }else{
                          return('반려')
                        }
                      })()
                    }</td>
                  <td><button onClick={() => navigate(`/company/paper/reports/expenseReports/${expense.expenseReportCode}`)}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case '차량수리비':
        return (
          <table className="report-table">
            <thead>
              <tr>
                <th>보고서번호</th>
                <th>차량번호</th>
                <th>차량기사</th>
                <th>제출일</th>
                <th>상태</th>
                <th>상세보기</th>
              </tr>
            </thead>
            <tbody>
              {vehicleRepairList.map((vehicle) => (
                <tr key={vehicle.vehicleReportCode}>
                  <td>{vehicle.vehicleReportCode}</td>
                  <td>{vehicle.carNumber}</td>   
                  <td>{vehicle.memberName}</td> 
                  <td>{new Date(vehicle.vehicleSubmissionDate).toLocaleDateString()}</td>
                  <td>{
                      (()=>{
                        if(vehicle.vehicleReportStatus==='N'){
                          return('접수')
                        }else if(vehicle.vehicleRepairApprove==="Y"){
                          return('승인')
                        }else{
                          return('반려')
                        }
                      })()
                    }</td>
                  <td><button onClick={() => navigate(`/company/paper/reports/vehicleRepair/${vehicle.vehicleReportCode}`)}>View</button></td>
              </tr>
              ))}
            </tbody>
          </table>
        );
      case '시설물수리':
        return (
          <table className="report-table">
            <thead>
              <tr>
                <th>보고서번호</th>
                <th>지점명</th>
                <th>종류</th>
                <th>제출일</th>
                <th>상태</th>
                <th>상세보기</th>
              </tr>
            </thead>
            <tbody>
              {repairList.map((repair) =>(
                <tr key={repair.repairReportCode}>
                <td>{repair.repairReportCode}</td>
                <td>{repair.branchName}</td>  
                <td>{repair.facilityType}</td>   
                <td>{new Date(repair.repairSubmissionDate).toLocaleDateString()}</td>
                <td>{
                      (()=>{
                        if(repair.repairReportStatus==='N'){
                          return('접수')
                        }else if(repair.repairApprove==="Y"){
                          return('승인')
                        }else{
                          return('반려')
                        }
                      })()
                    }</td>
                <td><button onClick={() => navigate(`/company/paper/reports/repairReports/${repair.repairReportCode}`)}>View</button></td>
            </tr>
              ))}
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  const getTotalPages = () => {
    switch (activeTable) {
      case '매출':
        return branchSalesTotalPages;
      case '지출':
        return expenseTotalPages;
      case '차량수리비':
        return vehicleRepairTotalPages;
      case '시설물수리':
        return repairTotalPages;
      default:
        return 1;
    }
  };

  return (
    <div className="menu1_layout">
      <div className='flex_wrap'>
        <div className="report-create">
          <h1>보고서 조회</h1>
          <div className="branch-button-group">
            <button
              className={`branch-register-button ${activeTable === '매출' ? 'active-button' : ''}`}
              onClick={() => setActiveTable('매출')}
            >
              매출
            </button>
            <button
              className={`branch-register-button  ${activeTable === '지출' ? 'active-button' : ''}`}
              onClick={() => setActiveTable('지출')}
            >
              지출
            </button>
            <button
              className={`branch-register-button ${activeTable === '차량수리비' ? 'active-button' : ''}`}
              onClick={() => setActiveTable('차량수리비')}
            >
              차량수리비
            </button>
            <button
              className={`branch-register-button ${activeTable === '시설물수리' ? 'active-button' : ''}`}
              onClick={() => setActiveTable('시설물수리')}
            >
              시설물수리
            </button>
          </div>
          <div className="table-container">
            {renderTable()}
          </div>
          <Paging setCurrent={setCurrent} end={getTotalPages()} />
        </div>
      </div>
    </div>
  );
}

export default BranchSales;