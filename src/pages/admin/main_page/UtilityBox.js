import './UtilityBoxCss.css'
import UtilityTab from './UtilityTab'
import UtilityBar from './UtilityBar'

export default function UtilityBox({com}){
    return(
        <div className="utilityContainer">
            <div className='utilTop'>
                <div className='titleBox' style={{width : '40%'}}>MainTenance Cost</div>
            </div>
            <div className='utilLeft'>
                <UtilityTab/>
            </div>
            <div className='utilRight'>
                <UtilityBar/>
            </div>
        </div>
    )
}