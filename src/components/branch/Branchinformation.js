import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function BranchInformation({ branch }) {
    const [branchList, setBranchList] = useState(null);
    const [memberList, setMemberList] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
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

        const subValue = userData.sub;

        if (!branch) {
            axios.get('/branch/defaltBranchInformation', {
                params: { sub: subValue },
                headers: { Authorization: `Bearer ${accessToken}` }
            })
            .then(response => {
                setBranchList(response.data.data.branchList);
                setMemberList(response.data.data.memberList);
            })
            .catch(error => {
                setError(error.message);
            });
        } else {
            axios.get('/branch/branchInformation', {
                params: { sub: subValue, branchName: branch },
                headers: { Authorization: `Bearer ${accessToken}` }
            })
            .then(response => {
                setBranchList(response.data.data.branchList);
                setMemberList(response.data.data.memberList);
            })
            .catch(error => {
                setError(error.message);
            });
        }

    }, [branch]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div style={{ backgroundColor: '#fbfcfe', width: '450px', height: '100%', borderRadius: '10px', border: '1px solid #cfd7e0', padding: '10px' }}>
            {branchList ? (
                branchList.map((branch, index) => (
                    <div key={index}>
                        <div>
                            <div style={{ display: 'flex', alignItems: 'center', fontSize: '20px'}}>
                                <strong>지점상세 정보: </strong><p style={{ margin: '0 0 0 5px' }}>{branch.branchName}</p>
                            </div> <br></br>
                            <div style={{display:'flex'}}>
                                <div style={{ width: '60%'}}>
                                    <p style={{fontSize:'14px'}}><strong>지점코드:</strong> {branch.branchCode}</p>
                                    <p style={{fontSize:'14px'}}><strong>전화번호:</strong> {branch.branchPhone}</p>
                                    <p style={{fontSize:'14px'}}><strong>주소:</strong> {branch.branchAddress}</p>
                                    <p style={{fontSize:'14px'}}><strong>오픈날짜:</strong> {branch.branchOpenDate}</p>
                                </div>
                                <img src={branch.branchImage} alt={branch.branchName} style={{ width: '40%', height: 'auto', borderRadius: '10px', marginRight: '10px' }} />
                            </div>    
                        </div>
                    </div>
                ))
            ) : 'Loading...'}
            <hr></hr>
            <div>
                {memberList ? (
                    memberList.map((member, index) => (
                        <div key={index} style={{ margin: '3px 2.5%'}}>
                        
                            <div style={{ display: 'flex', alignItems: 'center', fontSize: '20px'}}>
                                <strong>지점장 정보: </strong><p style={{ margin: '0 0 0 5px' }}>{member.memberName}</p>
                            </div> <br></br>
                            <div style={{display: 'flex'}}>
                                <div style={{width:'50%', fontSize:'14px'}}>
                                    <p><strong>이메일:</strong> {member.memberEmail}</p>
                                    <p><strong>전화번호:</strong> {member.memberPhoneNumber}</p>
                                    <p><strong>생년월일:</strong> {member.memberBirthDate}</p>
                                </div>
                                <div style={{width:'50%', fontSize:'14px'}}>
                                    <p><strong>성별:</strong> {member.memberGender}</p>
                                    <p><strong>주소:</strong> {member.memberAddress}</p>
                                </div>    
                            </div>    
                        
                        </div>
                    ))
                ) : 'Loading...'}
            </div>
            <hr></hr>
        </div>
    );
}

export default BranchInformation;
