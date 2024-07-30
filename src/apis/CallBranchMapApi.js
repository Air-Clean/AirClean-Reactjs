import { BRANCH_INFO } from "../modules/BranchModule";
export function callBranchInfo(){
    console.log("callBranchInfo 동작함")

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/branch/info`

    return async (dispatch , getState) => {
        const result = await fetch(requestURL,{
            method : "GET",
            headers : {
                'Content-Type' : 'application/json',
                Accept : '*/*',
                Authorization : 'Bearer '+window.localStorage.getItem('accessToken')
            }
        }).then(res=>res.json())
    

        console.log('성공적으로 동작 하는가 ? ', result);
    }
}