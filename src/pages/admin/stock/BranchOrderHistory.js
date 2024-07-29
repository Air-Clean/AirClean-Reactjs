import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callBranchStockHistoryAPI } from '../../../apis/StockAPICalls';
import BranchStockGraph from './BranchStockGraph';
import './BranchOrderHistory.css';

function BranchOrderHistory() {
  const dispatch = useDispatch();
  const branchStockHistory = useSelector(state => state.branchStockHistoryReducer) || [];
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    dispatch(callBranchStockHistoryAPI());
  }, [dispatch]);

  console.log('branchstock API 호출완료', branchStockHistory);

  const handleClick = (item) => {
    setSelectedItem(item);
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

  const sortedBranchStockHistory = branchStockHistory.slice().sort((a, b) => a.bApplicationCode - b.bApplicationCode);

  return (
    <div className="branchStock-order-history">
      <h1>지점 발주신청 내역</h1>
      <div className="branchStock-order-table">
        <div className="branchStock-order-header">
          <div>코드</div>
          <div>상태</div>
          <div>신청일자</div>
          <div>승인자</div>
          <div>승인일자</div>
          <div>지점 코드</div>
        </div>
        {sortedBranchStockHistory.length > 0 ? (
          sortedBranchStockHistory.map(item => (
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
                <th>드럼클리너</th>
                <th>시트</th>
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
                <th>세탁필터</th>
                <th>건조기 필터</th>
                <th>드라이 클리너 필터</th>
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
        </div>
      )}
    </div>
  );
}

export default BranchOrderHistory;
