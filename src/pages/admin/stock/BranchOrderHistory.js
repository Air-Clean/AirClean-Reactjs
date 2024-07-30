import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callBranchStockHistoryAPI, callDetergentsInfoAPI, callPartsInfoAPI } from '../../../apis/StockAPICalls';
import BranchStockGraph from './BranchStockGraph';
import './BranchOrderHistory.css';

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

  useEffect(() => {
    dispatch(callBranchStockHistoryAPI());
    dispatch(callDetergentsInfoAPI());
    dispatch(callPartsInfoAPI());
  }, [dispatch]);

  useEffect(() => {
    setDetergentInfo(detergentsInfo);
    setPartsInfo(partsInfo);
  }, [detergentsInfo, partsInfo]);

  console.log('partsInfo', partInfo);
  console.log('detergentsInfo', detergentInfo);


  const handleClick = (item) => {
    setSelectedItem(item);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleApprove = (item) => {
    // Update stock values
    const updatedDetergentInfo = detergentInfo.map(detergent => {
      if (detergent.laundrySupply.laundrySupplyName === '세제') {
        return {
          ...detergent,
          laundrySupplyStock: detergent.laundrySupplyStock - item.bDetergent,
        };
      }
      if (detergent.laundrySupply.laundrySupplyName === '섬유유연제') {
        return {
          ...detergent,
          laundrySupplyStock: detergent.laundrySupplyStock - item.bSoftener,
        };
      }
      if (detergent.laundrySupply.laundrySupplyName === '표백제') {
        return {
          ...detergent,
          laundrySupplyStock: detergent.laundrySupplyStock - item.bBleach,
        };
      }
      if (detergent.laundrySupply.laundrySupplyName === '얼룩제거제') {
        return {
          ...detergent,
          laundrySupplyStock: detergent.laundrySupplyStock - item.bRemover,
        };
      }
      if (detergent.laundrySupply.laundrySupplyName === '세탁조 클리너') {
        return {
          ...detergent,
          laundrySupplyStock: detergent.laundrySupplyStock - item.bDrumCleaner,
        };
      }
      if (detergent.laundrySupply.laundrySupplyName === '건조기 시트') {
        return {
          ...detergent,
          laundrySupplyStock: detergent.laundrySupplyStock - item.bSheet,
        };
      }
      return detergent;
    });

    const updatedPartsInfo = partInfo.map(part => {
      if (part.laundryPart.laundryPartName === '세탁기 필터') {
        return {
          ...part,
          laundryPartStock: part.laundryPartStock - item.bLaundryFilter,
        };
      }
      if (part.laundryPart.laundryPartName === '건조기 필터') {
        return {
          ...part,
          laundryPartStock: part.laundryPartStock - item.bDryerFilter,
        };
      }
      if (part.laundryPart.laundryPartName === '드라이클리너 필터') {
        return {
          ...part,
          laundryPartStock: part.laundryPartStock - item.bDryCleanerFilter,
        };
      }
      return part;
    });

    setDetergentInfo(updatedDetergentInfo);
    setPartsInfo(updatedPartsInfo);

    console.log('승인 후 detergentsInfo:', detergentInfo);
    console.log('승인 후 partsInfo', partInfo);
    // Optional: Update the item status to '승인'
    // dispatch(updateItemStatus(item.bApplicationCode, '승인'));
  };

  const handleReject = (item) => {
    // Optional: Update the item status to '반려'
    // dispatch(updateItemStatus(item.bApplicationCode, '반려'));
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
          {selectedItem.bApplicationStatus === '미승인' && (
            <div className="branchStock-action-buttons">
              <button onClick={() => handleApprove(selectedItem)}>승인</button>
              <button onClick={() => handleReject(selectedItem)}>반려</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BranchOrderHistory;
