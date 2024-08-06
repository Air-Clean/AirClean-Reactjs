import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { callDetailVehicleRepairAPI } from '../../../../apis/ReportAPICalls';
import './BranchSalesDetail.css';
import jwtDecode from 'jwt-decode';
import axios from 'axios';

function VehicleRepairDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const vehicleRepairDetail = useSelector(state => state.detailVehicleRepairReducer);
  const members = jwtDecode(window.localStorage.getItem('accessToken'));
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(callDetailVehicleRepairAPI({
      vehicleReportCode: params.vehicleReportCode
    }));
  }, [dispatch, params.vehicleReportCode]);

  const handleClose = () => {
    navigate('/company/paper/reports', { state: { activeTable: '차량수리비' } });
  };

  const handleApproval = async () => {
    try {
      await axios.put(`/paper/company/reports/vehicleRepairApprove/${params.vehicleReportCode}`);
      alert('승인되었습니다.');
      dispatch(callDetailVehicleRepairAPI({
        vehicleReportCode: params.vehicleReportCode
      }));
      navigate('/company/paper/reports', { state: { activeTable: '차량수리비' } });
    } catch (error) {
      console.error('승인에 실패하였습니다.', error);
      alert('승인에 실패하였습니다.');
    }
  };

  const handleRejection = async () => {
    try {
      await axios.put(`/paper/company/reports/vehicleRepairReject/${params.vehicleReportCode}`);
      alert('반려되었습니다.');
      dispatch(callDetailVehicleRepairAPI({
        vehicleReportCode: params.vehicleReportCode
      }));
      navigate('/company/paper/reports', { state: { activeTable: '차량수리비' } });
    } catch (error) {
      console.error('반려에 실패하였습니다.', error);
      alert('반려에 실패하였습니다.');
    }
  };

    // 이미지 URL을 형성하는 함수
    const getBeforeImageUrl = (beforeVehiclePhoto) => {
      return `http://localhost:8080/memberimgs/${beforeVehiclePhoto}`; // 이미지가 저장된 경로로 변경
    };
  

    // 이미지 URL을 형성하는 함수
    const getAfterImageUrl = (afterVehiclePhoto) => {
      return `http://localhost:8080/memberimgs/${afterVehiclePhoto}`; // 이미지가 저장된 경로로 변경
    };


  return (
    <div className="branchDetail_menu1_layout">
      <div className="branchDetail_flex_wrap">
        <div className="details-container">
          <h1 className="title">차량수리보고서 상세보기</h1>
          <table className="details-table">
            <thead>
              <tr>
                <th>양식명</th>
                <td colSpan="2">{vehicleRepairDetail.vehicleReportCode}</td>
                <th>차량기사</th>
                <td colSpan="2">{vehicleRepairDetail.memberName}</td>
              </tr>
              <tr>
                <th>차량번호</th>
                <td>{vehicleRepairDetail.carNumber}</td>
                <th>제출일</th>
                <td colSpan="3">{new Date(vehicleRepairDetail.vehicleSubmissionDate).toLocaleDateString()}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th rowSpan="8" className="vertical-header">내용</th>
                <th className="header">종류</th>
                <td colSpan="4">{vehicleRepairDetail.vehicleType}</td>
              </tr>
              <tr>
                <th className="header">총 금액</th>
                <td colSpan="4">{vehicleRepairDetail.totalVehicleRepairCost}</td>
              </tr>
              <tr>
                <th className="header">수리전 사진</th>
                <td colSpan="4">
                  {vehicleRepairDetail.beforeVehiclePhoto && (
                    <img 
                      src={getBeforeImageUrl(vehicleRepairDetail.beforeVehiclePhoto)} 
                      alt="Before Repair" 
                      style={{ width: '250px', height: 'auto' }}
                    />
                  )}
                </td>
              </tr>
              <tr>
                <th className="header">수리후 사진</th>
                <td colSpan="4">
                  {vehicleRepairDetail.afterVehiclePhoto && (
                    <img 
                      src={getAfterImageUrl(vehicleRepairDetail.afterVehiclePhoto)} 
                      alt="After Repair" 
                      style={{ width: '250px', height: 'auto' }}
                    />
                  )}
                </td>
              </tr>
              <tr>
                <th className="header">특이사항</th>
                <td colSpan="4">{vehicleRepairDetail.vehicleRemark}</td>
              </tr>
            </tbody>
          </table>
          <div className="formButtons">
            {members.memberRole === 'a' && ( vehicleRepairDetail.vehicleReportStatus === 'N' &&
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

export default VehicleRepairDetail;