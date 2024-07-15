import { combineReducers } from "redux";
import memberReducer from "./MemberModule";

const rootReducer = combineReducers({
    memberReducer,
})

export default rootReducer;