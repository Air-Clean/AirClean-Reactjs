import { combineReducers } from "redux";
import memberReducer from "./MemberModule";
import askReducer from "./AskModule";
import humanReducer from "./HRModule";

// 도아 - 보고서 
import { branchSalesReducer, vehicleRepairReducer} from "./ReportsModule";


const rootReducer = combineReducers({
    memberReducer,
    askReducer,
    humanReducer,
    branchSalesReducer,
    vehicleRepairReducer,
})

export default rootReducer;