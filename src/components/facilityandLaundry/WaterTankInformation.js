import './WaterTnakInformation.css';
import waterTank from '../../assets/waterTank.png';
import React, { useState, useEffect } from 'react';
import { fetchWaterLevel } from '../../apis/LandryAPICall';
import { useDispatch, useSelector } from 'react-redux';

function WaterTankInformation() {
    const dispatch = useDispatch();
    const waterTanks = useSelector(state => state.waterLevelReducer.waterTanks);
    const [waterLevel, setWaterLevel] = useState(7500); // 초기 물의 양 예시로 7500L 설정

    let branchCode = null;
    try {
        const branch = JSON.parse(window.localStorage.getItem('branch'));
        if (branch) {
            branchCode = branch.branchCode;
        }
    } catch (error) {
        console.error("조회한 브런치 코드가 없습니다.", error);
    }

    useEffect(() => {
        dispatch(fetchWaterLevel());
    }, [dispatch]);

    useEffect(() => {
        // console.log("branchCode:", branchCode);
        // console.log("waterTanks:", waterTanks);

        if (branchCode && waterTanks.length > 0) {
            const tank = waterTanks.find(t => t.branchCode === branchCode);
            if (tank) {
                console.log("Matching tank found:", tank);
                setWaterLevel(tank.waterCurCapacity);
            } else {
                console.log("No matching tank found for branchCode:", branchCode);
            }
        }
    }, [branchCode, waterTanks]);

    // console.log(waterLevel)

    Math.min((waterLevel / 10000) * 100, 100);

    const calculateTopValue = (level) => {
        const minLevel = 0;
        const maxLevel = 10000;
        const minTop = -35;
        const maxTop = 45;

        const ratio = (maxTop - minTop) / (maxLevel - minLevel);
        return minTop + ratio * (maxLevel - level);
    }

    const topValue = calculateTopValue(waterLevel);

    return (
        <>
            <div style={{ width: '165px', height: '100%' }}>
                <div style={{ height: '8%' }}></div>
                <div style={{ width: '165px', height: '70%', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ height: '100%', position: 'relative' }}>
                        <div className="wrapper" style={{ width: '165px', height: '100%', position: 'relative' }}>
                            <div className="c_water" style={{ overflow: 'hidden' }}>
                                <div style={{ width: '130px', height: '82px', position: 'relative', overflow: 'hidden' }}>
                                </div>
                                <div className="frame" style={{ top: `${topValue}px` }}>
                                    <div className="wave"></div>
                                    <div className="wave layer_1"></div>
                                </div>
                            </div>
                            <span className='waterText'>{waterLevel}L</span>
                            <img src={waterTank} className='waterTank' alt="waterTank" style={{ width: '160px', height: 'auto' }} />
                        </div>
                        <div style={{ width: '165px', height: '20%', color: 'white', fontSize: '13px', position: 'relative' }}>
                            <div>
                                <p style={{ position: 'absolute', top: '-20px' }}>*총 용량: 10000L</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '22%' }}>
                    <button className="waterTankButton">급수하기</button>
                </div>
            </div>
        </>
    );
}

export default WaterTankInformation;
