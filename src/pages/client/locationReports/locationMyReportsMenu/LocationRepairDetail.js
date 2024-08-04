import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { callDetailRepairAPI, callUpdateRepairAPI, callDeleteRepairAPI } from '../../../../apis/ReportAPICalls';
import { useDropzone } from 'react-dropzone';
import '../../../admin/report/reportsMenu/BranchSalesDetail.css';
import jwtDecode from 'jwt-decode';

const getRepairImageUrl = (repairPhoto) => {
    return `http://${process.env.REACT_APP_RESTAPI_IP}:8080/memberimgs/${repairPhoto}`;
};

function LocationRepairDetail() {
    const params = useParams();
    const dispatch = useDispatch();
    const repairDetail = useSelector(state => state.detailRepairReducer);
    const navigate = useNavigate();
    const members = jwtDecode(window.localStorage.getItem('accessToken'));
    const [isEditMode, setIsEditMode] = useState(false);
    const [repairImagePreview, setRepairImagePreview] = useState(null);

    console.log('members page', members);

    const [formData, setFormData] = useState({
        repairReportCode: '',
        repairReportStatus: '',
        repairContent: '',
        facilityType: '',
        facilityCount: '',
        repairPhoto: ''
    });

    useEffect(() => {
        dispatch(callDetailRepairAPI({
            repairReportCode: params.repairReportCode
        }));
    }, [dispatch, params.repairReportCode]);

    useEffect(() => {
        if (repairDetail) {
            setFormData({
                repairReportCode: repairDetail.repairReportCode,
                repairReportStatus: repairDetail.repairReportStatus,
                repairContent: repairDetail.repairContent,
                facilityCount: repairDetail.facilityCount,
                facilityType: repairDetail.facilityType,
                repairPhoto: repairDetail.repairPhoto
            });
            setRepairImagePreview(repairDetail.repairPhoto ? getRepairImageUrl(repairDetail.repairPhoto) : null);
        }
    }, [repairDetail]);

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
        // if (formData.repairPhoto instanceof File) {
        //     form.append('repairImages', formData.repairPhoto);
        // } else {
        //     form.append('repairImages', new Blob([JSON.stringify(formData.repairPhoto)], { type: 'application/json' }));
        // }
        form.append('repairImages', formData.repairPhoto)

        const updateRepairResult = await dispatch(callUpdateRepairAPI({ repairReportCode: formData.repairReportCode, data: form }));
        setIsEditMode(false);
        if (updateRepairResult.ok) {
            alert('수정이 완료되었습니다.');
            dispatch(callDetailRepairAPI({ repairReportCode: params.repairReportCode }));
        } else {
            alert('수정에 실패하였습니다.');
        }
    };

    const handleDeleteClick = async () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            const deleteRepairResult = await dispatch(callDeleteRepairAPI({ repairReportCode: formData.repairReportCode }));
            if (deleteRepairResult.ok) {
                alert('삭제가 완료되었습니다.');
                navigate('/location/paper/myReports/', { state: { activeTable: '시설물수리' } });
            } else {
                alert('삭제에 실패하였습니다.');
            }
        }
    };

    const handleClose = () => {
        navigate('/location/paper/myReports/', { state: { activeTable: '시설물수리' } });
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

    return (
        <div className="branchDetail_menu1_layout">
            <div className="branchDetail_flex_wrap">
                <div className="details-container">
                    <h1 className="title">수리보고서 상세보기</h1>
                    <table className="details-table">
                        <thead>
                            <tr>
                                <th>양식명</th>
                                <td colSpan="2">{repairDetail.repairReportCode}</td>
                                <th>지점장명</th>
                                <td colSpan="2">{repairDetail.memberName}</td>
                            </tr>
                            <tr>
                                <th>지점명</th>
                                <td>{repairDetail.branchName}</td>
                                <th>제출일</th>
                                <td colSpan="3">{new Date(repairDetail.repairSubmissionDate).toLocaleDateString()}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th rowSpan="8" className="vertical-header">내용</th>
                                <th className="header">종류</th>
                                <td colSpan="4">
                                    {isEditMode ? 
                                        <input 
                                            type='text' 
                                            name='facilityType'
                                            value={formData.facilityType || ''}
                                            onChange={handleInputChange}
                                        /> 
                                        : repairDetail.facilityType}
                                </td>
                            </tr>
                            <tr>
                                <th className="header">수리 시설물 갯수</th>
                                <td colSpan="4">{isEditMode ? 
                                    <input 
                                        type='text' 
                                        name='facilityCount'
                                        value={formData.facilityCount || ''}
                                        onChange={handleInputChange}
                                    /> 
                                    : repairDetail.facilityCount}
                                </td>
                            </tr>
                            <tr>
                                <th className="header">내용</th>
                                <td colSpan="4">{isEditMode ? 
                                    <input 
                                        type='text' 
                                        name='repairContent'
                                        value={formData.repairContent || ''}
                                        onChange={handleInputChange}
                                    /> 
                                    : repairDetail.repairContent}
                                </td>
                            </tr>
                            <tr>
                                <th className="header">첨부 사진</th>
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
                                        repairDetail.repairPhoto && (
                                            <img src={getRepairImageUrl(repairDetail.repairPhoto)} alt="Repair" style={{ maxWidth: '100%', height: 'auto' }} />
                                        )
                                    )}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="formButtons">
                        {repairDetail.repairReportStatus === "접수" ? (
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