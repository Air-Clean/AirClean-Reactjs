import WaterTankInformation from "./WaterTankInformation";
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWaterLevel } from "../../apis/CallWaterConditionApi";
import './WaterTank.css';

import jwt_decode from 'jwt-decode'
import { callBranchData } from '../../apis/MemberAPICalls';
import { fetchWaterSupply } from "../../apis/LandryAPICall";


function WaterTank() {
    const dispatch = useDispatch();
    const waterCondition = useSelector(state => state.selectLocationWater.waterCondition);
    const waterSupply = useSelector(state => state.selectWaterSupply.waterSupply);
    
    // ------------------- layout 에서 옮긴 코드 -----------------------

    useEffect(() => {
        const members = jwt_decode(window.localStorage.getItem('accessToken'))
        const memberId = members.sub;

        console.log(members)
        
        if (members.memberRole === 'b') {
            dispatch(callBranchData({ memberId }));
        }
        
    }, [dispatch])
    
    const branch = useSelector(state => state.getBranchReducer)
    
    useEffect(() => {
        window.localStorage.setItem('branch', JSON.stringify(branch))
        dispatch(fetchWaterLevel());
        dispatch(fetchWaterSupply());
    }, [branch, dispatch])
    
    // ------------------------------------------

    const handleModalConfirmed = useCallback(() => {
        dispatch(fetchWaterSupply());
    }, [dispatch]);

    console.log(" waterCondition:", waterCondition);
    console.log('waterSupply from state: ', waterSupply);

    const filteredWaterCondition = waterCondition ? Object.entries(waterCondition).filter(([key]) => key !== 'wToc' && key !== 'siteId' && key !== 'msrDate') : [];

    const getStatusEmoji = (key, value) => {
        switch (key) {
            case 'wTemp':
                return value < 20 ? '🟢' : (value < 25 ? '🟡' : '🔴');
            case 'wPh':
                return (value >= 6.5 && value <= 8.5) ? '🟢' : ((value >= 6.0 && value < 6.5) || (value > 8.5 && value <= 9.0)) ? '🟡' : '🔴';
            case 'wDo':
                return value > 7.5 ? '🟢' : (value > 5.0 ? '🟡' : '🔴');
            case 'wTn':
                return value < 1 ? '🟢' : (value < 3 ? '🟡' : '🔴');
            case 'wTp':
                return value < 0.1 ? '🟢' : (value < 0.2 ? '🟡' : '🔴');
            case 'wPhen':
                return value < 0.005 ? '🟢' : (value < 0.01 ? '🟡' : '🔴');
            case 'wCn':
                return value < 0.05 ? '🟢' : (value < 0.1 ? '🟡' : '🔴');
            default:
                return '🟢';
        }
    };

    const keyToKorean = {
        wTemp: '수온',
        wPh: 'pH',
        wDo: '용존 산소',
        wTn: '총 질소',
        wTp: '총 인',
        wPhen: '페놀',
        wCn: '시안'
    };

    const keyToUnit = {
        wTemp: '℃',
        wPh: '',
        wDo: 'mg/L',
        wTn: 'mg/L',
        wTp: 'mg/L',
        wPhen: 'mg/L',
        wCn: 'mg/L'
    };

    const keyToKorean2 = {
        waterSupplyCode: '급수일지번호',
        msrDate: '측정 날짜',
        waterTankNo: '물탱크 번호',
        waterVolume: '급수량',
        siteId: '측정소 ID',
        wTemp: '수온',
        wPh: 'pH',
        wDo: '용존 산소',
        wTn: '총 질소',
        wTp: '총 인',
        wCn: '시안',
        wPhen: '페놀'
    };

    const keyOrder = [
        'waterSupplyCode', 'msrDate', 'waterTankNo', 'waterVolume',
        'siteId', 'wTemp', 'wPh', 'wDo', 'wTn', 'wTp', 'wCn', 'wPhen'
    ];

    return (
        <>  
            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'flex', width: '90%', height: '240px' }}>
                    <WaterTankInformation waterCondition={waterCondition} onModalConfirmed={handleModalConfirmed} />
                    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ width: '90%', height: '100%' }}>
                            <div style={{width: '100%', height: '70px'}}>
                                <table className="styled-table">
                                    <thead>
                                        <tr>
                                            {filteredWaterCondition.map(([key, _]) => (
                                                <th key={key} style={{ padding: '5px', textAlign: 'center' }}>{keyToKorean[key]}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            {filteredWaterCondition.map(([key, value], index) => (
                                                <td key={index} style={{ padding: '5px' }}>{getStatusEmoji(key, value)} {value} {keyToUnit[key]}</td>
                                            ))}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <h6 style={{color:'black'}}>급수일지</h6>
                            <div style={{ width: '100%', height: '143px', overflow: 'auto' }}>
                                <table className="styled-table">
                                    <thead>
                                        <tr>
                                            {waterSupply && waterSupply.length > 0 && keyOrder.map(key => (
                                                <th key={key} style={{ padding: '5px', textAlign: 'center' }}>{keyToKorean2[key]}</th>
                                            ))}
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {waterSupply && waterSupply.map((supply, rowIndex) => (
                                            <tr key={rowIndex}>
                                                {keyOrder.map((key, colIndex) => (
                                                    <td key={colIndex} style={{ padding: '5px', textAlign: 'center' }}>{supply[key]}</td>
                                                ))}
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WaterTank;
