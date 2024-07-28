import ProgressBar from "@ramonak/react-progress-bar";
import './ExBarGraphCss.css'
import FlashOnIcon from '@mui/icons-material/FlashOn';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';


export default function ExBarGraph() {

    

    return (
        <div className="barContainer">
            <div className='electirc'>
                <div className="costTitle">
                    <div style={{display : 'flex'}}><FlashOnIcon/>전기세</div>
                    <div>142129409</div>
                </div>
                <div>
                    <ProgressBar
                    completed={60}
                    maxCompleted={100}
                    className="progress-bar-wrapper"
                    bgColor="#3674d1"
                    animateOnRender
                    transitionDuration="1.5s"
                    />
                </div>
            </div>
            <div className="water">
                <div className="costTitle">
                    <div style={{display : 'flex'}}><WaterDropIcon/>수도세</div>
                    <div>88482384</div>
                </div>
                <div>
                    <ProgressBar
                    completed={30}
                    maxCompleted={100}
                    className="progress-bar-wrapper"
                    bgColor="#3674d1"
                    animateOnRender
                    transitionDuration="1.5s"
                    />
                </div>
            </div>
            <div className="gas">
                <div className="costTitle">
                    <div style={{display : 'flex'}}><LocalGasStationIcon/>가스비</div>
                    <div>39393904</div>
                </div>
                <div>
                    <ProgressBar
                    completed={70}
                    maxCompleted={100}
                    className="progress-bar-wrapper"
                    bgColor="#3674d1"
                    animateOnRender
                    transitionDuration="1.5s"
                    />
                </div>
            </div>
        </div>
    )
}
