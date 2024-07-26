import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

function BranchInformation({ branch }) {
    const [branchList, setBranchList] = useState(null);
    const [memberList, setMemberList] = useState(null);
    const [facilityCodeCounts, setFacilityCodeCounts] = useState({});
    const [facilityIdNumbersWithDStatus, setFacilityIdNumbersWithDStatus] = useState([]);
    const [facilityIdNumbersWithFStatus, setFacilityIdNumbersWithFStatus] = useState([]);
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

        const fetchBranchData = async () => {
            try {
                const response = await axios.get(branch ? '/branch/branchInformation' : '/branch/defaltBranchInformation', {
                    params: branch ? { sub: subValue, branchName: branch } : { sub: subValue },
                    headers: { Authorization: `Bearer ${accessToken}` }
                });

                const data = response.data.data;
                setBranchList(data.branchList);
                setMemberList(data.memberList);
                setFacilityCodeCounts(data.facilityCodeCounts);
                setFacilityIdNumbersWithDStatus(data.facilityIdNumbersWithDStatus);
                setFacilityIdNumbersWithFStatus(data.facilityIdNumbersWithFStatus);
            } catch (error) {
                setError(error.message);
            }
        };

        fetchBranchData();
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
                            <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px'}}>
                                <strong>지점상세 정보: </strong><p style={{ margin: '0 0 0 5px' }}>{branch.branchName}</p>
                            </div> <br></br>
                            <div style={{display:'flex'}}>
                                <div style={{ width: '60%'}}>
                                    <p style={{fontSize:'12px'}}><strong>지점코드:</strong> {branch.branchCode}</p>
                                    <p style={{fontSize:'12px'}}><strong>전화번호:</strong> {branch.branchPhone}</p>
                                    <p style={{fontSize:'12px'}}><strong>주소:</strong> {branch.branchAddress}</p>
                                    <p style={{fontSize:'12px'}}><strong>오픈날짜:</strong> {branch.branchOpenDate}</p>
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
                        
                            <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px'}}>
                                <strong>지점장 정보: </strong><p style={{ margin: '0 0 0 5px' }}>{member.memberName}</p>
                            </div> <br></br>
                            <div style={{display: 'flex'}}>
                                <div style={{width:'50%', fontSize:'12px'}}>
                                    <p><strong>이메일:</strong> {member.memberEmail}</p>
                                    <p><strong>전화번호:</strong> {member.memberPhoneNumber}</p>
                                    <p><strong>생년월일:</strong> {member.memberBirthDate}</p>
                                </div>
                                <div style={{width:'50%', fontSize:'12px'}}>
                                    <p><strong>성별:</strong> {member.memberGender}</p>
                                    <p><strong>주소:</strong> {member.memberAddress}</p>
                                </div>    
                            </div>    
                        
                        </div>
                    ))
                ) : 'Loading...'}
            </div>
            <hr></hr>
            <div>
                <div>
                    <div style={{ margin: '3px 2.5%' }}>
                        <div style={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}>
                            <strong>시설물 정보</strong>
                        </div>
                        <br></br>
                        <div style={{ display: 'flex' }}>
                            <div style={{ width: '40%', fontSize: '12px' }}>
                                <p><strong>세탁기:</strong> {facilityCodeCounts[1]}<strong>개</strong> </p>
                                <p><strong>건조기:</strong> {facilityCodeCounts[2]}<strong>개</strong> </p>
                                <p><strong>드라이 클리너:</strong> {facilityCodeCounts[3]}<strong>개</strong> </p>
                            </div>
                            <div style={{ width: '60%', fontSize: '12px' }}>
                                <p><strong>수리중 시설물 코드:</strong> {facilityIdNumbersWithDStatus.join(', ')}</p>
                                <p><strong>운영중단 시설물 코드:</strong> {facilityIdNumbersWithFStatus.join(', ')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BranchInformation;
