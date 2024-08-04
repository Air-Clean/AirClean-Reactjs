import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import './LaundryRegistration.css';
import LaundryDerivation from '../../../components/laundryRegistration/LaundryDerivation';

function LaundryRegistration() {
    return (
        <>
            <div className='flex2_wrap'>
                <DndProvider backend={HTML5Backend}>
                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '40px' }}>
                        <div style={{ width: '60%', height: '35vh', backgroundColor: '#fbfcfe', border: '1px solid #cfd7e0', borderRadius: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            <LaundryDerivation />
                        </div>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', width: '100%', paddingTop: '40px' }}>
                        <div style={{ width: '60%', height: '33vh', backgroundColor: '#fbfcfe', border: '1px solid #cfd7e0', borderRadius: '10px' }}>
                            {/* 추가 내용 */}
                        </div>
                    </div>
                </DndProvider>
            </div>
        </>
    );
}

export default LaundryRegistration;
