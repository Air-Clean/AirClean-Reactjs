import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callHeadStockHistoryAPI } from '../../../apis/StockAPICalls';
import './StockHistory.css'; // CSS 파일을 가져옵니다

function StockHistory() {
    const dispatch = useDispatch();
    const headStockHistory = useSelector(state => state.headStockHistoryReducer);

    useEffect(() => {
        dispatch(callHeadStockHistoryAPI());
    }, [dispatch]);

    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const renderTableRows = (history, isDetergents) => {
        if (isDetergents) {
            const isDetergentsNonZero = history.hDetergent || history.hSoftener || history.hBleach || history.hRemover || history.hDrumCleaner || history.hSheet;
            if (!isDetergentsNonZero) return null;

            return (
                <tr key={history.hApplicationCode}>
                    <td>{history.hApplicationCode}</td>
                    <td>{history.hDetergent}</td>
                    <td>{history.hSoftener}</td>
                    <td>{history.hBleach}</td>
                    <td>{history.hRemover}</td>
                    <td>{history.hDrumCleaner}</td>
                    <td>{history.hSheet}</td>
                    <td>{formatDateString(history.hApplicationDate)}</td>
                    <td>{history.hApplicantName}</td>
                </tr>
            );
        } else {
            const isPartsNonZero = history.hLaundryFilter || history.hDryerFilter || history.hDryCleanerFilter;
            if (!isPartsNonZero) return null;

            return (
                <tr key={history.hApplicationCode}>
                    <td>{history.hApplicationCode}</td>
                    <td>{history.hLaundryFilter}</td>
                    <td>{history.hDryerFilter}</td>
                    <td>{history.hDryCleanerFilter}</td>
                    <td>{formatDateString(history.hApplicationDate)}</td>
                    <td>{history.hApplicantName}</td>
                </tr>
            );
        }
    };

    return (
        <div className='HISTORY-container'>
            <div className='HISTORY-detergents'>
                <h2 className='HISTORY-title'>세탁용품 내역 조회</h2>
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
                                </tr>
                            </thead>
                            <tbody>
                                {headStockHistory.map(history => renderTableRows(history, true))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <p className='HISTORY-empty-message'>신청내역이 없습니다.</p>
                )}
            </div>

            <div className='HISTORY-parts'>
                <h2 className='HISTORY-title'>Parts</h2>
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
                                </tr>
                            </thead>
                            <tbody>
                                {headStockHistory.map(history => renderTableRows(history, false))}
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

export default StockHistory;
