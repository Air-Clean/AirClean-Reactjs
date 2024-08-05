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
    const [updatedWaterTanks, setUpdatedWaterTanks] = useState({});

    const maxTime = 0.2; // 최대 시간 (분 단위)
    const intervalRefs = useRef({});

    useEffect(() => {
        setUpdatedWaterTanks(branchWaterInfo.waterTanks.reduce((acc, tank) => {
            acc[tank.branchCode] = tank;
            return acc;
        }, {}));
    }, [branchWaterInfo]);

    useEffect(() => {
        console.log('물탱크 상태 업데이트 됨:', updatedWaterTanks);
    }, [updatedWaterTanks]);

    useEffect(() => {
        Object.keys(isRunning).forEach(facilityId => {
            if (isRunning[facilityId]) {
                intervalRefs.current[facilityId] = setInterval(() => {
                    setCurrentTimes(prevTimes => {
                        const newTime = (prevTimes[facilityId] || 0) + 1 / 60; // 1초마다 1/60분 증가
                        if (newTime >= maxTime) {
                            clearInterval(intervalRefs.current[facilityId]);
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

    const handleStart = (facilityId) => {
        if (!isRunning[facilityId]) {
            setIsRunning(prev => ({ ...prev, [facilityId]: true }));
        }
    };

    const handleComplete = async (facilityId) => {
        if (isRunning[facilityId]) {
            const facility = facilityDetail.find(item => item.facilityId === facilityId);
            if (facility) {
                const branchCode = facility.branchDTO.branchCode;
                const tank = updatedWaterTanks[branchCode];
                if (tank) {
                    const newWaterCurCapacity = tank.waterCurCapacity - (maxTime * 0.4);
                    const updatedTank = {
                        ...tank,
                        waterCurCapacity: newWaterCurCapacity,
                    };
    
                    console.log('업데이트된 물탱크:', updatedTank);
    
                    setUpdatedWaterTanks(prevTanks => ({
                        ...prevTanks,
                        [branchCode]: updatedTank
                    }));
    
                    try {
                        const waterTankUpdatedUrl = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/location/facility/waterTankUpdate`;
                        const updatedWaterResponse = await fetch(waterTankUpdatedUrl, {
                            method: 'PUT',
                            headers: {
                                'Content-Type': 'application/json',
                                Accept: '*/*',
                                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                            },
                            body: JSON.stringify(updatedTank),
                        });
    
                        if (updatedWaterResponse.ok) {
                            console.log('물탱크가 성공적으로 업데이트되었습니다.', updatedTank);
                            dispatch(fetchWaterLevel());
                        } else {
                            console.error('물탱크 업데이트 오류:', updatedWaterResponse.statusText);
                        }
                    } catch (error) {
                        console.error('물탱크 업데이트 중 오류 발생:', error);
                    }
                }
            }
            setCurrentTimes(prevTimes => ({ ...prevTimes, [facilityId]: 0 }));
            setIsRunning(prev => ({ ...prev, [facilityId]: false }));
        }
    };

    const percentage = (currentTime) => {
        const percent = (currentTime / maxTime) * 100;
        return isNaN(percent) ? 0 : percent;
    };

    const isComplete = (facilityId) => percentage(currentTimes[facilityId]) >= 100;
    const currentMinutes = (facilityId) => {
        const minutes = Math.floor(currentTimes[facilityId] || 0);
        return isNaN(minutes) ? 0 : minutes;
    };

    const filteredFacilities = facilityDetail.filter(item => item.facilityDTO.facilityCode === 1);

    const [todoItems, setTodoItems] = useState([
        { id: 1, text: '예시 작업 1', completed: false },
        { id: 2, text: '예시 작업 2', completed: false },
        { id: 3, text: '예시 작업 3', completed: false }
    ]);

    const handleCheckboxChange = (id) => {
        setTodoItems(prevItems =>
            prevItems.map(item =>
                item.id === id ? { ...item, completed: !item.completed } : item
            )
        );
    };

    return (
        <div className='facility-content'>
            <div className='Facility-washing-machine-content'>
                {filteredFacilities.map((facility) => (
                    <div key={facility.facilityId} className="Facility-washing-machine" style={{ backgroundColor: '#CBE6FF' }}>
                        <div className="Facility-control-panel">
                            <div className="Facility-gauge-container">
                                <div className="Facility-gauge-background"></div>
                                <div className="Facility-gauge-foreground" style={{ backgroundColor:'#516AA6', width: `${percentage(currentTimes[facility.facilityId])}%` }}></div>
                            </div>
                        </div>
                        <div className="Facility-door" style={{ border: '0.16rem solid #627195' }}>
                            <div className="Facility-door-content">
                                <img src="https://cdn-icons-png.flaticon.com/512/1827/1827463.png" alt="Clock Icon" className="Facility-icon" />
                                <div className="Facility-laundry-number">{facility.facilityId}번 세탁기</div>
                                {isRunning[facility.facilityId] && (
                                    <div className='Facility-laundry-timer'>{currentMinutes(facility.facilityId)} / {maxTime} 분</div>
                                )}
                            </div>
                            {isComplete(facility.facilityId) ? (
                                <button className="Facility-button" style={{ backgroundColor: '#516AA6' }} onClick={() => handleComplete(facility.facilityId)}>
                                    완료
                                </button>
                            ) : !isRunning[facility.facilityId] ? (
                                <button className="Facility-button" style={{ backgroundColor: '#516AA6' }} onClick={() => handleStart(facility.facilityId)}>
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
            <div className='Facility-todo-post'>
                <ul className='Facility-todo-content'>
                    {todoItems.map(item => (
                        <li key={item.id} className={`Facility-todo-item ${item.completed ? 'completed' : ''}`}>
                            <input
                                type="checkbox"
                                checked={item.completed}
                                onChange={() => handleCheckboxChange(item.id)}
                            />
                            <span className="Facility-todo-text">{item.text}</span>
                        </li>
                    ))}
                </ul>
                <button className='facility-reg-button'>시설물 등록하기</button>
            </div>
        </div>
    );
}

export default FacilityDrum;
