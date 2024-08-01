import { useState, useEffect, useRef } from 'react';
import './FacilityManagement.css';

function FacilityManagement() {
    const [currentTime, setCurrentTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const maxTime = 3; // 최대 시간 (분 단위)
    const startTimeRef = useRef(0);
    const requestRef = useRef();
    const [laundryNumber, setLaundryNumber] = useState(1); // 임의의 세탁기 번호

    useEffect(() => {
        const update = (timestamp) => {
            if (isRunning) {
                if (!startTimeRef.current) startTimeRef.current = timestamp;
                
                // Calculate elapsed time since the last frame
                const elapsedTime = (timestamp - startTimeRef.current) / 1000; // 초 단위
                
                // Update current time based on elapsed time
                setCurrentTime(prevTime => {
                    const newTime = prevTime + elapsedTime / 60; // 분 단위로 변환
                    if (newTime >= maxTime) {
                        return maxTime;
                    }
                    return newTime;
                });

                // Reset startTimeRef for next frame
                startTimeRef.current = timestamp;
                requestRef.current = requestAnimationFrame(update);
            } else {
                cancelAnimationFrame(requestRef.current);
            }
        };

        if (isRunning) {
            requestRef.current = requestAnimationFrame(update);
        } else {
            cancelAnimationFrame(requestRef.current);
        }

        return () => cancelAnimationFrame(requestRef.current);
    }, [isRunning]);

    const handleStartStop = () => {
        if (isRunning) {
            // 종료 버튼 클릭 시 초기화
            setCurrentTime(0);
            setIsRunning(false);
        } else {
            // 시작 버튼 클릭 시 타이머 시작
            setIsRunning(true);
        }
    };

    const percentage = (currentTime / maxTime) * 100;
    const isComplete = percentage >= 100;

    return (
        <div className='menu1_layout'>
            <div className='flex_wrap'>
                <div className="Facility-washing-machine">
                    <div className="Facility-control-panel">
                        <div className="Facility-gauge-container">
                            <div className="Facility-gauge-background"></div>
                            <div className="Facility-gauge-foreground" style={{ width: `${percentage}%` }}></div>
                        </div>
                    </div>
                    <div className="Facility-door">
                        <div className="Facility-door-content">
                            <div className="Facility-icon">🕒</div> {/* 시계 아이콘 */}
                            <div className="Facility-laundry-number">{laundryNumber}번 세탁기</div> {/* 세탁기 번호 */}
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
            </div>
        </div>
    );
}

export default FacilityManagement;
