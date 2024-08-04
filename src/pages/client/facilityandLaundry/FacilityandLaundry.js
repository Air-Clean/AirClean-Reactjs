/*
    첫번재 메뉴 페이지 입니다.
    작성일자 6월 28일
*/
import './FacilityandLaundry.css';
import WaterTank from '../../../components/facilityandLaundry/WaterTank';
import LaundrySelect from '../../../components/facilityandLaundry/LaundrySelect';

console.log("page1입니다.")


function FacilityandLaundry() {

    return (
        <>
            <div className="menu3_layout" style={{ height: 'calc(100vh - 130px)' }}>
                
                <div className='flex2_wrap'>
                        {/* 컴포넌트 위치 */}
                        <div style={{display:'flex', justifyContent:'center', width:'100%', marginTop:'40px'}}>
                            <div style={{width:'70%', height: '265px', backgroundColor:'#88D0FF'}}>
                                <WaterTank/>
                            </div>
                        </div>
                        <div style={{display:'flex', justifyContent:'center', width:'100%', paddingTop:'30px'}}>
                            <div style={{width:'70%'}}>
                                <h3>세탁물 조회</h3>
                                <div style={{width:'100%', height: '35vh', backgroundColor:'lightgray'}}>
                                    <LaundrySelect/>
                                </div>
                            </div>
                        </div>

                </div>
                
            </div>
        </>
    );

}

export default FacilityandLaundry;
