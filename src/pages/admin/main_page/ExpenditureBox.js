import './ExpenditureBoxCss.css'
import ExBarGraph from './ExBarGraph'
import ExPieGraph from './ExPieGraph'
import { useEffect, useState } from 'react'

export default function ExpenditureBox({com}){

    const [month , setMonth] = useState('');
    const [maxMonth,setMaxMonth] = useState('')

    const selectMonth=e=>{
        setMonth(e.target.value)
        
    }

    useEffect(()=>{
        const today = new Date();
        today.setMonth(today.getMonth()-1)
        const defaultMonth = today.toISOString().slice(0,7);
        setMonth(defaultMonth);
        setMaxMonth(defaultMonth);
    },[])
    return(
        <div className="expenditureContainer">
            <div className="expenditureTitle">
                <div className='titleBox'>
                    Utility Cost
                </div>
                <div>
                    <input 
                    type="month"
                    value={month}
                    max={maxMonth}
                    onChange={selectMonth}
                    />
                </div>
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