import { useState, useEffect, useRef } from 'react';
import './FacilityManagement.css';
import { useDispatch, useSelector } from 'react-redux';
import { callFacilityDetailInfoAPI } from '../../../apis/FacilityAPICalls';
import { fetchWaterLevel } from '../../../apis/LandryAPICall';

function FacilityDrum() {
    const dispatch = useDispatch();
    const facilityDetail = useSelector(state => state.facilityDetailInfoReducer);
    const branchWaterInfo = useSelector(state => state.waterLevelReducer);

    const branch = JSON.parse(window.localStorage.getItem('branch'));

    useEffect(() => {
        dispatch(callFacilityDetailInfoAPI({ branchCode: branch.branchCode }));
        dispatch(fetchWaterLevel());
    }, [dispatch, branch.branchCode]);

    const [currentTimes, setCurrentTimes] = useState({});
    const [isRunning, setIsRunning] = useState({});
    const [updatedWaterTanks, setUpdatedWaterTanks] = useState(branchWaterInfo.waterTanks);
    const maxTime = 3; // 최대 시간 (분 단위)
    const intervalRefs = useRef({});

    useEffect(() => {
        Object.keys(isRunning).forEach(facilityId => {
            if (isRunning[facilityId]) {
                // 1초마다 상태 업데이트
                intervalRefs.current[facilityId] = setInterval(() => {
                    setCurrentTimes(prevTimes => {
                        const newTime = (prevTimes[facilityId] || 0) + 1 / 60; // 1초마다 1/60분 증가
                        if (newTime >= maxTime) {
                            clearInterval(intervalRefs.current[facilityId]);
                            handleComplete(facilityId); // 시간 완료 시 처리
                            return { ...prevTimes, [facilityId]: maxTime };
                        }
                        return { ...prevTimes, [facilityId]: newTime };
                    });
                }, 1000); // 1초마다 업데이트

                return () => clearInterval(intervalRefs.current[facilityId]);
            } else {
                clearInterval(intervalRefs.current[facilityId]);
            }
        });
    }, [isRunning]);

    const handleStartStop = (facilityId) => {
        if (isRunning[facilityId]) {
            setCurrentTimes(prevTimes => ({ ...prevTimes, [facilityId]: 0 }));
            setIsRunning(prev => ({ ...prev, [facilityId]: false }));
        } else {
            setIsRunning(prev => ({ ...prev, [facilityId]: true }));

            // 물탱크의 물 용량 감소 로직
            const facility = facilityDetail.find(item => item.facilityId === facilityId);
            if (facility) {
                const branchCode = facility.facilityDTO.branchCode;
                const waterTankIndex = updatedWaterTanks.findIndex(tank => tank.branchCode === branchCode);
                if (waterTankIndex !== -1) {
                    const newWaterCurCapacity = updatedWaterTanks[waterTankIndex].waterCurCapacity - (updatedWaterTanks[waterTankIndex].waterMaxCapacity * 0.4);
                    const updatedTank = {
                        ...updatedWaterTanks[waterTankIndex],
                        waterCurCapacity: newWaterCurCapacity,
                    };

                    const newUpdatedWaterTanks = [
                        ...updatedWaterTanks.slice(0, waterTankIndex),
                        updatedTank,
                        ...updatedWaterTanks.slice(waterTankIndex + 1),
                    ];

                    setUpdatedWaterTanks(newUpdatedWaterTanks);
                }
            }
        }
    };

    const handleComplete = (facilityId) => {
        const facility = facilityDetail.find(item => item.facilityId === facilityId);
        if (facility) {
            const branchCode = facility.facilityDTO.branchCode;
            const waterTankIndex = updatedWaterTanks.findIndex(tank => tank.branchCode === branchCode);
            if (waterTankIndex !== -1) {
                const newWaterCurCapacity = updatedWaterTanks[waterTankIndex].waterCurCapacity - (updatedWaterTanks[waterTankIndex].waterMaxCapacity * 0.4);
                const updatedTank = {
                    ...updatedWaterTanks[waterTankIndex],
                    waterCurCapacity: newWaterCurCapacity,
                };

                const newUpdatedWaterTanks = [
                    ...updatedWaterTanks.slice(0, waterTankIndex),
                    updatedTank,
                    ...updatedWaterTanks.slice(waterTankIndex + 1),
                ];

                setUpdatedWaterTanks(newUpdatedWaterTanks);
            }
        }
    };

    const percentage = (currentTime) => (currentTime / maxTime) * 100;
    const isComplete = (facilityId) => percentage(currentTimes[facilityId]) >= 100;
    const currentMinutes = (facilityId) => Math.floor(currentTimes[facilityId] || 0); // 소수점 없이 분 단위로 표시

    const filteredFacilities = facilityDetail.filter(item => item.facilityDTO.facilityCode === 1);

    return (
        <div>
            <div>
                {filteredFacilities.map((facility) => (
                    <div key={facility.facilityId} className="Facility-washing-machine">
                        <div className="Facility-control-panel">
                            <div className="Facility-gauge-container">
                                <div className="Facility-gauge-background"></div>
                                <div className="Facility-gauge-foreground" style={{ width: `${percentage(currentTimes[facility.facilityId])}%` }}></div>
                            </div>
                        </div>
                        <div className="Facility-door">
                            <div className="Facility-door-content">
                                <img src="https://cdn-icons-png.flaticon.com/512/1827/1827463.png" alt="Clock Icon" className="Facility-icon" />
                                <div className="Facility-laundry-number">{facility.facilityId}번 세탁기</div> {/* 세탁기 번호 */}
                                <div className='Facility-laundry-timer'>{currentMinutes(facility.facilityId)} / {maxTime} 분</div> {/* 현재 시간을 분 단위로 표시 */}
                            </div>
                            {/* 종료 버튼은 완료된 경우에만 보이도록 수정 */}
                            {isComplete(facility.facilityId) ? (
                                <button className="Facility-button" onClick={() => handleStartStop(facility.facilityId)}>
                                    종료
                                </button>
                            ) : !isRunning[facility.facilityId] ? (
                                <button className="Facility-button" onClick={() => handleStartStop(facility.facilityId)}>
                                    시작
                                </button>
                            ) : null}
                        </div>
                        <div className="Facility-percentage-display">
                            {isRunning[facility.facilityId] && !isComplete(facility.facilityId) ? `${percentage(currentTimes[facility.facilityId]).toFixed(0)}% 완료` : ''}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FacilityDrum;
