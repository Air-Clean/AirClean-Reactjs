
import './LaundryRegistration.css';
import LaundryDerivation from '../../../components/laundryRegistration/LaundryDerivation';



function LaundryRegistration() {

    return (
        <>
            <div className='flex2_wrap'>
                {/* 컴포넌트 위치 */}
                <div style={{display:'flex', justifyContent:'center', width:'100%', marginTop:'40px'}}>
                    <div style={{width:'60%', height: '35vh', backgroundColor:'#fbfcfe', border: '1px solid #cfd7e0', borderRadius:'10px', display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <LaundryDerivation/>
                    </div>
                </div>

                <div style={{display:'flex', justifyContent:'center', width:'100%', paddingTop:'40px'}}>
                    <div style={{width:'60%', height: '33vh', backgroundColor:'#fbfcfe', border: '1px solid #cfd7e0', borderRadius:'10px'}}>
                            
                    </div>
                </div>                        

            </div>
        </>
    );
    
}

export default LaundryRegistration;
