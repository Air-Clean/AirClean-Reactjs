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
    const [isLoading, setIsLoading] = useState(false); // 로딩 상태 추가
    const [isImageLoading, setIsImageLoading] = useState(false); // 이미지 로딩 상태 추가

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
            if (selectedReport.repairPhoto) {
                setIsImageLoading(true);
                const img = new Image();
                img.src = getRepairImageUrl(selectedReport.repairPhoto);
                img.onload = () => setIsImageLoading(false);
                setRepairImagePreview(getRepairImageUrl(selectedReport.repairPhoto));
            } else {
                setRepairImagePreview(null);
                setIsImageLoading(false); // 사진이 없을 경우 로딩 상태 해제
            }
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
        setIsLoading(true); // 로딩 상태 시작
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
        setIsLoading(false); // 로딩 상태 종료
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
            setIsLoading(true); // 로딩 상태 시작
            const deleteRepairResult = await dispatch(callDeleteRepairAPI({ repairReportCode: formData.repairReportCode }));
            setIsLoading(false); // 로딩 상태 종료
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
            setIsImageLoading(false); // 이미지가 미리보기에서 즉시 로드되므로 로딩 상태 해제
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
                    {isLoading && <p>로딩중...</p>} {/* 로딩 중 메시지 표시 */}
                    <table className={styles.detailsTable}>
                        <thead>
                            <tr>
                                <th className={styles.formNameHeader}>보고서 번호</th>
                                <td className={styles.formNameData}>{selectedReport.repairReportCode}</td>
                                <th className={styles.branchManagerHeader}>지점장명</th>
                                <td colSpan="2" className={styles.branchManagerData}>{selectedReport.memberName}</td>
                            </tr>
                            <tr>
                                <th className={styles.branchNameHeader}>지점명</th>
                                <td className={styles.branchNameData}>{selectedReport.branchName}</td>
                                <th className={styles.submissionDateHeader}>제출일</th>
                                <td colSpan="3" className={styles.submissionDateData}>{new Date(selectedReport.repairSubmissionDate).toLocaleDateString()}</td>
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
                                        <>
                                            {isImageLoading ? (
                                                <p>로딩중...</p>
                                            ) : (
                                                selectedReport.repairPhoto ? (
                                                    <img src={getRepairImageUrl(selectedReport.repairPhoto)} alt="Repair" style={{ maxWidth: '100%', height: 'auto' }} />
                                                ) : (
                                                    <span>사진 없음</span>
                                                )
                                            )}
                                        </>
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={styles.formButtons}>
                        {!isLoading && selectedReport.repairReportStatus === "N" ? (
                            <>
                                {isEditMode ? (
                                    <>
                                        <button className={styles.saveButton} onClick={handleSaveClick}>저장</button>
                                        <button className={styles.cancelButton} onClick={() => setIsEditMode(false)}>취소</button>
                                    </>
                                ) : (
                                    <>
                                        <button className={styles.editButton} onClick={handleEditClick}>수정</button>
                                        <button className={styles.deleteButton} onClick={handleDeleteClick}>삭제</button>
                                    </>
                                )}
                                <button className={styles.closeButton} onClick={handleClose}>닫기</button>
                            </>
                        ) : (
                            !isLoading && <button className={styles.closeButton} onClick={handleClose}>닫기</button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default LocationRepairDetail;
