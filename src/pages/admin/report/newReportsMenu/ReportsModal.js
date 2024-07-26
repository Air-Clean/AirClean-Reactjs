import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callCarMembersAPI } from '../../../../apis/ReportAPICalls';
import styles from './ReportsModal.module.css';

function ReportsModal({ show, onClose }) {
const dispatch = useDispatch();
 // 제출일 오늘 이전 날짜 선택 못하게 설정
 // ('') : 빈배열로 지정
 const [minDate, setMinDate] = useState('');     
 // redux store에서 carMembers 불러오기
 const carMembers = useSelector(state => state.carMembersReducer); 
 const [selectedCarNumber, setSelectedCarNumber] = useState('');
 const [selectedDriverName, setSelectedDriverName] = useState('');

 // 컴포넌트가 마운트될 때 차량 정보 불러오기
 useEffect(() => {
  dispatch(callCarMembersAPI()); 
}, [dispatch]);

  // 선택한 차량 번호에 해당하는 운전기사 이름 찾기
useEffect(() => {
  const selectedCar = carMembers.find(car => car.carNumber === selectedCarNumber);
  setSelectedDriverName(selectedCar ? selectedCar.memberName : '');
}, [selectedCarNumber, carMembers]);


 // useEffect : 함수/의존성배열 => 배열이 변할때 마다 작동
 useEffect(() => {
     const today = new Date();
     // toISOString:  ISO 형식(YYYY-MM-DDTHH:mm.sssZ) 변환해주는 메소드
     // split('T')[0] : T를 기준으로 날짜, 시간 문자열 분리 -> YYYY-MM-DD 사용함
     const formattedDate = today.toISOString().split('T')[0];        
     setMinDate(formattedDate);
 }, [])

if (!show) {
 return null;
}

return (
  <div className={styles.modalBackdrop}>
    <div className={styles.modalContent}>
      <h2 className={styles.modalTitle}>차량 수리비 보고서</h2>
      <div className={styles.formContainer}>
        <div className={styles.formGroup}>
          <label>차량번호 :</label>
          <select
            value={selectedCarNumber}
            onChange={e => setSelectedCarNumber(e.target.value)}
          >
            <option value="">차량번호를 선택해주세요</option>
            {carMembers.map(car => (
              <option key={car.carNumber} value={car.carNumber}>
                {car.carNumber}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>차량기사 :</label>
          <input type="text" value={selectedDriverName} readOnly />
        </div>
        <div className={styles.formGroup}>
          <label>종류 :</label>
          <select>
            <option>종류 선택</option>
            <option>주유비</option>
            <option>수리비</option>
            <option>정기정검</option>
            <option>기타</option>
          </select>
        </div>
        <div className={styles.formGroup}>
          <label>총 금액 :</label>
          <input type="text" placeholder="총 금액을 입력해주세요" />
        </div>
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label>제출일</label>
          <input type="date" min={minDate} />
        </div>
        <div className={styles.photoContainer}>
          <div className={styles.formGroup}>
            <label>수리 사진 전</label>
            <input type="file" accept="image/*" />
          </div>
          <div className={styles.formGroup}>
            <label>수리 사진 후</label>
            <input type="file" accept="image/*" />
          </div>
        </div>
        <div className={`${styles.formGroup} ${styles.fullWidth}`}>
          <label>특이사항</label>
          <textarea placeholder="특이사항을 입력하세요"></textarea>
        </div>
      </div>
      <div className={styles.formButtons}>
        <button>등록</button>
        <button onClick={onClose}>닫기</button>
      </div>
    </div>
  </div>
);
}

export default ReportsModal;