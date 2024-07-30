import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { calldetailBranchSalesAPI } from '../../../../apis/ReportAPICalls';
import axios from 'axios';
import './BranchSalesDetail.css';
import jwtDecode from 'jwt-decode';

function BranchSalesDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const branchSalesDetail = useSelector(state => state.detailBranchSalesReducer);
  const members = jwtDecode(window.localStorage.getItem('accessToken'));
  const navigate = useNavigate();

  console.log('members page', members);

  useEffect(() => {
    dispatch(calldetailBranchSalesAPI({
      branchReportCode: params.branchReportCode
    }));
  }, [dispatch, params.branchReportCode]);

  const handleClose = () => {
    navigate('/company/paper/reports', { state: { activeTable: '매출' } });
  };

  const handleApproval = async () => {
    try {
      await axios.put(`/paper/company/reports/approve/${params.branchReportCode}`);
      alert('승인되었습니다.');
      navigate('/company/paper/reports', { state: { activeTable: '매출' } });
    } catch (error) {
      console.error('승인에 실패하였습니다.', error);
      alert('승인에 실패하였습니다.');
    }
  };

  const handleRejection = async () => {
    try {
      await axios.put(`/paper/company/reports/reject/${params.branchReportCode}`);
      alert('반려되었습니다.');
      navigate('/company/paper/reports', { state: { activeTable: '매출' } });
    } catch (error) {
      console.error('반려에 실패하였습니다.', error);
      alert('반려에 실패하였습니다.');
    }
  };

  return (
    <div className="branchDetail_menu1_layout">
      <div className="branchDetail_flex_wrap">
        <div className="details-container">
          <h1 className="title">매출보고서 상세보기</h1>
          <table className="details-table">
            <thead>
              <tr>
                <th>양식명</th>
                <td colSpan="2">{branchSalesDetail.branchReportCode}</td>
                <th>지점장명</th>
                <td colSpan="2">{branchSalesDetail.memberName}</td>
              </tr>
              <tr>
                <th>지점명</th>
                <td>{branchSalesDetail.branchName}</td>
                <th>제출일</th>
                <td colSpan="3">{new Date(branchSalesDetail.branchSubmissionDate).toLocaleDateString()}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th rowSpan="8" className="vertical-header">내용</th>
                <th className="header">세제</th>
                <td colSpan="4">{branchSalesDetail.detergent}</td>
              </tr>
              <tr>
                <th className="header">섬유유연제</th>
                <td colSpan="4">{branchSalesDetail.fabricSoftener}</td>
              </tr>
              <tr>
                <th className="header">표백제</th>
                <td colSpan="4">{branchSalesDetail.bleach}</td>
              </tr>
              <tr>
                <th className="header">얼룩제거제</th>
                <td colSpan="4">{branchSalesDetail.stainRemover}</td>
              </tr>
              <tr>
                <th className="header">세탁조 클리너</th>
                <td colSpan="4">{branchSalesDetail.washerCleaner}</td>
              </tr>
              <tr>
                <th className="header">건조기시트</th>
                <td colSpan="4">{branchSalesDetail.dryerSheet}</td>
              </tr>
              <tr>
                <th className="header">오프라인매출</th>
                <td colSpan="4">{branchSalesDetail.officeSales}</td>
              </tr>
              <tr>
                <th className="header">총 금액</th>
                <td colSpan="4">{branchSalesDetail.totalBranchSalesCost}</td>  {/* 총금액 컬럼으로 바꿔놓기 */}
              </tr>
            </tbody>
          </table>
          <div className="formButtons">
            {
              members.memberRole === 'a' && (
                <>
                  <button onClick={handleApproval}>승인</button>
                  <button onClick={handleRejection}>반려</button>
                </>
              )
            }
            <button onClick={handleClose}>닫기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BranchSalesDetail;