import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import {callDetailRepairAPI} from '../../../../apis/ReportAPICalls';
import './BranchSalesDetail.css';
import jwtDecode from 'jwt-decode';
import axios from 'axios';


function RepairDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const repairDetail = useSelector(state => state.detailRepairReducer);
  const members = jwtDecode(window.localStorage.getItem('accessToken'))
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(callDetailRepairAPI({
        repairReportCode: params.repairReportCode
    }));
  }, [dispatch, params.repairReportCode]);

  const handleClose = () => {
    navigate('/company/paper/reports', { state: { activeTable: '시설물수리' } });
  }

  const handleApproval = async () => {
    try {
      await axios.put(`/paper/company/reports/repairApprove/${params.repairReportCode}`);
      alert('승인되었습니다.');
      navigate('/company/paper/reports', { state: { activeTable: '시설물수리' } });
    } catch (error) {
      console.error('승인에 실패하였습니다.', error);
      alert('승인에 실패하였습니다.');
    }
  };

  const handleRejection = async () => {
    try {
      await axios.put(`/paper/company/reports/repairReject/${params.repairReportCode}`);
      alert('반려되었습니다.');
      navigate('/company/paper/reports', { state: { activeTable: '시설물수리' } });
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
          <h1 className="title">시설물수리보고서 상세보기</h1>
          <table className="details-table">
            <thead>
              <tr>
                <th>양식명</th>
                <td colSpan="2">{repairDetail.repairReportCode}</td>
                <th>지점명</th>
                <td colSpan="2">{repairDetail.branchCode}</td>
              </tr>
              <tr>
                <th>지점장명</th>
                <td></td>
                <th>제출일</th>
                <td colSpan="3">{new Date(repairDetail.repairSubmissionDate).toLocaleDateString()}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th rowSpan="8" className="vertical-header">내용</th>
                <th className="header">종류</th>
                <td colSpan="4">{repairDetail.facilityCode}</td>
              </tr>
              <tr>
                <th className="header">수리 시설물 갯수</th>
                <td colSpan="4">{repairDetail.facilityCount}</td>
              </tr>
              <tr>
                <th className="header">내용</th>
                <td colSpan="4">{repairDetail.repairContent}</td>
              </tr>
            </tbody>
          </table>
          <div className="formButtons">
            {
              members.memberRole === 'a' && 
              (<>
                <button onClick={handleApproval}>승인</button>
                <button onClick={handleRejection}>반려</button>
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
export default RepairDetail;