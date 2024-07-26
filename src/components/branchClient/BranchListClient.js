import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import './BranchList.css';

function BranchList({ locationName = "전체", onBranchSelect }) {
    const [branches, setBranches] = useState([]);
    const [selectedBranches, setSelectedBranches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [setError] = useState(null);

    const fetchBranches = useCallback(async (mapName) => {
        console.log(loading);
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

    const handleBranchClick = (branch) => {
        console.log("Branch clicked:", branch);
        onBranchSelect(branch);
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
        </div>
    );
}

export default BranchList;
