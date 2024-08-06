import React, { useEffect, useState } from 'react';
import './BranchList.css';
import { useDispatch , useSelector } from 'react-redux';
import { callBranchFacility , getManager} from '../../apis/CallBranchInfoApi';

function BranchList({ locationName  , setSelectedBranch ,facility, setFacility ,branchData}) {

    const [selectedBranches, setSelectedBranches] = useState([]);
    
    console.log('branchdata',branchData)
    
    const [showModal, setShowModal] = useState(false);
    
    const branch = JSON.parse(window.localStorage.getItem('branch'))

    console.log('branch.branchchch',branch)
    
    useEffect(()=>{
        dispatch(getManager())
    },[showModal])

    console.log('지점 facility',facility)


    
    const dispatch = useDispatch();


    const handleBranchClick = (branch) => {
        console.log("Branch clicked:", branch);
        setSelectedBranch(branch);
        dispatch(callBranchFacility({branchCode : branch.branchCode}))
    };

    useEffect(()=>{
        dispatch(callBranchFacility({branchCode : branch.branchCode}))
    },[])

    const facilityData = useSelector(state=> state.branchFacilityInfoReducer)

    console.log('client 시설정보',facilityData)

    useEffect(()=>{
        const laundry = facilityData.filter(f=>f.facilityDTO.facilityCode===1)
        const dry =  facilityData.filter(f=>f.facilityDTO.facilityCode===2)
        const cleaner = facilityData.filter(f=>f.facilityDTO.facilityCode===3)

        setFacility({...facility , laundry : laundry ,dry : dry ,cleaner : cleaner})

    },[facilityData])
    

    return (
        <div style={{ backgroundColor: '#fbfcfe', width: '250px', height: 'calc(65% - 15px)', borderRadius: '10px', padding: '20px', border: '1px solid #cfd7e0' }}>
            <h5>{locationName || '전체'} 지점 </h5>
            <hr style={{ marginTop: '3px', marginBottom: '10px' }}></hr>
            <div className='listLayer' style={{ backgroundColor: 'white', width: '100%', height: '40vh', overflowY: 'auto', border: '1px solid #cfd7e0' }}>
                <div>
                    {branchData.map((branch, index) => (
                        <div key={index} style={{ margin: '10px 0', padding: '5px', backgroundColor: '#FFFFFF', borderRadius: '10px', display: 'flex', alignItems: 'center' }}>
                            <p className='buttonBranch' onClick={() => handleBranchClick(branch)} style={{ cursor: 'pointer', margin: 0 }}>
                                {branch.branchName}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BranchList;
