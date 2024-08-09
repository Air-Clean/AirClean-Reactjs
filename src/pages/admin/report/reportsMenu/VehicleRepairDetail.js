import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callDetailVehicleRepairAPI } from '../../../../apis/ReportAPICalls';
import styles from './VehicleRepairDetail.module.css';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

function VehicleRepairDetail({ selectedReport, setSelectedReport }) {
  const dispatch = useDispatch();
  const members = jwtDecode(window.localStorage.getItem('accessToken'));

  const addComma = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const handleClose = () => {
    setSelectedReport(null);
  };

  const handleApproval = async () => {
    try {
      await axios.put(`/paper/company/reports/vehicleRepairApprove/${selectedReport.vehicleReportCode}`);
      alert('승인되었습니다.');
      setSelectedReport(prev => ({
        ...prev,
        vehicleReportStatus: 'Y'
      }));
    } catch (error) {
      console.error('승인에 실패하였습니다.', error);
      alert('승인에 실패하였습니다.');
    }
  };

  const handleRejection = async () => {
    try {
      await axios.put(`/paper/company/reports/vehicleRepairReject/${selectedReport.vehicleReportCode}`);
      alert('반려되었습니다.');

      setSelectedReport(prev => ({
        ...prev,
        vehicleReportStatus: 'R'
      }));
    } catch (error) {
      console.error('반려에 실패하였습니다.', error);
      alert('반려에 실패하였습니다.');
    }
  };

  const getBeforeImageUrl = (beforeVehiclePhoto) => {
    return `http://localhost:8080/memberimgs/${beforeVehiclePhoto}`;
  };

  const getAfterImageUrl = (afterVehiclePhoto) => {
    return `http://localhost:8080/memberimgs/${afterVehiclePhoto}`;
  };

  return (
    <div className={styles.detailsContainer}>
      <h1 className={styles.title}>차량수리보고서 상세보기</h1>
      <table className={styles.detailsTable}>
        <thead>
          <tr>
            <th>양식명</th>
            <td colSpan="2">{selectedReport.vehicleReportCode}</td>
            <th>차량기사</th>
            <td colSpan="2">{selectedReport.memberName}</td>
          </tr>
          <tr>
            <th>차량번호</th>
            <td>{selectedReport.carNumber}</td>
            <th>제출일</th>
            <td colSpan="3">{new Date(selectedReport.vehicleSubmissionDate).toLocaleDateString()}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th rowSpan="8" className={styles.verticalHeader}>내용</th>
            <th className={styles.header}>종류</th>
            <td colSpan="4">{selectedReport.vehicleType}</td>
          </tr>
          <tr>
            <th className={styles.header}>총 금액</th>
            <td colSpan="4">{addComma(selectedReport.totalVehicleRepairCost)}</td>
          </tr>
          <tr>
            <th className={styles.header}>수리전 사진</th>
            <td colSpan="4">
              {selectedReport.beforeVehiclePhoto && (
                <img 
                  src={getBeforeImageUrl(selectedReport.beforeVehiclePhoto)} 
                  alt="Before Repair" 
                  style={{ width: '250px', height: 'auto' }}
                />
              )}
            </td>
          </tr>
          <tr>
            <th className={styles.header}>수리후 사진</th>
            <td colSpan="4">
              {selectedReport.afterVehiclePhoto && (
                <img 
                  src={getAfterImageUrl(selectedReport.afterVehiclePhoto)} 
                  alt="After Repair" 
                  style={{ width: '250px', height: 'auto' }}
                />
              )}
            </td>
          </tr>
          <tr>
            <th className={styles.header}>특이사항</th>
            <td colSpan="4">{selectedReport.vehicleRemark}</td>
          </tr>
        </tbody>
      </table>
      <div className={styles.formButtons}>
        {members.memberRole === 'a' && (selectedReport.vehicleReportStatus === 'N' &&
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

export default VehicleRepairDetail;
