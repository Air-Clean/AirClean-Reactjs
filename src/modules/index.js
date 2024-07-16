import { combineReducers } from "redux";
import memberReducer from "./MemberModule";
import askReducer from "./AskModule";

const rootReducer = combineReducers({
    memberReducer,
    askReducer,
})

export default rootReducer;