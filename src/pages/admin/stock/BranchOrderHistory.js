import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callBranchStockHistoryAPI, callDetergentsInfoAPI, callPartsInfoAPI } from '../../../apis/StockAPICalls';
import BranchStockGraph from './BranchStockGraph';
import './BranchOrderHistory.css';
import jwtDecode from "jwt-decode";

function BranchOrderHistory() {
  const dispatch = useDispatch();
  const branchStockHistory = useSelector(state => state.branchStockHistoryReducer);
  const detergentsInfo = useSelector(state => state.detergentsInfoReducer);
  const partsInfo = useSelector(state => state.partsInfoReducer);
  const [selectedItem, setSelectedItem] = useState(null);
  const [filter, setFilter] = useState('all');
  const [sortOrder, setSortOrder] = useState('latest');
  const [detergentInfo, setDetergentInfo] = useState(detergentsInfo);
  const [partInfo, setPartsInfo] = useState(partsInfo);
  const [isApprovedOrRejected, setIsApprovedOrRejected] = useState(false);

  const members = jwtDecode(window.localStorage.getItem('accessToken'));

  useEffect(() => {
    dispatch(callBranchStockHistoryAPI());
    dispatch(callDetergentsInfoAPI());
    dispatch(callPartsInfoAPI());
  }, [dispatch]);

  useEffect(() => {
    setDetergentInfo(detergentsInfo);
    setPartsInfo(partsInfo);
  }, [detergentsInfo, partsInfo]);

  const handleClick = (item) => {
    setSelectedItem(item);
    setIsApprovedOrRejected(false); // Reset the approval/rejection status
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleApprove = async (item) => {
    const confirmApprove = window.confirm('정말 승인하시겠습니까?');
    if (!confirmApprove) return;

    const currentDateString = new Date().toISOString().split('T')[0];

    const updatedDetergentInfo = detergentInfo.map(detergent => {
      const { laundrySupplyName } = detergent.laundrySupply;
      let newStock = detergent.laundrySupplyStock;
      let managementCode = '';

      switch (laundrySupplyName) {
        case '세제':
          newStock -= item.bDetergent;
          managementCode = 'LSM001'; // Ensure proper code is assigned
          break;
        case '섬유유연제':
          newStock -= item.bSoftener;
          managementCode = 'LSM002';
          break;
        case '표백제':
          newStock -= item.bBleach;
          managementCode = 'LSM003';
          break;
        case '얼룩제거제':
          newStock -= item.bRemover;
          managementCode = 'LSM004';
          break;
        case '세탁조 클리너':
          newStock -= item.bDrumCleaner;
          managementCode = 'LSM005';
          break;
        case '건조기 시트':
          newStock -= item.bSheet;
          managementCode = 'LSM006';
          break;
        default:
          managementCode = 'UNKNOWN'; // Default value if no match is found
          break;
      }

      return {
        ...detergent,
        laundrySupplyStock: newStock,
        laundrySupplyManagementCode: managementCode, // Assign the proper management code
      };
    });

    const updatedPartsInfo = partInfo.map(part => {
      const { laundryPartName } = part.laundryPart;
      let newStock = part.laundryPartStock;
      let managementCode = '';

      switch (laundryPartName) {
        case '세탁기 필터':
          newStock -= item.bLaundryFilter;
          managementCode = 'LPM001'; // Ensure proper code is assigned
          break;
        case '건조기 필터':
          newStock -= item.bDryerFilter;
          managementCode = 'LPM002';
          break;
        case '드라이클리너 필터':
          newStock -= item.bDryCleanerFilter;
          managementCode = 'LPM003';
          break;
        default:
          managementCode = 'UNKNOWN'; // Default value if no match is found
          break;
      }

      return {
        ...part,
        laundryPartStock: newStock,
        laundryPartManagementCode: managementCode, // Assign the proper management code
      };
    });

    setDetergentInfo(updatedDetergentInfo);
    setPartsInfo(updatedPartsInfo);
    setIsApprovedOrRejected(true);

    // Create request data
    const requestData = {
      bApplicationCode: item.bApplicationCode,
      bDetergent: item.bDetergent,
      bSoftener: item.bSoftener,
      bBleach: item.bBleach,
      bRemover: item.bRemover,
      bDrumCleaner: item.bDrumCleaner,
      bSheet: item.bSheet,
      bLaundryFilter: item.bLaundryFilter,
      bDryerFilter: item.bDryerFilter,
      bDryCleanerFilter: item.bDryCleanerFilter,
      bApplicationStatus: '승인',
      bApplicationDate: item.bApplicationDate,
      bApproverName: members.memberName,
      bApprovalDate: currentDateString,
      branchCode: item.branchCode,
      applicantName: item.applicantName,
      memberId: item.memberId,
    };

    // API Request
    const requestUrl = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/company/stock/branchApplication/${item.bApplicationCode}`;

    try {
      const response = await fetch(requestUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        console.log('승인 데이터가 성공적으로 제출되었습니다.', requestData);

        const headStockUpdate = {
          detergents: updatedDetergentInfo.map(detergent => ({
            laundrySupply: {
              laundrySupplyName: detergent.laundrySupply.laundrySupplyName,
            },
            laundrySupplyStock: detergent.laundrySupplyStock,
            laundrySupplyManagementCode: detergent.laundrySupplyManagementCode, // Ensure management code is included
          })),
          parts: updatedPartsInfo.map(part => ({
            laundryPart: {
              laundryPartName: part.laundryPart.laundryPartName,
            },
            laundryPartStock: part.laundryPartStock,
            laundryPartManagementCode: part.laundryPartManagementCode, // Ensure management code is included
          })),
        };

        const inventoryUpdateUrl = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/company/stock/branchStockUpdate`;
        const inventoryResponse = await fetch(inventoryUpdateUrl, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Accept: '*/*',
            Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
          },
          body: JSON.stringify(headStockUpdate),
        });

        if (inventoryResponse.ok) {
          console.log('재고가 성공적으로 업데이트되었습니다.', headStockUpdate);
          dispatch(callBranchStockHistoryAPI());
        } else {
          console.error('재고 업데이트 오류');
        }
      } else {
        console.error('승인 데이터 제출 오류');
      }
    } catch (error) {
      console.error('오류:', error);
    }
  };

  const handleReject = async (item) => {
    const confirmReject = window.confirm('정말 반려하시겠습니까?');
    if (!confirmReject) return;

    const currentDateString = new Date().toISOString().split('T')[0];

    const requestData = {
      bApplicationCode: item.bApplicationCode,
      bDetergent: item.bDetergent,
      bSoftener: item.bSoftener,
      bBleach: item.bBleach,
      bRemover: item.bRemover,
      bDrumCleaner: item.bDrumCleaner,
      bSheet: item.bSheet,
      bLaundryFilter: item.bLaundryFilter,
      bDryerFilter: item.bDryerFilter,
      bDryCleanerFilter: item.bDryCleanerFilter,
      bApplicationStatus: '반려',
      bApplicationDate: item.bApplicationDate,
      bApproverName: members.memberName,
      bApprovalDate: currentDateString,
      branchCode: item.branchCode,
      applicantName: item.applicantName,
      memberId: item.memberId,
      detergentsInfo: detergentInfo,
      partsInfo: partInfo,
    };

    const requestUrl = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/company/stock/branchApplication/${item.bApplicationCode}`;

    try {
      const response = await fetch(requestUrl, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Accept: '*/*',
          Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
        },
        body: JSON.stringify(requestData),
      });

      if (response.ok) {
        console.log('반려 데이터가 성공적으로 제출되었습니다.', requestData);
        setIsApprovedOrRejected(true);
        dispatch(callBranchStockHistoryAPI()); // 지점 발주 내역 새로고침
      } else {
        console.error('반려 데이터 제출 오류');
      }
    } catch (error) {
      console.error('오류:', error);
    }
  };

  const getPreviousItem = (currentItem) => {
    if (!branchStockHistory) return null;
    const filteredItems = branchStockHistory.filter(item => item.branchCode === currentItem.branchCode);
    const currentIndex = filteredItems.findIndex(item => item.bApplicationCode === currentItem.bApplicationCode);
    return currentIndex > 0 ? filteredItems[currentIndex - 1] : null;
  };

  const getAverage = (key) => {
    if (!branchStockHistory || !selectedItem) return 0;
    const filteredItems = branchStockHistory.filter(item => item.branchCode === selectedItem.branchCode);
    const total = filteredItems.reduce((acc, item) => acc + item[key], 0);
    return filteredItems.length > 0 ? total / filteredItems.length : 0;
  };

  const filteredBranchStockHistory = branchStockHistory
    .filter(item => {
      if (filter === 'all') return true;
      if (filter === '미승인') return item.bApplicationStatus === '미승인';
      if (filter === '승인') return item.bApplicationStatus === '승인' || item.bApplicationStatus === '배송완료';
      if (filter === '반려') return item.bApplicationStatus === '반려';
      return true;
    })
    .sort((a, b) => {
      if (sortOrder === 'latest') return b.bApplicationCode - a.bApplicationCode;
      if (sortOrder === 'oldest') return a.bApplicationCode - b.bApplicationCode;
      return 0;
    });

  return (
    <div className="branchStock-order-history">
      <h1>지점 발주신청 내역</h1>
      <div className="branchStock-filters">
        <select onChange={handleFilterChange}>
          <option value="all">전체</option>
          <option value="미승인">미승인</option>
          <option value="승인">승인</option>
          <option value="반려">반려</option>
        </select>
        <select onChange={handleSortChange}>
          <option value="latest">최신순</option>
          <option value="oldest">오래된순</option>
        </select>
      </div>

      <div className="branchStock-order-table">
        <div className="branchStock-order-header">
          <div>코드</div>
          <div>상태</div>
          <div>신청일자</div>
          <div>승인자</div>
          <div>승인일자</div>
          <div>지점 코드</div>
        </div>
        {filteredBranchStockHistory.length > 0 ? (
          filteredBranchStockHistory.map(item => (
            <div 
              className="branchStock-order-row" 
              key={item.bApplicationCode}
              onClick={() => handleClick(item)}
            >
              <div>{item.bApplicationCode}</div>
              <div>{item.bApplicationStatus === '배송완료' ? '승인' : item.bApplicationStatus}</div>
              <div>{item.bApplicationDate.join('-')}</div>
              <div>{item.bApproverName || 'N/A'}</div>
              <div>{item.bApprovalDate ? item.bApprovalDate.join('-') : 'N/A'}</div>
              <div>{item.branchCode}</div>
            </div>
          ))
        ) : (
          <div>데이터가 없습니다.</div>
        )}
      </div>

      {selectedItem && (
        <div className="branchStock-info">
          <div><strong>{selectedItem.bApplicationCode} {selectedItem.branchCode} {selectedItem.bApplicationDate.join('-')}
          {selectedItem.bApplicationStatus === '배송완료' ? '승인' : selectedItem.bApplicationStatus}</strong> 
        </div>
        </div>
      )}

      {selectedItem && (
        <div className="branchStock-details-section">
          <table>
            <thead>
              <tr>
                <th>세제</th>
                <th>섬유유연제</th>
                <th>표백제</th>
                <th>얼룩제거제</th>
                <th>세탁조 클리너</th>
                <th>건조기 시트</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedItem.bDetergent}</td>
                <td>{selectedItem.bSoftener}</td>
                <td>{selectedItem.bBleach}</td>
                <td>{selectedItem.bRemover}</td>
                <td>{selectedItem.bDrumCleaner}</td>
                <td>{selectedItem.bSheet}</td>
              </tr>
            </tbody>
          </table>
          <table>
            <thead>
              <tr>
                <th>세탁기 필터</th>
                <th>건조기 필터</th>
                <th>드라이클리너 필터</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedItem.bLaundryFilter}</td>
                <td>{selectedItem.bDryerFilter}</td>
                <td>{selectedItem.bDryCleanerFilter}</td>
              </tr>
            </tbody>
          </table>
          <div className="branchStock-graph-container">
            <BranchStockGraph 
              selectedItem={selectedItem} 
              previousItem={getPreviousItem(selectedItem)} 
              getAverage={getAverage}
            />
          </div>
          {!isApprovedOrRejected && selectedItem.bApplicationStatus === '미승인' && (
            <div className="branchStock-action-buttons">
              <button className="approve-button" onClick={() => handleApprove(selectedItem)}>승인</button>
              <button className="reject-button" onClick={() => handleReject(selectedItem)}>반려</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BranchOrderHistory;
