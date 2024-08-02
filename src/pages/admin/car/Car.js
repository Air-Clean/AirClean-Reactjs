// src/pages/admin/car/Car.js
import React, { useEffect, useState } from 'react';
import styles from './Car.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { callCarInfoListAPI ,callDriverWithNoAssigned} from '../../../apis/CarAPICalls';
import Paging from '../../../components/paging/Paging';

function Car() {
    const dispatch = useDispatch();
    const car = useSelector(state => state.carReducer);

    console.log('차량정보', car);

    const carList = car?.carList?.content;
    const totalpage = car?.carList?.totalPages;

    const [current, setCurrent] = useState(1);

    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [showAssignForm, setShowAssignForm] = useState(false);
    const [showUnassignConfirm, setShowUnassignConfirm] = useState(false);
    const [newCar, setNewCar] = useState({ carNumber: '', carDate: '', carPhoto1: null, carPhoto2: null, carEtc: '' });
    const [selectedCar, setSelectedCar] = useState(null);
    const [selectedDriver, setSelectedDriver] = useState('');
    const [drivers, setDrivers] = useState([
        { name: 'Driver1', assigned: false },
        { name: 'Driver2', assigned: false },
        { name: 'Driver3', assigned: false },
    ]);
    const [showCheckboxes, setShowCheckboxes] = useState(false);
    const [selectedCars, setSelectedCars] = useState([]);
    const [carDateError, setCarDateError] = useState('');

    useEffect(() => {
        dispatch(callCarInfoListAPI({ current }));
    }, [dispatch, current]);

    const handleRegisterChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'carDate') {
            const datePattern = /^\d{4}-\d{2}-\d{2}$/;
            if (!datePattern.test(value)) {
                setCarDateError('출고일은 "연도-월-일" 형식이어야 합니다.');
                return;
            } else {
                setCarDateError('');
            }
        }
        if (files) {
            setNewCar({ ...newCar, [name]: files[0] });
        } else {
            setNewCar({ ...newCar, [name]: value });
        }
    };

    const callApiHandler=()=>{
        dispatch(callDriverWithNoAssigned())
    }

    const noDriver = useSelector(state=>state.carDriverReducer)

    console.log('noDriver list ',noDriver)

    const handleRegisterSubmit = () => {
        if (newCar.carNumber && newCar.carDate && newCar.carPhoto1 && newCar.carPhoto2 && newCar.carEtc && !carDateError) {
            // 여기서는 그냥 등록된 데이터를 carList에 추가합니다.
            setShowRegisterForm(false);
            setNewCar({ carNumber: '', carDate: '', carPhoto1: null, carPhoto2: null, carEtc: '' });
        }
    };

    const handleAssign = () => {
        const driver = drivers.find(driver => driver.name === selectedDriver);
        const updatedCar = { ...selectedCar, driverName: driver.name, assigned: true };
        setDrivers(drivers.map(d => (d.name === driver.name ? { ...d, assigned: true } : d)));
        setShowAssignForm(false);
    };

    const handleUnassignConfirm = (car) => {
        setSelectedCar(car);
        setShowUnassignConfirm(true);
    };

    const handleUnassign = () => {
        const driverName = selectedCar.driverAndMemberDTO?.memberDTO.memberName;
        setDrivers(drivers.map(d => (d.name === driverName ? { ...d, assigned: false } : d)));
        // 업데이트된 차량 정보를 설정합니다.
        const updatedCarList = carList.map(c => c.carNumber === selectedCar.carNumber ? { ...c, carAssignedStatus: "N", driverAndMemberDTO: null } : c);
        // 여기서는 state를 업데이트할 필요가 있습니다.
        setShowUnassignConfirm(false);
        setSelectedCar(null);
    };

    const handleDelete = () => {
        setSelectedCars([]);
        setShowCheckboxes(false);
    };

    const handleCheckboxChange = (carNumber) => {
        setSelectedCars(prevSelectedCars =>
            prevSelectedCars.includes(carNumber)
                ? prevSelectedCars.filter(num => num !== carNumber)
                : [...prevSelectedCars, carNumber]
        );
    };

    return (
        <div className={styles.carLayout}>
            <div className={styles.flexWrap}>
                <div className={styles.carLayer}>
                    <h1 className={styles.title}>물류 시스템 관리</h1>
                    <div className={styles.buttonGroup}>
                        <button className={`${styles.button} ${styles.register}`} onClick={() => setShowRegisterForm(true)}>등록</button>
                        {!showCheckboxes && (
                            <button className={`${styles.button} ${styles.delete}`} onClick={() => {
                                if (carList.length > 0) setShowCheckboxes(prev => !prev);
                            }}>삭제</button>
                        )}
                        {showCheckboxes && (
                            <>
                                <button className={`${styles.button} ${styles.deleteConfirm}`} onClick={handleDelete}>삭제 확인</button>
                                <button className={`${styles.button} ${styles.cancel}`} onClick={() => setShowCheckboxes(false)}>취소</button>
                            </>
                        )}
                    </div>
                    <table className={styles.carTable}>
                        <thead>
                            <tr className={styles.carTr}>
                                {showCheckboxes && <th className={styles.carTh}>선택</th>}
                                <th className={styles.carTh}>순서</th>
                                <th className={styles.carTh}>차량 번호</th>
                                <th className={styles.carTh}>지역</th>
                                <th className={styles.carTh}>운전자 성명</th>
                                <th className={styles.carTh}>배정 여부</th>
                                <th className={styles.carTh}>배정/취소</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carList?.map((car, index) => (
                                <tr key={car.carNumber} className={styles.carTr}>
                                    {showCheckboxes && (
                                        <td className={styles.carTd}>
                                            <input
                                                type="checkbox"
                                                checked={selectedCars.includes(car.carNumber)}
                                                onChange={() => handleCheckboxChange(car.carNumber)}
                                            />
                                        </td>
                                    )}
                                    <td className={styles.carTd}>{index + 1}</td>
                                    <td className={styles.carTd}>{car.carNumber}</td>
                                    <td className={styles.carTd}>{car.branchRegion}</td>
                                    <td className={styles.carTd}>{car.carAssignedStatus === "Y" ? car.driverAndMemberDTO?.memberDTO.memberName : "N/A"}</td>
                                    <td className={`${car.carAssignedStatus === "Y" ? styles.assigned : styles.notAssigned} ${styles.carTd}`}>
                                        {car.carAssignedStatus === "Y" ? '배정됨' : '미배정'}
                                    </td>
                                    <td className={styles.carTd}>
                                        {car.carAssignedStatus !== "Y" ? (
                                            <button
                                                className={`${styles.button} ${styles.assign}`}
                                                onClick={() => {
                                                    setSelectedCar(car.carNumber);
                                                    setShowAssignForm(true);
                                                    callApiHandler();
                                                }}
                                            >
                                                배정하기
                                            </button>
                                        ) : (
                                            <button
                                                className={`${styles.button} ${styles.cancel}`}
                                                onClick={() => handleUnassignConfirm(car)}
                                            >
                                                배정취소
                                            </button>
                                        )}
                                    </td>
                                </tr>
                                
                            ))}
                            
                        </tbody>
                        
                    </table>
                    <Paging setCurrent={setCurrent} end={totalpage} />
                </div>
            </div>
            {showRegisterForm && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h2>차량 등록</h2>
                        </div>
                        <form>
                            <label>차량 번호:</label>
                            <input type="text" name="carNumber" value={newCar.carNumber} onChange={handleRegisterChange} />
                            <label>출고일:</label>
                            <input type="date" name="carDate" value={newCar.carDate} onChange={handleRegisterChange} />
                            {carDateError && <p className={styles.error}>{carDateError}</p>}
                            <label>차량 사진 1:</label>
                            <input type="file" name="carPhoto1" onChange={handleRegisterChange} />
                            <label>차량 사진 2:</label>
                            <input type="file" name="carPhoto2" onChange={handleRegisterChange} />
                            <label>특이사항:</label>
                            <input type="text" name="carEtc" value={newCar.carEtc} onChange={handleRegisterChange} />
                            <div className={styles.buttonGroupModal}>
                                <button type="button" className={styles.button} onClick={handleRegisterSubmit}>등록</button>
                                <button type="button" className={styles.button} onClick={() => setShowRegisterForm(false)}>취소</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {showAssignForm && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h2>운전자 배정</h2>
                        </div>
                        <label>운전자 선택:</label>
                        <select value={selectedDriver} onChange={(e) => setSelectedDriver(e.target.value)}>
                            <option value="">운전자를 선택하세요</option>
                            {noDriver.map(driver => (
                                <option key={driver.name} value={driver.memberId}>
                                    {driver.memberName}
                                </option>
                            ))}
                        </select>
                        <div className={styles.buttonGroupModal}>
                            <button type="button" className={styles.button} onClick={handleAssign}>배정</button>
                            <button type="button" className={styles.button} onClick={() => setShowAssignForm(false)}>취소</button>
                        </div>
                    </div>
                </div>
            )}
            {showUnassignConfirm && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <div className={styles.modalHeader}>
                            <h2>배정 취소 확인</h2>
                        </div>
                        <p>정말로 배정을 취소하시겠습니까?</p>
                        <div className={styles.buttonGroupModal}>
                            <button type="button" className={styles.button} onClick={handleUnassign}>예</button>
                            <button type="button" className={styles.button} onClick={() => setShowUnassignConfirm(false)}>아니오</button>
                        </div>
                    </div>
                </div>
            )}
            
        </div>
    );
}

export default Car;
