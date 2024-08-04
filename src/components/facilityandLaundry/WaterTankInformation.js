import './WaterTnakInformation.css';
import waterTank from '../../assets/waterTank.png';
import React, { useState, useEffect } from 'react';
import { fetchWaterLevel } from '../../apis/LandryAPICall';
import { useDispatch, useSelector } from 'react-redux';
import WaterTankModal from './WaterTankModal';
import jwt_decode from 'jwt-decode';

function WaterTankInformation({ onModalConfirmed }) { // 추가된 콜백 함수 prop
    const dispatch = useDispatch();
    const waterTanks = useSelector(state => state.waterLevelReducer.waterTanks);
    const [waterLevel, setWaterLevel] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [branchCode, setBranchCode] = useState(null);
    const [modalConfirmed, setModalConfirmed] = useState(false);

    const members = jwt_decode(window.localStorage.getItem('accessToken'));

    useEffect(() => {
        console.log("컴포넌트 2입니다.")
        try {
            const branchState = JSON.parse(window.localStorage.getItem('branch'));
            if (branchState) {
                setBranchCode(branchState.branchCode);
            }
        } catch (error) {
            console.error("조회한 브런치 코드가 없습니다.", error);
        }
    }, [members]);

    useEffect(() => {
        dispatch(fetchWaterLevel());
    }, [dispatch, modalConfirmed]);

    useEffect(() => {
        if (branchCode && waterTanks.length > 0) {
            const tank = waterTanks.find(t => t.branchCode === branchCode);
            if (tank) {
                setWaterLevel(tank.waterCurCapacity);
            } else {
                setWaterLevel(null);
            }
        }
    }, [branchCode, waterTanks]);

    // console.log("여기 "+ branchCode);

    const calculateTopValue = (level) => {
        const minLevel = 0;
        const maxLevel = 10000;
        const minTop = -35;
        const maxTop = 45;

        const ratio = (maxTop - minTop) / (maxLevel - minLevel);
        return minTop + ratio * (maxLevel - level);
    };

    const topValue = calculateTopValue(waterLevel);

    const handleOpenModal = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleConfirmModal = () => {
        setShowModal(false);
        setModalConfirmed(prevState => !prevState); // modalConfirmed 상태 변경
        onModalConfirmed(); // 콜백 함수 호출
        console.log("급수 완료");
    };

    return (
        <>
            <div style={{ width: '165px', height: '100%' }}>
                <div style={{ height: '8%' }}></div>
                <div style={{ width: '165px', height: '70%', display: 'flex', justifyContent: 'center' }}>
                    <div style={{ height: '100%', position: 'relative' }}>
                        <div className="wrapper" style={{ width: '165px', height: '100%', position: 'relative' }}>
                            <div className="c_water" style={{ overflow: 'hidden' }}>
                                <div style={{ width: '130px', height: '82px', position: 'relative', overflow: 'hidden' }}>
                                </div>
                                <div className="frame" style={{ top: `${topValue}px` }}>
                                    <div className="wave"></div>
                                    <div className="wave layer_1"></div>
                                </div>
                            </div>
                            <span className='waterText'>{waterLevel}L</span>
                            <img src={waterTank} className='waterTank' alt="waterTank" style={{ width: '160px', height: 'auto' }} />
                        </div>
                        <div style={{ width: '165px', height: '20%', color: 'white', fontSize: '13px', position: 'relative' }}>
                            <div>
                                <p style={{ position: 'absolute', top: '-20px' }}>*총 용량: 10000L</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '22%' }}>
                    <button className="waterTankButton" onClick={handleOpenModal}>급수하기</button>
                </div>
            </div>
            <WaterTankModal
                showModal={showModal}
                handleClose={handleCloseModal}
                handleConfirm={handleConfirmModal}
                waterLevel={waterLevel}
                branchCode={branchCode}
            />
        </>
    );
}

export default WaterTankInformation;
