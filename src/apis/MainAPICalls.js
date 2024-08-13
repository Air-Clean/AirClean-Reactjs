import { MAIN_BRANCH } from "../modules/BranchModule"
import { REVENUE , UTILITY, MAINTENACNE, RANKING} from "../modules/MainModule"

export function callBranchApi(){

    const requestURl = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/main/branch`
    return async (dispatch , getState) =>{
        const result = await fetch(requestURl,{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                Accept : '*/*',
                Authorization : 'Bearer '+window.localStorage.getItem('accessToken')
            }
        }).then(res=>res.json())

        if(result.status===200){
            dispatch({type : MAIN_BRANCH , payload : result.data})
        }
    }
}


export function callRevenueApi({com , month}){

    let requestURL=null;

    console.log('com', com)
    console.log('month',month)
    console.log('callRevenueApi 동작')

    if(!month){
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const yearMonth = `${year}-${month}`

        if(!com || com ==='Total'){
            requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/main/revenue/Total?month=${yearMonth}`
        }else{
            requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/main/revenue/${com}?month=${yearMonth}` 
        }
    }else{
        if(!com || com ==='Total'){
            requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/main/revenue/Total?month=${month}`
        }else{
            requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/main/revenue/${com}?month=${month}` 
        }
    }

    return async (dispatch,getState)=>{
        const result = await fetch(requestURL,{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                Accept : '*/*',
                Authorization : 'Bearer '+window.localStorage.getItem('accessToken')
            }
        }).then(res=>res.json())


        console.log("callRevenueApi result ", result);

        if(result.status===200){
        dispatch({type : REVENUE , payload : result.data})
        }

    }
}
export function callUtilityApi({com,month}){

    let requestURL = null;

    if(!month){
        const today = new Date();
        const year = today.getFullYear();
        const month = String(today.getMonth()).padStart(2, '0');
        
        const yearMonth = `${year}-${month}`

        if(!com || com ==='Total'){
            requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/main/utility/Total?date=${yearMonth}`
        }else{
            requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/main/utility/${com}?date=${yearMonth}` 
        }
    }else{
        if(!com || com ==='Total'){
            requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/main/utility/Total?date=${month}`
        }else{
            requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/main/utility/${com}?date=${month}` 
        }
    }

    return async (dispatch , getState) =>{
        const result = await fetch(requestURL,{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                Accept : '*/*',
                Authorization : 'Bearer '+window.localStorage.getItem('accessToken')
            }
        }).then(res=>res.json())

        console.log('utitlityCost result',result)

        if(result.status===200){
        dispatch({type : UTILITY , payload : result.data})
        }
    }
}

export function callMaintenanceCost({ value = 1}){

    console.log('callMaintenanceCost 동작')

    let requestURL = null;
    
    if(parseInt(value) === 1 ){
        console.log('시설물아아아')
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/main/maintenance/facility?branchCode=Total`
    }else{
        requestURL= `http://${process.env.REACT_APP_RESTAPI_IP}:8080/main/maintenance/car?branchCode=Total`
    }

    console.log('주솟 ',requestURL)
    

    return async (dispatch, getState)=>{
        const result= await fetch(requestURL,{
            method : "GET",
            headers : {
                'Content-Type' : 'application/json',
                Accept : '*/*',
                Authorization : 'Bearer '+window.localStorage.getItem('accessToken')
            }
        }).then(res=>res.json())

        console.log('callMaintenanceCost result ', result)

        if(result.status===200){
            dispatch({type : MAINTENACNE , payload : result.data})
        }
    }
   
}

export function getRanking(){
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/main/rank`

    return async (dispatch , getState) =>{
        const result = await fetch(requestURL,{
            method : "GET",
            headers : {
                'Content-Type' : 'application/json',
                Accept : '*/*',
                Authorization : 'Bearer '+window.localStorage.getItem('accessToken')
            }
        }).then(res=>res.json(0))

        console.log('123124ljlkj',result)

        if(result.status===200){
            console.log('2000 통과했는데')
            dispatch({type : RANKING , payload : result.data})
        }
    }
}

