
import './AdminMenu1.css';
import { useState } from 'react';
import MainHeader from './MainHeader';
import RevenueBox from './RevenueBox';
import ExpenditureBox from './ExpenditureBox';
import UtilityBox from './UtilityBox';
import TopBox from './TopBox';


function MainPage() {
    console.log('Menu1 영역입니다.')

    const [com, setCom] = useState('')
    const [firm, setFirm] = useState('')


    
    return (
        <>
            <div className="menu1_layout">
                
                <div className='flex_wrap'>
                    <div className='mainContainer'>
                    <div className='headerBox'>
                        <MainHeader com={com} setCom={setCom} setFirm={setFirm} firm={firm}/>
                    </div>
                    <div className='revenueBox'>
                        <RevenueBox com={com} firm={firm}/>
                    </div>
                    <div className='expenditureBox'>
                        <ExpenditureBox com={com}/>
                    </div>
                    <div className='utilityBox'>
                        <UtilityBox com={com}/>
                    </div>
                    <div className='topBox'>
                        <TopBox com={com}/>
                    </div>
                    </div>
                    
                </div>
                
            </div>
        </>
    );

}

export default MainPage;
