import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { calldetailBranchSalesAPI, callUpdateBranchSalesAPI } from '../../../../apis/ReportAPICalls';
// import axios from 'axios';
import '../../../admin/report/reportsMenu/BranchSalesDetail.css';

import jwtDecode from 'jwt-decode';

function LocationBranchSalesDetail() {
  const params = useParams();
  const dispatch = useDispatch();
  const branchSalesDetail = useSelector(state => state.detailBranchSalesReducer);
  const navigate = useNavigate();
  const members = jwtDecode(window.localStorage.getItem('accessToken'));
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  
  console.log('members page', members);

  useEffect(() => {
    dispatch(calldetailBranchSalesAPI({
      branchReportCode: params.branchReportCode
    }));
  }, [dispatch, params.branchReportCode]);

  useEffect(() => {
    if (branchSalesDetail) {
        setFormData(prevFormData => ({
            ...prevFormData,
            branchReportCode: branchSalesDetail.branchReportCode,
            branchReportStatus: branchSalesDetail.branchReportStatus,
            officeSales: branchSalesDetail.officeSales,
            detergent: branchSalesDetail.detergent,
            fabricSoftener: branchSalesDetail.fabricSoftener,
            bleach: branchSalesDetail.bleach,
            stainRemover: branchSalesDetail.stainRemover,
            washerCleaner: branchSalesDetail.washerCleaner,
            dryerSheet: branchSalesDetail.dryerSheet,
            totalBranchSalesCost: branchSalesDetail.totalBranchSalesCost
        }));
    }
  }, [branchSalesDetail]);

  useEffect(() => {
    if (isEditMode) {
      const totalCost = 
        parseFloat((formData.detergent || '0').replace(/,/g, '')) +
        parseFloat((formData.fabricSoftener || '0'). replace(/,/g, '')) +
        parseFloat((formData.bleach || '0'). replace(/,/g, '')) +
        parseFloat((formData.stainRemover || '0'). replace(/,/g, '')) +
        parseFloat((formData.washerCleaner || '0'). replace(/,/g, '')) +
        parseFloat((formData.dryerSheet || '0'). replace(/,/g, '')) +
        parseFloat((formData.officeSales || '0'). replace(/,/g, ''));
      setFormData(prevFormData => ({
        ...prevFormData,
        totalBranchSalesCost: totalCost.toString()
      }));
    }
  }, [
    formData.detergent,
    formData.fabricSoftener,
    formData.bleach,
    formData.stainRemover,
    formData.washerCleaner,
    formData.dryerSheet,
    formData.officeSales,
    isEditMode
  ]);

  const handleEditClick = () => { 
    setIsEditMode(true);
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // const numericValue = value.replace(/,/g, ''); 
    setFormData({
        ...formData,
        [name]: value
    });
  }

  const handleSaveClick = async () => {
    const updateBranchSalesResult = await dispatch(callUpdateBranchSalesAPI({branchReportCode: formData.branchReportCode, data: formData}));
    setIsEditMode(false);
    if(updateBranchSalesResult.ok){
      alert('수정이 완료되었습니다.');
      dispatch(calldetailBranchSalesAPI({
        branchReportCode: params.branchReportCode
      }));
    } else {
      alert('수정에 실패하였습니다.');
    }
  }

  const handleClose = () => {
    navigate('/location/paper/myReports/', { state: { activeTable: '매출' } });
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
                <td colSpan="4">
                  {isEditMode ? 
                    <input 
                      type='text' 
                      name='detergent'
                      value={formData.detergent || ''}
                      onChange={handleInputChange}
                    /> 
                    : branchSalesDetail.detergent}
                </td>
              </tr>
              <tr>
                <th className="header">섬유유연제</th>
                <td colSpan="4">{isEditMode ? 
                    <input 
                      type='text' 
                      name='fabricSoftener'
                      value={formData.fabricSoftener || ''}
                      onChange={handleInputChange}
                    /> 
                    : branchSalesDetail.fabricSoftener}
                </td>
              </tr>
              <tr>
                <th className="header">표백제</th>
                <td colSpan="4">{isEditMode ? 
                    <input 
                      type='text' 
                      name='bleach'
                      value={formData.bleach || ''}
                      onChange={handleInputChange}
                    /> 
                    : branchSalesDetail.bleach}
                </td>
              </tr>
              <tr>
                <th className="header">얼룩제거제</th>
                <td colSpan="4">{isEditMode ? 
                    <input 
                      type='text' 
                      name='stainRemover'
                      value={formData.stainRemover || ''}
                      onChange={handleInputChange}
                    /> 
                    : branchSalesDetail.stainRemover}
                </td>
              </tr>
              <tr>
                <th className="header">세탁조 클리너</th>
                <td colSpan="4">{isEditMode ? 
                    <input 
                      type='text' 
                      name='washerCleaner'
                      value={formData.washerCleaner || ''}
                      onChange={handleInputChange}
                    /> 
                    : branchSalesDetail.washerCleaner}
                </td>
              </tr>
              <tr>
                <th className="header">건조기시트</th>
                <td colSpan="4">{isEditMode ? 
                    <input 
                      type='text' 
                      name='dryerSheet'
                      value={formData.dryerSheet || ''}
                      onChange={handleInputChange}
                    /> 
                    : branchSalesDetail.dryerSheet}
                </td>
              </tr>
              <tr>
                <th className="header">오프라인매출</th>
                <td colSpan="4">{isEditMode ? 
                    <input 
                      type='text' 
                      name='officeSales'
                      value={formData.officeSales || ''}
                      onChange={handleInputChange}
                    /> 
                    : branchSalesDetail.officeSales}
                </td>
              </tr>
              <tr>
                <th className="header">총 금액</th>
                <td colSpan="4">{isEditMode ? 
                    <input 
                      type='text' 
                      name='totalBranchSalesCost'
                      value={parseFloat(formData.totalBranchSalesCost || '0').toLocaleString()}
                      onChange={handleInputChange}
                    /> 
                    : parseFloat(branchSalesDetail.totalBranchSalesCost || '0').toLocaleString()}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="formButtons">
            {branchSalesDetail.branchReportStatus === "접수" ? (
              <>
                {isEditMode ? (
                  <button onClick={handleSaveClick}>저장</button>
                ) : (
                  <button onClick={handleEditClick}>수정</button>
                )}
                <button>삭제</button>
                <button onClick={handleClose}>닫기</button>
              </>
            ) : (
              <button onClick={handleClose}>닫기</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationBranchSalesDetail;