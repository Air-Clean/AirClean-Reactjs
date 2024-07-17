import { EMPLOYEE } from "../modules/HRModule";

export const callEmployeeList=({current})=>{
    let requestURL;

    if(current !== undefined || current !== null){
        requestURL =`http://${process.env.REACT_APP_RESTAPI_IP}:8080/members/employee?offset=${current}`;

    }else{
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/members/employee`;
    }

    console.log('callEmployeeList 동작함')
    console.log(requestURL)

    console.log(window.localStorage.getItem('accessToken'))

    return async (dispatch,getState)=>{
        const result = await fetch(requestURL,{
            method : 'GET',
            headers : {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then(res=>res.json())

        if(result.status === 200){
            console.log('callEmployeeList 조회 성공 ',result)

            dispatch({type : EMPLOYEE , payload : result.data })
        }
    }
}