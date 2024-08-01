import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callFindBranchSalesAPI, callFindExpenseAPI, callFindRepairAPI } from '../../../../apis/ReportAPICalls';
import { useNavigate, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './LocationMyReports.css';

function LocationMyReports() {
    const location = useLocation();
    const [activeTable, setActiveTable] = useState(location.state?.activeTable || '매출');
    const dispatch = useDispatch();
    
  // 매출보고서
    const branchSalesResult = useSelector(state => state.branchSalesReducer);
    const navigate = useNavigate();
  // 지출보고서
    const expenseResult = useSelector(state => state.expenseReducer);
  // 지점 수리보고서
    const repairResult = useSelector(state => state.findAllRepairReducer);
  // 로그인한 사용자 정보 가져오기
    const member = jwtDecode(window.localStorage.getItem('accessToken'));
    const memberName = member.memberName;
    console.log('로그인정보 : ', member);

    useEffect(() => {
    console.log('리덕스 상태 result:', { branchSalesResult, expenseResult });
    if (activeTable === '매출') {
        dispatch(callFindBranchSalesAPI());
    } else if (activeTable === '지출') {
        dispatch(callFindExpenseAPI());
    } else if (activeTable === '시설물수리') {
        dispatch(callFindRepairAPI());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeTable, dispatch]);

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
                {branchSalesResult.filter(item => item.memberName === memberName).map((item) => (
                <tr key={item.branchReportCode}>
                    <td>{item.branchReportCode}</td>
                    <td>{item.branchName}</td>
                    <td>{new Date(item.branchSubmissionDate).toLocaleDateString()}</td>
                    <td>{item.branchReportStatus}</td>
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
                {expenseResult.filter(expense => expense.memberName === memberName).map((expense) => (
                <tr key={expense.expenseReportCode}>
                    <td>{expense.expenseReportCode}</td>
                    <td>{expense.branchName}</td>
                    <td>{new Date(expense.expenseSubmissionDate).toLocaleDateString()}</td>
                    <td>{expense.expenseReportStatus}</td>
                    <td><button onClick={() => navigate(`/company/paper/reports/expenseReports/${expense.expenseReportCode}`)}>View</button></td>
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
                {repairResult.filter(repair => repair.memberName === memberName).map((repair) => (
                <tr key={repair.repairReportCode}>
                    <td>{repair.repairReportCode}</td>
                    <td>{repair.branchName}</td>
                    <td>{repair.facilityType}</td>
                    <td>{new Date(repair.repairSubmissionDate).toLocaleDateString()}</td>
                    <td>{repair.repairReportStatus}</td>
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

    return (
    <div className="menu1_layout">
        <div className='flex_wrap'>
        <div className="report-create">
            <h1>내 보고서 조회</h1>
            <div className="branch-button-group">
            <button
                className={`branch-register-button ${activeTable === '매출' ? 'active-button' : ''}`}
                onClick={() => setActiveTable('매출')}
            >
                매출
            </button>
            <button
                className={`branch-register-button ${activeTable === '지출' ? 'active-button' : ''}`}
                onClick={() => setActiveTable('지출')}
            >
                지출
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
            <div className="pagination">
            <button>1</button>
            <button>2</button>
            <button>3</button>
            </div>
        </div>
        </div>
    </div>
    );
}

export default LocationMyReports;