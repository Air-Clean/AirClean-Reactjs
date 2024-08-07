import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { callDetailExpenseAPI, callUpdateExpenseAPI, callDeleteExpenseAPI } from '../../../../apis/ReportAPICalls';
import '../../../admin/report/reportsMenu/BranchSalesDetail.css'; 
import jwtDecode from 'jwt-decode';

function LocationExpenseDetail() {
    const params = useParams();
    const dispatch = useDispatch();
    const expenseDetail = useSelector(state => state.detailExpenseReducer);
    const navigate = useNavigate();
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

    console.log('members page', members);

    useEffect(() => {
        dispatch(callDetailExpenseAPI({
            expenseReportCode: params.expenseReportCode
        }));
    }, [dispatch, params.expenseReportCode]);

    useEffect(() => {
        if (expenseDetail) {
            setFormData({
                expenseReportCode: expenseDetail.expenseReportCode || '',
                expenseReportStatus: expenseDetail.expenseReportStatus || '',
                electricityBill: expenseDetail.electricityBill?.toString() || '0',
                waterBill: expenseDetail.waterBill?.toString() || '0',
                gasBill: expenseDetail.gasBill?.toString() || '0',
                partTimeSalary: expenseDetail.partTimeSalary?.toString() || '0',
                repairCost: expenseDetail.repairCost?.toString() || '0',
                totalExpenseCost: expenseDetail.totalExpenseCost?.toString() || '0',
                memberName: expenseDetail.memberName || '',
                branchName: expenseDetail.branchName || '',
                expenseSubmissionDate: expenseDetail.expenseSubmissionDate || '',
                monthDate: expenseDetail.monthDate || '',
                expenseRemark: expenseDetail.expenseRemark || ''
            });
        }
    }, [expenseDetail]);

    const addComma = (price) => {
        let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        return returnString;
    }

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
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === 'expenseRemark' ? value : value.replace(/,/g, '') // 쉼표 제거
        });
    }

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

        console.log("updateData", updateData)

        const updateExpenseResult = await dispatch(callUpdateExpenseAPI({ expenseReportCode: formData.expenseReportCode, data: updateData }));
        setIsEditMode(false);
        if (updateExpenseResult.ok) {
            alert('수정이 완료되었습니다.');
            dispatch(callDetailExpenseAPI({
                expenseReportCode: params.expenseReportCode
            }));
        } else {
            alert('수정에 실패하였습니다.');
        }
    }

    const handleDeleteClick = async () => {
        if (window.confirm('정말 삭제하시겠습니까?')) {
            const deleteExpenseResult = await dispatch(callDeleteExpenseAPI({expenseReportCode: formData.expenseReportCode}));
            if (deleteExpenseResult.ok) {
                alert('삭제가 완료되었습니다.');
                navigate('/location/paper/myReports/', { state: { activeTable: '지출' } });
            } else {
                alert('삭제에 실패하였습니다.');
            }
        }
    };

    const handleClose = () => {
        navigate('/location/paper/myReports/', { state: { activeTable: '지출' } });
    };

    return (
        <div className="branchDetail_menu1_layout">
            <div className="branchDetail_flex_wrap">
                <div className="details-container">
                    <h1 className="title">지출보고서 상세보기</h1>
                    <table className="details-table">
                        <thead>
                            <tr>
                                <th>양식명</th>
                                <td colSpan="2">{expenseDetail.expenseReportCode}</td>
                                <th>지점장명</th>
                                <td colSpan="2">{expenseDetail.memberName}</td>
                            </tr>
                            <tr>
                                <th>지점명</th>
                                <td>{expenseDetail.branchName}</td>
                                <th>제출일</th>
                                <td>{new Date(expenseDetail.expenseSubmissionDate).toLocaleDateString()}</td>
                                <th>지출 달</th>
                                <td>{expenseDetail.monthDate}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th rowSpan="8" className="vertical-header">내용</th>
                                <th className="header">전기세</th>
                                <td colSpan="4">
                                    {isEditMode ? 
                                        <input 
                                            type='text' 
                                            name='electricityBill'
                                            value={addComma(formData.electricityBill) || ''}
                                            onChange={handleInputChange}
                                        /> 
                                        : addComma(expenseDetail.electricityBill)}
                                </td>
                            </tr>
                            <tr>
                                <th className="header">수도세</th>
                                <td colSpan="4">{isEditMode ? 
                                    <input 
                                        type='text' 
                                        name='waterBill'
                                        value={addComma(formData.waterBill) || ''}
                                        onChange={handleInputChange}
                                    /> 
                                    : addComma(expenseDetail.waterBill)}
                                </td>
                            </tr>
                            <tr>
                                <th className="header">가스비</th>
                                <td colSpan="4">{isEditMode ? 
                                    <input 
                                        type='text' 
                                        name='gasBill'
                                        value={addComma(formData.gasBill) || ''}
                                        onChange={handleInputChange}
                                    /> 
                                    : addComma(expenseDetail.gasBill)}
                                </td>
                            </tr>
                            <tr>
                                <th className="header">알바비</th>
                                <td colSpan="4">{isEditMode ? 
                                    <input 
                                        type='text' 
                                        name='partTimeSalary'
                                        value={addComma(formData.partTimeSalary) || ''}
                                        onChange={handleInputChange}
                                    /> 
                                    : addComma(expenseDetail.partTimeSalary)}
                                </td>
                            </tr>
                            <tr>
                                <th className="header">시설물수리비</th>
                                <td colSpan="4">{isEditMode ? 
                                    <input 
                                        type='text' 
                                        name='repairCost'
                                        value={addComma(formData.repairCost) || ''}
                                        onChange={handleInputChange}
                                    /> 
                                    : addComma(expenseDetail.repairCost)}
                                </td>
                            </tr>
                            <tr>
                                <th className="header">총 금액</th>
                                <td colSpan="4">{isEditMode ? 
                                    <input 
                                        type='text' 
                                        name='totalExpenseCost'
                                        value={addComma(formData.totalExpenseCost) || ''}
                                        onChange={handleInputChange}
                                    /> 
                                    : addComma(expenseDetail.totalExpenseCost)}
                                </td>
                            </tr>
                            <tr>
                            <th className="header">비고</th>
                                <td colSpan="4">{isEditMode ?
                                    <input 
                                        type='textarea' 
                                        name='expenseRemark'
                                        value={formData.expenseRemark || ''}
                                        onChange={handleInputChange}
                                    /> 
                                        : expenseDetail.expenseRemark}
                                </td>
                            </tr>
                            </tbody>
                    </table>
                        <div className="formButtons">
                            {expenseDetail.expenseReportStatus === "N" ? (
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
        export default LocationExpenseDetail;
