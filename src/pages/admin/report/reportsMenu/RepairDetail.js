import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
// import styles from './RepairDetail.module.css';
import styles from './Repair.module.css'
function RepairDetail({ selectedReport, setSelectedReport, reloadData }) { // reloadData 추가
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
      await axios.put(`/paper/company/reports/repairApprove/${selectedReport.repairReportCode}`);
      alert('승인되었습니다.');
      setSelectedReport(prev => ({
        ...prev,
        repairReportStatus: 'Y'
      }));
      reloadData(); // reloadData 호출
    } catch (error) {
      console.error('승인에 실패하였습니다.', error);
      alert('승인에 실패하였습니다.');
    }
  };

  const handleRejection = async () => {
    try {
      await axios.put(`/paper/company/reports/repairReject/${selectedReport.repairReportCode}`);
      alert('반려되었습니다.');
      setSelectedReport(prev => ({
        ...prev,
        repairReportStatus: 'R'
      }));
      reloadData(); // reloadData 호출
    } catch (error) {
      console.error('반려에 실패하였습니다.', error);
      alert('반려에 실패하였습니다.');
    }
  };

  const getRepairImageUrl = (repairPhoto) => {
    const url = `http://localhost:8080/memberimgs/${repairPhoto}`;
    console.log("url", url)
    return url;
  };

  return (
    <div className={styles.detailsContainer}>
      <h1 className={styles.title}>시설물수리보고서 상세보기</h1>
      <table className={styles.detailsTable}>
        <thead>
          <tr>
            <th className={styles.formNameHeader}>보고서 번호</th>
            <td className={styles.formNameData}>{selectedReport.repairReportCode}</td>
            <th className={styles.branchNameHeader}>지점명</th>
            <td className={styles.branchNameData} colSpan="2">{selectedReport.branchName}</td>
          </tr>
          <tr>
            <th className={styles.memberNameHeader}>지점장명</th>
            <td className={styles.memberNameData}>{selectedReport.memberName}</td>
            <th className={styles.submissionDateHeader}>제출일</th>
            <td className={styles.submissionDateData} colSpan="3">{new Date(selectedReport.repairSubmissionDate).toLocaleDateString()}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th rowSpan="8" className={styles.verticalHeader}>내용</th>
          </tr>
          <tr>
            <th className={styles.header}>종류</th>
            <td colSpan="4">{selectedReport.facilityType}</td>
          </tr>
          <tr>
            <th className={styles.header}>수리 시설물 갯수</th>
            <td colSpan="4">{selectedReport.facilityCount}</td>
          </tr>
          <tr>
            <th className={styles.header}>수리 내용</th>
            <td colSpan="4">{selectedReport.repairContent}</td>
          </tr>
          <tr>
            <th className={styles.header}>첨부 사진</th>
            <td colSpan="4">
              {selectedReport.repairPhoto && (
                <img 
                  src={getRepairImageUrl(selectedReport.repairPhoto)} 
                  alt='Repair'
                  className={styles.repairImage}
                />
              )}
            </td>
          </tr>
        </tbody>
      </table>
      <div className={styles.formButtons}>
        {members.memberRole === 'a' && selectedReport.repairReportStatus === 'N' && (
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

export default RepairDetail;
