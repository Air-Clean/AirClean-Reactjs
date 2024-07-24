import { combineReducers } from "redux";
import memberReducer from "./MemberModule";
import askReducer from "./AskModule";
import humanReducer from "./HRModule";

// 도아 - 보고서 
import { branchSalesReducer, detailBranchSalesReducer, vehicleRepairReducer, expenseReducer, detailExpenseReducer } from "./ReportsModule";

import {detergentsInfoReducer, partsInfoReducer, headStockHistoryReducer}  from "./StockModule";


const rootReducer = combineReducers({
    memberReducer,
    askReducer,
    humanReducer,

    branchSalesReducer,
    detailBranchSalesReducer,
    vehicleRepairReducer,
    expenseReducer,
    detailExpenseReducer,
    
    detergentsInfoReducer,
    partsInfoReducer,
    headStockHistoryReducer



})

export default rootReducer;