import './ExpenditureBoxCss.css'
import ExBarGraph from './ExbarGraph'
import ExPieGraph from './ExPieGraph'

export default function ExpenditureBox({com}){
    return(
        <div className="expenditureContainer">
            <div className="expenditureTitle">
                <div className='titleBox'>Utility Cost</div>
            </div>
            <div className="exBarGraph">
                <ExBarGraph/>
            </div>
            <div className="exPieGraph">
                <ExPieGraph/>
            </div>
        </div>
    )
}