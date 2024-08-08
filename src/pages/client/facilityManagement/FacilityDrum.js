import React, { useState, useEffect, useRef } from 'react';
import './FacilityManagement.css';
import { useDispatch, useSelector } from 'react-redux';
import { callFacilityDetailInfoAPI, callFacilityLaundryWayInfoAPI } from '../../../apis/FacilityAPICalls';
import { fetchWaterLevel } from '../../../apis/LandryAPICall';
import { facilityLaundryWayReducer } from '../../../modules/FacilityModule';
import { S } from '@table-library/react-table-library/select-d972db04';

function FacilityDrum() {
    const dispatch = useDispatch();
    const facilityDetail = useSelector(state => state.facilityDetailInfoReducer);
    const branchWaterInfo = useSelector(state => state.waterLevelReducer);
    const facilityLaundryWatyInfo = useSelector(state => state.facilityLaundryWayReducer);

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
    const [laundryTodoId, setLaundryTodoId] = useState([]);

    const maxTimeDefault = 0.2; // 기본 최대 시간 (분 단위)
    const [maxTime, setMaxTime] = useState(maxTimeDefault); // 최대 시간 상태 관리
    const intervalRefs = useRef({});
    const formRef = useRef(null); // Ref for the form element

    // Modal states
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedLaundryWayId, setSelectedLaundryWayId] = useState('');
    const [laundryTime, setLaundryTime] = useState(maxTimeDefault);
    const [laundryDetergentAmount, setLaundryDetergentAmount] = useState(0);
    const [laundryWaterAmount, setLaundryWaterAmount] = useState(0);

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
    }, [isRunning, maxTime]);

    const handleStart = (facilityId) => {
        console.log('handleStart 호출됨:', facilityId);
        const selectedFacility = facilityDetail.find(item => item.facilityId === facilityId);
        if (selectedFacility) {
            setSelectedLaundryWayId(selectedFacility.laundryWayId); // Set the correct laundry way ID
        }
        setSelectedFacilityId(facilityId);
        setIsModalVisible(true);
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

    const handleModalConfirm = () => {
        setMaxTime(laundryTime);
        setIsRunning(prev => ({ ...prev, [selectedFacilityId]: true }));
        const changeId =[...laundryTodoId]
        changeId.concat(selectedLaundryWayId)
        setLaundryTodoId(changeId)
        setIsModalVisible(false);
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

    const [todoItems, setTodoItems] = useState(() => {
        return facilityLaundryWatyInfo.map(laundry => ({
            id: laundry.laundryWayId,
            text: `${laundry.laundryWayId}번. 옷감: ${laundry.laundry.laundryFabricType} level: ${laundry.laundry.laundryDirtyLevel}`,
            completed: false
        }));
    });

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
        .filter(facility => facility.facilityDTO.facilityCode === parseInt(selectedFacilityCode))
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
        if (selectedLaundryWayId) {
            const selectedLaundryWay = facilityLaundryWatyInfo.find(way => way.laundryWayId === selectedLaundryWayId);
            if (selectedLaundryWay) {
                setLaundryTime(selectedLaundryWay.time || maxTimeDefault);
                setLaundryDetergentAmount(selectedLaundryWay.detergentAmount || 0);
                setLaundryWaterAmount(selectedLaundryWay.waterAmount || 0);
            }
        }
    }, [selectedLaundryWayId, facilityLaundryWatyInfo]);


    const handleLaundryWayChange = e => {

        console.log('asdfsdadsaf')
        setSelectedLaundryWayId(e.target.value);

        console.log('ddddd',e.target.value)
        setLaundryTime(facilityLaundryWatyInfo.filter(luaundry=> luaundry.laundryWayId === parseInt(e.target.value))[0].laundryTime)
        setLaundryDetergentAmount(facilityLaundryWatyInfo.filter(luaundry=> luaundry.laundryWayId === parseInt(e.target.value))[0].laundryDetergentAmount)
        setLaundryWaterAmount(facilityLaundryWatyInfo.filter(luaundry=> luaundry.laundryWayId === parseInt(e.target.value))[0].laundryWaterAmount)
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
                            {facility.facilityStatus === 'F' ? (
                                <div className="Facility-status-broken">수리 중</div>
                            ) : isComplete(facility.facilityId) ? (
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
                        <li 
                            key={item.id} 
                            className={`Facility-todo-item ${item.completed ? 'completed' : ''}`} 
                            style={{ marginBottom: '1em' }} // 리스트 간의 간격 추가
                        >
                            <input
                                type="checkbox"
                                checked={item.completed}
                                onChange={() => handleCheckboxChange(item.id)}
                                style={{ marginRight: '1em' }} // 체크박스의 margin-left 추가
                            />
                            <span
                                className="Facility-todo-text"
                                style={{ textDecoration: item.completed ? 'line-through' : 'none' }}
                            >
                                {item.text}
                            </span>
                        </li>
                    ))}
                </ul>


                <button className='facility-reg-button' onClick={() => setIsRegisterFormVisible(true)}>
                    시설물 등록하기
                </button>
            </div>
            {isRegisterFormVisible && (
                <div className='Facility-register-form' ref={formRef}>
                    시설물 등록
                    <select value={selectedFacilityCode} onChange={e => setSelectedFacilityCode(e.target.value)} className='Facility-select'>
                        <option value="">시설물 선택</option>
                        <option value="1">세탁기</option>
                        <option value="2">건조기</option>
                        <option value="3">드라이클리너</option>
                    </select>
                    <select value={selectedFacilityId} onChange={e => setSelectedFacilityId(e.target.value)} className='Facility-select'>
                        <option value="">시설물 ID 선택</option>
                        <option value="신규">신규</option>
                        {facilityIds.map(id => (
                            <option key={id} value={id}>{id}</option>
                        ))}
                    </select>
                    <select value={selectedStatus} onChange={e => setSelectedStatus(e.target.value)} className='Facility-select'>
                        <option value="">상태 선택</option>
                        <option value="등록" disabled={selectedFacilityId !== '신규'}>등록</option>
                        <option value="고장" disabled={selectedFacilityId === '신규'}>고장</option>
                        <option value="삭제" disabled={selectedFacilityId === '신규'}>삭제</option>
                        <option value="수리 완료" disabled={selectedFacilityId === '신규'}>수리 완료</option>
                    </select>
                    <button onClick={handleRegister} className='Facility-register-button'>
                        저장
                    </button>
                </div>
            )}
            {isModalVisible && (
                <div className="facility-modal">
                    <div className="facility-modal-content">
                        <h2>세탁 설정</h2>
                        <label>
                            세탁 방법:
                            <select name={selectedLaundryWayId} onChange={handleLaundryWayChange}>
                                <option value="">선택하세요</option>
                                {facilityLaundryWatyInfo.map(way => (
                                    <option key={way.laundryWayId} value={way.laundryWayId}>{way.laundryWayId}</option>
                                ))}
                            </select>
                        </label>
                        <label>
                            
                            세탁 시간 (분):
                            <input
                                type="number"
                                value={laundryTime}
                                onChange={e => setLaundryTime(e.target.value)}
                                min="0.5"
                            />
                        </label>
                        <label>
                            세제 양 (ml):
                            <input
                                type="number"
                                value={laundryDetergentAmount}
                                onChange={e => setLaundryDetergentAmount(e.target.value)}
                                min="1"
                                step="5"
                            />
                        </label>
                        <label>
                            물 양 (L):
                            <input
                                type="number"
                                value={laundryWaterAmount}
                                onChange={e => setLaundryWaterAmount(e.target.value)}
                                min="1"
                                step="1"
                            />
                        </label>
                        <button onClick={handleModalConfirm}>확인</button>
                        <button onClick={() => setIsModalVisible(false)}>취소</button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FacilityDrum;
