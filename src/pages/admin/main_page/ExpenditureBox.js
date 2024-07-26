import './ExpenditureBoxCss.css'
import ExBarGraph from './ExBarGraph'

export default function ExpenditureBox({com}){
    return(
        <div className="expenditureContainer">
            <div className="expenditureTitle"></div>
            <div className="exBarGraph">
                <ExBarGraph/>
            </div>
            <div className="exPieGraph"></div>
        </div>
    )
}