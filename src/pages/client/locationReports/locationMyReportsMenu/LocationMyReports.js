import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callFindByMemberNameBranchSalesAPI, callFindByMemberNameExpenseAPI, callFindByMemberNameRepairAPI } from '../../../../apis/ReportAPICalls';
import { useNavigate, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import styles from './LocationMyReports.module.css';
import Paging from '../../../../components/paging/Paging';

function LocationMyReports() {
    const location = useLocation();
    const [activeTable, setActiveTable] = useState(location.state?.activeTable || '매출');
    const dispatch = useDispatch();
    const [current, setCurrent] = useState(1);
    const [selectedReport, setSelectedReport] = useState(null); // 상세보기 보고서 상태 추가

    // 매출보고서 
    const branchSalesMemberNameResult = useSelector(state => state.branchSalesMemberNameReducer);
    const branchSalesList = branchSalesMemberNameResult?.branchSalesList || [];
    const branchSalesTotalPages = branchSalesMemberNameResult?.totalPages || 1;

    // 매출보고서 페이지 이동
const navigate = useNavigate();

    // 지출보고서 
    const expenseMemberNameResult = useSelector(state => state.expenseMemberNameReducer);
    const expenseList = expenseMemberNameResult?.expenseList || [];
    const expenseTotalPages = expenseMemberNameResult?.totalPages || 1;

    // 지점 수리보고서 
    const repairMemberNameResult = useSelector(state => state.repairMemberNameReducer);
    const repairList = repairMemberNameResult?.repairList || [];
    const repairTotalPages = repairMemberNameResult?.totalPages || 1;

    // 로그인한 사용자 정보 가져오기
    const member = jwtDecode(window.localStorage.getItem('accessToken'));
    const memberName = member.memberName;

    useEffect(() => {
        if (activeTable === '매출') {
            dispatch(callFindByMemberNameBranchSalesAPI({ current, memberName }));
        } else if (activeTable === '지출') {
            dispatch(callFindByMemberNameExpenseAPI({ current, memberName }));
        } else if (activeTable === '시설물수리') {
            dispatch(callFindByMemberNameRepairAPI({ current, memberName }));
        }
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
                            {repairList.map((repair) => (
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
                            className={`${styles.branchRegisterButton} ${activeTable === '시설물수리' ? styles.activeButton : ''}`}
                            onClick={() => setActiveTable('시설물수리')}
                        >
                            시설물수리
                        </button>
                    </div>
                    <div className={styles.tableContainer}>
                        {renderTable()}
                    </div>
                    <Paging setCurrent={handlePageChange} end={getTotalPages()} />
                </div>
                <div className={styles.detailView}>
                    {/* 상세보기 정보 표시 */}
                    {selectedReport && (
                        <div>
                            <h2>상세보기</h2>
                            {/* 여기서 selectedReport의 내용을 표시합니다. */}
                            <pre>{JSON.stringify(selectedReport, null, 2)}</pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default LocationMyReports;
