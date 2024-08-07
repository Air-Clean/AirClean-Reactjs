import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectLaundryWay } from '../../apis/LandryAPICall';

function SelectLaundryWay({ derived }) {
    const dispatch = useDispatch();
    const waterSupply = useSelector(state => state.selectLaundryWay.waterSupply);
    const [branchCode, setBranchCode] = useState(null);

    useEffect(() => {
        const storedBranch = JSON.parse(localStorage.getItem('branch'));
        if (storedBranch) {
            setBranchCode(storedBranch.branchCode);
        }
    }, []);

    useEffect(() => {
        if (branchCode) {
            console.log("확인좀요: " + branchCode);
            dispatch(selectLaundryWay(branchCode));
        }
    }, [branchCode, derived, dispatch]); // derived를 의존성 배열에 추가

    const tableContainerStyle = {
        maxWidth: '100%',
        overflowX: 'auto',
    };

    const tableStyle = {
        width: '100%',
        borderCollapse: 'collapse',
    };

    const thTdStyle = {
        padding: '8px 12px',
        border: '1px solid #ddd',
        textAlign: 'left',
    };

    const thStyle = {
        ...thTdStyle,
        backgroundColor: '#e6f7ff',
    };

    // laundryCompleted가 'Y'인 항목을 제외한 리스트 필터링
    const filteredWaterSupply = waterSupply.filter(item => item.laundry.laundryCompleted !== 'Y');

    return (
        <>  
            <div style={{ width: '100%', height: '100%', overflow: 'auto' }}>
                <div style={tableContainerStyle}>
                    {filteredWaterSupply && filteredWaterSupply.length > 0 ? (
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th style={thStyle}>세탁물 코드</th>
                                    <th style={thStyle}>세탁시간</th>
                                    <th style={thStyle}>세제량</th>
                                    <th style={thStyle}>물 수량</th>
                                    <th style={thStyle}>건조시간</th>
                                    <th style={thStyle}>드라이클리닝 시간</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredWaterSupply.map((item, index) => (
                                    <tr key={index}>
                                        <td style={thTdStyle}>{item.laundry.laundryCode}</td>
                                        <td style={thTdStyle}>{item.laundryTime}</td>
                                        <td style={thTdStyle}>{item.laundryDetergentAmount}</td>
                                        <td style={thTdStyle}>{item.laundryWaterAmount}</td>
                                        <td style={thTdStyle}>{item.laundryDryingTime}</td>
                                        <td style={thTdStyle}>{item.laundryDryCleaningTime}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No data available</p>
                    )}
                </div>
            </div>
        </>
    );
}

export default SelectLaundryWay;
