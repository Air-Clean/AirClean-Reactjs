import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { calldetailBranchSalesAPI, callUpdateBranchSalesAPI, callDeleteBranchSalesAPI } from '../../../../apis/ReportAPICalls';
import '../../../admin/report/reportsMenu/BranchSalesDetail.css';

import jwtDecode from 'jwt-decode';

function LocationBranchSalesDetail() {
    const params = useParams();
    const dispatch = useDispatch();
    const branchSalesDetail = useSelector(state => state.detailBranchSalesReducer);
    const navigate = useNavigate();
    const members = jwtDecode(window.localStorage.getItem('accessToken'));
    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({
        detergent: '0',
        fabricSoftener: '0',
        bleach: '0',
        stainRemover: '0',
        washerCleaner: '0',
        dryerSheet: '0',
        officeSales: '0',
        totalBranchSalesCost: '0',
        branchSalesRemark: '',
        memberName: '',
        branchName: '',
        branchReportCode: '',
        branchReportStatus: ''
    });
        
    
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
                officeSales: branchSalesDetail.officeSales?.toString() || '0',
                detergent: branchSalesDetail.detergent?.toString() || '0',
                fabricSoftener: branchSalesDetail.fabricSoftener?.toString() || '0',
                bleach: branchSalesDetail.bleach?.toString() || '0',
                stainRemover: branchSalesDetail.stainRemover?.toString() || '0',
                washerCleaner: branchSalesDetail.washerCleaner?.toString() || '0',
                dryerSheet: branchSalesDetail.dryerSheet?.toString() || '0',
                totalBranchSalesCost: branchSalesDetail.totalBranchSalesCost?.toString() || '0',
                branchSalesRemark: branchSalesDetail.branchSalesRemark || '' // 비고 필드 추가
            }));
        }
    }, [branchSalesDetail]);

    const addComma = (price) => {
        let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return returnString;
    }

    useEffect(() => {
        if (isEditMode) {
            const totalCost = 
                parseFloat((formData.detergent || '0').replace(/,/g, '')) +
                parseFloat((formData.fabricSoftener || '0').replace(/,/g, '')) +
                parseFloat((formData.bleach || '0').replace(/,/g, '')) +
                parseFloat((formData.stainRemover || '0').replace(/,/g, '')) +
                parseFloat((formData.washerCleaner || '0').replace(/,/g, '')) +
                parseFloat((formData.dryerSheet || '0').replace(/,/g, '')) +
                parseFloat((formData.officeSales || '0').replace(/,/g, ''));
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
        setFormData({
            ...formData,
            [name]: name === 'branchSalesRemark' ? value : value.replace(/,/g, '') // 쉼표 제거
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

    const handleDeleteClick = async () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            const deleteBranchSalesResult = await dispatch(callDeleteBranchSalesAPI({branchReportCode: formData.branchReportCode}));
            if (deleteBranchSalesResult.ok) {
                alert('삭제가 완료되었습니다.');
                navigate('/location/paper/myReports/', { state: { activeTable: '매출' } });
            } else {
                alert('삭제에 실패하였습니다.');
            }
        }
    };

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
                                            value={addComma(formData.detergent) || ''}
                                            onChange={handleInputChange}
                                        /> 
                                    : addComma(branchSalesDetail.detergent)}
                                </td>
                            </tr>
                            <tr>
                                <th className="header">섬유유연제</th>
                                <td colSpan="4">{isEditMode ? 
                                    <input 
                                        type='text' 
                                        name='fabricSoftener'
                                        value={addComma(formData.fabricSoftener) || ''}
                                        onChange={handleInputChange}
                                    /> 
                                : addComma(branchSalesDetail.fabricSoftener)}
                                </td>
                            </tr>
                            <tr>
                                <th className="header">표백제</th>
                                <td colSpan="4">{isEditMode ? 
                                    <input 
                                        type='text' 
                                        name='bleach'
                                        value={addComma(formData.bleach) || ''}
                                        onChange={handleInputChange}
                                    /> 
                                : addComma(branchSalesDetail.bleach)}
                                </td>
                            </tr>
                            <tr>
                                <th className="header">얼룩제거제</th>
                                <td colSpan="4">{isEditMode ? 
                                    <input 
                                        type='text' 
                                        name='stainRemover'
                                        value={addComma(formData.stainRemover) || ''}
                                        onChange={handleInputChange}
                                    /> 
                                : addComma(branchSalesDetail.stainRemover)}
                                </td>
                            </tr>
                            <tr>
                                <th className="header">세탁조 클리너</th>
                                <td colSpan="4">{isEditMode ? 
                                    <input 
                                        type='text' 
                                        name='washerCleaner'
                                        value={addComma(formData.washerCleaner) || ''}
                                        onChange={handleInputChange}
                                    /> 
                                : addComma(branchSalesDetail.washerCleaner)}
                                </td>
                            </tr>
                            <tr>
                                <th className="header">건조기시트</th>
                                <td colSpan="4">{isEditMode ? 
                                    <input 
                                        type='text' 
                                        name='dryerSheet'
                                        value={addComma(formData.dryerSheet) || ''}
                                        onChange={handleInputChange}
                                    /> 
                                : addComma(branchSalesDetail.dryerSheet)}
                                </td>
                            </tr>
                            <tr>
                                <th className="header">오프라인매출</th>
                                <td colSpan="4">{isEditMode ? 
                                    <input 
                                        type='text' 
                                        name='officeSales'
                                        value={addComma(formData.officeSales) || ''}
                                        onChange={handleInputChange}
                                    /> 
                                : addComma(branchSalesDetail.officeSales)}
                                </td>
                            </tr>
                            <tr>
                                <th className="header">총 금액</th>
                                <td colSpan="4">{isEditMode ? 
                                    <input 
                                        type='text' 
                                        name='totalBranchSalesCost'
                                        value={addComma(formData.totalBranchSalesCost) || ''}
                                        onChange={handleInputChange}
                                    /> 
                                : addComma(branchSalesDetail.totalBranchSalesCost)}
                                                            </td>
                        </tr>
                        <tr>
                            <th className="header">비고</th>
                            <td colSpan="4">{isEditMode ? 
                                <input 
                                    type='text' 
                                    name='branchSalesRemark'
                                    value={formData.branchSalesRemark || ''}
                                    onChange={handleInputChange}
                                /> 
                            : branchSalesDetail.branchSalesRemark}
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="formButtons">
                    {branchSalesDetail.branchReportStatus === "N" ? (
                    <>
                        {isEditMode ? (
                        <button onClick={handleSaveClick}>저장</button>
                        ) : (
                        <button onClick={handleEditClick}>수정</button>
                        )}
                        <button onClick={handleDeleteClick}>삭제</button>
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