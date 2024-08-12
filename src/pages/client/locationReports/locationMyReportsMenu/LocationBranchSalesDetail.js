import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { callUpdateBranchSalesAPI, callDeleteBranchSalesAPI } from '../../../../apis/ReportAPICalls';
import styles from './LocationBranchSalesDetail.module.css';
import jwtDecode from 'jwt-decode';

function LocationBranchSalesDetail({ selectedReport, setSelectedReport, reloadData }) {
    const dispatch = useDispatch();
    const members = jwtDecode(window.localStorage.getItem('accessToken'));
    const [isEditMode, setIsEditMode] = useState(false);
    const [formData, setFormData] = useState({
        detergent: selectedReport?.detergent?.toString() || '0',
        fabricSoftener: selectedReport?.fabricSoftener?.toString() || '0',
        bleach: selectedReport?.bleach?.toString() || '0',
        stainRemover: selectedReport?.stainRemover?.toString() || '0',
        washerCleaner: selectedReport?.washerCleaner?.toString() || '0',
        dryerSheet: selectedReport?.dryerSheet?.toString() || '0',
        officeSales: selectedReport?.officeSales?.toString() || '0',
        totalBranchSalesCost: selectedReport?.totalBranchSalesCost?.toString() || '0',
        branchSalesRemark: selectedReport?.branchSalesRemark || '',
        memberName: selectedReport?.memberName || '',
        branchName: selectedReport?.branchName || '',
        branchReportCode: selectedReport?.branchReportCode || '',
        branchReportStatus: selectedReport?.branchReportStatus || ''
    });

    useEffect(() => {
        if (selectedReport) {
            setFormData({
                branchReportCode: selectedReport.branchReportCode,
                branchReportStatus: selectedReport.branchReportStatus,
                officeSales: selectedReport.officeSales?.toString() || '0',
                detergent: selectedReport.detergent?.toString() || '0',
                fabricSoftener: selectedReport.fabricSoftener?.toString() || '0',
                bleach: selectedReport.bleach?.toString() || '0',
                stainRemover: selectedReport.stainRemover?.toString() || '0',
                washerCleaner: selectedReport.washerCleaner?.toString() || '0',
                dryerSheet: selectedReport.dryerSheet?.toString() || '0',
                totalBranchSalesCost: selectedReport.totalBranchSalesCost?.toString() || '0',
                branchSalesRemark: selectedReport.branchSalesRemark || '' // 비고 필드 추가
            });
        }
    }, [selectedReport]);

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
            setSelectedReport({
                ...selectedReport,
                ...formData,
                totalBranchSalesCost: addComma(formData.totalBranchSalesCost)
            });
            reloadData();
        } else {
            alert('수정에 실패하였습니다.');
        }
    }

    const handleDeleteClick = async () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            const deleteBranchSalesResult = await dispatch(callDeleteBranchSalesAPI({branchReportCode: formData.branchReportCode}));
            if (deleteBranchSalesResult.ok) {
                alert('삭제가 완료되었습니다.');
                reloadData();
                setSelectedReport(null);
            } else {
                alert('삭제에 실패하였습니다.');
            }
        }
    };

    const handleClose = () => {
        setIsEditMode(false);
        setSelectedReport(null);
        reloadData();
    };

    return (
        <div className={styles.branchDetail_menu1_layout}>
            <div className={styles.branchDetail_flex_wrap}>
                <div className={styles.detailsContainer}>
                    <h1 className={styles.title}>매출보고서 상세보기</h1>
                    <table className={styles.detailsTable}>
                        <thead>
                            <tr>
                                <th>양식명</th>
                                <td colSpan="2">{selectedReport.branchReportCode}</td>
                                <th>지점장명</th>
                                <td colSpan="2">{selectedReport.memberName}</td>
                            </tr>
                            <tr>
                                <th>지점명</th>
                                <td>{selectedReport.branchName}</td>
                                <th>제출일</th>
                                <td colSpan="3">{new Date(selectedReport.branchSubmissionDate).toLocaleDateString()}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th rowSpan="8" className={styles.verticalHeader}>내용</th>
                                <th className={styles.header}>세제</th>
                                <td colSpan="4">
                                    {isEditMode ? 
                                    <input 
                                        type='text' 
                                        name='detergent'
                                        value={addComma(formData.detergent) || ''}
                                        onChange={handleInputChange}
                                    /> 
                                    : addComma(selectedReport.detergent)}
                                </td>
                            </tr>
                            <tr>
                                <th className={styles.header}>섬유유연제</th>
                                <td colSpan="4">{isEditMode ? 
                                    <input 
                                    type='text' 
                                    name='fabricSoftener'
                                    value={addComma(formData.fabricSoftener) || ''}
                                    onChange={handleInputChange}
                                    /> 
                                : addComma(selectedReport.fabricSoftener)}
                                </td>
                            </tr>
                            <tr>
                                <th className={styles.header}>표백제</th>
                                <td colSpan="4">{isEditMode ? 
                                    <input 
                                    type='text' 
                                    name='bleach'
                                    value={addComma(formData.bleach) || ''}
                                    onChange={handleInputChange}
                                    /> 
                                : addComma(selectedReport.bleach)}
                                </td>
                            </tr>
                            <tr>
                                <th className={styles.header}>얼룩제거제</th>
                                <td colSpan="4">{isEditMode ? 
                                    <input 
                                    type='text' 
                                    name='stainRemover'
                                    value={addComma(formData.stainRemover) || ''}
                                    onChange={handleInputChange}
                                    /> 
                                : addComma(selectedReport.stainRemover)}
                                </td>
                            </tr>
                            <tr>
                                <th className={styles.header}>세탁조 클리너</th>
                                <td colSpan="4">{isEditMode ? 
                                    <input 
                                    type='text' 
                                    name='washerCleaner'
                                    value={addComma(formData.washerCleaner) || ''}
                                    onChange={handleInputChange}
                                    /> 
                                : addComma(selectedReport.washerCleaner)}
                                </td>
                            </tr>
                            <tr>
                                <th className={styles.header}>건조기시트</th>
                                <td colSpan="4">{isEditMode ? 
                                    <input 
                                    type='text' 
                                    name='dryerSheet'
                                    value={addComma(formData.dryerSheet) || ''}
                                    onChange={handleInputChange}
                                    /> 
                                : addComma(selectedReport.dryerSheet)}
                                </td>
                            </tr>
                            <tr>
                                <th className={styles.header}>오프라인매출</th>
                                <td colSpan="4">{isEditMode ? 
                                    <input 
                                    type='text' 
                                    name='officeSales'
                                    value={addComma(formData.officeSales) || ''}
                                    onChange={handleInputChange}
                                    /> 
                                : addComma(selectedReport.officeSales)}
                                </td>
                            </tr>
                            <tr>
                                <th className={styles.header}>총 금액</th>
                                <td colSpan="4">{isEditMode ? 
                                    <input 
                                    type='text' 
                                    name='totalBranchSalesCost'
                                    value={addComma(formData.totalBranchSalesCost) || ''}
                                    onChange={handleInputChange}
                                    /> 
                                : addComma(selectedReport.totalBranchSalesCost)}
                                </td>
                            </tr>
                            <tr>
                                <th className={styles.header}>비고</th>
                                <td colSpan="4">{isEditMode ? 
                                    <input 
                                    type='text' 
                                    name='branchSalesRemark'
                                    value={formData.branchSalesRemark || ''}
                                    onChange={handleInputChange}
                                    /> 
                                : selectedReport.branchSalesRemark}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={styles.formButtons}>
                        {selectedReport.branchReportStatus === "N" ? (
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
