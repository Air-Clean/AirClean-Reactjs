import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import './BranchList.css';
import BranchModal from './BranchModal';
import { useDispatch , useSelector } from 'react-redux';
import { callBranchFacility ,deleteBranch, getManager} from '../../apis/CallBranchInfoApi';

function BranchList({ locationName , onBranchSelect, local , setSelectedBranch ,facility, setFacility }) {

    const [branches, setBranches] = useState([]);
    const [selectedBranches, setSelectedBranches] = useState([]);
    
    
    const [showModal, setShowModal] = useState(false);
    const [selectManager , setSelectManager] = useState([])
    
    const [branchData , setBranchData] = useState([])
    
    useEffect(() => {
        
        setBranchData(local[locationName])
        
    }, [locationName]);

    useEffect(()=>{
        dispatch(getManager())
    },[showModal])

    const man = useSelector(state=>state.branchManagerReducer)

    useEffect(()=>{
        setSelectManager(man)
    },[man])

    const handleSelectBranch = (branch) => {
        setSelectedBranches(prevSelected =>
            prevSelected.includes(branch)
                ? prevSelected.filter(item => item !== branch)
                : [...prevSelected, branch]
        );

    };

    
    // const handleDeleteSelected = async () => {
    //     const token = window.localStorage.getItem('accessToken');
    //     if (!token) {
    //         setError('No token found');
    //         return;
    //     }

    //     try {
    //         const response = await axios.delete('http://localhost:8080/branch/deleteBranches', {
    //             data: { branches: selectedBranches },
    //             headers: {
    //                 Authorization: 'Bearer ' + token,
    //                 'Content-Type': 'application/json'
    //             }
    //         });

    //         if (response.status === 200) {
    //             setBranches(prevBranches =>
    //                 prevBranches.filter(branch => !selectedBranches.includes(branch))
    //             );
    //             setSelectedBranches([]);
    //             window.alert('삭제 성공');
    //         }
    //     } catch (error) {
    //         console.error('Error deleting branches:', error);
    //         setError('Error deleting branches');
    //         window.alert('삭제 실패');
    //     }
    // };

    
    const dispatch = useDispatch();

    const handleDeleteSelected = ()=>{
        dispatch(deleteBranch({branch : selectedBranches}))
        // window.location.reload();
    }

    const handleBranchClick = (branch) => {
        console.log("Branch clicked:", branch);
        setSelectedBranch(branch);
        dispatch(callBranchFacility({branchCode : branch.branchCode}))
        onBranchSelect(branch);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const facilityData = useSelector(state=> state.branchFacilityInfoReducer)

    console.log('시설정보',facilityData)

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
            <div className='listLayer' style={{ backgroundColor: 'white', width: '100%', height: '29vh', overflowY: 'auto', border: '1px solid #cfd7e0' }}>
                <div>
                    {branchData.map((branch, index) => (
                        <div key={index} style={{ margin: '10px 0', padding: '5px', backgroundColor: '#FFFFFF', borderRadius: '10px', display: 'flex', alignItems: 'center' }}>
                            <input 
                                type="checkbox" 
                                checked={selectedBranches.includes(branch)} 
                                onChange={() => handleSelectBranch(branch)} 
                                style={{ marginRight: '10px' }}
                            />
                            <p className='buttonBranch' onClick={() => handleBranchClick(branch)} style={{ cursor: 'pointer', margin: 0 }}>
                                {branch.branchName}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{display:'flex'}}>
                <button style={{ marginTop: '10px', padding: '3px', color:'black', backgroundColor:'#f1f4f8', marginRight:'10px'}} onClick={openModal}>등록</button>
                <button style={{ marginTop: '10px', padding: '3px', color:'black', backgroundColor:'#f1f4f8' }} onClick={handleDeleteSelected} disabled={selectedBranches.length === 0}>삭제</button>
            </div>

            <BranchModal show={showModal} onClose={closeModal} man={man} />
        </div>
    );
}

export default BranchList;
