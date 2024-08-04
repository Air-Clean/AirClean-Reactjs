import { POST_LOGIN ,AFTER_LOGIN } from "../modules/MemberModule";
import {FIND_MEMBER , ALARM_MESSAGE} from "../modules/AskModule";

export const callLoginAPI= ({ form }) => {
    const requestURL= `http://${process.env.REACT_APP_RESTAPI_IP}:8080/auth/login`;

    console.log('form 왔나',form)

    return async (dispatch,getState)=>{

        const result = await fetch(requestURL,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                Accept: '*/*',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                memberId: form.memberId,
                memberPassword : form.memberPassword,
            }),
        }).then(res=>res.json());

        console.log('[MemberAPICalls] callLoginAPI RESULT : ', result);

        if(result.status === 200){
            window.localStorage.setItem('accessToken',result.userInfo.accessToken);
        }

        dispatch({type : POST_LOGIN , payload:result})
        
    }
}

export function callLogoutAPI(){

    window.localStorage.removeItem('branch')
    window.localStorage.removeItem('accessToken')


    return async (dispatch,getState) =>{
        dispatch({
            type : POST_LOGIN, payload: ''
        })
    }
}

export function callFindUserAPI({ form }){

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/auth/inquiry`
    return async (dispatch,getState) => {
        const result = await fetch(
            requestURL,{
                method : 'POST',
                headers : {
                    'Content-Type' : 'application/json',
                    Accept : '*/*',
                    'Access-Control-Allow-Origin' : '*'
                },
                body : JSON.stringify({
                    memberName : form.memberName,
                    memberPhone : form.memberPhone,
                    memberEmail : form.memberEmail,
                    memberRole : form.memberRole,
                    askDescription : form.askDescription,
                })
            }
        ).then(res=>res.json())

        console.log('[callFindUserAPI] callFindUserAPI result : ',result)

        dispatch({
            type : FIND_MEMBER , payload : result
        })
    }
}


export function callBranchData({memberId}){

    console.log('callBranchData 동작 함' )

    const requestUrl= `http://${process.env.REACT_APP_RESTAPI_IP}:8080/members/loging/${memberId}`
    return async (dispatch , getState) =>{
        const result = await fetch(requestUrl,{
            method : "GET",
            headers : {
                'Content-Type' : 'application/json',
                Accept : '*/*',
                Authorization : 'Bearer ' + window.localStorage.getItem('accessToken')
            }
        }).then(res=>res.json())

        console.log('지점장 로그인과 동시 지점 정보 get',result)
        if(result.status===200){
            dispatch({
                type : AFTER_LOGIN ,payload : result.data
            })
        }
    }
}

export function callAlarmMessage(){

    console.log('callAlarmMessage 동작')

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/auth/message`

    return async (dispatch , getState)=> {
        const result = await fetch(requestURL, {
            method : "GET",
            headers : {
                'Content-Type' : 'application/json',
                Accept : '*/*',
                Authorization : 'Bearer '+window.localStorage.getItem('accessToken')
            }
        }).then(res=>res.json())

        console.log('메세지 확인 ',result)

        if(result.status === 200){
            dispatch({type: ALARM_MESSAGE , payload : result.data})
        }
    }
}

export function callMemberChangePassword({memberId}){
    console.log("callMemberChangePassword 동작" , memberId)

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/auth/message`

    return async (dispatch , getState) => {
        const result = await fetch(requestURL,{
            method : "PUT",
            headers : {
                'Content-Type' : 'application/json',
                Accept : '*/*',
                Authorization : 'Bearer '+window.localStorage.getItem('accessToken')
            },
            body : memberId
        })

    }
}