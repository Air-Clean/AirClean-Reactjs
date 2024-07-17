import React, { useState } from 'react';
import './Car.css';

function Car() {
    const [cars, setCars] = useState([]);
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    const [showAssignForm, setShowAssignForm] = useState(false);
    const [newCar, setNewCar] = useState({ carNumber: '', carDate: '', carPhoto: '', carEtc: '' });
    const [selectedCar, setSelectedCar] = useState(null);
    const [drivers, setDrivers] = useState([
        { name: 'Driver1', assigned: false },
        { name: 'Driver2', assigned: true },
        { name: 'Driver3', assigned: false },
    ]);

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setNewCar({ ...newCar, [name]: value });
    };

    const handleRegisterSubmit = () => {
        setCars([{ ...newCar, assigned: false }, ...cars]);
        setShowRegisterForm(false);
    };

    const handleAssign = (driver) => {
        const updatedCar = { ...selectedCar, driverName: driver.name, assigned: true };
        setCars(cars.map(car => (car.carNumber === selectedCar.carNumber ? updatedCar : car)));
        setShowAssignForm(false);
    };

    const handleDelete = (carNumber) => {
        setCars(cars.filter(car => car.carNumber !== carNumber));
    };

    return (
        <div className="car_layout">
            <div className="flex_wrap">
                <h1>
                    <div className="title">물류 시스템 관리</div>
                    <div>
                        <button className="button register" onClick={() => setShowRegisterForm(true)}>등록</button>
                        <button className="button delete" onClick={() => selectedCar && handleDelete(selectedCar.carNumber)}>삭제</button>
                    </div>
                    <table>
                        <thead>
                            <tr>
                                <th>순서</th>
                                <th>차량 번호</th>
                                <th>운전자 성명</th>
                                <th>지점</th>
                                <th>지역</th>
                                <th>배정 여부</th>
                                <th>삭제</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars.map((car, index) => (
                                <tr key={car.carNumber}>
                                    <td>{index + 1}</td>
                                    <td><button className="car_button" onClick={() => { setSelectedCar(car); setShowAssignForm(true); }}>{car.carNumber}</button></td>
                                    <td>{car.driverName}</td>
                                    <td>{car.branch}</td>
                                    <td>{car.region}</td>
                                    <td className={car.assigned ? 'assigned' : 'not_assigned'}>
                                        {car.assigned ? '배정됨' : 'N'}
                                    </td>
                                    <td><button className="button delete" onClick={() => handleDelete(car.carNumber)}>삭제</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {showRegisterForm && (
                        <div className="modal">
                            <div className="modal_content">
                                <h2>차량 등록</h2>
                                <label>차량 번호</label>
                                <input type="text" name="carNumber" onChange={handleRegisterChange} />
                                <label>출고일</label>
                                <input type="date" name="carDate" onChange={handleRegisterChange} />
                                <label>차량 사진</label>
                                <input type="text" name="carPhoto" onChange={handleRegisterChange} />
                                <label>특이사항</label>
                                <input type="text" name="carEtc" onChange={handleRegisterChange} />
                                <button className="button register" onClick={handleRegisterSubmit}>등록</button>
                                <button className="button cancel" onClick={() => setShowRegisterForm(false)}>취소</button>
                            </div>
                        </div>
                    )}

                    {showAssignForm && selectedCar && (
                        <div className="modal">
                            <div className="modal_content">
                                <button className="button cancel top_right" onClick={() => setShowAssignForm(false)}>취소</button>
                                <h2>차량 배정</h2>
                                <label>차량 번호</label>
                                <p>{selectedCar.carNumber}</p>
                                <label>출고일</label>
                                <p>{selectedCar.carDate}</p>
                                <label>차량 사진</label>
                                <p>{selectedCar.carPhoto}</p>
                                <label>특이사항</label>
                                <p>{selectedCar.carEtc}</p>
                                <label>운전자 성명</label>
                                <select onChange={(e) => handleAssign(drivers.find(driver => driver.name === e.target.value))}>
                                    <option value="">선택</option>
                                    {drivers.map(driver => (
                                        <option key={driver.name} value={driver.name} disabled={driver.assigned}>
                                            {driver.name} {driver.assigned && '(배정됨)'}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    )}
                </h1>
            </div>
        </div>
    );
}

export default Car;
