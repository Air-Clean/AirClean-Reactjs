import './WaterTankModal.css';
import './WaterTnakInformation.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { fetchWaterLevel } from '../../apis/LandryAPICall';
import { useDispatch, useSelector } from 'react-redux';

function WaterTankModal({ showModal, handleClose, handleConfirm, waterLevel, branchCode }) { // branchCode prop 추가

    const dispatch = useDispatch();
    const waterCondition = useSelector(state => state.selectLocationWater.waterCondition);
    const [supplyAmount, setSupplyAmount] = useState(0);

    useEffect(() => {
        dispatch(fetchWaterLevel());
    }, [dispatch]);

    const getStatusEmoji = (key, value) => {
        switch (key) {
            case 'wTemp':
                return value < 20 ? '🟢' : value < 25 ? '🟡' : '🔴';
            case 'wPh':
                return value >= 6.5 && value <= 8.5 ? '🟢' : value >= 6.0 && value < 6.5 || value > 8.5 && value <= 9.0 ? '🟡' : '🔴';
            case 'wDo':
                return value > 7.5 ? '🟢' : value > 5.0 ? '🟡' : '🔴';
            case 'wTn':
                return value < 1 ? '🟢' : value < 3 ? '🟡' : '🔴';
            case 'wTp':
                return value < 0.1 ? '🟢' : value < 0.2 ? '🟡' : '🔴';
            case 'wPhen':
                return value < 0.005 ? '🟢' : value < 0.01 ? '🟡' : '🔴';
            case 'wCn':
                return value < 0.05 ? '🟢' : value < 0.1 ? '🟡' : '🔴';
            default:
                return '🟢';
        }
    };

    if (!showModal) {
        return null;
    }

    const warningConditions = Object.entries(waterCondition).filter(([key, value]) => {
        const status = getStatusEmoji(key, value);
        return status === '🟡' || status === '🔴';
    });

    const handleConfirmAndPost = async () => {
        try {
            const token = window.localStorage.getItem('accessToken');
            const formattedWaterLevel = {
                MSR_DATE: waterCondition.msrDate,
                MSR_TIME: waterCondition.msrTime,
                SITE_ID: waterCondition.siteId,
                W_TEMP: waterCondition.wTemp,
                W_PH: waterCondition.wPh,
                W_DO: waterCondition.wDo,
                W_TN: waterCondition.wTn,
                W_TP: waterCondition.wTp,
                W_TOC: waterCondition.wToc,
                W_PHEN: waterCondition.wPhen,
                W_CN: waterCondition.wCn
            };
            console.log('Sending data:', { waterLevel, formattedWaterLevel, branchCode, supplyAmount });
            const response = await axios.post(`http://${process.env.REACT_APP_RESTAPI_IP}:8080/location/waterSupply`, 
                {
                    formattedWaterLevel,
                    waterLevel,
                    branchCode, // branchCode 추가
                    supplyAmount // supplyAmount 추가
                },
                {
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }
            );

            console.log('급수 완료', response.data);
            handleConfirm();
        } catch (error) {
            console.error('급수 실패', error);
            console.log('Error response:', error.response);
        }
    };

    const maxSupplyAmount = 10000 - waterLevel;

    return (
        <div className="modal-overlay">
            <div className="modal-content2">
                <div className="modal-header">
                    <h2>급수 확인</h2>
                </div>
                <div className="modal-body">
                    <p>현재 물의 양: {waterLevel.msrDate} {waterLevel.siteId} 등등...</p> {/* waterLevel 표시 */}
                    {warningConditions.length > 0 ? (
                        warningConditions.map(([key, value]) => (
                            <p key={key}>
                                {key}: {value} {getStatusEmoji(key, value)}
                            </p>
                        ))
                    ) : (
                        <p>정상 상태입니다.</p>
                    )}
                    <br></br>
                    <p>정말로 급수를 진행하시겠습니까?</p>
                    <label>
                        급수량 (최대 {maxSupplyAmount} L):
                        <input
                            type="number"
                            value={supplyAmount}
                            onChange={(e) => setSupplyAmount(Math.min(e.target.value, maxSupplyAmount))}
                            max={maxSupplyAmount}
                            min="0"
                        />
                    </label>
                </div>
                <div className="modal-buttons">
                    <button className="confirm-button" onClick={handleConfirmAndPost}>확인</button> {/* handleConfirmAndPost 호출 */}
                    <button className="cancel-button" onClick={handleClose}>취소</button>
                </div>
            </div>
        </div>
    );
}

export default WaterTankModal;
