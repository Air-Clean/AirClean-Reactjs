import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { callDetailVehicleRepairAPI } from '../../../../apis/ReportAPICalls';
import styles from './VehicleRepairDetail.module.css';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

function VehicleRepairDetail({ selectedReport, setSelectedReport, reloadData }) {
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
      reloadData();
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
      reloadData();
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

  const formatDate = (dateString) => {
    if (!dateString) return 'Invalid Date';
    const date = new Date(dateString);
    return isNaN(date) ? 'Invalid Date' : date.toLocaleDateString();
  };

  const [isBeforeImageLoaded, setIsBeforeImageLoaded] = useState(false);
  const [isAfterImageLoaded, setIsAfterImageLoaded] = useState(false);

  useEffect(() => {
    setIsBeforeImageLoaded(false);
    setIsAfterImageLoaded(false);
  }, [selectedReport.beforeVehiclePhoto, selectedReport.afterVehiclePhoto]);

  useEffect(() => {
    if (selectedReport) {
      console.log('Selected Report:', selectedReport);
    }
  }, [selectedReport]);

  if (!selectedReport) return null; // selectedReport가 없는 경우 아무것도 렌더링하지 않음

  return (
    <div className={styles.detailsContainer}>
      <h1 className={styles.title}>차량수리보고서 상세보기</h1>
      <table className={styles.detailsTable}>
        <thead>
          <tr>
            <th className={styles.formNameHeader}>보고서 번호</th>
            <td className={styles.formNameData}>{selectedReport.vehicleReportCode}</td>
            <th className={styles.driverNameHeader}>차량기사</th>
            <td className={styles.driverNameData}>{selectedReport.memberName}</td>
          </tr>
          <tr>
            <th className={styles.carNumberHeader}>차량번호</th>
            <td className={styles.carNumberData}>{selectedReport.carNumber}</td>
            <th className={styles.submissionDateHeader}>제출일</th>
            <td className={styles.submissionDateData} colSpan="3">{formatDate(selectedReport.vehicleSubmissionDate)}</td>
          </tr>
          <tr>
            <th className={styles.reportDateHeader}>영수증 날짜</th>
            <td className={styles.reportDate} colSpan="5">{formatDate(selectedReport.vehicleReportDate)}</td>
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
              {selectedReport.beforeVehiclePhoto ? (
                <>
                  {!isBeforeImageLoaded && <span>로딩중...</span>}
                  <img 
                    src={getBeforeImageUrl(selectedReport.beforeVehiclePhoto)} 
                    alt="Before Repair" 
                    style={{ width: '200px', height: 'auto', display: isBeforeImageLoaded ? 'block' : 'none' }}
                    onLoad={() => setIsBeforeImageLoaded(true)}
                  />
                </>
              ) : (
                <span>사진 없음</span>
              )}
            </td>
          </tr>
          <tr>
            <th className={styles.header}>수리후 사진</th>
            <td colSpan="4">
              {selectedReport.afterVehiclePhoto ? (
                <>
                  {!isAfterImageLoaded && <span>로딩중...</span>}
                  <img 
                    src={getAfterImageUrl(selectedReport.afterVehiclePhoto)} 
                    alt="After Repair" 
                    style={{ width: '200px', height: 'auto', display: isAfterImageLoaded ? 'block' : 'none' }}
                    onLoad={() => setIsAfterImageLoaded(true)}
                  />
                </>
              ) : (
                <span>사진 없음</span>
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
            <button className={styles.approveButton} onClick={handleApproval}>승인</button>
            <button className={styles.rejectButton} onClick={handleRejection}>반려</button>
          </>
        )}
        <button className={styles.closeButton} onClick={handleClose}>닫기</button>
      </div>
    </div>
  );
}

export default VehicleRepairDetail;
