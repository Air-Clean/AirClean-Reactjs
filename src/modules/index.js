import { combineReducers } from "redux";
import memberReducer from "./MemberModule";
import askReducer from "./AskModule";
import humanReducer from "./HRModule";
import carReducer from "./CarModule";

import carInfoReducer from "./CarModule";

import { branchReducer } from "./BranchModule";

// 도아 - 보고서 
import { branchSalesReducer , detailBranchSalesReducer
    , vehicleRepairReducer, detailVehicleRepairReducer, newVehicleRepairReducer
    // registVehicleRepairReducer
    , expenseReducer, detailExpenseReducer
    , findAllRepairReducer,detailRepairReducer
    , carMembersReducer
} from "./ReportsModule";

import {detergentsInfoReducer, partsInfoReducer, headStockHistoryReducer}  from "./StockModule";



const rootReducer = combineReducers({
    memberReducer,
    askReducer,
    humanReducer,
    carReducer,

    carInfoReducer,

    branchSalesReducer,
    detailBranchSalesReducer,
    vehicleRepairReducer,
    expenseReducer,
    detailExpenseReducer,
    detailVehicleRepairReducer,
    findAllRepairReducer,
    detailRepairReducer,
    carMembersReducer,
    // registVehicleRepairReducer,
    newVehicleRepairReducer,
    
    detergentsInfoReducer,
    partsInfoReducer,
    headStockHistoryReducer,

    branchReducer

})



export default rootReducer;

