import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callFindByMemberNameBranchSalesAPI, callFindByMemberNameExpenseAPI, callFindByMemberNameRepairAPI } from '../../../../apis/ReportAPICalls';
import { useNavigate, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import styles from './LocationMyReports.module.css';
import Paging from '../../../../components/paging/Paging';
import LocationExpenseDetail from './LocationExpenseDetail';
import LocationBranchSalesDetail from './LocationBranchSalesDetail'
import LocationRepairDetail from './LocationRepairDetail'
import Skeleton from '@mui/material/Skeleton';

function LocationMyReports() {
    const location = useLocation();
    const [activeTable, setActiveTable] = useState(location.state?.activeTable || '매출');
    const dispatch = useDispatch();
    const [current, setCurrent] = useState(1);
    const [selectedReport, setSelectedReport] = useState(null);

    const branchSalesMemberNameResult = useSelector(state => state.branchSalesMemberNameReducer);
    const branchSalesList = branchSalesMemberNameResult?.branchSalesList || [];
    const branchSalesTotalPages = branchSalesMemberNameResult?.totalPages || 1;

    const expenseMemberNameResult = useSelector(state => state.expenseMemberNameReducer);
    const expenseList = expenseMemberNameResult?.expenseList || [];
    const expenseTotalPages = expenseMemberNameResult?.totalPages || 1;

    const repairMemberNameResult = useSelector(state => state.repairMemberNameReducer);
    const repairList = repairMemberNameResult?.repairList || [];
    const repairTotalPages = repairMemberNameResult?.totalPages || 1;

    const member = jwtDecode(window.localStorage.getItem('accessToken'));
    const memberName = member.memberName;

    useEffect(() => {
        const fetchData = () => {
            if (activeTable === '매출') {
                dispatch(callFindByMemberNameBranchSalesAPI({ current, memberName }));
            } else if (activeTable === '지출') {
                dispatch(callFindByMemberNameExpenseAPI({ current, memberName }));
            } else if (activeTable === '시설물수리') {
                dispatch(callFindByMemberNameRepairAPI({ current, memberName }));
            }
        };
        fetchData();
    }, [activeTable, dispatch, current, memberName]);

    const handlePageChange = (page) => {
        setCurrent(page);
        if (activeTable === '매출') {
            dispatch(callFindByMemberNameBranchSalesAPI({ current: page, memberName }));
        } else if (activeTable === '지출') {
            dispatch(callFindByMemberNameExpenseAPI({ current: page, memberName }));
        } else if (activeTable === '시설물수리') {
            dispatch(callFindByMemberNameRepairAPI({ current: page, memberName }));
        }
    };

    const reloadData = () => {
        if (activeTable === '매출') {
            dispatch(callFindByMemberNameBranchSalesAPI({ current, memberName }));
        } else if (activeTable === '지출') {
            dispatch(callFindByMemberNameExpenseAPI({ current, memberName }));
        } else if (activeTable === '시설물수리') {
            dispatch(callFindByMemberNameRepairAPI({ current, memberName }));
        }
    };

    const handleTableChange = (table) => {
        setActiveTable(table);
        setSelectedReport(null);
        setCurrent(1);  // 테이블 변경 시 페이지를 초기화합니다.
    };

    const renderTable = () => {
        switch (activeTable) {
            case '매출':
                return (
                    <table className={styles.salesTable}>
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
                                    <td>{
                                        (() => {
                                            if (item.branchReportStatus === 'N') {
                                                return ('접수')
                                            } else if (item.branchReportApprove === "Y") {
                                                return ('승인')
                                            } else {
                                                return ('반려')
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
                    <table className={styles.expenseTable}>
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
                                    <td>{
                                        (() => {
                                            if (expense.expenseReportStatus === 'N') {
                                                return ('접수')
                                            } else if (expense.expenseApprove === "Y") {
                                                return ('승인')
                                            } else {
                                                return ('반려')
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
                    <table className={styles.repairTable}>
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
                                    <td>{
                                        (() => {
                                            if (repair.repairReportStatus === 'N') {
                                                return ('접수')
                                            } else if (repair.repairApprove === "Y") {
                                                return ('승인')
                                            } else {
                                                return ('반려')
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
            case '시설물수리':
                return repairTotalPages;
            default:
                return 1;
        }
    };

    return (
        <div className={styles.menu1Layout}>
            <div className={styles.flexWrap}>
                <div className={styles.reportCreate}>
                    <h1>내 보고서 조회</h1>
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
                            className={`${styles.branchRegisterButton} ${activeTable === '시설물수리' ? styles.activeButton : ''}`}
                            onClick={() => handleTableChange('시설물수리')}
                        >
                            시설물수리
                        </button>
                    </div>
                    <div className={activeTable === '매출' ? styles.salesTableContainer : activeTable === '지출' ? styles.expenseTableContainer : styles.repairTableContainer}>
                        {renderTable()}
                    </div>
                    <Paging setCurrent={handlePageChange} end={getTotalPages()} />
                </div>
                <div className={
                    selectedReport ? 
                        activeTable === '매출' ?
                            `${styles.branchSaelesDetailView}`:
                        activeTable === '지출' ?
                            `${styles.expenseDetailView}`:
                        activeTable === '시설물수리' ?
                            `${styles.repairDetailView}`:
                            styles.detailView :
                styles.detailView}>
                    {selectedReport ? (
                        <>
                            {activeTable === '매출' && <LocationBranchSalesDetail  selectedReport = {selectedReport} setSelectedReport = {setSelectedReport} reloadData ={reloadData}/>}
                            {activeTable === '지출' && <LocationExpenseDetail  selectedReport = {selectedReport} setSelectedReport = {setSelectedReport} reloadData ={reloadData}/>}
                            {activeTable === '시설물수리' && <LocationRepairDetail  selectedReport = {selectedReport} setSelectedReport = {setSelectedReport} reloadData ={reloadData}/>}

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

export default LocationMyReports;
