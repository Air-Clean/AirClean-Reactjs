import React, { useEffect, useState } from 'react';
import './Modal.css'; // 올바른 경로로 수정

// 매출보고서 모달
function BranchSalesModal ({ show, onClose }) {
    // 제출일 오늘 이전 날짜 선택 못하게 설정
    const [minDate, setMinDate] = useState('');

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setMinDate(formattedDate);
    }, []);

    if (!show) {
        return null;
    }

    return (
        <div className="modalBackdrop">
            <div className="modalContent">
                <span className="close" onClick={onClose}>&times;</span>
                <h2 className="modalTitle">매출 보고서</h2>
                <div className="formGroup">
                    <label>지점명 :</label>
                    <input type='text' placeholder='차량번호를 입력해주세요'/>
                </div>
                <div className="formGroup">
                    <label>지점장명 :</label>
                    <input type='text' placeholder='차량기사를 입력해주세요'/>
                </div>
                <div className="formGroup">
                    <label>일 매출 :</label>
                    <input type='text' placeholder='일매출을 입력해주세요'/>
                </div>
                <div className="formGroup">
                    <label>세제 :</label>
                    <input type='text' placeholder='오늘의 세제 매출을 입력해주세요'/>
                </div>
                <div className="formGroup">
                    <label>섬유유연제 :</label>
                    <input type='text' placeholder='오늘의 섬유유연제 매출을 입력해주세요'/>
                </div>
                <div className="formGroup">
                    <label>표백제 :</label>
                    <input type='text' placeholder='오늘의 표백제 매출을 입력해주세요'/>
                </div>
                <div className="formGroup">
                    <label>얼룩제거제 :</label>
                    <input type='text' placeholder='오늘의 얼룩제거제 매출을 입력해주세요'/>
                </div>
                <div className="formGroup">
                    <label>세탁조 클리너 :</label>
                    <input type='text' placeholder='오늘의 세탁조클리너 매출을 입력해주세요'/>
                </div>
                <div className="formGroup">
                    <label>건조기 시트 :</label>
                    <input type='text' placeholder='오늘의 건조기시트 매출을 입력해주세요'/>
                </div>
                <div className="formGroup">
                    <label>제출일</label>
                    <input type="date" min={minDate} />
                </div>
                <div className="formGroup">
                    <label>비고</label>
                    <textarea placeholder="특이사항을 입력하세요"></textarea>
                </div>
                <div className="formButtons">
                    <button>등록</button>
                    <button onClick={onClose}>닫기</button>
                </div>
            </div>
        </div>
    );
}

export default BranchSalesModal;