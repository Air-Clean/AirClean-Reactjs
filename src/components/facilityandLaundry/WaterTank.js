import WaterTankInformation from "./WaterTankInformation";
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWaterLevel } from "../../apis/CallWaterConditionApi";
import './WaterTank.css';

import jwt_decode from 'jwt-decode'
import { callBranchData } from '../../apis/MemberAPICalls';

function WaterTank() {
    const dispatch = useDispatch();
    const waterCondition = useSelector(state => state.selectLocationWater.waterCondition);
    
// ------------------- layout 에서 옮긴 코드 -----------------------


useEffect(()=>{
    const members = jwt_decode(window.localStorage.getItem('accessToken'))
    const memberId = members.sub;
    
    
    if(members.memberRole==='b'){
        dispatch(callBranchData({memberId}));
    }
    
    },[])
    
    const branch = useSelector(state=>state.getBranchReducer)
    
    useEffect(()=>{
        // console.log('branch 정보 들어 왔나요?', branch)
        window.localStorage.setItem('branch',JSON.stringify(branch))
        dispatch(fetchWaterLevel());
    },[branch, dispatch])
    
  // ------------------------------------------


    //  위로 합침
    // useEffect(() => {
    //     dispatch(fetchWaterLevel());
    // }, [dispatch]);

    console.log(" waterCondition:", waterCondition);

    // siteId, msrDate, wtoc를 제외한 나머지 키와 값을 필터링합니다.
    const filteredWaterCondition = waterCondition ? Object.entries(waterCondition).filter(([key]) => key !== 'wToc' && key !== 'siteId' && key !== 'msrDate') : [];

    // 상태에 따른 이모티콘을 반환하는 함수
    const getStatusEmoji = (key, value) => {
        switch (key) {
            case 'wTemp':
                return value < 20 ? '🟢' : value < 25 ? '🟡' : '🔴';
            case 'wPh':
                return value >= 6.5 && value <= 8.5 ? '🟢' : value >= 6.0 && value < 6.5 || value > 8.5 && value <= 9.0 ? '🟡' : '🔴';
            case 'wDo':
                return value > 7.5 ? '🟢' : value > 5.0 ? '🟡' : '🔴';
            case 'wTn':
                return value < 1 ? '🟢' : value < 3 ? '🟡' : '🔴';
            case 'wTp':
                return value < 0.1 ? '🟢' : value < 0.2 ? '🟡' : '🔴';
            case 'wPhen':
                return value < 0.005 ? '🟢' : value < 0.01 ? '🟡' : '🔴';
            case 'wCn':
                return value < 0.05 ? '🟢' : value < 0.1 ? '🟡' : '🔴';
            default:
                return '🟢';
        }
    };

    // 키에 대한 한글 이름 매핑 및 단위 추가
    const keyToKorean = {
        wTemp: '수온',
        wPh: 'pH',
        wDo: '용존 산소',
        wTn: '총 질소',
        wTp: '총 인',
        wPhen: '페놀',
        wCn: '시안'
    };

    // 단위 매핑
    const keyToUnit = {
        wTemp: '℃',
        wPh: '',
        wDo: 'mg/L',
        wTn: 'mg/L',
        wTp: 'mg/L',
        wPhen: 'mg/L',
        wCn: 'mg/L'
    };

    return (
        <>  
            <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'flex', width: '90%', height: '240px' }}>
                    <WaterTankInformation waterCondition={waterCondition} />
                    <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}>
                        <div style={{ width: '90%', height: '100%' }}>
                            <div style={{width: '100%', height: '90px'}}>
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
                            <div>
                                {/* 추가 콘텐츠를 여기에 넣으세요 */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default WaterTank;
