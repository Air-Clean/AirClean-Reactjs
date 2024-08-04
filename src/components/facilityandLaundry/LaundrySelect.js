import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLaundrySelect, updateLaundryStatus } from '../../apis/LandryAPICall';
import './LaundrySelect.css';

function LaundrySelect() {
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
    }, [dispatch, branch, branchCode]);

    const handleStatusChange = (item, statusType) => {
        const updatedStatus = item[statusType] === 'Y' ? 'N' : 'Y';
        item[statusType] = updatedStatus;  // Update local state immediately for visual feedback

        dispatch(updateLaundryStatus(item.laundryCode, statusType, updatedStatus, branchCode));
    };

    const filteredLandry = selectLandry ? selectLandry.filter(item => item.laundryWashingInstructionStatus === 'N') : [];

    return (
        <div style={{ width: '100%', height: '100%', overflow: 'auto', backgroundColor: 'white' }}>
            {filteredLandry.length > 0 ? (
                <table className="laundry-table">
                    <thead>
                        <tr>
                            <th>세탁물코드</th>
                            <th>고객등록일</th>
                            <th>고객이름</th>
                            <th>옷감종류</th>
                            <th>무게</th>
                            <th>더러움 정도</th>
                            <th>드라이클리닝 여부</th>
                            <th>승낙상태</th>
                            <th>도착여부</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredLandry.map(item => (
                            <tr key={item.laundryCode}>
                                <td>{item.laundryCode}</td>
                                <td>{new Date(item.laundryCustomerRegistDate).toLocaleDateString()}</td>
                                <td>{item.laundryCustomerName}</td>
                                <td>{item.laundryFabricType}</td>
                                <td>{item.laundryWeight}</td>
                                <td>{item.laundryDirtyLevel}</td>
                                <td>{item.laundryDryCleaningStatus}</td>
                                <td>
                                    <button
                                        className={item.laundryCollectionStatus === 'Y' ? 'approved' : 'not-approved'}
                                        onClick={() => handleStatusChange(item, 'laundryCollectionStatus')}
                                    >
                                        {item.laundryCollectionStatus === 'Y' ? '승낙완료' : '승낙'}
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className={item.laundryArriveStatus === 'Y' ? 'arrived' : 'not-arrived'}
                                        onClick={() => handleStatusChange(item, 'laundryArriveStatus')}
                                    >
                                        {item.laundryArriveStatus === 'Y' ? '배송완료' : '배송'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No laundry data available</p>
            )}
        </div>
    );
}

export default LaundrySelect;
