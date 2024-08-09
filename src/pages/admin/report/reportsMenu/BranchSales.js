import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callFindBranchSalesAPI, callFindExpenseAPI, callFindVehicleRepairAPI, callFindRepairAPI, callCarMembersAPI } from '../../../../apis/ReportAPICalls';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './BranchSales.module.css';
import Paging from '../../../../components/paging/Paging';
import BranchSalesDetail from './BranchSalesDetail';
import ExpenseDetail from './ExpenseDetail';
import RepairDetail from './RepairDetail';
import VehicleRepairDetail from './VehicleRepairDetail';
import Skeleton from '@mui/material/Skeleton';

function BranchSales() {
  const location = useLocation();
  const [activeTable, setActiveTable] = useState(location.state?.activeTable || '매출');
  const dispatch = useDispatch();
  const [current, setCurrent] = useState(1);
  const [selectedReport, setSelectedReport] = useState(null);

  const branchSalesResult = useSelector(state => state.branchSalesReducer);
  const branchSalesList = branchSalesResult.branchSalesList || [];
  const branchSalesTotalPages = branchSalesResult.totalPages || 1;

  const expenseResult = useSelector(state => state.expenseReducer);
  const expenseList = expenseResult.expenseList || [];
  const expenseTotalPages = expenseResult.totalPages || 1;

  const vehicleRepairResult = useSelector(state => state.vehicleRepairReducer);
  const vehicleRepairList = vehicleRepairResult.vehicleRepairList || [];
  const vehicleRepairTotalPages = vehicleRepairResult.totalPages || 1;

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

  const handleTableChange = (table) => {
    setActiveTable(table);
    setSelectedReport(null);  // 상세보기 초기화
  };

  const renderTable = () => {
    switch (activeTable) {
      case '매출':
        return (
          <table className={styles.reportTable}>
            <thead>
              <tr>
                <th>번호</th>
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
                  <td>{item.branchReportStatus === 'N' ? '접수' : item.branchReportApprove === 'Y' ? '승인' : '반려'}</td>
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
                <th>번호</th>
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
                  <td>{expense.expenseReportStatus === 'N' ? '접수' : expense.expenseApprove === 'Y' ? '승인' : '반려'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case '차량수리비':
        return (
          <table className={`${styles.reportTable} ${styles.vehicleRepairTable}`}>
            <thead>
              <tr>
                <th>번호</th>
                <th className={styles.vehicleNumber}>차량번호</th>
                <th>차량기사</th>
                <th>제출일</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {vehicleRepairList.map((vehicle) => (
                <tr key={vehicle.vehicleReportCode}>
                  <td>{vehicle.vehicleReportCode}</td>
                  <td className={styles.vehicleNumber} style={{ cursor: 'pointer' }} onClick={() => setSelectedReport(vehicle)}>{vehicle.carNumber}</td>
                  <td>{vehicle.memberName}</td>
                  <td>{new Date(vehicle.vehicleSubmissionDate).toLocaleDateString()}</td>
                  <td>{vehicle.vehicleReportStatus === 'N' ? '접수' : vehicle.vehicleRepairApprove === 'Y' ? '승인' : '반려'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case '시설물수리':
        return (
          <table className={`${styles.reportTable} ${styles.facilityRepairTable}`}>
            <thead>
              <tr>
                <th>번호</th>
                <th>지점명</th>
                <th>종류</th>
                <th>제출일</th>
                <th>상태</th>
              </tr>
            </thead>
            <tbody>
              {repairList.map((repair) => (
                <tr key={repair.repairReportCode}>
                  <td>{repair.repairReportCode}</td>
                  <td style={{ cursor: 'pointer' }} onClick={() => setSelectedReport(repair)}>{repair.branchName}</td>
                  <td>{repair.facilityType}</td>
                  <td>{new Date(repair.repairSubmissionDate).toLocaleDateString()}</td>
                  <td>{repair.repairReportStatus === 'N' ? '접수' : repair.repairApprove === 'Y' ? '승인' : '반려'}</td>
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
              onClick={() => handleTableChange('매출')}
            >
              매출
            </button>
            <button
              className={`${styles.branchRegisterButton} ${activeTable === '지출' ? styles.activeButton : ''}`}
              onClick={() => handleTableChange('지출')}
            >
              지출
            </button>
            <button
              className={`${styles.branchRegisterButton} ${activeTable === '차량수리비' ? styles.activeButton : ''}`}
              onClick={() => handleTableChange('차량수리비')}
            >
              차량수리비
            </button>
            <button
              className={`${styles.branchRegisterButton} ${activeTable === '시설물수리' ? styles.activeButton : ''}`}
              onClick={() => handleTableChange('시설물수리')}
            >
              시설물수리
            </button>
          </div>
          <div className={styles.tableContainer}>
            {renderTable()}
          </div>
          <Paging setCurrent={setCurrent} end={getTotalPages()} />
        </div>
        <div className={
          selectedReport ? 
            activeTable === '차량수리비' ? 
              `${styles.detailView} ${styles.vehicleRepairDetailView}` : 
              activeTable === '시설물수리' ? 
                `${styles.detailView} ${styles.facilityRepairDetailView}` : 
                styles.detailView : 
            styles.detailView}>
          {selectedReport ? (
            <>
              {activeTable === '매출' && <BranchSalesDetail selectedReport={selectedReport} setSelectedReport={setSelectedReport} />}
              {activeTable === '지출' && <ExpenseDetail selectedReport={selectedReport} setSelectedReport={setSelectedReport} />}
              {activeTable === '차량수리비' && <VehicleRepairDetail selectedReport={selectedReport} setSelectedReport={setSelectedReport} />}
              {activeTable === '시설물수리' && <RepairDetail selectedReport={selectedReport} setSelectedReport={setSelectedReport} />}
            </>
          ) : (
            <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
              <Skeleton variant="text" width={200} height={40} style={{ marginBottom: '20px' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <Skeleton variant="rectangular" width={100} height={40} />
                <Skeleton variant="rectangular" width={100} height={40} />
                <Skeleton variant="rectangular" width={100} height={40} />
              </div>
              <Skeleton variant="rectangular" width="100%" height={40} style={{ marginBottom: '20px' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <Skeleton variant="rectangular" width="48%" height={40} />
                <Skeleton variant="rectangular" width="48%" height={40} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <Skeleton variant="rectangular" width="48%" height={40} />
                <Skeleton variant="rectangular" width="48%" height={40} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <Skeleton variant="rectangular" width="48%" height={40} />
                <Skeleton variant="rectangular" width="48%" height={40} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <Skeleton variant="rectangular" width="48%" height={40} />
                <Skeleton variant="rectangular" width="48%" height={40} />
              </div>
              <Skeleton variant="rectangular" width="100%" height={40} style={{ marginBottom: '20px' }} />
              <Skeleton variant="rectangular" width={100} height={40} style={{ margin: '0 auto' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BranchSales;
