// BranchSales.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callFindBranchSalesAPI, callFindExpenseAPI } from '../../../../apis/ReportAPICalls';
import { useNavigate } from 'react-router-dom'; 
import './BranchSales.css';


function BranchSales() {
  const [activeTable, setActiveTable] = useState('지출'); // 초기값을 '지출'로 설정
  const dispatch = useDispatch();
  // 지출보고서
  const branchSalesResult = useSelector(state => state.branchSalesReducer);
  // 지출보고서 페이지 이동
  const navigate = useNavigate();
  // 매출보고서 
  const expenseResult = useSelector(state => state.expenseReducer);

  useEffect(() => {
    console.log('리덕스 상태 result:', {branchSalesResult,expenseResult});
    if (activeTable === '지출') {
        dispatch(callFindBranchSalesAPI());
    } else if (activeTable === '매출') {
      dispatch(callFindExpenseAPI())
    }
    
    // 이 주석은 ESLint 경고를 비활성화합니다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTable, dispatch]); // result를 의존성 배열에 포함


  const renderTable = () => {
    switch (activeTable) {
      case '지출':
        return (
          <table className="report-table">
            <thead>
              <tr>
                <th>보고서번호</th>
                <th>지점명</th>
                <th>제출일</th>
                <th>상세보기</th>
              </tr>
            </thead>
            <tbody>
              {branchSalesResult.map((item) => (
                <tr key={item.branchReportCode}>
                  <td>{item.branchReportCode}</td>
                  <td>{item.branchCode}</td>     {/* 지점명 인데 일단 지점코드로 가지고옴 */}
                  <td>{new Date(item.branchSubmissionDate).toLocaleDateString()}</td>
                  <td><button onClick={() => navigate(`/company/paper/reports/${item.branchReportCode}`)}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      case '매출':
        return (
          <table className="report-table">
            <thead>
              <tr>
                <th>보고서번호</th>
                <th>지점명</th>
                <th>제출일</th>
                <th>상세보기</th>
              </tr>
            </thead>
            <tbody>
              {/* 매출 데이터가 들어갈 부분 */}
              {expenseResult.map((expense) => (
                <tr key={expense.expenseReportCode}>
                  <td>{expense.expenseReportCode}</td>
                  <td>{expense.branchCode}</td>   {/* 지점명 인데 일단 지점코드로 가지고옴 */}
                  <td>{new Date(expense.expenseSubmissionDate).toLocaleDateString()}</td>
                  <td><button>View</button></td>
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
                <th>상세보기</th>
              </tr>
            </thead>
            <tbody>
              {/* 차량수리비 데이터가 들어갈 부분 */}
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
                <th>상세보기</th>
              </tr>
            </thead>
            <tbody>
              {/* 시설물수리 데이터가 들어갈 부분 */}
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
          <h1>보고서 조회</h1>
          <div className="branch-button-group">
            <button
              className={`branch-register-button ${activeTable === '지출' ? 'active-button' : ''}`}
              onClick={() => setActiveTable('지출')}
            >
              지출
            </button>
            <button
              className={`branch-register-button  ${activeTable === '매출' ? 'active-button' : ''}`}
              onClick={() => setActiveTable('매출')}
            >
              매출
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

export default BranchSales;
