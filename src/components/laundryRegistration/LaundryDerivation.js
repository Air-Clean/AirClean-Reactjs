import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './LaundryDerivation.css';
import { fetchLaundrySelect } from '../../apis/LandryAPICall';

function LaundryDerivation() {
    const dispatch = useDispatch();
    const branch = useSelector(state => state.getBranchReducer);
    const branchCode = branch && branch.branchCode;
    const selectLandry = useSelector(state => state.selectLaundry.waterSupply);

    useEffect(() => {
        if (branchCode) {
            dispatch(fetchLaundrySelect(branchCode));
        } else {
            console.error('Branch data or branchCode is not available');
        }
    }, [dispatch, branchCode]);

    console.log("조회좀 할게")
    console.log(selectLandry)

    return (
        <>  
            <div style={{ width: '95%', height: '90%' }}>
                <h5 style={{ marginLeft: '10px' }}>세탁방법 도출하기</h5>
                <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', gap: '30px' }}>
                    <div style={{ width: '47%', height: '85%' }}>
                        <div style={{ width: '100%', height: '80%', backgroundColor: '#F1F4F8', border: '1px solid #cfd7e0', borderRadius: '5px' }}>
                        </div>
                    </div>
                    <div style={{ width: '47%', height: '85%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                        <div style={{ width: '100%', height: '80%', backgroundColor: '#F1F4F8', border: '1px solid #cfd7e0', borderRadius: '5px' }}>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '2px' }}>
                            <button style={{ marginTop: 'auto' }}>도출하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default LaundryDerivation;
