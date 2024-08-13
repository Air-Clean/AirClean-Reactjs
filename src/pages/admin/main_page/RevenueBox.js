import './RevenueBoxCSS.css'
import { useEffect, useState } from 'react';
import RevenuePie from './RevenuePie';
import RevenueGraph from './RevenueGraph';
import AnimatedNumbers from "react-animated-numbers";
import 'animate.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWonSign } from '@fortawesome/free-solid-svg-icons';

import { useDispatch , useSelector } from 'react-redux';
import { callRevenueApi } from '../../../apis/MainAPICalls';

export default function RevenueBox({ com, firm }) {
    const dispatch = useDispatch();

    const [month, setMonth] = useState('');
    const [maxMonth, setMaxMonth] = useState('');
    
    const selectMonth = e => {
        setMonth(e.target.value)
    }

    useEffect(() => {
        const today = new Date();
        today.setMonth(today.getMonth());
        const defaultMonth = today.toISOString().slice(0, 7);
        setMonth(defaultMonth);
        setMaxMonth(defaultMonth);
        // dispatch(callRevenueApi({ com: com, month: month }));
    }, [])

    useEffect(() => {
        dispatch(callRevenueApi({ com: com, month: month }));
    }, [dispatch, com, month]);

    const revenue = useSelector(state => state.revenueReducer);
    const [monthRevenue, setMonthRevenue] = useState(0);
    const [annualRevenue, setAnnualRevenue] = useState(0);

    useEffect(() => {
        setMonthRevenue(revenue?.monthRevenue || 0);
        setAnnualRevenue(revenue?.annual || 0);
    }, [revenue]);

    console.log('revenue data', revenue);

    const [revenuType , setRevenueType] = useState('')
    const monthHanler = () =>{
        console.log('월 수익')
        dispatch(callRevenueApi({ com: com, month: month }));
    }

    const yearHanler = () => {
        console.log('연 수익')
        
    }

    return (
        <div className='revenueContainer'>
            <div className='title' style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div className='titleBox'>Revenue</div>
                <input 
                    type="month"
                    value={month}
                    max={maxMonth}
                    onChange={selectMonth}
                />
            </div>
            <div className='month' onClick={monthHanler}>
                <div className='revenueButton animate__animated'>
                    <div className='buttonTitle'>Month Revenue</div>
                    <div style={{ display: 'flex' }} className='money'>
                        <FontAwesomeIcon icon={faWonSign} />
                        <AnimatedNumbers
                            includeComma
                            transitions={(index) => ({
                                type: "ease-out-expo",
                                duration: index * 0.1,
                            })}
                            animateToNumber={monthRevenue}
                            fontStyle={{
                                fontSize: 40,
                                color: "white",
                            }}
                        />
                        {/* {monthRevenue} */}
                    </div>
                </div>
            </div>
            <div className='year' onClick={yearHanler}>
                <div className='revenueButton' style={{ display: 'flex' }}>
                    <div className='buttonTitle'>Annual Revenue</div>
                    <div style={{ display: 'flex' }} className='money'>
                        <FontAwesomeIcon icon={faWonSign} />
                        <AnimatedNumbers
                            includeComma
                            transitions={(index) => ({
                                type: "ease-out-expo",
                                duration: index * 0.1,
                            })}
                            animateToNumber={annualRevenue}
                            fontStyle={{
                                fontSize: 40,
                                color: "white",
                            }}
                        />
                        {/* {annualRevenue} */}
                    </div>
                </div>
            </div>
            <div className='revenuePie' id='revenuePie'>
                <RevenuePie revenue={revenue}/>
            </div>
            <div className='revenueGraph'>
                <RevenueGraph revenue={revenue} selectMonth={month}/>
            </div>
        </div>
    )
}
