import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import styles from './ExpenseDetail.module.css'; // 기존 CSS 모듈 사용

function ExpenseDetail({ selectedReport, setSelectedReport, reloadData }) {
  const members = jwtDecode(window.localStorage.getItem('accessToken'));
  const navigate = useNavigate();

  const addComma = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleClose = () => {
    setSelectedReport(null);
  };

  const handleApproval = async () => {
    try {
      await axios.put(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/paper/company/reports/expenseApprove/${selectedReport.expenseReportCode}`);
      alert('승인되었습니다.');
      setSelectedReport(prev => ({
        ...prev,
        expenseReportStatus: 'Y'
      }));
      reloadData();
    } catch (error) {
      console.error('승인에 실패하였습니다.', error);
      alert('승인에 실패하였습니다.');
    }
  };

  const handleRejection = async () => {
    try {
      await axios.put(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/paper/company/reports/expenseReject/${selectedReport.expenseReportCode}`);
      alert('반려되었습니다.');
      setSelectedReport(prev => ({
        ...prev,
        expenseReportStatus: 'R'
      }));
      reloadData();
    } catch (error) {
      console.error('반려에 실패하였습니다.', error);
      alert('반려에 실패하였습니다.');
    }
  };

  return (
    <div className={styles.detailsContainer}>
      <h1 className={styles.title}>지출보고서 상세보기</h1>
      <table className={styles.detailsTable}>
        <thead>
          <tr>
            <th className={styles.formNameHeader}>보고서 번호</th>
            <td className={styles.formNameData}>{selectedReport.expenseReportCode}</td>
            <th className={styles.branchManagerHeader}>지점장명</th>
            <td className={styles.branchManagerData} colSpan="2">{selectedReport.memberName}</td>
          </tr>
          <tr>
            <th className={styles.branchNameHeader}>지점명</th>
            <td className={styles.branchNameData}>{selectedReport.branchName}</td>
            <th className={styles.submissionDateHeader}>제출일</th>
            <td className={styles.submissionDateData} colSpan="3">{new Date(selectedReport.expenseSubmissionDate).toLocaleDateString()}</td>
          </tr>
          <tr>
            <th className={styles.monthDateHeader}>지출 달</th>
            <td className={styles.monthDateData} colSpan="5">{selectedReport.monthDate}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th rowSpan="8" className={styles.verticalHeader}>내용</th>
            <th className={styles.header}>전기세</th>
            <td colSpan="4">{addComma(selectedReport.electricityBill)}</td>
          </tr>
          <tr>
            <th className={styles.header}>수도세</th>
            <td colSpan="4">{addComma(selectedReport.waterBill)}</td>
          </tr>
          <tr>
            <th className={styles.header}>가스비</th>
            <td colSpan="4">{addComma(selectedReport.gasBill)}</td>
          </tr>
          <tr>
            <th className={styles.header}>알바비</th>
            <td colSpan="4">{addComma(selectedReport.partTimeSalary)}</td>
          </tr>
          <tr>
            <th className={styles.header}>총 금액</th>
            <td colSpan="4">{addComma(selectedReport.totalExpenseCost)}</td>
          </tr>
          <tr>
            <th className={styles.header}>비고</th>
            <td colSpan="4">{selectedReport.expenseRemark}</td>
          </tr>
        </tbody>
      </table>
      <div className={styles.formButtons}>
        {members.memberRole === 'a' && selectedReport.expenseReportStatus === 'N' && (
          <>
            <button className={styles.approveButton} onClick={handleApproval}>승인</button>
            <button className={styles.rejectButton} onClick={handleRejection}>반려</button>
          </>
        )}
        <button className={styles.closeButton} onClick={handleClose}>닫기</button>
      </div>
    </div>
  );
}

export default ExpenseDetail;
