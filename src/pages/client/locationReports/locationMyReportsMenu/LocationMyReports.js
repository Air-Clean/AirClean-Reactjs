import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callFindByMemberNameBranchSalesAPI, callFindByMemberNameExpenseAPI, callFindByMemberNameRepairAPI } from '../../../../apis/ReportAPICalls';
import { useNavigate, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import './LocationMyReports.css';
import Paging from '../../../../components/paging/Paging';

function LocationMyReports() {
    const location = useLocation();
    const [activeTable, setActiveTable] = useState(location.state?.activeTable || '매출');
    const dispatch = useDispatch();
    const [current, setCurrent] = useState(1);

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

    console.log("expenseMemberNameResult",expenseMemberNameResult)

  // 지점 수리보고서 
    const repairMemberNameResult = useSelector(state => state.repairMemberNameReducer);
    const repairList = repairMemberNameResult?.repairList || [];
    const repairTotalPages = repairMemberNameResult?.totalPages || 1;

    console.log("repairMemberNameResult",repairMemberNameResult)
  // 로그인한 사용자 정보 가져오기
    const member = jwtDecode(window.localStorage.getItem('accessToken'));
    const memberName = member.memberName;
    console.log('로그인정보 : ', member);

    useEffect(() => {
        console.log('리덕스 상태 result:', { branchSalesMemberNameResult, expenseMemberNameResult, repairMemberNameResult });
        if (activeTable === '매출') {
            dispatch(callFindByMemberNameBranchSalesAPI({ current, memberName }));
        } else if (activeTable === '지출') {
            dispatch(callFindByMemberNameExpenseAPI({ current, memberName }));
        } else if (activeTable === '시설물수리') {
            dispatch(callFindByMemberNameRepairAPI({ current, memberName }));
        }
        
        // 이 주석은 ESLint 경고를 비활성화합니다.
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [activeTable, dispatch, current, memberName]); // result를 의존성 배열에 포함

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
                    <td>{item.branchReportStatus}</td>
                    <td><button onClick={() => navigate(`/location/paper/myReports/branchSales/${item.branchReportCode}`)}>View</button></td>
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
                    <td>{expense.expenseReportStatus}</td>
                    <td><button onClick={() => navigate(`/location/paper/myReports/expense/${expense.expenseReportCode}`)}>View</button></td>
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
                {repairList.map((repair) => (
                <tr key={repair.repairReportCode}>
                    <td>{repair.repairReportCode}</td>
                    <td>{repair.branchName}</td>
                    <td>{repair.facilityType}</td>
                    <td>{new Date(repair.repairSubmissionDate).toLocaleDateString()}</td>
                    <td>{repair.repairReportStatus}</td>
                    <td><button onClick={() => navigate(`/location/paper/myReports/repair/${repair.repairReportCode}`)}>View</button></td>
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
            <Paging setCurrent={handlePageChange} end={getTotalPages()} />
        </div>
        </div>
    </div>
    );
}

export default LocationMyReports;
