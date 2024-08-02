import { useState, useEffect, useRef } from 'react';
import './FacilityManagement.css';
import { useDispatch, useSelector } from 'react-redux';
import { callFacilityDetailInfoAPI } from '../../../apis/FacilityAPICalls';

function FacilityDryCleaner() {

    const dispatch = useDispatch();
    const facilityDetail = useSelector(state => state.facilityDetailInfoReducer);

    useEffect(() => {
        dispatch(callFacilityDetailInfoAPI());
    }, [dispatch]);

    console.log('시설물 상세 호출 확인', facilityDetail);

    const [currentTime, setCurrentTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const maxTime = 3; // 최대 시간 (분 단위)
    const intervalRef = useRef(null);

    useEffect(() => {
        if (isRunning) {
            intervalRef.current = setInterval(() => {
                setCurrentTime(prevTime => {
                    const newTime = prevTime + 1 / 600; // 분 단위로 증가 (0.1초 = 1/600분)
                    if (newTime >= maxTime) {
                        clearInterval(intervalRef.current);
                        return maxTime;
                    }
                    return newTime;
                });
            }, 100); // 0.1초마다 업데이트

            return () => clearInterval(intervalRef.current);
        } else {
            clearInterval(intervalRef.current);
        }
    }, [isRunning]);

    const handleStartStop = () => {
        if (isRunning) {
            setCurrentTime(0);
            setIsRunning(false);
        } else {
            setIsRunning(true);
        }
    };

    const percentage = (currentTime / maxTime) * 100;
    const isComplete = percentage >= 100;
    const currentMinutes = Math.floor(currentTime); // 소수점 없이 분 단위로 표시

    const filteredFacilities = facilityDetail.filter(item => item.facilityDTO.facilityCode === 3);

    return (
        <div>
            <div>
                {filteredFacilities.map((facility) => (
                    <div key={facility.facilityId} className="Facility-washing-machine">
                        <div className="Facility-control-panel">
                            <div className="Facility-gauge-container">
                                <div className="Facility-gauge-background"></div>
                                <div className="Facility-gauge-foreground" style={{ width: `${percentage}%` }}></div>
                            </div>
                        </div>
                        <div className="Facility-door">
                            <div className="Facility-door-content">
                                <img src="https://cdn-icons-png.flaticon.com/512/1827/1827463.png" alt="Clock Icon" className="Facility-icon"/>
                                <div className="Facility-laundry-number">{facility.facilityId}번 드라이클리너</div> {/* 세탁기 번호 */}
                                <div className='Facility-laundry-timer'>{currentMinutes} / {maxTime} 분</div> {/* 현재 시간을 분 단위로 표시 */}
                            </div>
                            {/* 종료 버튼은 완료된 경우에만 보이도록 수정 */}
                            {isComplete ? (
                                <button className="Facility-button" onClick={handleStartStop}>
                                    종료
                                </button>
                            ) : !isRunning ? (
                                <button className="Facility-button" onClick={handleStartStop}>
                                    시작
                                </button>
                            ) : null}
                        </div>
                        <div className="Facility-percentage-display">
                            {isRunning && !isComplete ? `${percentage.toFixed(0)}% 완료` : ''}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default FacilityDryCleaner;
