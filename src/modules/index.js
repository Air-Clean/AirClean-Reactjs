import { combineReducers } from "redux";
import {memberReducer , getBranchReducer} from "./MemberModule";
import {askReducer , alarmMessageReducer} from "./AskModule";
import {humanReducer , humanBranchReducer, branchCountReducer} from "./HRModule";

import { carDriverReducer, carReducer } from "./CarModule"; 
// import carInfoReducer from "./CarModule";

import { branchReducer ,branchInfoReducer,branchFacilityInfoReducer,branchManagerReducer} from "./BranchModule";

// 도아 - 보고서 
import { 
    branchSalesReducer , detailBranchSalesReducer, newBranchSalesReducer,updateBranchSalesReducer, deleteBranchSalesReducer
    , vehicleRepairReducer, detailVehicleRepairReducer
    , expenseReducer, detailExpenseReducer, newExpenseReducer, updateEXpenseReducer, deleteEXpenseReducer
    , findAllRepairReducer,detailRepairReducer, newRepairReducer, updateRepairReducer,deleteRepairReducer
    , carMembersReducer, waterCostReducer
    , branchSalesMemberNameReducer, repairMemberNameReducer, expenseMemberNameReducer
} from "./ReportsModule";

import  {detergentsInfoReducer, partsInfoReducer, headStockHistoryReducer, branchStockHistoryReducer}  from "./StockModule";

import facilityDetailInfoReducer from "./FacilityModule";

import {waterLevelReducer} from "./LandlyModule";
import {selectLocationWater} from "./LandlyModule";
import {selectWaterSupply, selectLaundry} from "./LandlyModule";



const rootReducer = combineReducers({
    memberReducer,
    branchInfoReducer,
    getBranchReducer,
    askReducer,
    alarmMessageReducer,
    branchFacilityInfoReducer,
    branchManagerReducer,
    branchCountReducer,

    humanReducer,
    humanBranchReducer,

    carReducer,
    carDriverReducer,

    branchSalesReducer,
    detailBranchSalesReducer,
    newBranchSalesReducer,
    updateBranchSalesReducer,
    deleteBranchSalesReducer,
    vehicleRepairReducer,
    expenseReducer,
    detailExpenseReducer,
    updateEXpenseReducer,
    newExpenseReducer,
    deleteEXpenseReducer,
    detailVehicleRepairReducer,
    findAllRepairReducer,
    detailRepairReducer,
    updateRepairReducer,
    deleteRepairReducer,
    carMembersReducer,
    newRepairReducer,
    branchSalesMemberNameReducer,
    expenseMemberNameReducer,
    repairMemberNameReducer,
    waterCostReducer,
    
    detergentsInfoReducer,
    partsInfoReducer,
    headStockHistoryReducer,
    branchStockHistoryReducer,

    facilityDetailInfoReducer,

    branchReducer,


    waterLevelReducer,
    selectLocationWater,
    selectWaterSupply,
    selectLaundry


})



export default rootReducer;