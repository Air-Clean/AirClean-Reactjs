import './ExpenditureBoxCss.css'
import ExBarGraph from './ExBarGraph'
import ExPieGraph from './ExPieGraph'
import { useEffect, useState } from 'react'

import { useDispatch , useSelector } from 'react-redux'

import { callUtilityApi } from '../../../apis/MainAPICalls'

export default function ExpenditureBox({com}){

    const dispatch = useDispatch();

    const [month , setMonth] = useState('');
    const [maxMonth,setMaxMonth] = useState('')

    const selectMonth=e=>{
        setMonth(e.target.value)
        
    }

    useEffect(()=>{
        dispatch(callUtilityApi({com: com , month : month}))
    },[com,month])

    const expense = useSelector(state => state.utilityReducer)

    console.log('expense dadfa',expense)

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
                <ExBarGraph expense={expense} com={com}/>
            </div>
            <div className="exPieGraph">
                <ExPieGraph expense={expense} com={com}/>
            </div>
        </div>
    )
}