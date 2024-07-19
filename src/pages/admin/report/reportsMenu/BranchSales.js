// BranchSales.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callFindBranchSalesAPI } from '../../../../apis/ReportAPICalls';
import './BranchSales.css';

function BranchSales() {
  const [activeTable, setActiveTable] = useState('지출'); // 초기값을 '지출'로 설정
  const dispatch = useDispatch();
  const result = useSelector(state => state.branchSalesReducer);

  useEffect(() => {
    console.log('리덕스 상태 result:', result);
    if (activeTable === '지출') {
        dispatch(callFindBranchSalesAPI());
    }
    
    // 이 주석은 ESLint 경고를 비활성화합니다.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTable, dispatch]); // result를 의존성 배열에 포함

  useEffect(() => {
    console.log('Redux 상태 result:', result); // Redux 상태를 콘솔에 출력하여 올바르게 불러오는지 확인
  }, [result]);

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
              {result.map((item) => (
                <tr key={item.branchReportCode}>
                  <td>{item.branchReportCode}</td>
                  <td>{item.branchCode}</td>
                  <td>{item.branchSubmissionDate}</td>
                  <td><button>View</button></td>
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
