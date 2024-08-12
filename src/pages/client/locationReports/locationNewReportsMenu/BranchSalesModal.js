import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import styles from './BranchSalesModal.module.css';
import { callNewBranchSalesAPI } from "../../../../apis/ReportAPICalls";

function BranchSalesModal({ show, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [minDate, setMinDate] = useState('');
  const branch = JSON.parse(window.localStorage.getItem('branch'));
  const member = jwt_decode(window.localStorage.getItem('accessToken'));
  const [form, setForm] = useState({
    branchReportStatus: 'N',
    branchSubmissionDate: '',
    officeSales: '',
    detergent: '',
    fabricSoftener: '',
    bleach: '',
    stainRemover: '',
    washerCleaner: '',
    dryerSheet: '',
    totalBranchSalesCost: '',
    branchName: branch.branchName,
    memberName: member.memberName,
    branchCode: branch.branchCode,
    branchSalesRemark: ''
  });

  const [totalCost, setTotalCost] = useState(0);


  // 쉼표 추가 함수
  const addComma = (price) => {
    let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnString;
  }

  useEffect(() => {
    setForm({
      branchReportStatus: 'N',
      branchSubmissionDate: '',
      officeSales: '',
      detergent: '',
      fabricSoftener: '',
      bleach: '',
      stainRemover: '',
      washerCleaner: '',
      dryerSheet: '',
      totalBranchSalesCost: '',
      branchName: branch.branchName,
      memberName: member.memberName,
      branchCode: branch.branchCode,
      branchSalesRemark: ''
    });
  }, [show, branch.branchName, member.memberName, branch.branchCode]);

  useEffect(() => {
    const calculateTotalSales = () => {
      const total =
        (parseFloat(form.officeSales.replace(/,/g, '')) || 0) +
        (parseFloat(form.detergent.replace(/,/g, '')) || 0) +
        (parseFloat(form.fabricSoftener.replace(/,/g, '')) || 0) +
        (parseFloat(form.bleach.replace(/,/g, '')) || 0) +
        (parseFloat(form.stainRemover.replace(/,/g, '')) || 0) +
        (parseFloat(form.washerCleaner.replace(/,/g, '')) || 0) +
        (parseFloat(form.dryerSheet.replace(/,/g, '')) || 0);
      setTotalCost(total);
    };
    calculateTotalSales();
  }, [form]);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setMinDate(formattedDate);
  }, []);

  if (!show) {
    return null;
  }

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm(prevForm => ({
      ...prevForm,
      [id]: id === 'branchSalesRemark' ? value : value.replace(/,/g, '') 
    }));
  }

  const handleSubmit = () => {
    const data = {
      ...form,
      totalBranchSalesCost: totalCost,
    };

    dispatch(callNewBranchSalesAPI(data));
    alert('등록이 완료되었습니다');
    onClose();
    navigate('/location/paper/myReports', {state: {activeTable: '매출'}});
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>매출 보고서</h2>
        <div className={styles.formContainer}>
          <div className={styles.formGroup}>
            <label htmlFor="branchName">지점명</label>
            <input
              type='text'
              id="branchName"
              value={form.branchName}
              readOnly
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="memberName">지점장명</label>
            <input
              type='text'
              id="memberName"
              value={form.memberName}
              readOnly
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="officeSales">일 매출</label>
            <input
              type='text'
              id="officeSales"
              placeholder='일매출을 입력해주세요'
              value={addComma(form.officeSales) || ''}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="detergent">세제</label>
            <input
              type='text'
              id="detergent"
              placeholder='오늘의 세제 매출을 입력해주세요'
              value={addComma(form.detergent) || ''}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="fabricSoftener">섬유유연제</label>
            <input
              type='text'
              id="fabricSoftener"
              placeholder='오늘의 섬유유연제 매출을 입력해주세요'
              value={addComma(form.fabricSoftener) || ''}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="bleach">표백제</label>
            <input
              type='text'
              id="bleach"
              placeholder='오늘의 표백제 매출을 입력해주세요'
              value={addComma(form.bleach) || ''}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="stainRemover">얼룩제거제</label>
            <input
              type='text'
              id="stainRemover"
              placeholder='오늘의 얼룩제거제 매출을 입력해주세요'
              value={addComma(form.stainRemover) || ''}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="washerCleaner">세탁조 클리너</label>
            <input
              type='text'
              id="washerCleaner"
              placeholder='오늘의 세탁조클리너 매출을 입력해주세요'
              value={addComma(form.washerCleaner) || ''}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="dryerSheet">건조기 시트</label>
            <input
              type='text'
              id="dryerSheet"
              placeholder='오늘의 건조기시트 매출을 입력해주세요'
              value={addComma(form.dryerSheet) || ''}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="totalCost">총 매출</label>
            <input
              type='text'
              id="totalCost"
              value={addComma(totalCost) || ''}
              readOnly
            />
          </div>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label htmlFor="submissionDate">제출일</label>
            <input 
              type="date" 
              id="submissionDate"
              min={minDate}
              value={minDate}
              readOnly
            />
          </div>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label htmlFor="branchSalesRemark">비고</label>
            <textarea 
              id="branchSalesRemark"
              placeholder="특이사항을 입력하세요" 
              value={form.branchSalesRemark}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className={styles.formButtons}>
          <button className={styles.submitButton} onClick={handleSubmit}>등록</button>
          <button className={styles.closeButton} onClick={onClose}>닫기</button>
        </div>
      </div>
    </div>
  );
}

export default BranchSalesModal;
