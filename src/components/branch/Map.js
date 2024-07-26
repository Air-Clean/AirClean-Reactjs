import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Map.css';
import map1 from '../../assets/map1.png'; 
import map2 from '../../assets/map2.png'; 
import map3 from '../../assets/map3.png'; 
import map4 from '../../assets/map4.png'; 
import map5 from '../../assets/map5.png';

function Map({ onLocationChange }) {
    const [mapCounts, setMapCounts] = useState({
        중앙: 0,
        북부: 0,
        동부: 0,
        서부: 0,
        남부: 0,
    });

    // 서버로부터 데이터를 가져오는 함수
    const fetchMapCounts = async () => {
        const token = window.localStorage.getItem('accessToken');
        try {
            const response = await axios.get('/branch/mapCounts', {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });
            setMapCounts(response.data.data);  // response.data.data로 변경
        } catch (error) {
            console.error('Error fetching map counts:', error);
        }
    };

    useEffect(() => {
        // 컴포넌트가 마운트될 때 데이터 가져오기
        fetchMapCounts();
    }, []);

    const mouseHandler = (e) => {
        const locationName = e.target.alt;
        onLocationChange(locationName);
        // 지점 클릭 시 데이터를 업데이트 (필요에 따라 구현)
        fetchMapCounts();
    };

    return (
        <div className='mapLayout' style={{width:'250px', height: 'calc(35% - 15px)'}}>
            <div className='mapContainal' onClick={mouseHandler} style={{ display: 'flex', justifyContent: 'center', zIndex: '4' }}>
                <div className='mapItem'>
                    <img id='map' className='map1' src={map1} alt="중앙지점" />
                    <div id='mapCount' className='mapCount1'>{mapCounts.중앙}</div>
                </div>
                <div className='mapItem'>
                    <img id='map' className='map2' src={map2} alt="북부지점" />
                    <div id='mapCount' className='mapCount2'>{mapCounts.북부}</div>
                </div>
                <div className='mapItem'>
                    <img id='map' className='map3' src={map3} alt="동부지점" />
                    <div id='mapCount' className='mapCount3'>{mapCounts.동부}</div>
                </div>
                <div className='mapItem'>
                    <img id='map' className='map4' src={map4} alt="서부지점" />
                    <div id='mapCount' className='mapCount4'>{mapCounts.서부}</div>
                </div>
                <div className='mapItem'>
                    <img id='map' className='map5' src={map5} alt="남부지점" />
                    <div id='mapCount' className='mapCount5'>{mapCounts.남부}</div>
                </div>
            </div>
        </div>
    );
}

export default Map;
