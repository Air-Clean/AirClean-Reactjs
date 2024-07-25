import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { callDetailExpenseAPI } from '../../../../apis/ReportAPICalls';
import './BranchSalesDetail.css';
import jwtDecode from 'jwt-decode';

function ExpenseDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const expenseDetail = useSelector(state => state.detailExpenseReducer);
  const members  = jwtDecode(window.localStorage.getItem('accessToken'))
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(callDetailExpenseAPI({
      expenseReportCode: params.expenseReportCode
    }));
  }, [dispatch, params.expenseReportCode]);

  const handleClose = () => {
    navigate('/company/paper/reports', { state: { activeTable: '지출' } });
  }


  console.log('여까지 왔어?')
  return (
    <div className="branchDetail_menu1_layout">
      <div className="branchDetail_flex_wrap">
        <div className="details-container">
          <h1 className="title">지출보고서 상세보기</h1>
          <table className="details-table">
            <thead>
              <tr>
                <th>양식명</th>
                <td colSpan="2">{expenseDetail.expenseReportCode}</td>
                <th>지점장명</th>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <th>지점명</th>
                <td>{expenseDetail.branchCode}</td>
                <th>제출일</th>
                <td colSpan="3">{new Date(expenseDetail.expenseSubmissionDate).toLocaleDateString()}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th rowSpan="8" className="vertical-header">내용</th>
                <th className="header">전기세</th>
                <td colSpan="4">{expenseDetail.electricityBill}</td>
              </tr>
              <tr>
                <th className="header">수도세</th>
                <td colSpan="4">{expenseDetail.waterBill}</td>
              </tr>
              <tr>
                <th className="header">가스비</th>
                <td colSpan="4">{expenseDetail.gasBill}</td>
              </tr>
              <tr>
                <th className="header">알바비</th>
                <td colSpan="4">{expenseDetail.partTimeSalary}</td>
              </tr>
            </tbody>
          </table>
          <div className="formButtons">
            {
              members.memberRole === 'a' && 
              (<>
                <button>승인</button>
                <button>반려</button>
              </>)
            }
            <button onClick={handleClose}>닫기</button>
          </div>
        </div>
      </div>
    </div>

    
  );
}

console.log('여기는 왔니...?')
export default ExpenseDetail;

