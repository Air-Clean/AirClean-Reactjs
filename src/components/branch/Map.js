
import './Map.css';
import map1 from '../../assets/map1.png'; 
import map2 from '../../assets/map2.png'; 
import map3 from '../../assets/map3.png'; 
import map4 from '../../assets/map4.png'; 
import map5 from '../../assets/map5.png';

function Map({ onLocationChange , local}) {

    const mouseHandler = (e) => {
        const locationName = e.target.alt? e.target.alt : '전체';
        
        onLocationChange(locationName);
    };

    console.log(local)

    return (
        <div className='mapLayout' style={{width:'250px', height: 'calc(35% - 15px)'}}>
            <div className='mapContainal' onClick={mouseHandler} style={{ display: 'flex', justifyContent: 'center', zIndex: '4' }}>
                <div className='mapItem'>
                    <img id='map' className='map1' src={map1} alt="중앙" />
                    <div id='mapCount' className='mapCount1'>{local['중앙'].length}</div>
                </div>
                <div className='mapItem'>
                    <img id='map' className='map2' src={map2} alt="북부" />
                    <div id='mapCount' className='mapCount2'>{local['북부'].length}</div>
                </div>
                <div className='mapItem'>
                    <img id='map' className='map3' src={map3} alt="동부" />
                    <div id='mapCount' className='mapCount3'>{local['동부'].length}</div>
                </div>
                <div className='mapItem'>
                    <img id='map' className='map4' src={map4} alt="서부" />
                    <div id='mapCount' className='mapCount4'>{local['서부'].length}</div>
                </div>
                <div className='mapItem'>
                    <img id='map' className='map5' src={map5} alt="남부" />
                    <div id='mapCount' className='mapCount5'>{local['남부'].length}</div>
                </div>
            </div>
        </div>
    );
}

export default Map;
