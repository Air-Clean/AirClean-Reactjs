import React, { useState, useEffect } from 'react';
import styles from './Car.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { callCarInfoListAPI } from '../../../apis/CarAPICalls';

function Car() {
    const dispatch = useDispatch();
    const carList = useSelector(state => state.carInfoReducer);

    useEffect(() => {

        dispatch(callCarInfoListAPI());

    }, [dispatch]);

    console.log('차량리스트 API 호출:', carList);

    // carList가 업데이트될 때 cars 상태를 업데이트합니다.
    useEffect(() => {
        if (carList.length > 0) {
            setCars(carList);
        }
    }, [carList]);

    const [cars, setCars] = useState([]);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [showAssignForm, setShowAssignForm] = useState(false);
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
        console.log('showRegisterForm changed:', showRegisterForm);
    }, [showRegisterForm]);

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

    const handleRegisterSubmit = () => {
        if (newCar.carNumber && newCar.carDate && newCar.carPhoto1 && newCar.carPhoto2 && newCar.carEtc && !carDateError) {
            setCars([{ ...newCar, assigned: false }, ...cars]);
            setShowRegisterForm(false);
            setNewCar({ carNumber: '', carDate: '', carPhoto1: null, carPhoto2: null, carEtc: '' });
        }
    };

    const handleAssign = () => {
        const driver = drivers.find(driver => driver.name === selectedDriver);
        const updatedCar = { ...selectedCar, driverName: driver.name, assigned: true };
        setCars(cars.map(car => (car.carNumber === selectedCar.carNumber ? { ...updatedCar, assigned: true } : car)));
        setDrivers(drivers.map(d => (d.name === driver.name ? { ...d, assigned: true } : d)));
        setShowAssignForm(false);
    };

    const handleDelete = () => {
        setCars(cars.filter(car => !selectedCars.includes(car.carNumber)));
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

    console.log('Car component rendered');

    return (
        <div className={styles.carLayout}>
            <div className={styles.flexWrap}>
                <div className={styles.carLayer}>
                    <h1 className={styles.title}>물류 시스템 관리</h1>
                    <div className={styles.buttonGroup}>
                        <button className={`${styles.button} ${styles.register}`} onClick={() => {
                            console.log('Register button clicked');
                            setShowRegisterForm(true);
                        }}>등록</button>
                        {!showCheckboxes && (
                            <button className={`${styles.button} ${styles.delete}`} onClick={() => {
                                if (cars.length > 0) setShowCheckboxes(prev => !prev);
                            }}>삭제</button>
                        )}
                        {showCheckboxes && selectedCars.length > 0 && (
                            <button className={`${styles.button} ${styles.deleteConfirm}`} onClick={handleDelete}>삭제 확인</button>
                        )}
                    </div>
                    <table>
                        <thead>
                            <tr>
                                {showCheckboxes && <th>선택</th>}
                                <th>순서</th>
                                <th>차량 번호</th>
                                <th style={{ width: '200px' }}>지점</th>
                                <th style={{ width: '200px' }}>지역</th>
                                <th>운전자 성명</th>
                                <th>배정 여부</th>
                                <th>배정하기</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars.map((car, index) => (
                                <tr key={car.carNumber}>
                                    {showCheckboxes && (
                                        <td>
                                            <input
                                                type="checkbox"
                                                checked={selectedCars.includes(car.carNumber)}
                                                onChange={() => handleCheckboxChange(car.carNumber)}
                                            />
                                        </td>
                                    )}
                                    <td>{index + 1}</td>
                                    <td>{car.carNumber}</td>
                                    <td>{car.branch}</td>
                                    <td>{car.region}</td>
                                    <td>{car.driverName}</td>
                                    <td className={car.assigned ? styles.assigned : styles.notAssigned}>
                                        {car.assigned ? 'Y' : <span className={styles.notAssignedText}>N</span>}
                                    </td>
                                    <td>
                                        {!car.assigned && (
                                            <button
                                                className={`${styles.button} ${styles.assign}`}
                                                onClick={() => {
                                                    setSelectedCar(car);
                                                    setShowAssignForm(true);
                                                    setSelectedDriver('');
                                                }}
                                            >
                                                배정하기
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {showRegisterForm && (
                        <div className={styles.modal} onClick={(e) => {
                            console.log('Modal background clicked');
                            setShowRegisterForm(false);
                        }}>
                            <div className={styles.modalContent} onClick={e => {
                                console.log('Modal content clicked');
                                e.stopPropagation();
                            }}>
                                <h2>차량 등록</h2>
                                <label>차량 번호</label>
                                <input
                                    className={styles.inputField}
                                    type="text"
                                    name="carNumber"
                                    value={newCar.carNumber}
                                    onChange={handleRegisterChange}
                                />
                                <label>출고일</label>
                                <input
                                    className={styles.inputField}
                                    type="date"
                                    name="carDate"
                                    value={newCar.carDate}
                                    onChange={handleRegisterChange}
                                />
                                {carDateError && <p className={styles.error}>{carDateError}</p>}
                                <label>차량 사진 (앞) </label>
                                <input
                                    className={styles.inputField}
                                    type="file"
                                    name="carPhoto1"
                                    accept="image/*"
                                    onChange={handleRegisterChange}
                                />
                                <label>차량 사진 (뒤)</label>
                                <input
                                    className={styles.inputField}
                                    type="file"
                                    name="carPhoto2"
                                    accept="image/*"
                                    onChange={handleRegisterChange}
                                />
                                <label>특이사항</label>
                                <input
                                    className={styles.inputField}
                                    type="text"
                                    name="carEtc"
                                    value={newCar.carEtc}
                                    onChange={handleRegisterChange}
                                />
                                <div className={styles.buttonGroupModal}>
                                    <button
                                        className={`${styles.button} ${styles.register}`}
                                        onClick={handleRegisterSubmit}
                                        disabled={!newCar.carNumber || !newCar.carDate || !newCar.carPhoto1 || !newCar.carPhoto2 || !newCar.carEtc || carDateError}
                                    >
                                        등록
                                    </button>
                                    <button className={`${styles.button} ${styles.cancel}`} onClick={() => setShowRegisterForm(false)}>취소</button>
                                </div>
                            </div>
                        </div>
                    )}

                    {showAssignForm && selectedCar && (
                        <div className={styles.modal} onClick={() => setShowAssignForm(false)}>
                            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
                                <div className={styles.modalHeader}>
                                    <h2>차량 배정</h2>
                                </div>
                                <div className={styles.carInfo}>
                                    <label>차량 번호</label>
                                    <p>{selectedCar.carNumber}</p>
                                    <label>출고일</label>
                                    <p>{selectedCar.carDate}</p>
                                    <label>차량 사진 (앞)</label>
                                    <p>{selectedCar.carPhoto1 && <img src={URL.createObjectURL(selectedCar.carPhoto1)} alt="차량 사진 1" width="100" />}</p>
                                    <label>차량 사진 (뒤)</label>
                                    <p>{selectedCar.carPhoto2 && <img src={URL.createObjectURL(selectedCar.carPhoto2)} alt="차량 사진 2" width="100" />}</p>
                                    <label>특이사항</label>
                                    <p>{selectedCar.carEtc}</p>
                                </div>
                                <label>운전자 성명</label>
                                <select
                                    className={styles.inputField}
                                    value={selectedDriver}
                                    onChange={(e) => setSelectedDriver(e.target.value)}
                                >
                                    <option value="">선택</option>
                                    {drivers.map(driver => (
                                        <option key={driver.name} value={driver.name} disabled={driver.assigned}>
                                            {driver.name} {driver.assigned && '(배정됨)'}
                                        </option>
                                    ))}
                                </select>
                                <div className={styles.buttonGroupModal}>
                                    <button 
                                        className={`${styles.button} ${styles.assign}`} 
                                        onClick={handleAssign}
                                        disabled={!selectedDriver}
                                    >
                                        배정
                                    </button>
                                    <button className={`${styles.button} ${styles.cancel}`} onClick={() => setShowAssignForm(false)}>취소</button>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Car;
