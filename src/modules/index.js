import { combineReducers } from "redux";
import {memberReducer , getBranchReducer} from "./MemberModule";
import askReducer from "./AskModule";
import {humanReducer , humanBranchReducer} from "./HRModule";
import carReducer from "./CarModule";

import carInfoReducer from "./CarModule";

import { branchReducer ,branchInfoReducer,branchFacilityInfoReducer,branchManagerReducer} from "./BranchModule";

// 도아 - 보고서 
import { 
    branchSalesReducer , detailBranchSalesReducer, newBranchSalesReducer,updateBranchSalesReducer, deleteBranchSalesReducer
    , vehicleRepairReducer, detailVehicleRepairReducer
    , expenseReducer, detailExpenseReducer, newExpenseReducer
    , findAllRepairReducer,detailRepairReducer, newRepairReducer
    , carMembersReducer
} from "./ReportsModule";

import {detergentsInfoReducer, partsInfoReducer, headStockHistoryReducer, branchStockHistoryReducer}  from "./StockModule";

import facilityDetailInfoReducer from "./FacilityModule";

import {waterLevelReducer} from "./LandlyModule";
import {selectLocationWater} from "./LandlyModule";
import {selectWaterSupply} from "./LandlyModule";



const rootReducer = combineReducers({
    memberReducer,
    branchInfoReducer,
    getBranchReducer,
    askReducer,
    branchFacilityInfoReducer,
    branchManagerReducer,

    humanReducer,
    humanBranchReducer,

    carReducer,

    carInfoReducer,

    branchSalesReducer,
    detailBranchSalesReducer,
    newBranchSalesReducer,
    updateBranchSalesReducer,
    deleteBranchSalesReducer,
    vehicleRepairReducer,
    expenseReducer,
    detailExpenseReducer,
    newExpenseReducer,
    detailVehicleRepairReducer,
    findAllRepairReducer,
    detailRepairReducer,
    carMembersReducer,
    newRepairReducer,
    
    detergentsInfoReducer,
    partsInfoReducer,
    headStockHistoryReducer,
    branchStockHistoryReducer,

    facilityDetailInfoReducer,

    branchReducer,


    waterLevelReducer,
    selectLocationWater,
    selectWaterSupply


})



export default rootReducer;