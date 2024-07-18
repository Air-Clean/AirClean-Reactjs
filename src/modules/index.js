import { combineReducers } from "redux";
import memberReducer from "./MemberModule";
import askReducer from "./AskModule";
import humanReducer from "./HRModule";


const rootReducer = combineReducers({
    memberReducer,
    askReducer,
    humanReducer,
})

export default rootReducer;