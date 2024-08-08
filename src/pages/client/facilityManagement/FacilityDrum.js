import React, { useState, useEffect, useRef } from 'react';
import './FacilityManagement.css';
import { useDispatch, useSelector } from 'react-redux';
import { callFacilityDetailInfoAPI, callFacilityLaundryWayInfoAPI } from '../../../apis/FacilityAPICalls';
import { fetchWaterLevel } from '../../../apis/LandryAPICall';

function FacilityDrum() {
    const dispatch = useDispatch();
    const facilityDetail = useSelector(state => state.facilityDetailInfoReducer);
    const branchWaterInfo = useSelector(state => state.waterLevelReducer);
    const facilityLaundryWayInfo = useSelector(state => state.facilityLaundryWayReducer);

    const branch = JSON.parse(window.localStorage.getItem('branch'));

    useEffect(() => {
        dispatch(callFacilityDetailInfoAPI({ branchCode: branch.branchCode }));
        dispatch(fetchWaterLevel());
        dispatch(callFacilityLaundryWayInfoAPI({ branchCode: branch.branchCode }));
    }, [dispatch, branch.branchCode]);

    const [currentTimes, setCurrentTimes] = useState({});
    const [isRunning, setIsRunning] = useState({});
    const [updatedWaterTanks, setUpdatedWaterTanks] = useState({});
    const [selectedFacilityCode, setSelectedFacilityCode] = useState('');
    const [selectedFacilityId, setSelectedFacilityId] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('');
    const [isRegisterFormVisible, setIsRegisterFormVisible] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [laundrySettings, setLaundrySettings] = useState({
        laundryWayId: '',
        laundryTime: '',
        laundryDetergentAmount: '',
        laundryWaterAmount: ''
    });

    const intervalRefs = useRef({});
    const formRef = useRef(null);
    const modalRef = useRef(null);

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
                        const newTime = (prevTimes[facilityId] || 0) + 1 / 60;
                        if (newTime >= maxTime) {
                            clearInterval(intervalRefs.current[facilityId]);
                            return { ...prevTimes, [facilityId]: maxTime };
                        }
                        return { ...prevTimes, [facilityId]: newTime };
                    });
                }, 1000);
                return () => clearInterval(intervalRefs.current[facilityId]);
            } else {
                clearInterval(intervalRefs.current[facilityId]);
            }
        });
    }, [isRunning]);

    const handleStart = (facilityId) => {
        if (!isRunning[facilityId]) {
            setSelectedFacilityId(facilityId);
            setIsModalVisible(true);
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

    const handleRegister = async () => {
        if (selectedFacilityCode && selectedFacilityId && selectedStatus) {
            let newFacility = {};
            let apiUrl = '';
            let httpMethod = '';

            if (selectedFacilityId === '신규') {
                if (selectedStatus === '등록') {
                    newFacility = {
                        branchCode: branch.branchCode,
                        facilityCode: selectedFacilityCode,
                        facilityStatus: 'H'
                    };
                    apiUrl = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/location/facility/register`;
                    httpMethod = 'POST';
                } else {
                    alert('신규 시설은 고장 및 삭제가 불가합니다');
                    return;
                }
            } else {
                if (selectedStatus === '등록') {
                    alert('신규만 등록이 가능합니다');
                    return;
                } else {
                    newFacility = {
                        facilityId: selectedFacilityId,
                        branchCode: branch.branchCode,
                        facilityCode: selectedFacilityCode,
                        facilityStatus: selectedStatus === '고장' ? 'F' : selectedStatus === '삭제' ? 'D' : 'H'
                    };
                    apiUrl = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/location/facility/update`;
                    httpMethod = 'PUT';
                }
            }

            const confirmMessage = selectedFacilityId === '신규' ? '새로운 시설물을 등록하시겠습니까?' : '시설물 상태를 변경하시겠습니까?';

            if (window.confirm(confirmMessage)) {
                try {
                    const response = await fetch(apiUrl, {
                        method: httpMethod,
                        headers: {
                            'Content-Type': 'application/json',
                            Accept: '*/*',
                            Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                        },
                        body: JSON.stringify(newFacility),
                    });

                    if (response.ok) {
                        console.log('시설물 상태가 성공적으로 변경되었습니다.', newFacility);
                        dispatch(callFacilityDetailInfoAPI({ branchCode: branch.branchCode }));
                    } else {
                        console.error('시설물 상태 변경 오류:', response.statusText);
                    }
                } catch (error) {
                    console.error('시설물 상태 변경 중 오류 발생:', error);
                }
                setIsRegisterFormVisible(false); 
            }
        }
    };

    const facilityIds = facilityDetail
        .filter(facility => facility.facilityDTO.facilityCode === Number(selectedFacilityCode))
        .map(facility => facility.facilityId);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (formRef.current && !formRef.current.contains(event.target)) {
                setIsRegisterFormVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setIsModalVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleModalSubmit = async () => {
        const { laundryWayId, laundryTime, laundryDetergentAmount, laundryWaterAmount } = laundrySettings;

        if (laundryWayId && laundryTime && laundryDetergentAmount && laundryWaterAmount) {
            const parsedLaundryTime = parseInt(laundryTime, 10);
            const parsedLaundryDetergentAmount = parseInt(laundryDetergentAmount, 10);
            const parsedLaundryWaterAmount = parseInt(laundryWaterAmount, 10);

            const newLaundrySupplyStock = {
                laundrySupplyCode: 'LS001',
                laundrySupplyStock: parsedLaundryDetergentAmount
            };

            try {
                const response = await fetch(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/location/facility/updateLaundryStock`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        Accept: '*/*',
                        Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                    },
                    body: JSON.stringify(newLaundrySupplyStock),
                });

                if (response.ok) {
                    console.log('세탁 용품 재고가 성공적으로 업데이트되었습니다.', newLaundrySupplyStock);
                } else {
                    console.error('세탁 용품 재고 업데이트 오류:', response.statusText);
                }
            } catch (error) {
                console.error('세탁 용품 재고 업데이트 중 오류 발생:', error);
            }

            setMaxTime(parsedLaundryTime);
            setIsRunning(prev => ({ ...prev, [selectedFacilityId]: true }));
            setIsModalVisible(false);
        } else {
            alert('모든 세탁 설정을 입력하세요.');
        }
    };

    const handleLaundrySettingsChange = (e) => {
        const { name, value } = e.target;
        setLaundrySettings(prevSettings => ({ ...prevSettings, [name]: value }));
    };

    const getPercentageStyle = (facilityId) => ({
        width: `${percentage(currentTimes[facilityId])}%`
    });

    const renderFilteredFacilities = () => filteredFacilities.map(facility => {
        const facilityId = facility.facilityId;
        const isFacilityRunning = isRunning[facilityId];

        return (
            <div key={facilityId} className={`facility ${isFacilityRunning ? 'running' : ''}`}>
                <h3>{facility.facilityDTO.facilityName}</h3>
                <div className="progress-bar">
                    <div className="progress" style={getPercentageStyle(facilityId)}></div>
                </div>
                <div className="time-display">
                    {currentMinutes(facilityId)}:{Math.floor((currentTimes[facilityId] % 1) * 60).toString().padStart(2, '0')}
                </div>
                <div className="button-container">
                    <button onClick={() => handleStart(facilityId)} disabled={isFacilityRunning}>시작</button>
                    <button onClick={() => handleComplete(facilityId)} disabled={!isFacilityRunning || isComplete(facilityId)}>완료</button>
                </div>
            </div>
        );
    });

    return (
        <div>
            <h1>Facility Drum Management</h1>
            <div>
                <label>
                    시설물 유형 선택:
                    <select value={selectedFacilityCode} onChange={(e) => setSelectedFacilityCode(e.target.value)}>
                        <option value="">선택</option>
                        <option value="1">드럼세탁기</option>
                        <option value="2">건조기</option>
                        <option value="3">세탁기</option>
                    </select>
                </label>
                <label>
                    시설물 선택:
                    <select value={selectedFacilityId} onChange={(e) => setSelectedFacilityId(e.target.value)} disabled={!selectedFacilityCode}>
                        <option value="">선택</option>
                        {facilityIds.map(id => (
                            <option key={id} value={id}>{id}</option>
                        ))}
                        <option value="신규">신규</option>
                    </select>
                </label>
                <label>
                    상태 선택:
                    <select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)} disabled={!selectedFacilityId}>
                        <option value="">선택</option>
                        <option value="등록">등록</option>
                        <option value="고장">고장</option>
                        <option value="삭제">삭제</option>
                    </select>
                </label>
                <button onClick={() => setIsRegisterFormVisible(true)} disabled={!selectedFacilityCode || !selectedFacilityId || !selectedStatus}>
                    상태 변경
                </button>
                {isRegisterFormVisible && (
                    <div ref={formRef} className="register-form">
                        <h2>시설물 상태 변경</h2>
                        <label>
                            시설물 유형 코드: {selectedFacilityCode}
                        </label>
                        <label>
                            시설물 ID: {selectedFacilityId}
                        </label>
                        <label>
                            상태: {selectedStatus}
                        </label>
                        <button onClick={handleRegister}>확인</button>
                        <button onClick={() => setIsRegisterFormVisible(false)}>취소</button>
                    </div>
                )}
            </div>
            <div className="facility-list">
                {renderFilteredFacilities()}
            </div>
            {isModalVisible && (
                <div className="modal-overlay">
                    <div className="modal-content" ref={modalRef}>
                        <h2>세탁 설정 입력</h2>
                        <label>
                            세탁 방법 ID:
                            <select name="laundryWayId" value={laundrySettings.laundryWayId} onChange={handleLaundrySettingsChange}>
                                <option value="">선택</option>
                                {facilityLaundryWayInfo.map(way => (
                                    <option key={way.laundryWayId} value={way.laundryWayId}>
                                        {way.laundryWayName}
                                    </option>
                                ))}
                            </select>
                        </label>
                        <label>
                            세탁 시간:
                            <input
                                type="number"
                                name="laundryTime"
                                value={laundrySettings.laundryTime}
                                onChange={handleLaundrySettingsChange}
                            />
                        </label>
                        <label>
                            세제 사용량:
                            <input
                                type="number"
                                name="laundryDetergentAmount"
                                value={laundrySettings.laundryDetergentAmount}
                                onChange={handleLaundrySettingsChange}
                            />
                        </label>
                        <label>
                            물 사용량:
                            <input
                                type="number"
                                name="laundryWaterAmount"
                                value={laundrySettings.laundryWaterAmount}
                                onChange={handleLaundrySettingsChange}
                            />
                        </label>
                        <button onClick={handleModalSubmit}>시작</button>
                        <button onClick={() => setIsModalVisible(false)}>취소</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FacilityDrum;