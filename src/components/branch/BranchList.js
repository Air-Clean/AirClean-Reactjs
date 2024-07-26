import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import './BranchList.css';
import BranchModal from './BranchModal';

function BranchList({ locationName = "전체", onBranchSelect }) {
    const [branches, setBranches] = useState([]);
    const [selectedBranches, setSelectedBranches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const fetchBranches = useCallback(async (mapName) => {
        console.log(loading)
        const token = window.localStorage.getItem('accessToken');
        if (!token) {
            setError('No token found');
            setLoading(false);
            return;
        }

        try {
            jwt_decode(token); // 토큰 디코딩

            const response = await axios.get('http://localhost:8080/branch/branchList', {
                params: mapName ? { locationName: mapName } : {},
                headers: {
                    Authorization: 'Bearer ' + token
                }
            });

            if (response.data && response.data.data && response.data.data.branchList) {
                setBranches(response.data.data.branchList);
            }
        } catch (error) {
            console.error('Error fetching branches:', error);
            setError('Error fetching branches');
        } finally {
            setLoading(false);
        }
    }, [loading, setError]);

    useEffect(() => {
        fetchBranches();
    }, [fetchBranches]);

    useEffect(() => {
        let newMapName = "";
        switch (locationName) {
            case '중앙지점':
                newMapName = "중앙";
                break;
            case '북부지점':
                newMapName = "북부";
                break;
            case '동부지점':
                newMapName = "동부";
                break;
            case '서부지점':
                newMapName = "서부";
                break;
            case '남부지점':
                newMapName = "남부";
                break;
            default:
                newMapName = '';
                break;
        }

        if (newMapName) {
            fetchBranches(newMapName);
        }
    }, [locationName, fetchBranches]);

    const handleSelectBranch = (branch) => {
        setSelectedBranches(prevSelected =>
            prevSelected.includes(branch)
                ? prevSelected.filter(item => item !== branch)
                : [...prevSelected, branch]
        );
    };

    const handleDeleteSelected = async () => {
        const token = window.localStorage.getItem('accessToken');
        if (!token) {
            setError('No token found');
            return;
        }

        try {
            const response = await axios.delete('http://localhost:8080/branch/deleteBranches', {
                data: { branches: selectedBranches },
                headers: {
                    Authorization: 'Bearer ' + token,
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200) {
                setBranches(prevBranches =>
                    prevBranches.filter(branch => !selectedBranches.includes(branch))
                );
                setSelectedBranches([]);
                window.alert('삭제 성공');
            }
        } catch (error) {
            console.error('Error deleting branches:', error);
            setError('Error deleting branches');
            window.alert('삭제 실패');
        }
    };

    const handleBranchClick = (branch) => {
        console.log("Branch clicked:", branch);
        onBranchSelect(branch);
    };

    const openModal = () => {
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
    };

    const handleModalSubmit = (formData) => {
        console.log("FormData received in BranchList:", formData);
        fetchBranches();
    };

    return (
        <div style={{ backgroundColor: '#fbfcfe', width: '250px', height: 'calc(65% - 15px)', borderRadius: '10px', padding: '20px', border: '1px solid #cfd7e0' }}>
            <h5>목록 : {locationName || "전체"} </h5>
            <hr style={{ marginTop: '3px', marginBottom: '10px' }}></hr>
            <div className='listLayer' style={{ backgroundColor: 'white', width: '100%', height: '29vh', overflowY: 'auto', border: '1px solid #cfd7e0' }}>
                <div>
                    {branches.map((branch, index) => (
                        <div key={index} style={{ margin: '10px 0', padding: '5px', backgroundColor: '#FFFFFF', borderRadius: '10px', display: 'flex', alignItems: 'center' }}>
                            <input 
                                type="checkbox" 
                                checked={selectedBranches.includes(branch)} 
                                onChange={() => handleSelectBranch(branch)} 
                                style={{ marginRight: '10px' }}
                            />
                            <p className='buttonBranch' onClick={() => handleBranchClick(branch)} style={{ cursor: 'pointer', margin: 0 }}>
                                {branch}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
            <div style={{display:'flex'}}>
                <button style={{ marginTop: '10px', padding: '3px', color:'black', backgroundColor:'#f1f4f8', marginRight:'10px'}} onClick={openModal}>등록</button>
                <button style={{ marginTop: '10px', padding: '3px', color:'black', backgroundColor:'#f1f4f8' }} onClick={handleDeleteSelected} disabled={selectedBranches.length === 0}>삭제</button>
            </div>

            <BranchModal show={showModal} onClose={closeModal} onSubmit={handleModalSubmit} />
        </div>
    );
}

export default BranchList;
