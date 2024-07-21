import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function BranchInformation({ branch }) {
    const [branchList, setBranchList] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // 사용자 토큰 가져오기
        const accessToken = window.localStorage.getItem('accessToken');
        if (!accessToken) {
            setError('No access token found');
            return;
        }
        
        let userData;
        try {
            userData = jwt_decode(accessToken);
        } catch (err) {
            setError('Failed to decode access token');
            return;
        }

        console.log(userData);

        const subValue = userData.sub;
        console.log(subValue);

        if (!branch) {
            // 버튼 클릭이 안되었을 때 기본 요청
            axios.get('/branch/defaltBranchInformation', {
                params: { 
                    sub: subValue // userData를 params로 포함
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then(response => {
                console.log('Response data:', response.data); // 응답 데이터 콘솔 출력
                setBranchList(response.data.data.branchList); // branchList 설정
            })
            .catch(error => {
                console.error('Error fetching data for branchInformation:', error);
                setError(error.message); // 에러 메시지 설정
            });
        } else {
            // 선택된 branch가 있을 때의 요청
            axios.get('/branch/branchInformation', {
                params: { 
                    sub: subValue,
                    branchName: branch // 선택된 branch의 ID를 params로 포함
                },
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            })
            .then(response => {
                console.log('Response data:', response.data); // 응답 데이터 콘솔 출력
                setBranchList(response.data.data.branchList); // branchList 설정
            })
            .catch(error => {
                console.error('Error fetching data for branchInformation2:', error);
                setError(error.message); // 에러 메시지 설정
            });
        }

    }, [branch]);

    if (error) {
        return <div>Error: {error}</div>; // 에러 메시지 표시
    }

    return (
        <div style={{ backgroundColor: '#fbfcfe', width: '450px', height: '100%', borderRadius: '10px', border: '1px solid #cfd7e0' }}>
            <div>
                <h1>Branch Information</h1>
                {branchList ? <pre>{JSON.stringify(branchList, null, 2)}</pre> : 'Loading...'}
            </div>
        </div>
    );
}

export default BranchInformation;
