import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import jwtDecode from "jwt-decode";
import {callHeadStockHistoryAPI} from '../../../apis/StockAPICalls';

function StockHistory() {
    
    const dispatch = useDispatch();
    const headStockHistory = useSelector(state => state.headStockHistoryReducer);

    useEffect(() => {
        dispatch(callHeadStockHistoryAPI());
    }, [dispatch])

    return (
        <div className="menu1_layout">
            <div className='flex_wrap'>
                <h2>내역조회 페이지</h2>
                {headStockHistory.length > 0 ? (
                    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid black', padding: '8px' }}>신청코드</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>세제</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>섬유유연제</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>표백제</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>얼룩 제거제</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>세탁조 클리너</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>건조기 시트</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>세탁기 필터</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>건조기 필터</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>드라이클리너 필터</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>신청 날짜</th>
                                <th style={{ border: '1px solid black', padding: '8px' }}>신청인</th>
                            </tr>
                        </thead>
                        <tbody>
                            {headStockHistory.map((history, index) => (
                                <tr key={index}>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{history.hApplicationCode}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{history.hDetergent}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{history.hSoftener}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{history.hBleach}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{history.hRemover}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{history.hDrumCleaner}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{history.hSheet}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{history.hLaundryFilterhLaundryFilter}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{history.hDryerFilter}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{history.hDryCleanerFilter}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{history.hApplicationDate}</td>
                                    <td style={{ border: '1px solid black', padding: '8px' }}>{history.hApplicantName}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p>No history available.</p>
                )}
            </div>
        </div>
    );

}

export default StockHistory;