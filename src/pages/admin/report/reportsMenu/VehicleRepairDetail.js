import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {callDetailVehicleRepairAPI} from '../../../../apis/ReportAPICalls';
import './BranchSalesDetail.css';

function VehicleRepairDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const vehicleRepairDetail = useSelector(state => state.detailVehicleRepairReducer);

  useEffect(() => {
    dispatch(callDetailVehicleRepairAPI({
        vehicleReportCode: params.vehicleReportCode
    }));
  }, [dispatch, params.vehicleReportCode]);

  console.log('여까지 왔어?')
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
                <td colSpan="2"></td>
              </tr>
              <tr>
                <th>차량번호</th>
                <td></td>
                <th>제출일</th>
                <td colSpan="3">{new Date(vehicleRepairDetail.vehicleSubmissionDate).toLocaleDateString()}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th rowSpan="8" className="vertical-header">내용</th>
                <th className="header">종류</th>
                <td colSpan="4"></td>
              </tr>
              <tr>
                <th className="header">총 금액</th>
                <td colSpan="4"></td>
              </tr>
              <tr>
                <th className="header">수리전 사진</th>
                <td colSpan="4">{vehicleRepairDetail.vehiclePhoto}</td>
              </tr>
              <tr>
                <th className="header">수리후 사진</th>
                <td colSpan="4">{vehicleRepairDetail.vehiclePhoto}</td>
              </tr>
              <tr>
                <th className="header">특이사항</th>
                <td colSpan="4">{vehicleRepairDetail.vehicleRemark}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    
  );
}

console.log('여기는 왔니...?')
export default VehicleRepairDetail;