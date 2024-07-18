import { combineReducers } from "redux";
import memberReducer from "./MemberModule";
import askReducer from "./AskModule";
import humanReducer from "./HRModule";

// 도아 - 보고서 
import branchSalesReducer from "./ReportsModule";


const rootReducer = combineReducers({
    memberReducer,
    askReducer,
    humanReducer,
    branchSalesReducer,
})

export default rootReducer;