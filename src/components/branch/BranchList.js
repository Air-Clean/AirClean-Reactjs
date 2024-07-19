import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function BranchList({ locationName }) {
    const [branches, setBranches] = useState([]);
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
        switch(locationName){
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div style={{ backgroundColor: '#D5E3F5', width: '250px', height: 'calc(67% - 15px)', borderRadius: '30px', padding: '20px' }}>
            <h5>목록 : {locationName} </h5>
            <hr style={{ marginTop: '3px', marginBottom: '10px' }}></hr>
            <div className='listLayer' style={{ backgroundColor: 'white', width: '100%', height: '29vh', overflowY: 'auto' }}>
                <div>
                    {branches.map((branch, index) => (
                        <div key={index} style={{ margin: '10px 0', padding: '10px', backgroundColor: '#FFFFFF', borderRadius: '10px' }}>
                            <p><strong>Name:</strong> {branch}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BranchList;
