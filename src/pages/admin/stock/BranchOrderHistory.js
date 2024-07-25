import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { callHeadStockHistoryAPI } from '../../../apis/StockAPICalls';

function BranchOrderHistory() {

    return(
        <>
            <h1>지점 발주신청 내역</h1>
        </>
    );

}

export default BranchOrderHistory;
