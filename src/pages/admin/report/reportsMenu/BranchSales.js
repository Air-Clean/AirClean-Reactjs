import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callFindBranchSalesAPI, callFindExpenseAPI, callFindVehicleRepairAPI, callFindRepairAPI, callCarMembersAPI } from '../../../../apis/ReportAPICalls';
import { useNavigate, useLocation } from 'react-router-dom'; 
import styles from './BranchSales.module.css';
import Paging from '../../../../components/paging/Paging';
import BranchSalesDetail from './BranchSalesDetail'; // Import the detail component
import ExpenseDetail from './ExpenseDetail'; // Import the detail component
import RepairDetail from './RepairDetail'; // Import the detail component
import VehicleRepairDetail from './VehicleRepairDetail'; // Import the detail component
import Skeleton from '@mui/material/Skeleton'; // Skeleton import 추가

function BranchSales() {
  const location = useLocation();
  const [activeTable, setActiveTable] = useState(location.state?.activeTable || '매출'); // 초기값을 '매출'로 설정
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);
  const [selectedReport, setSelectedReport] = useState(null); // 상세보기 보고서 상태 추가

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
  }, [activeTable, dispatch, current]);

  // selectedReport가 변경될 때마다 데이터를 다시 불러오는 useEffect 추가
  useEffect(() => {
    if (selectedReport) {
      if (activeTable === '매출') {
        dispatch(callFindBranchSalesAPI({ current }));
      } else if (activeTable === '지출') {
        dispatch(callFindExpenseAPI({ current }));
      } else if (activeTable === '차량수리비') {
        dispatch(callFindVehicleRepairAPI({ current }));
      } else if (activeTable === '시설물수리') {
        dispatch(callFindRepairAPI({ current }));
      }
    }
  }, [selectedReport, activeTable, dispatch, current]);

  const renderTable = () => {
    switch (activeTable) {
      case '매출':
        return (
          <table className={styles.reportTable}>
            <thead>
              <tr>
                <th>보고서번호</th>
                <th>지점명</th>
                <th>제출일</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {branchSalesList.map((item) => (
                <tr key={item.branchReportCode}>
                  <td>{item.branchReportCode}</td>
                  <td style={{ cursor: 'pointer' }} onClick={() => setSelectedReport(item)}>{item.branchName}</td>     
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
                </tr>
              ))}
            </tbody>
          </table>
        );
      case '지출':
        return (
          <table className={styles.reportTable}>
            <thead>
              <tr>
                <th>보고서번호</th>
                <th>지점명</th>
                <th>제출일</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {expenseList.map((expense) => (
                <tr key={expense.expenseReportCode}>
                  <td>{expense.expenseReportCode}</td>
                  <td style={{ cursor: 'pointer' }} onClick={() => setSelectedReport(expense)}>{expense.branchName}</td>  
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
                </tr>
              ))}
            </tbody>
          </table>
        );
      case '차량수리비':
        return (
          <table className={styles.reportTable}>
            <thead>
              <tr>
                <th>보고서번호</th>
                <th>차량번호</th>
                <th>차량기사</th>
                <th>제출일</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {vehicleRepairList.map((vehicle) => (
                <tr key={vehicle.vehicleReportCode}>
                  <td>{vehicle.vehicleReportCode}</td>
                  <td style={{ cursor: 'pointer' }} onClick={() => setSelectedReport(vehicle)}>{vehicle.carNumber}</td>   
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
              </tr>
              ))}
            </tbody>
          </table>
        );
      case '시설물수리':
        return (
          <table className={styles.reportTable}>
            <thead>
              <tr>
                <th>보고서번호</th>
                <th>지점명</th>
                <th>종류</th>
                <th>제출일</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {repairList.map((repair) =>(
                <tr key={repair.repairReportCode}>
                <td>{repair.repairReportCode}</td>
                <td style={{ cursor: 'pointer' }} onClick={() => setSelectedReport(repair)}>{repair.branchName}</td>  
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
    <div className={styles.menu1_layout}>
      <div className={styles.flex_wrap}>
        <div className={styles.reportCreate}>
          <h1>보고서 조회</h1>
          <div className={styles.branchButtonGroup}>
            <button
              className={`${styles.branchRegisterButton} ${activeTable === '매출' ? styles.activeButton : ''}`}
              onClick={() => setActiveTable('매출')}
            >
              매출
            </button>
            <button
              className={`${styles.branchRegisterButton} ${activeTable === '지출' ? styles.activeButton : ''}`}
              onClick={() => setActiveTable('지출')}
            >
              지출
            </button>
            <button
              className={`${styles.branchRegisterButton} ${activeTable === '차량수리비' ? styles.activeButton : ''}`}
              onClick={() => setActiveTable('차량수리비')}
            >
              차량수리비
            </button>
            <button
              className={`${styles.branchRegisterButton} ${activeTable === '시설물수리' ? styles.activeButton : ''}`}
              onClick={() => setActiveTable('시설물수리')}
            >
              시설물수리
            </button>
          </div>
          <div className={styles.tableContainer}>
            {renderTable()}
          </div>
          <Paging setCurrent={setCurrent} end={getTotalPages()} />
        </div>
        <div className={styles.detailView}>
          {selectedReport ? (
            <>
              {activeTable === '매출' && <BranchSalesDetail selectedReport={selectedReport} setSelectedReport={setSelectedReport} />}
              {activeTable === '지출' && <ExpenseDetail selectedReport={selectedReport} setSelectedReport={setSelectedReport} />}
              {activeTable === '차량수리비' && <VehicleRepairDetail selectedReport={selectedReport} setSelectedReport={setSelectedReport} />}
              {activeTable === '시설물수리' && <RepairDetail selectedReport={selectedReport} setSelectedReport={setSelectedReport} />}
            </>
          ) : (
            <div>
              <Skeleton variant="rectangular" width={600} height={60} />
              <Skeleton variant="rounded" width={300} height={60} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BranchSales;
