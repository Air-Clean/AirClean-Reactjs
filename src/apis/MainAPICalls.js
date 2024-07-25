import { MAIN_BRANCH } from "../modules/BranchModule"

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