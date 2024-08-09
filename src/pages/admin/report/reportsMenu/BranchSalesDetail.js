import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
// import styles from './BranchSalesDetail.module.css';
import styles from './BranchSalesDetail.module.css'
function BranchSalesDetail({ selectedReport, setSelectedReport }) {
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
      await axios.put(`/paper/company/reports/approve/${selectedReport.branchReportCode}`);
      alert('승인되었습니다.');
      setSelectedReport(prev => ({
        ...prev,
        branchReportStatus: 'Y'
      }));
    } catch (error) {
      console.error('승인에 실패하였습니다.', error);
      alert('승인에 실패하였습니다.');
    }
  };

  const handleRejection = async () => {
    try {
      await axios.put(`/paper/company/reports/reject/${selectedReport.branchReportCode}`);
      alert('반려되었습니다.');
      setSelectedReport(prev => ({
        ...prev,
        branchReportStatus: 'R'
      }));
    } catch (error) {
      console.error('반려에 실패하였습니다.', error);
      alert('반려에 실패하였습니다.');
    }
  };

  return (
    <div className={styles.detailsContainer}>
      <h1 className={styles.title}>매출보고서 상세보기</h1>
      <table className={styles.detailsTable}>
        <thead>
          <tr>
            <th>양식명</th>
            <td colSpan="2">{selectedReport.branchReportCode}</td>
            <th>지점장명</th>
            <td colSpan="2">{selectedReport.memberName}</td>
          </tr>
          <tr>
            <th>지점명</th>
            <td>{selectedReport.branchName}</td>
            <th>제출일</th>
            <td colSpan="3">{new Date(selectedReport.branchSubmissionDate).toLocaleDateString()}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th rowSpan="8" className={styles.verticalHeader}>내용</th>
            <th className={styles.header}>세제</th>
            <td colSpan="4">{addComma(selectedReport.detergent)}</td>
          </tr>
          <tr>
            <th className={styles.header}>섬유유연제</th>
            <td colSpan="4">{addComma(selectedReport.fabricSoftener)}</td>
          </tr>
          <tr>
            <th className={styles.header}>표백제</th>
            <td colSpan="4">{addComma(selectedReport.bleach)}</td>
          </tr>
          <tr>
            <th className={styles.header}>얼룩제거제</th>
            <td colSpan="4">{addComma(selectedReport.stainRemover)}</td>
          </tr>
          <tr>
            <th className={styles.header}>세탁조 클리너</th>
            <td colSpan="4">{addComma(selectedReport.washerCleaner)}</td>
          </tr>
          <tr>
            <th className={styles.header}>건조기시트</th>
            <td colSpan="4">{addComma(selectedReport.dryerSheet)}</td>
          </tr>
          <tr>
            <th className={styles.header}>오프라인매출</th>
            <td colSpan="4">{addComma(selectedReport.officeSales)}</td>
          </tr>
          <tr>
            <th className={styles.header}>총 금액</th>
            <td colSpan="4">{addComma(selectedReport.totalBranchSalesCost)}</td>
          </tr>
          <tr>
            <th className={styles.header}>비고</th>
            <td colSpan="4">{selectedReport.branchSalesRemark}</td>
          </tr>
        </tbody>
      </table>
      <div className={styles.formButtons}>
        {members.memberRole === 'a' && selectedReport.branchReportStatus === 'N' && (
          <>
            <button onClick={handleApproval}>승인</button>
            <button onClick={handleRejection}>반려</button>
          </>
        )}
        <button onClick={handleClose}>닫기</button>
      </div>
    </div>
  );
}

export default BranchSalesDetail;
