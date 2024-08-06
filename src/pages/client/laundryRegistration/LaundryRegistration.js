import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './LaundryRegistration.css';
import LaundryDerivation from '../../../components/laundryRegistration/LaundryDerivation';
import SelectLaundryWay from '../../../components/laundryRegistration/SelectLaundryWay';

function LaundryRegistration() {
    const [derived, setDerived] = useState(false);

    const handleDerivationComplete = () => {
        setDerived(prev => !prev); // 상태를 토글하여 변경
    };

    return (
        <>
            <div className='flex2_wrap'>
                <DndProvider backend={HTML5Backend}>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '40px' }}>
                        <div style={{ width: '60%', height: '35vh', backgroundColor: '#fbfcfe', border: '1px solid #cfd7e0', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <LaundryDerivation onComplete={handleDerivationComplete} />
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', paddingTop: '40px' , position:'relative'}}>
                        <div style={{ width: '60%', height: '33vh', backgroundColor: '#fbfcfe', border: '1px solid #cfd7e0', borderRadius: '10px' , overflow:'hidden'}}>
                            <SelectLaundryWay derived={derived} />
                        </div>
                        <h5 style={{position: 'absolute', top:'5px',left: '20%', zIndex:'100'}} >도출된 방법</h5>
                    </div>
                    
                </DndProvider>
            </div>
        </>
    );
}

export default LaundryRegistration;
