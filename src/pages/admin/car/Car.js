import React, { useState, useEffect } from 'react';
import styles from './Car.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { callCarInfoListAPI } from '../../../apis/CarAPICalls';
import Paging from '../../../components/paging/Paging';

function Car() {
    const dispatch = useDispatch();
    const carList = useSelector(state => state.carInfoReducer);
    
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(5); // Number of items to display per page

    useEffect(() => {
        dispatch(callCarInfoListAPI());
    }, [dispatch]);

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

    const indexOfLastCar = currentPage * itemsPerPage;
    const indexOfFirstCar = indexOfLastCar - itemsPerPage;
    const currentCars = cars.slice(indexOfFirstCar, indexOfLastCar);

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

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    };

    const renderPageNumbers = [];
    for (let i = 1; i <= Math.ceil(cars.length / itemsPerPage); i++) {
        renderPageNumbers.push(i);
    }

    const renderPageNumbersComponents = renderPageNumbers.map(number => (
        <li
            key={number}
            id={number}
            onClick={handleClick}
            className={currentPage === number ? styles.active : null}
        >
            {number}
        </li>
    ));

    const [setCurrent] = useState(1);

    return (
        <div className={styles.carLayout}>
            <div className={styles.flexWrap}>
                <div className={styles.carLayer}>
                    <h1 className={styles.title}>물류 시스템 관리</h1>
                    <div className={styles.buttonGroup}>
                        <button className={`${styles.button} ${styles.register}`} onClick={() => setShowRegisterForm(true)}>등록</button>
                        {!showCheckboxes && (
                            <button className={`${styles.button} ${styles.delete}`} onClick={() => {
                                if (cars.length > 0) setShowCheckboxes(prev => !prev);
                            }}>삭제</button>
                        )}
                        {showCheckboxes && selectedCars.length > 0 && (
                            <button className={`${styles.button} ${styles.deleteConfirm}`} onClick={handleDelete}>삭제 확인</button>
                        )}
                    </div>
                    <table className={styles.carTable}>
                        <thead>
                            <tr className={styles.carTr}>
                                {showCheckboxes && <th className={styles.carTh}>선택</th>}
                                <th className={styles.carTh}>순서</th>
                                <th className={styles.carTh}>차량 번호</th>
                                <th className={styles.carTh} style={{ width: '200px' }}>지역</th>
                                <th className={styles.carTh}>운전자 성명</th>
                                <th className={styles.carTh}>배정 여부</th>
                                <th className={styles.carTh}>배정하기</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentCars.map((car, index) => (
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
                                    <td className={styles.carTd}>{indexOfFirstCar + index + 1}</td>
                                    <td className={styles.carTd}>{car.carNumber}</td>
                                    <td className={styles.carTd}>{car.branch}</td>
                                    <td className={styles.carTd}>{car.region}</td>
                                    <td className={`${car.assigned ? styles.assigned : styles.notAssigned} ${styles.carTd}`}>
                                        {car.assigned ? 'Y' : <span className={styles.notAssignedText}>N</span>}
                                    </td>
                                    <td className={styles.carTd}>
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
                        <div className={styles.modal} onClick={() => setShowRegisterForm(false)}>
                            <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
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
                    {/* <Paging setCurrent={setCurrent} end={}/> */}
                </div>
            </div>
        </div>
    );
}

export default Car;
