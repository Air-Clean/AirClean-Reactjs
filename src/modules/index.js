import { combineReducers } from "redux";
import memberReducer from "./MemberModule";
import askReducer from "./AskModule";
import humanReducer from "./HRModule";

// 도아 - 보고서 
import { branchSalesReducer, detailBranchSalesReducer, vehicleRepairReducer, expenseReducer } from "./ReportsModule";

import detergentsInfoReducer from "./DetergentInfoModule";
import partsInfoReducer from "./PartInfoModule";


const rootReducer = combineReducers({
    memberReducer,
    askReducer,
    humanReducer,

    branchSalesReducer,
    detailBranchSalesReducer,
    vehicleRepairReducer,
    expenseReducer,
    
    detergentsInfoReducer,
    partsInfoReducer,

   

})

export default rootReducer;