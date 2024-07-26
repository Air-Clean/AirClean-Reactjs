import './RevenueBoxCSS.css'
import { useEffect, useState } from 'react';
import RevenuePie from './RevenuePie';
import RevenueGraph from './RevenueGraph';
import AnimatedNumbers from "react-animated-numbers";
import 'animate.css'

export default function RevenueBox({ com, firm }) {

    const [num, setNum] = useState(331231);

    return (
        <div className='revenueContainer'>
            <div className='title'>
                <div>{(!com || com === 'Total') ? 'Total' : firm}</div>
            </div>
            <div className='month'>
                <div className='revenueButton animate__animated'>
                    <div className='buttonTitle'>Month Revenue</div>
                    <div style={{display : 'flex'}} className='money'>
                        <span>\</span>
                        <AnimatedNumbers
                            includeComma
                            // className={styles.revenueButton}
                            transitions={(index) => ({
                                type: "ease-out-expo",
                                duration: index + 0.3,
                            })}
                            animateToNumber={num}
                            fontStyle={{
                                fontSize: 40,
                                color: "black",
                            }}
                        />
                    </div>
                </div>
            </div>
            <div className='year'>
                <div className='revenueButton' style={{ display: 'flex' }}>
                    <div className='buttonTitle'>Year Revenue</div>
                    <div style={{display : 'flex'}} className='money'>
                        <span>\</span>
                        <AnimatedNumbers
                            includeComma
                            // className={styles.revenueButton}
                            transitions={(index) => ({
                                type: "ease-out-expo",
                                duration: index + 0.3,
                            })}
                            animateToNumber={num}
                            fontStyle={{
                                fontSize: 40,
                                color: "black",
                            }}
                        />
                    </div>

                </div>
            </div>
            <div className='revenuePie' id='revenuePie'>
                <RevenuePie />
            </div>
            <div className='revenueGraph'>
                <RevenueGraph />
            </div>
        </div>
    )
}


