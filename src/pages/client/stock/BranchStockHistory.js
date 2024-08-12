import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callSpecificBranchStockHistoryAPI } from '../../../apis/StockAPICalls';
import './StockHistory.css'; // CSS 파일을 가져옵니다

function BranchStockHistory() {
    const dispatch = useDispatch();
    const headStockHistory = useSelector(state => state.specificBranchStockHistoryReducer);
    const [updatedStatus, setUpdatedStatus] = useState({}); // 상태 업데이트를 위한 state

    const branch = JSON.parse(window.localStorage.getItem('branch'));

    useEffect(() => {
        dispatch(callSpecificBranchStockHistoryAPI({ branchCode: branch.branchCode }));
    }, [dispatch]);

    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const handleDeliveryCompleted = async (history) => {
        const updatedApplicationStatus = '배송완료';
    
        // 각 관리 코드에 해당하는 재고 값들을 모두 배열에 담습니다.
        const detergents = [];
        const parts = [];
    
        if (history.bDetergent) {
            detergents.push({
                laundrySupplyCode: 'LS001',
                laundrySupplyStock: history.bDetergent
            });
        }
        if (history.bSoftener) {
            detergents.push({
                laundrySupplyCode: 'LS002',
                laundrySupplyStock: history.bSoftener
            });
        }
        if (history.bBleach) {
            detergents.push({
                laundrySupplyCode: 'LS003',
                laundrySupplyStock: history.bBleach
            });
        }
        if (history.bRemover) {
            detergents.push({
                laundrySupplyCode: 'LS004',
                laundrySupplyStock: history.bRemover
            });
        }
        if (history.bDrumCleaner) {
            detergents.push({
                laundrySupplyCode: 'LS005',
                laundrySupplyStock: history.bDrumCleaner
            });
        }
        if (history.bSheet) {
            detergents.push({
                laundrySupplyCode: 'LS006',
                laundrySupplyStock: history.bSheet
            });
        }
    
        if (history.bLaundryFilter) {
            parts.push({
                laundryPartCode: 'LP001',
                laundryPartStock: history.bLaundryFilter
            });
        }
        if (history.bDryerFilter) {
            parts.push({
                laundryPartCode: 'LP002',
                laundryPartStock: history.bDryerFilter
            });
        }
        if (history.bDryCleanerFilter) {
            parts.push({
                laundryPartCode: 'LP003',
                laundryPartStock: history.bDryCleanerFilter
            });
        }
    
        try {
            // 1. 배송 상태 업데이트를 백엔드에 전송
            await fetch(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/client/stock/deliveryUpdate`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                },
                body: JSON.stringify({
                    bApplicationCode: history.bApplicationCode,
                    bApplicationStatus: updatedApplicationStatus,
                }),
            });
    
            // 2. 세탁용품 및 부품 정보에 대한 재고 업데이트를 백엔드에 전송
            if (detergents.length > 0) {
                await fetch(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/client/stock/updateLaundrySupplyManagement`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: '*/*',
                        Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                    },
                    body: JSON.stringify({
                        branchCode: branch.branchCode,
                        detergents: detergents
                    }),
                });
                console.log('detergents 정보', detergents);
            }
    
            if (parts.length > 0) {
                await fetch(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/client/stock/updateLaundryPartManagement`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: '*/*',
                        Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                    },
                    body: JSON.stringify({
                        branchCode: branch.branchCode,
                        parts: parts
                    }),
                });
                console.log('parts 정보', parts);
            }
    
            // 3. 상태 업데이트 후 UI에 반영
            setUpdatedStatus(prevStatus => ({
                ...prevStatus,
                [history.bApplicationCode]: updatedApplicationStatus
            }));
    
        } catch (error) {
            console.error("배송 완료 처리 중 오류 발생:", error);
        }
    };
    

    const getManagementCode = (history) => {
        if (history.bDetergent) return 'LS001';
        if (history.bSoftener) return 'LS002';
        if (history.bBleach) return 'LS003';
        if (history.bRemover) return 'LS004';
        if (history.bDrumCleaner) return 'LS005';
        if (history.bSheet) return 'LS006';
        if (history.bLaundryFilter) return 'LP001';
        if (history.bDryerFilter) return 'LP002';
        if (history.bDryCleanerFilter) return 'LP003';
        return null;
    };

    const getStockValue = (history, managementCode) => {
        switch (managementCode) {
            case 'LS001': return history.bDetergent;
            case 'LS002': return history.bSoftener;
            case 'LS003': return history.bBleach;
            case 'LS004': return history.bRemover;
            case 'LS005': return history.bDrumCleaner;
            case 'LS006': return history.bSheet;
            case 'LP001': return history.bLaundryFilter;
            case 'LP002': return history.bDryerFilter;
            case 'LP003': return history.bDryCleanerFilter;
            default: return 0;
        }
    };

    const renderTableRows = (history, isDetergents) => {
        const currentStatus = updatedStatus[history.bApplicationCode] || history.bApplicationStatus;

        if (isDetergents) {
            const isDetergentsNonZero = history.bDetergent || history.bSoftener || history.bBleach || history.bRemover || history.bDrumCleaner || history.bSheet;
            if (!isDetergentsNonZero) return null;

            return (
                <tr key={history.bApplicationCode}>
                    <td>{history.bApplicationCode}</td>
                    <td>{history.bDetergent}</td>
                    <td>{history.bSoftener}</td>
                    <td>{history.bBleach}</td>
                    <td>{history.bRemover}</td>
                    <td>{history.bDrumCleaner}</td>
                    <td>{history.bSheet}</td>
                    <td>{formatDateString(history.bApplicationDate)}</td>
                    <td>{history.applicantName}</td>
                    <td>{currentStatus}</td>
                    <td>
                        {currentStatus === '승인' && (
                            <button onClick={() => handleDeliveryCompleted(history, getManagementCode(history))}>
                                배송완료
                            </button>
                        )}
                    </td>
                </tr>
            );
        } else {
            const isPartsNonZero = history.bLaundryFilter || history.bDryerFilter || history.bDryCleanerFilter;
            if (!isPartsNonZero) return null;

            return (
                <tr key={history.bApplicationCode}>
                    <td>{history.bApplicationCode}</td>
                    <td>{history.bLaundryFilter}</td>
                    <td>{history.bDryerFilter}</td>
                    <td>{history.bDryCleanerFilter}</td>
                    <td>{formatDateString(history.bApplicationDate)}</td>
                    <td>{history.applicantName}</td>
                    <td>{currentStatus}</td>
                    <td>
                        {currentStatus === '승인' && (
                            <button onClick={() => handleDeliveryCompleted(history, getManagementCode(history))}>
                                배송완료
                            </button>
                        )}
                    </td>
                </tr>
            );
        }
    };

    return (
        <div className='HISTORY-container'>
            <div className='HISTORY-detergents'>
                <h2 className='HISTORY-title'>DETERGENTS</h2>
                {headStockHistory.length > 0 ? (
                    <div className="HISTORY-table-wrapper">
                        <table className='HISTORY-table'>
                            <thead>
                                <tr>
                                    <th>신청코드</th>
                                    <th>세제</th>
                                    <th>섬유유연제</th>
                                    <th>표백제</th>
                                    <th>얼룩 제거제</th>
                                    <th>세탁조 클리너</th>
                                    <th>건조기 시트</th>
                                    <th>신청 날짜</th>
                                    <th>신청인</th>
                                    <th>승인 상태</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {headStockHistory
                                    .slice() // 원본 배열을 변경하지 않도록 슬라이스 복사
                                    .sort((a, b) => b.bApplicationCode - a.bApplicationCode) // 신청코드를 기준으로 내림차순 정렬
                                    .map(history => renderTableRows(history, true))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className='HISTORY-empty-message'>신청내역이 없습니다.</p>
                )}
            </div>

            <div className='HISTORY-parts'>
                <h2 className='HISTORY-title'>PARTS</h2>
                {headStockHistory.length > 0 ? (
                    <div className="HISTORY-table-wrapper">
                        <table className='HISTORY-table'>
                            <thead>
                                <tr>
                                    <th>신청코드</th>
                                    <th>세탁기 필터</th>
                                    <th>건조기 필터</th>
                                    <th>드라이클리너 필터</th>
                                    <th>신청 날짜</th>
                                    <th>신청인</th>
                                    <th>승인 상태</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {headStockHistory
                                    .slice() // 원본 배열을 변경하지 않도록 슬라이스 복사
                                    .sort((a, b) => b.bApplicationCode - a.bApplicationCode) // 신청코드를 기준으로 내림차순 정렬
                                    .map(history => renderTableRows(history, false))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className='HISTORY-empty-message'>신청내역이 없습니다.</p>
                )}
            </div>
        </div>
    );
}

export default BranchStockHistory;
