import { BRANCH_INFO , BRANCH_FACILITY_INFO, BRANCH_MANAGER} from "../modules/BranchModule";
export function callBranchInfo(){
    console.log("callBranchInfo 동작")

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/branch/info`

    return async (dispatch,getState)=>{
        const result = await fetch(requestURL,{
            method : "GET",
            headers : {
                'Content-Type' : 'application/json',
                Accept : '*/*',
                Authorization : 'Bearer '+window.localStorage.getItem('accessToken')
            }
        }).then(res=>res.json());

        console.log('branch 정보 잘 왔는가 ? ',result)

        if(result.status===200){
            dispatch({type : BRANCH_INFO , payload : result.data})
        }
    }
}

export function callBranchFacility({branchCode}){
    console.log('callBranchFacility 동작')
    let requestURL = '';
    if(branchCode){
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/branch/facility/${branchCode}`
    }else{
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/branch/facility`
    }

    return async (dispatch , getState)=>{
        const result= await fetch(requestURL,{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                Accept : '*/*',
                Authorization : 'Bearer '+window.localStorage.getItem('accessToken') 
            }
        }).then(res=>res.json())

        console.log('시설정보 들어 왔는가 ? ', result)

        if(result.status===200){
            
            dispatch({ type : BRANCH_FACILITY_INFO , payload : result.data})
        }
    }
    

}

export function deleteBranch({branch}){

    console.log('deleteBranch 동작')
    console.log(branch)
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/branch`

    return async (disptach,getState) =>{
        const result = await fetch(requestURL,{
            method : "DELETE",
            headers : {
                'Content-Type' : 'application/json',
                Accept : '*/*',
                Authorization : 'Bearer '+window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify(branch)
        }).then(res=>res.json())

        console.log('삭제 됨 ?' , result )

    }


}

export function getManager(){
    console.log("getManager 동작")

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/branch/manager`

    return async (dispatch , getState)=>{
        const result =  await fetch(requestURL,{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                Accept : '*/*',
                Authorization : 'Bearer '+window.localStorage.getItem('accessToken')
            }
        }).then(res=>res.json())

        console.log('지점장 정보 잘 가지고 왔는가 ? ',result)
        if(result.status===200){
            dispatch({type : BRANCH_MANAGER , payload : result.data})
        }
    }
}

export function registManager({form}){
    console.log("registManager 동작")

    
        console.log('[formdata ]', form.get("branchAddress"))
        console.log('[formdata ]', form.get("branchName"))
        console.log('[formdata ]', form.get("branchPhone"))
        console.log('[formdata ]', form.get("branchOpenDate"))
        console.log('[formdata ]', form.get("memberId"))
        console.log('[formdata ]', form.get("image"))
        console.log('[formdata ]', form.get("branchRegion"))
        


    
    const requestURL  = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/branch/regist`

    return async (dispatch , getState) =>{
        const result = await fetch(requestURL,{
            method : 'POST',
            headers : {
                Accept : '*/*',
                Authorization : 'Bearer '+window.localStorage.getItem('accessToken')
            },
            body : form
        }).then(res=>res.json())

        console.log('result 잘들어 왔는가 ',result)
    }
}