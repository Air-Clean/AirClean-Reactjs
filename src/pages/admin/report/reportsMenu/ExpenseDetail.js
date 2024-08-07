import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { callDetailExpenseAPI } from '../../../../apis/ReportAPICalls';
import './BranchSalesDetail.css';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

function ExpenseDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const expenseDetail = useSelector(state => state.detailExpenseReducer);
  const members = jwtDecode(window.localStorage.getItem('accessToken'));
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(callDetailExpenseAPI({
      expenseReportCode: params.expenseReportCode
    }));
  }, [dispatch, params.expenseReportCode]);

  const addComma = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleClose = () => {
    navigate('/company/paper/reports', { state: { activeTable: '지출' } });
  };

  const handleApproval = async () => {
    try {
      await axios.put(`/paper/company/reports/expenseApprove/${params.expenseReportCode}`);
      alert('승인되었습니다.');
      dispatch(callDetailExpenseAPI({
        expenseReportCode: params.expenseReportCode
      }));
      navigate('/company/paper/reports', { state: { activeTable: '지출' } });
    } catch (error) {
      console.error('승인에 실패하였습니다.', error);
      alert('승인에 실패하였습니다.');
    }
  };

  const handleRejection = async () => {
    try {
      await axios.put(`/paper/company/reports/expenseReject/${params.expenseReportCode}`);
      alert('반려되었습니다.');
      dispatch(callDetailExpenseAPI({
        expenseReportCode: params.expenseReportCode
      }));
      navigate('/company/paper/reports', { state: { activeTable: '지출' } });
    } catch (error) {
      console.error('반려에 실패하였습니다.', error);
      alert('반려에 실패하였습니다.');
    }
  };

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
                <td colSpan="2">{expenseDetail.memberName}</td>
              </tr>
              <tr>
                <th>지점명</th>
                <td>{expenseDetail.branchName}</td>
                <th>제출일</th>
                <td>{new Date(expenseDetail.expenseSubmissionDate).toLocaleDateString()}</td>
                <th>지출 달</th>
                <td>{expenseDetail.monthDate}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th rowSpan="8" className="vertical-header">내용</th>
                <th className="header">전기세</th>
                <td colSpan="4">{addComma(expenseDetail.electricityBill)}</td>
              </tr>
              <tr>
                <th className="header">수도세</th>
                <td colSpan="4">{addComma(expenseDetail.waterBill)}</td>
              </tr>
              <tr>
                <th className="header">가스비</th>
                <td colSpan="4">{addComma(expenseDetail.gasBill)}</td>
              </tr>
              <tr>
                <th className="header">알바비</th>
                <td colSpan="4">{addComma(expenseDetail.partTimeSalary)}</td>
              </tr>
              <tr>
                <th className="header">총 금액</th>
                <td colSpan="4">{addComma(expenseDetail.totalExpenseCost)}</td> {/* 총금액 컬럼명으로 바꿔놓기 */}
              </tr>
              <tr>
                <th className="header">비고</th>
                <td colSpan="4">{expenseDetail.expenseRemark}</td>
              </tr>
            </tbody>
          </table>
          <div className="formButtons">
            {
              members.memberRole === 'a' && (expenseDetail.expenseReportStatus === 'N' &&
                <>
                  <button onClick={handleApproval}>승인</button>
                  <button onClick={handleRejection}>반려</button>
                </>
              )
            }
            <button onClick={handleClose}>닫기</button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default ExpenseDetail;