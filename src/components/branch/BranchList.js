import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import './BranchList.css';

function BranchList({ locationName, onBranchSelect }) {
    const [branches, setBranches] = useState([]);
    const [selectedBranches, setSelectedBranches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchBranches = async (mapName) => {
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
    };

    useEffect(() => {
        fetchBranches();
    }, []);

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
    }, [locationName]);

    // 체크박스를 클릭하여 선택된 항목을 관리하는 함수입니다. 
    const handleSelectBranch = (branch) => {
        setSelectedBranches(prevSelected =>
            prevSelected.includes(branch)
                ? prevSelected.filter(item => item !== branch)
                : [...prevSelected, branch]
        );
    };

    // 체크한거 삭제 함수
    const handleDeleteSelected = () => {
        setBranches(prevBranches =>
            prevBranches.filter(branch => !selectedBranches.includes(branch))
        );
        setSelectedBranches([]);
    };

    // 버튼 클릭 핸들러
    const handleBranchClick = (branch) => {
        console.log("Branch clicked:", branch);
        onBranchSelect(branch);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={{ backgroundColor: '#fbfcfe', width: '250px', height: 'calc(65% - 15px)', borderRadius: '10px', padding: '20px', border: '1px solid #cfd7e0' }}>
            <h5>목록 : {locationName} </h5>
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
            <button style={{ marginTop: '10px', padding: '3px', color:'black', backgroundColor:'#f1f4f8' }} onClick={handleDeleteSelected} disabled={selectedBranches.length === 0}>삭제</button>
        </div>
    );
}

export default BranchList;
