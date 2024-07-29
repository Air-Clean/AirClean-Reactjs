import './WaterTnakInformation.css'
import waterTank from '../../assets/waterTank.png';
import React, { useState, useEffect } from 'react';

function WaterTankInformation() {

    const [waterLevel, setWaterLevel] = useState(7500); // 초기 물의 양 예시로 7500L 설정

    useEffect(() => {
        // 서버에서 물의 양을 가져오는 예시 (비동기 호출)
        async function fetchWaterLevel() {
            // 서버 호출 예시 (axios 사용 가능)
            // const response = await axios.get('/api/water-level');
            // setWaterLevel(response.data.level);
            
            // 여기서는 예시로 랜덤 값을 설정합니다.
            const level = '8000';
            setWaterLevel(level);
        }

        fetchWaterLevel();
    }, []);

    // 물의 양을 퍼센트로 변환 (10000L일 때 100%)
    const waterHeightPercentage = Math.min((waterLevel / 10000) * 100, 100);

    // top 값을 물의 양에 따라 조정
    const calculateTopValue = (level) => {
        const minLevel = 0;
        const maxLevel = 10000;
        const minTop = -35;
        const maxTop = 45;
        
        // 비율 계산
        const ratio = (maxTop - minTop) / (maxLevel - minLevel);
        return minTop + ratio * (maxLevel - level);
    }

    const topValue = calculateTopValue(waterLevel);
  
    return(
        <>
            <div style={{width:'165px', height:'100%'}}>
                <div style={{height:'8%'}}></div>
                <div style={{width:'165px', height:'70%', display:'flex', justifyContent:'center'}}>
                    <div style={{ height:'100%', position:'relative'}}>
                        <div className="wrapper" style={{ width:'165px', height:'100%', position:'relative'}}>
                            <div className="water" style={{overflow: 'hidden'}}>

                                <div style={{width:'130px', height:'82px', position:'relative', overflow:'hidden'}}>

                                </div>
                                <div className="frame" style={{top: `${topValue}px`}}>
                                    <div className="wave"></div>
                                    <div className="wave layer_1"></div>
                                </div>
                            </div>
                            <span className='waterText'>6000L</span>

                            <img src={waterTank} className='waterTank' alt="waterTank" style={{width:'160px', height:'auto'}}/>
                        </div>


                        <div style={{ width:'165px', height:'20%', color:'white', fontSize:'13px', position:'relative'}}>
                            <div>
                                <p style={{position:'absolute', top: '-20px'}}>*총 용량: 10000L</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{display:'flex', justifyContent:'center', alignItems:'center',height:'22%'}}>
                    <button className="waterTankButton">급수하기</button>
                </div>
            </div>
        </>
    );
}

export default WaterTankInformation;
