import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import styles from './ExpenseModal.module.css'; // CSS 모듈 import
import { callNewExpenseAPI, callWaterCost } from "../../../../apis/ReportAPICalls";

function ExpenseModal({ show, onClose }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [minDate, setMinDate] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const branch = JSON.parse(window.localStorage.getItem("branch"));
  const member = jwt_decode(window.localStorage.getItem("accessToken"));
  const [form, setForm] = useState({
    electricityBill: "",
    waterBill: "",
    gasBill: "",
    partTimeSalary: "",
    repairCost: "",
    totalExpenseCost: "",
    expenseReportStatus: "N",
    expenseSubmissionDate: "",
    monthDate: "",
    branchName: branch.branchName,
    memberName: member.memberName,
    branchCode: branch.branchCode,
    expenseRemark: "",
  });


  const waterCost = useSelector(state => state.waterCostReducer);

  useEffect(() => {
    console.log("Water cost updated:", waterCost);
    setForm(prevForm => ({ ...prevForm, waterBill: waterCost.waterCost }));
  }, [waterCost]);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split("T")[0];
    setMinDate(formattedDate);
  }, []);

  useEffect(() => {
    const calculateTotalCost = () => {
      const total =
        (parseFloat(form.electricityBill.replace(/,/g, '')) || 0) +
        (parseFloat(form.waterBill.replace(/,/g, '')) || 0) +
        (parseFloat(form.gasBill.replace(/,/g, '')) || 0) +
        (parseFloat(form.partTimeSalary.replace(/,/g, '')) || 0) +
        (parseFloat(form.repairCost.replace(/,/g, '')) || 0);
      setTotalCost(total);
    };
    calculateTotalCost();
  }, [form]);

  useEffect(() => {
    setForm({
      expenseReportStatus: "N",
      expenseSubmissionDate: "",
      monthDate: "",
      electricityBill: "",
      waterBill: "",
      gasBill: "",
      partTimeSalary: "",
      repairCost: "",
      totalExpenseCost: "",
      branchName: branch.branchName,
      memberName: member.memberName,
      branchCode: branch.branchCode,
      expenseRemark: "",
    });
  }, [show, branch.branchName, member.memberName, branch.branchCode]);

  if (!show) {
    return null;
  }

  const addComma = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'monthDate') {
      dispatch(callWaterCost({ branchCode: branch.branchCode, month: value }));
    }
    
    setForm(prevForm => ({
      ...prevForm,
      [id]: id === 'expenseRemark' ? value : value.replace(/,/g, '')
    }));
  }

  const handleSubmit = () => {
    const data = {
      ...form,
      totalExpenseCost: totalCost,
    };

    dispatch(callNewExpenseAPI(data));
    alert("등록이 완료되었습니다!");
    onClose();
    navigate('/location/paper/myReports', {state: {activeTable: '지출'}});
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>지출 보고서</h2>
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
            <label htmlFor="submissionDate">제출일</label>
            <input
              type='date'
              id="submissionDate"
              min={minDate}
              value={minDate}
              readOnly
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="monthDate">지출 달</label>
            <input
              type='month'
              id="monthDate"
              value={form.monthDate}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="electricityBill">전기세 : </label>
            <input
              type='text'
              id="electricityBill"
              placeholder='이번달 전기세를 입력해주세요.'
              value={addComma(form.electricityBill) || ''}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="waterBill">수도세 : </label>
            <input
              type='text'
              id="waterBill"
              placeholder='이번달 수도세를 입력해주세요.'
              value={addComma(form.waterBill) || ''}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="gasBill">가스비 : </label>
            <input
              type='text'
              id="gasBill"
              placeholder='이번달 가스비를 입력해주세요.'
              value={addComma(form.gasBill) || ''}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="partTimeSalary">알바비 : </label>
            <input
              type='text'
              id="partTimeSalary"
              placeholder='이번달 알바비를 입력해주세요.'
              value={addComma(form.partTimeSalary) || ''}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="repairCost">시설물수리비 : </label>
            <input
              type='text'
              id="repairCost"
              placeholder='이번달 시설물수리비를 입력해주세요.'
              value={addComma(form.repairCost) || ''}
              onChange={handleChange}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="totalCost">총 지출</label>
            <input
              type='text'
              id="totalCost"
              value={addComma(totalCost) || ''}
              readOnly
            />
          </div>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label htmlFor="expenseRemark">비고</label>
            <textarea
              id="expenseRemark"
              placeholder="특이사항을 입력하세요"
              value={form.expenseRemark}
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

export default ExpenseModal;