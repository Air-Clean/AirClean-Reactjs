import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callHeadStockHistoryAPI } from '../../../apis/StockAPICalls';

function StockHistory() {
    
    const dispatch = useDispatch();
    const headStockHistory = useSelector(state => state.headStockHistoryReducer);

    useEffect(() => {
        dispatch(callHeadStockHistoryAPI());
    }, [dispatch]);

    console.log('내역조회 api 정보', headStockHistory);

    const formatDateString = (dateString) => {
        const date = new Date(dateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    const tableCellStyle = {
        padding: '8px',
        textAlign: 'center',
    };

    const tableStyle = {
        width: '60%',
        borderCollapse: 'collapse'
    };

    return (
<>
                <div className='detergents_history'>
                    <h2>세탁용품 내역 조회</h2>
                    {headStockHistory.length > 0 ? (
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th style={tableCellStyle}>신청코드</th>
                                    <th style={tableCellStyle}>세제</th>
                                    <th style={tableCellStyle}>섬유유연제</th>
                                    <th style={tableCellStyle}>표백제</th>
                                    <th style={tableCellStyle}>얼룩 제거제</th>
                                    <th style={tableCellStyle}>세탁조 클리너</th>
                                    <th style={tableCellStyle}>건조기 시트</th>
                                    <th style={tableCellStyle}>신청 날짜</th>
                                    <th style={tableCellStyle}>신청인</th>
                                </tr>
                            </thead>
                            <tbody>
                                {headStockHistory.map((history, index) => {
                                    const isDetergentsNonZero = history.hDetergent || history.hSoftener || history.hBleach || history.hRemover || history.hDrumCleaner || history.hSheet;
                                    if (!isDetergentsNonZero) {
                                        return null;
                                    }

                                    return (
                                        <tr key={index}>
                                            <td style={tableCellStyle}>{history.hApplicationCode}</td>
                                            <td style={tableCellStyle}>{history.hDetergent}</td>
                                            <td style={tableCellStyle}>{history.hSoftener}</td>
                                            <td style={tableCellStyle}>{history.hBleach}</td>
                                            <td style={tableCellStyle}>{history.hRemover}</td>
                                            <td style={tableCellStyle}>{history.hDrumCleaner}</td>
                                            <td style={tableCellStyle}>{history.hSheet}</td>
                                            <td style={tableCellStyle}>{formatDateString(history.hApplicationDate)}</td>
                                            <td style={tableCellStyle}>{history.hApplicantName}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <p>신청내역이 없습니다.</p>
                    )}
                </div>

                <div className='parts_history'>
                    <h2>Parts</h2>
                    {headStockHistory.length > 0 ? (
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th style={tableCellStyle}>신청코드</th>
                                    <th style={tableCellStyle}>세탁기 필터</th>
                                    <th style={tableCellStyle}>건조기 필터</th>
                                    <th style={tableCellStyle}>드라이클리너 필터</th>
                                    <th style={tableCellStyle}>신청 날짜</th>
                                    <th style={tableCellStyle}>신청인</th>
                                </tr>
                            </thead>
                            <tbody>
                                {headStockHistory.map((history, index) => {
                                    const isPartsNonZero = history.hLaundryFilter || history.hDryerFilter || history.hDryCleanerFilter;
                                    if (!isPartsNonZero) {
                                        return null;
                                    }

                                    return (
                                        <tr key={index}>
                                            <td style={tableCellStyle}>{history.hApplicationCode}</td>
                                            <td style={tableCellStyle}>{history.hLaundryFilter}</td>
                                            <td style={tableCellStyle}>{history.hDryerFilter}</td>
                                            <td style={tableCellStyle}>{history.hDryCleanerFilter}</td>
                                            <td style={tableCellStyle}>{formatDateString(history.hApplicationDate)}</td>
                                            <td style={tableCellStyle}>{history.hApplicantName}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    ) : (
                        <p>신청내역이 없습니다.</p>
                    )}
                </div>
</>
    );
}

export default StockHistory;
