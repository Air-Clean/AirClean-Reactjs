import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { callUpdateRepairAPI, callDeleteRepairAPI } from '../../../../apis/ReportAPICalls';
import { useDropzone } from 'react-dropzone';
import styles from './LocationRepairDetail.module.css';
import jwtDecode from 'jwt-decode';

function LocationRepairDetail({ selectedReport, setSelectedReport, reloadData }) {
    const dispatch = useDispatch();
    const members = jwtDecode(window.localStorage.getItem('accessToken'));
    const [isEditMode, setIsEditMode] = useState(false);
    const [repairImagePreview, setRepairImagePreview] = useState(null);

    const [formData, setFormData] = useState({
        repairReportCode: '',
        repairReportStatus: '',
        repairContent: '',
        facilityType: '',
        facilityCount: '',
        repairPhoto: ''
    });

    useEffect(() => {
        if (selectedReport) {
            setFormData({
                repairReportCode: selectedReport.repairReportCode,
                repairReportStatus: selectedReport.repairReportStatus,
                repairContent: selectedReport.repairContent,
                facilityCount: selectedReport.facilityCount,
                facilityType: selectedReport.facilityType,
                repairPhoto: selectedReport.repairPhoto
            });
            setRepairImagePreview(selectedReport.repairPhoto ? getRepairImageUrl(selectedReport.repairPhoto) : null);
        }
    }, [selectedReport]);

    const handleEditClick = () => { 
        setIsEditMode(true);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSaveClick = async () => {
        const form = new FormData();

        form.append('repairReportCode', formData.repairReportCode);
        form.append('repairReportStatus', formData.repairReportStatus);
        form.append('repairContent', formData.repairContent);
        form.append('facilityCount', formData.facilityCount);
        form.append('facilityType', formData.facilityType);
        if (formData.repairPhoto) {
            form.append('repairImages', formData.repairPhoto);
        }

        const updateRepairResult = await dispatch(callUpdateRepairAPI({ repairReportCode: formData.repairReportCode, data: form }));
        setIsEditMode(false);
        if (updateRepairResult.ok) {
            alert('수정이 완료되었습니다.');
            setSelectedReport({
                ...selectedReport,
                ...formData,
                repairPhoto: formData.repairPhoto.name ? formData.repairPhoto.name : formData.repairPhoto
            });
            reloadData();
        } else {
            alert('수정에 실패하였습니다.');
        }
    };

    const handleDeleteClick = async () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            const deleteRepairResult = await dispatch(callDeleteRepairAPI({ repairReportCode: formData.repairReportCode }));
            if (deleteRepairResult.ok) {
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

    const onDropRepairPhoto = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];
            setFormData(form => ({
                ...form,
                repairPhoto: file,
            }));
            setRepairImagePreview(URL.createObjectURL(file));
        },
        []
    );

    const { getRootProps: getRepairImagesRootProps, getInputProps: getRepairImagesInputProps } = useDropzone({
        onDrop: onDropRepairPhoto,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png"]
        }
    });

    const getRepairImageUrl = (repairPhoto) => {
        return `http://${process.env.REACT_APP_RESTAPI_IP}:8080/memberimgs/${repairPhoto}`;
    };

    return (
        <div className={styles.branchDetail_menu1_layout}>
            <div className={styles.branchDetail_flex_wrap}>
                <div className={styles.detailsContainer}>
                    <h1 className={styles.title}>수리보고서 상세보기</h1>
                    <table className={styles.detailsTable}>
                        <thead>
                            <tr>
                                <th>양식명</th>
                                <td colSpan="2">{selectedReport.repairReportCode}</td>
                                <th>지점장명</th>
                                <td colSpan="2">{selectedReport.memberName}</td>
                            </tr>
                            <tr>
                                <th>지점명</th>
                                <td>{selectedReport.branchName}</td>
                                <th>제출일</th>
                                <td colSpan="3">{new Date(selectedReport.repairSubmissionDate).toLocaleDateString()}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th rowSpan="8" className={styles.verticalHeader}>내용</th>
                                <th className={styles.header}>종류</th>
                                <td colSpan="4">
                                    {isEditMode ? 
                                        <input 
                                            type='text' 
                                            name='facilityType'
                                            value={formData.facilityType || ''}
                                            onChange={handleInputChange}
                                        /> 
                                        : selectedReport.facilityType}
                                </td>
                            </tr>
                            <tr>
                                <th className={styles.header}>수리 시설물 갯수</th>
                                <td colSpan="4">{isEditMode ? 
                                    <input 
                                        type='text' 
                                        name='facilityCount'
                                        value={formData.facilityCount || ''}
                                        onChange={handleInputChange}
                                    /> 
                                    : selectedReport.facilityCount}
                                </td>
                            </tr>
                            <tr>
                                <th className={styles.header}>내용</th>
                                <td colSpan="4">{isEditMode ? 
                                    <input 
                                        type='text' 
                                        name='repairContent'
                                        value={formData.repairContent || ''}
                                        onChange={handleInputChange}
                                    /> 
                                    : selectedReport.repairContent}
                                </td>
                            </tr>
                            <tr>
                                <th className={styles.header}>첨부 사진</th>
                                <td colSpan="4">
                                    {isEditMode ? (
                                        <div {...getRepairImagesRootProps()}>
                                            <input {...getRepairImagesInputProps()} />
                                            {repairImagePreview ? (
                                                <img src={repairImagePreview} alt="Preview" style={{ maxWidth: '100%', height: 'auto' }} />
                                            ) : (
                                                <p>이미지를 드래그하거나 클릭하여 업로드하세요</p>
                                            )}
                                        </div>
                                    ) : (
                                        selectedReport.repairPhoto && (
                                            <img src={getRepairImageUrl(selectedReport.repairPhoto)} alt="Repair" style={{ maxWidth: '100%', height: 'auto' }} />
                                        )
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={styles.formButtons}>
                        {selectedReport.repairReportStatus === "N" ? (
                            <>
                                {isEditMode ? (
                                    <>
                                        <button onClick={handleSaveClick}>저장</button>
                                        <button onClick={() => setIsEditMode(false)}>취소</button>
                                    </>
                                ) : (
                                    <>
                                        <button onClick={handleEditClick}>수정</button>
                                        <button onClick={handleDeleteClick}>삭제</button>
                                    </>
                                )}
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

export default LocationRepairDetail;
