import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import './BranchSalesDetail.css';

function RepairDetail({ selectedReport, setSelectedReport }) {
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
      // 상태 업데이트 추가
      setSelectedReport(prev => ({
        ...prev,
        repairReportStatus: 'Y'
      }));
    } catch (error) {
      console.error('승인에 실패하였습니다.', error);
      alert('승인에 실패하였습니다.');
    }
  };

  const handleRejection = async () => {
    try {
      await axios.put(`/paper/company/reports/repairReject/${selectedReport.repairReportCode}`);
      alert('반려되었습니다.');
      // 상태 업데이트 추가
      setSelectedReport(prev => ({
        ...prev,
        repairReportStatus: 'R'
      }));
    } catch (error) {
      console.error('반려에 실패하였습니다.', error);
      alert('반려에 실패하였습니다.');
    }
  };

  const getRepairImageUrl = (repairPhoto) => {
    return `http://localhost:8080/memberimgs/${repairPhoto}`;
  };

  return (
    <div className="branchDetail_menu1_layout">
      <div className="branchDetail_flex_wrap">
        <div className="details-container">
          <h1 className="title">시설물수리보고서 상세보기</h1>
          <table className="details-table">
            <thead>
              <tr>
                <th>양식명</th>
                <td colSpan="2">{selectedReport.repairReportCode}</td>
                <th>지점명</th>
                <td colSpan="2">{selectedReport.branchName}</td>
              </tr>
              <tr>
                <th>지점장명</th>
                <td>{selectedReport.memberName}</td>
                <th>제출일</th>
                <td colSpan="3">{new Date(selectedReport.repairSubmissionDate).toLocaleDateString()}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th rowSpan="8" className="vertical-header">내용</th>
                <th className="header">종류</th>
                <td colSpan="4">{selectedReport.facilityType}</td>
              </tr>
              <tr>
                <th className="header">수리 시설물 갯수</th>
                <td colSpan="4">{selectedReport.facilityCount}</td>
              </tr>
              <tr>
                <th className="header">내용</th>
                <td colSpan="4">{selectedReport.repairContent}</td>
              </tr>
              <tr>
                <th className="header">첨부 사진</th>
                <td colSpan="4">{selectedReport.repairPhoto && (
                  <img 
                    src={getRepairImageUrl(selectedReport.repairPhoto)} 
                    alt='Repair'
                    style={{ width: '500px', height: 'auto' }} 
                  />
                )}</td>
              </tr>
            </tbody>
          </table>
          <div className="formButtons">
            {members.memberRole === 'a' && selectedReport.repairReportStatus === 'N' && (
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

export default RepairDetail;
