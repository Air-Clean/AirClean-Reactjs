import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { calldetailBranchSalesAPI } from '../../../../apis/ReportAPICalls';
import './BranchSalesDetail.css';

function BranchSalesDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const branchSalesDetail = useSelector(state => state.detailBranchSalesReducer);

  useEffect(() => {
    dispatch(calldetailBranchSalesAPI({
        branchReportCode: params.branchReportCode
    }));
  }, [dispatch, params.branchReportCode]);

  return (
    <div className="branchDetail_menu1_layout">
      <div className="branchDetail_flex_wrap">
        <div className="details-container">
          <h1 className="title">지출보고서 상세보기</h1>
          <table className="details-table">
            <thead>
              <tr>
                <th>양식명</th>
                <td colSpan="2">{branchSalesDetail.branchReportCode}</td>
                <th>지점장명</th>
                <td colSpan="2"></td>
              </tr>
              <tr>
                <th>지점명</th>
                <td>{branchSalesDetail.branchCode}</td>
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
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default BranchSalesDetail;