import React, { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { callCarMembersAPI, callNewVehicleRepairAPI } from "../../../../apis/ReportAPICalls";
import styles from "./ReportsModal.module.css";

function ReportsModal({ show, onClose }) {
  const dispatch = useDispatch();

  const [minDate, setMinDate] = useState('');
  const carMembers = useSelector(state => state.carMembersReducer);
  const [selectedCarNumber, setSelectedCarNumber] = useState('');
  const [selectedDriverName, setSelectedDriverName] = useState('');
  const [selectedDriverLicenseNumber, setSelectedDriverLicenseNumber] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const [form, setForm] = useState({
    vehicleReportStatus: 'N',
    vehicleRemark: '',
    vehicleFuelCost: '',
    vehicleRegularInspection: '',
    vehicleVehicleRepairCost: '',
    vehicleMiscellaneous: '',
    vehicleSubmissionDate: '',
    driverLicenseNumber: '',
    totalVehicleRepairCost: '',
    beforeVehiclePhoto: '',
    afterVehiclePhoto: '',
    vehicleType: ''
  });

  useEffect(() => {
    setForm({
      vehicleReportStatus: 'N',
      vehicleRemark: '',
      vehicleFuelCost: '',
      vehicleRegularInspection: '',
      vehicleVehicleRepairCost: '',
      vehicleMiscellaneous: '',
      vehicleSubmissionDate: '',
      driverLicenseNumber: '',
      totalVehicleRepairCost: '',
      beforeVehiclePhoto: '',
      afterVehiclePhoto: '',
      vehicleType: ''
    });
    setSelectedDriverName('');
    setSelectedDriverLicenseNumber('');
  }, [show]);

  useEffect(() => {
    if (show) {
      dispatch(callCarMembersAPI());
    }
  }, [dispatch, show]);

  useEffect(() => {
    const selectedCar = carMembers.find(car => car.carNumber === selectedCarNumber);
    setSelectedDriverName(selectedCar ? selectedCar.memberName : '');
    setSelectedDriverLicenseNumber(selectedCar ? selectedCar.driverLicenseNumber : '');
  }, [selectedCarNumber, carMembers]);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setMinDate(formattedDate);
  }, []);

  const addComma = (price) => {
    let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnString;
  }

  const removeComma = (price) => {
    return price?.toString().replace(/,/g, '');
  }

  const inputHandler = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === 'vehicleSubmissionDate' ? value : addComma(value.replace(/,/g, ''));
    setForm({ ...form, [name]: formattedValue });

    if (name === 'totalVehicleRepairCost') {
      switch (selectedType) {
        case '주유비':
          setForm(prevForm => ({ ...prevForm, vehicleFuelCost: formattedValue }));
          break;
        case '수리비':
          setForm(prevForm => ({ ...prevForm, vehicleVehicleRepairCost: formattedValue }));
          break;
        case '정기점검':
          setForm(prevForm => ({ ...prevForm, vehicleRegularInspection: formattedValue }));
          break;
        case '기타':
          setForm(prevForm => ({ ...prevForm, vehicleMiscellaneous: formattedValue }));
          break;
        default:
          break;
      }
    }
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setForm({ ...form, vehicleType: e.target.value });
  };

  const onDropBeforeImage = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setForm(form => ({
        ...form,
        beforeVehiclePhoto: file,
        beforeImagePreview: URL.createObjectURL(file)
      }));
    },
    []
  );

  const onDropAfterImage = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setForm(form => ({
        ...form,
        afterVehiclePhoto: file,
        afterImagePreview: URL.createObjectURL(file)
      }));
    },
    []
  );

  const { getRootProps: getBeforeImageRootProps, getInputProps: getBeforeImageInputProps } = useDropzone({
    onDrop: onDropBeforeImage,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"]
    }
  });

  const { getRootProps: getAfterImageRootProps, getInputProps: getAfterImageInputProps } = useDropzone({
    onDrop: onDropAfterImage,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"]
    }
  });

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('vehicleReportStatus', form.vehicleReportStatus);
    formData.append('vehicleRemark', form.vehicleRemark);
    formData.append('vehicleFuelCost', Number(removeComma(form.vehicleFuelCost)));
    formData.append('vehicleRegularInspection', Number(removeComma(form.vehicleRegularInspection)));
    formData.append('vehicleVehicleRepairCost', Number(removeComma(form.vehicleVehicleRepairCost)));
    formData.append('vehicleMiscellaneous', Number(removeComma(form.vehicleMiscellaneous)));
    formData.append('vehicleSubmissionDate', form.vehicleSubmissionDate);
    formData.append('driverLicenseNumber', selectedDriverLicenseNumber); // 수정된 부분
    formData.append('totalVehicleRepairCost', Number(removeComma(form.totalVehicleRepairCost)));
    formData.append('memberName', selectedDriverName);
    formData.append('carNumber', selectedCarNumber);
    formData.append('vehicleType', form.vehicleType);
    formData.append('beforeImage', form.beforeVehiclePhoto);
    formData.append('afterImage', form.afterVehiclePhoto);

    const newVehicleRepairResult = await dispatch(callNewVehicleRepairAPI({ form: formData }));
    if (newVehicleRepairResult.ok) {
      alert('등록이 완료되었습니다!');
      onClose();
    } else {
      alert('등록에 실패하였습니다. 다시 시도해주세요.');
    }
  };

  if (!show) {
    return null;
  }

  return (
    <div className={styles.modalBackdrop} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <h2 className={styles.modalTitle} >차량 수리비 보고서</h2>
        <div className={styles.formContainer}>
          <div className={styles.formGroup}>
            <label htmlFor="carNumber">차량번호</label>
            <select
              name="carNumber"
              id="carNumber"
              value={selectedCarNumber}
              onChange={e => setSelectedCarNumber(e.target.value)}
            >
              <option value="">차량번호를 선택해주세요</option>
              {carMembers.map(car => (
                <option key={car.carNumber} value={car.carNumber}>
                  {car.carNumber}
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="selectedDriverName">차량기사</label>
            <input
              type="text"
              name="selectedDriverName"
              id="selectedDriverName"
              value={selectedDriverName}
              readOnly
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="vehicleType">종류</label>
            <select
              name="vehicleType"
              id="vehicleType"
              value={selectedType}
              onChange={handleTypeChange}
            >
              <option value="">종류 선택</option>
              <option value="주유비">주유비</option>
              <option value="수리비">수리비</option>
              <option value="정기점검">정기점검</option>
              <option value="기타">기타</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="totalVehicleRepairCost">총 금액</label>
            <input
              type="text"
              name="totalVehicleRepairCost"
              id="totalVehicleRepairCost"
              value={addComma(form.totalVehicleRepairCost)}
              onChange={inputHandler}
              placeholder="총 금액을 입력해주세요"
            />
          </div>
          <div className={`${styles.formGroup} ${styles.fullWidth}`}>
            <label htmlFor="vehicleSubmissionDate">제출일</label>
            <input
              type="date"
              name="vehicleSubmissionDate"
              id="vehicleSubmissionDate"
              min={minDate}
              value={form.vehicleSubmissionDate}
              onChange={inputHandler}
            />
          </div>
          <div className={styles.photoContainer}>
            <div className={styles.formGroup}>
              <label htmlFor="beforeVehiclePhoto">수리 사진 전</label>
              <div {...getBeforeImageRootProps()} className="dropzone">
                <input {...getBeforeImageInputProps()} />
                {form.beforeImagePreview ? (
                  <img src={form.beforeImagePreview} alt="Before Preview" style={{ width: '100%' }} />
                ) : (
                  <p>이미지를 드롭하거나 클릭하여 업로드</p>
                )}
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="afterVehiclePhoto">수리 사진 후</label>
              <div {...getAfterImageRootProps()} className="dropzone">
                <input {...getAfterImageInputProps()} />
                {form.afterImagePreview ? (
                  <img src={form.afterImagePreview} alt="After Preview" style={{ width: '100%' }} />
                ) : (
                  <p>이미지를 드롭하거나 클릭하여 업로드</p>
                )}
              </div>
            </div>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="vehicleRemark">특이사항</label>
            <textarea
              name="vehicleRemark"
              id="vehicleRemark"
              value={form.vehicleRemark}
              onChange={inputHandler}
              placeholder="특이사항을 입력하세요"
            />
          </div>
        </div>
        <div className={styles.formButtons}>
          <button className={styles.register_button} onClick={handleSubmit}>
            등록
          </button>
          <button className={styles.create_button} onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
}

export default ReportsModal;
