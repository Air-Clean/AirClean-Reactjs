import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { callUpdateExpenseAPI, callDeleteExpenseAPI } from '../../../../apis/ReportAPICalls';
import styles from './LocationExpenseDetail.module.css';
import jwtDecode from 'jwt-decode';

function LocationExpenseDetail({ selectedReport, setSelectedReport, reloadData }) {
  const dispatch = useDispatch();
  const members = jwtDecode(window.localStorage.getItem('accessToken'));
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    expenseReportCode: '',
    expenseReportStatus: '',
    electricityBill: '0',
    waterBill: '0',
    gasBill: '0',
    partTimeSalary: '0',
    repairCost: '0',
    totalExpenseCost: '0',
    memberName: '',
    branchName: '',
    expenseSubmissionDate: '',
    monthDate: '',
    expenseRemark: ''
  });

  useEffect(() => {
    if (selectedReport) {
      setFormData({
        expenseReportCode: selectedReport.expenseReportCode || '',
        expenseReportStatus: selectedReport.expenseReportStatus || '',
        electricityBill: selectedReport.electricityBill?.toString() || '0',
        waterBill: selectedReport.waterBill?.toString() || '0',
        gasBill: selectedReport.gasBill?.toString() || '0',
        partTimeSalary: selectedReport.partTimeSalary?.toString() || '0',
        repairCost: selectedReport.repairCost?.toString() || '0',
        totalExpenseCost: selectedReport.totalExpenseCost?.toString() || '0',
        memberName: selectedReport.memberName || '',
        branchName: selectedReport.branchName || '',
        expenseSubmissionDate: selectedReport.expenseSubmissionDate || '',
        monthDate: selectedReport.monthDate || '',
        expenseRemark: selectedReport.expenseRemark || ''
      });
    }
  }, [selectedReport]);

  const addComma = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  useEffect(() => {
    if (isEditMode) {
      const totalCost = 
        parseFloat((formData.electricityBill || '0').replace(/,/g, '')) +
        parseFloat((formData.waterBill || '0').replace(/,/g, '')) +
        parseFloat((formData.gasBill || '0').replace(/,/g, '')) +
        parseFloat((formData.partTimeSalary || '0').replace(/,/g, '')) +
        parseFloat((formData.repairCost || '0').replace(/,/g, ''));
      setFormData(prevFormData => ({
        ...prevFormData,
        totalExpenseCost: totalCost.toString()
      }));
    }
  }, [
    formData.electricityBill,
    formData.waterBill,
    formData.gasBill,
    formData.partTimeSalary,
    formData.repairCost,
    isEditMode
  ]);

  const handleEditClick = () => {
    setIsEditMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === 'expenseRemark' ? value : value.replace(/,/g, '') // 쉼표 제거
    });
  };

  const handleSaveClick = async () => {
    const updateData = {
      ...formData,
      electricityBill: Number(formData.electricityBill.replace(/,/g, '')),
      waterBill: Number(formData.waterBill.replace(/,/g, '')),
      gasBill: Number(formData.gasBill.replace(/,/g, '')),
      partTimeSalary: Number(formData.partTimeSalary.replace(/,/g, '')),
      repairCost: Number(formData.repairCost.replace(/,/g, '')),
      totalExpenseCost: Number(formData.totalExpenseCost.replace(/,/g, '')),
      expenseRemark: formData.expenseRemark
    };

    const updateExpenseResult = await dispatch(callUpdateExpenseAPI({ expenseReportCode: formData.expenseReportCode, data: updateData }));
    setIsEditMode(false);
    if (updateExpenseResult.ok) {
      alert('수정이 완료되었습니다.');
      setSelectedReport({
        ...selectedReport,
        ...formData,
        totalExpenseCost: addComma(formData.totalExpenseCost)
      });
      reloadData();
    } else {
      alert('수정에 실패하였습니다.');
    }
  };

  const handleDeleteClick = async () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      const deleteExpenseResult = await dispatch(callDeleteExpenseAPI({expenseReportCode: formData.expenseReportCode}));
      if (deleteExpenseResult.ok) {
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
          <h1 className={styles.title}>지출보고서 상세보기</h1>
          <table className={styles.detailsTable}>
            <thead>
              <tr>
                <th className={styles.formNameHeader}>보고서 번호</th>
                <td className={styles.formNameData}>{selectedReport.expenseReportCode}</td>
                <th className={styles.branchManagerHeader}>지점장명</th>
                <td colSpan="2" className={styles.branchManagerData}>{selectedReport.memberName}</td>
              </tr>
              <tr>
                <th className={styles.branchNameHeader}>지점명</th>
                <td className={styles.branchNameData}>{selectedReport.branchName}</td>
                <th className={styles.submissionDateHeader}>제출일</th>
                <td className={styles.submissionDateData}>{new Date(selectedReport.expenseSubmissionDate).toLocaleDateString()}</td>
              </tr>
              <tr>
              <th className={styles.monthDateHeader}>지출 달</th>
              <td colSpan="3" className={styles.monthDateData}>{selectedReport.monthDate}</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th rowSpan="8" className={styles.verticalHeader}>내용</th>
                <th className={styles.header}>전기세</th>
                <td colSpan="4">
                  {isEditMode ? 
                    <input 
                      type='text' 
                      name='electricityBill'
                      value={addComma(formData.electricityBill) || ''}
                      onChange={handleInputChange}
                    /> 
                    : addComma(selectedReport.electricityBill)}
                </td>
              </tr>
              <tr>
                <th className={styles.header}>수도세</th>
                <td colSpan="4">{isEditMode ? 
                  <input 
                    type='text' 
                    name='waterBill'
                    value={addComma(formData.waterBill) || ''}
                    onChange={handleInputChange}
                  /> 
                  : addComma(selectedReport.waterBill)}
                </td>
              </tr>
              <tr>
                <th className={styles.header}>가스비</th>
                <td colSpan="4">{isEditMode ? 
                  <input 
                    type='text' 
                    name='gasBill'
                    value={addComma(formData.gasBill) || ''}
                    onChange={handleInputChange}
                  /> 
                  : addComma(selectedReport.gasBill)}
                </td>
              </tr>
              <tr>
                <th className={styles.header}>알바비</th>
                <td colSpan="4">{isEditMode ? 
                  <input 
                    type='text' 
                    name='partTimeSalary'
                    value={addComma(formData.partTimeSalary) || ''}
                    onChange={handleInputChange}
                  /> 
                  : addComma(selectedReport.partTimeSalary)}
                </td>
              </tr>
              <tr>
                <th className={styles.header}>시설물수리비</th>
                <td colSpan="4">{isEditMode ? 
                  <input 
                    type='text' 
                    name='repairCost'
                    value={addComma(formData.repairCost) || ''}
                    onChange={handleInputChange}
                  /> 
                  : addComma(selectedReport.repairCost)}
                </td>
              </tr>
              <tr>
                <th className={styles.header}>총 금액</th>
                <td colSpan="4">{isEditMode ? 
                  <input 
                    type='text' 
                    name='totalExpenseCost'
                    value={addComma(formData.totalExpenseCost) || ''}
                    onChange={handleInputChange}
                  /> 
                  : addComma(selectedReport.totalExpenseCost)}
                </td>
              </tr>
              <tr>
                <th className={styles.header}>비고</th>
                <td colSpan="4">{isEditMode ?
                  <input 
                    type='textarea' 
                    name='expenseRemark'
                    value={formData.expenseRemark || ''}
                    onChange={handleInputChange}
                  /> 
                    : selectedReport.expenseRemark}
                </td>
              </tr>
              </tbody>
          </table>
          <div className={styles.formButtons}>
            {selectedReport.expenseReportStatus === "N" ? (
              <>
                {isEditMode ? (
                  <button className={styles.saveButton} onClick={handleSaveClick}>저장</button>
                ) : (
                  <button className={styles.editButton} onClick={handleEditClick}>수정</button>
                )}
                <button className={styles.deleteButton} onClick={handleDeleteClick}>삭제</button>
                <button className={styles.closeButton} onClick={handleClose}>닫기</button>
              </>
            ) : (
              <button className={styles.closeButton} onClick={handleClose}>닫기</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default LocationExpenseDetail;
