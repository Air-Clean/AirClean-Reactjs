import React, { useEffect, useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { callNewRepairAPI } from '../../../../apis/ReportAPICalls';
import styles from './RepairModal.module.css'; // CSS 모듈 임포트
import jwt_decode from 'jwt-decode';

function RepairModal({ show, onClose }) {
    const dispatch = useDispatch();
    const navigate =useNavigate();
    const [minDate, setMinDate] = useState('');
    const branch = JSON.parse(window.localStorage.getItem('branch'));
    const member = jwt_decode(window.localStorage.getItem('accessToken'));
    const [form, setForm] = useState({
        repairSubmissionDate: '',
        repairContent: '',
        facilityCount: '',
        facilityType: '',
        repairPhoto: '',
        repairReportStatus: 'N',
        branchName: branch.branchName,
        memberName: member.memberName,
        branchCode: branch.branchCode
    });

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('repairSubmissionDate', minDate);
        formData.append('repairContent', form.repairContent);
        formData.append('facilityCount', form.facilityCount);
        formData.append('facilityType', form.facilityType);
        formData.append('repairImage', form.repairPhoto);
        formData.append('repairReportStatus', form.repairReportStatus);
        formData.append('branchName', form.branchName);
        formData.append('memberName', form.memberName);
        formData.append('branchCode', form.branchCode);
        const newRepairResult = await dispatch(callNewRepairAPI({ form: formData }));
        if (newRepairResult.ok) {
            alert('등록이 완료되었습니다!');
            onClose();
            navigate('/location/paper/myReports', {state: {activeTable: '시설물수리'}});
        } else {
            alert('등록에 실패하였습니다. 다시 시도해주세요.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setMinDate(formattedDate);
    }, []);

    useEffect(() => {
        setForm({
            repairReportStatus: 'N',
            repairSubmissionDate: '',
            repairContent: '',
            facilityCount: '',
            facilityType: '',
            repairPhoto: '',
            branchName: branch.branchName,
            memberName: member.memberName,
            branchCode: branch.branchCode
        });
    }, [show, branch.branchName, member.memberName, branch.branchCode]);

    const onDropImage = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        setForm(form => ({
            ...form,
            repairPhoto: file,
            repairImagePreview: URL.createObjectURL(file)
        }));
    }, []); 

    const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } = useDropzone({
        onDrop: onDropImage,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png"]
        }
    });

    if (!show) {
        return null;
    }

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>시설물수리 보고서</h2>
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
                    <label htmlFor="repairSubmissionDate">제출일</label>
                    <input 
                        type="date" 
                        id="repairSubmissionDate"
                        name="repairSubmissionDate"
                        value={minDate}
                        readOnly
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="facilityType">종류</label>
                    <select
                        id="facilityType"
                        name="facilityType"
                        value={form.facilityType}
                        onChange={handleChange}
                    >
                        <option value="">종류 선택</option>
                        <option value="세탁기">세탁기</option>
                        <option value="건조기">건조기</option>
                        <option value="드라이클리너">드라이클리너</option>
                    </select>
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="facilityCount">수리 시설물 갯수</label>
                    <p className={styles.requiredText}>" 필수적으로 입력해주세요. "</p>
                    <input
                        type='number'
                        id="facilityCount"
                        name="facilityCount"
                        value={form.facilityCount}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="repairContent">내용</label>
                    <p className={styles.requiredText}>" 필수적으로 입력해주세요. "</p>
                    <textarea
                        id="repairContent"
                        name="repairContent"
                        placeholder='수리가 필요한 내용을 자세하게 입력해주세요.'
                        value={form.repairContent}
                        onChange={handleChange}
                    />
                </div>
                <div className={styles.formGroup}>
                    <label htmlFor="repairPhoto">사진</label>
                    <div {...getImageRootProps({ className: styles.dropzone })}>
                        <input {...getImageInputProps()} />
                        {form.repairImagePreview ? (
                            <img src={form.repairImagePreview} alt="Repair" />
                        ) : (
                            <p>여기에 파일을 드래그하거나 클릭하여 업로드</p>
                        )}
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

export default RepairModal;
