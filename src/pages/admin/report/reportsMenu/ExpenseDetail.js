import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import './BranchSalesDetail.css';

function ExpenseDetail({ selectedReport, setSelectedReport }) {
  const members = jwtDecode(window.localStorage.getItem('accessToken'));
  const navigate = useNavigate();

  const addComma = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };


  // const addComma = (price) => {
  //   return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  // };

  const handleClose = () => {
    setSelectedReport(null);
  };

  const handleApproval = async () => {
    try {
      await axios.put(`/paper/company/reports/expenseApprove/${selectedReport.expenseReportCode}`);
      alert('승인되었습니다.');
      // 상태 업데이트 추가
      setSelectedReport(prev => ({
        ...prev,
        expenseReportStatus: 'Y'
      }));
    } catch (error) {
      console.error('승인에 실패하였습니다.', error);
      alert('승인에 실패하였습니다.');
    }
  };

  const handleRejection = async () => {
    try {
      await axios.put(`/paper/company/reports/expenseReject/${selectedReport.expenseReportCode}`);
      alert('반려되었습니다.');
      // 상태 업데이트 추가
      setSelectedReport(prev => ({
        ...prev,
        expenseReportStatus: 'R'
      }));
    } catch (error) {
      console.error('반려에 실패하였습니다.', error);
      alert('반려에 실패하였습니다.');
    }
  };

  return (
    <div className="branchDetail_menu1_layout">
      <div className="branchDetail_flex_wrap">
        <div className="details-container">
          <h1 className="title">지출보고서 상세보기</h1>
          <table className="details-table">
            <thead>
              <tr>
                <th>양식명</th>
                <td colSpan="2">{selectedReport.expenseReportCode}</td>
                <th>지점장명</th>
                <td colSpan="2">{selectedReport.memberName}</td>
              </tr>
              <tr>
                <th>지점명</th>
                <td>{selectedReport.branchName}</td>
                <th>제출일</th>
                <td colSpan="3">{new Date(selectedReport.expenseSubmissionDate).toLocaleDateString()}</td>
                <th>지출 달</th>
                <td>{selectedReport.monthDate}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th rowSpan="8" className="vertical-header">내용</th>
                <th className="header">전기세</th>
                <td colSpan="4">{addComma(selectedReport.electricityBill)}</td>
              </tr>
              <tr>
                <th className="header">수도세</th>
                <td colSpan="4">{addComma(selectedReport.waterBill)}</td>
              </tr>
              <tr>
                <th className="header">가스비</th>
                <td colSpan="4">{addComma(selectedReport.gasBill)}</td>
              </tr>
              <tr>
                <th className="header">알바비</th>
                <td colSpan="4">{addComma(selectedReport.partTimeSalary)}</td>
              </tr>
              <tr>
                <th className="header">총 금액</th>
                <td colSpan="4">{addComma(selectedReport.totalExpenseCost)}</td> {/* 총금액 컬럼명으로 바꿔놓기 */}
              </tr>
              <tr>
                <th className="header">비고</th>
                <td colSpan="4">{selectedReport.expenseRemark}</td>              
              </tr>
            </tbody>
          </table>
          <div className="formButtons">
            {members.memberRole === 'a' && selectedReport.expenseReportStatus === 'N' && (
              <>
                <button onClick={handleApproval}>승인</button>
                <button onClick={handleRejection}>반려</button>
              </>
            )}
            <button onClick={handleClose}>닫기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseDetail;

