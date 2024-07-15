import { POST_LOGIN } from "../modules/MemberModule";

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

    return async (dispatch,getState) =>{
        dispatch({
            type : POST_LOGIN, payload: ''
        })
    }
}