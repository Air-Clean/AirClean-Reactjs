import { CARINFOLIST , CARDRIVER} from "../modules/CarModule";


// 매출보고서 전체 조회 API
export const callCarInfoListAPI = ({current}) => {

    let requestURL = null;
    if(current){
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/carsservice/company/cars?offset=${current}`;

    }else{
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/carsservice/company/cars`;

    }

    console.log('주소',requestURL)
    

    return async (dispatch, getState) => {
        try {
            const response = await fetch(requestURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                },
            });
            const carResult = await response.json();

            // 응답 데이터 로그 출력
            console.log('API 응답:', carResult);

            // 액션 디스패치
            dispatch({ type: CARINFOLIST, payload: carResult.data });
        } catch (error) {
            console.error('API 호출 에러:', error);
        }
    };
};

export function callDriverWithNoAssigned(){
    console.log("callDriverWithNoAssigned 동작")

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/carsservice/driver`
    
    return async (dispatch, getState)=>{
        const result = await fetch(requestURL,{
            method:"GET",
            headers : {
                'Content-Type' : 'application/json',
                Accept : '*/*',
                Authorization : 'Bearer '+window.localStorage.getItem('accessToken')
            }
        }).then(res=>res.json())

        console.log('차량기사 조회 확인 ',result)

        if(result.status===200){
            dispatch({type : CARDRIVER , payload : result.data})
        }
    }
}

export function callRegistCar({form}){
    console.log('callRegistCar', form) 

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/carsservice/car`

    return async (dispatch, getState)=>{
        const result = await fetch(requestURL,{
            method : 'POST',
            headers : {
                Accept : '*/*',
                Authorization : 'Bearer '+window.localStorage.getItem('accessToken')
            },
            body : form
        }).then(res=>res.json())

        console.log('callRegistCar result ',result)
    }

}

export function callDeleteCar({selectedCars}){
    console.log("callDeleteCar 동작",selectedCars)

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/carsservice/car`

    return async (dispatch,getState)=>{
        const result = await fetch(requestURL,{
            method : "DELETE",
            headers : {
                'Content-Type' : 'application/json',
                Accept : '*/*',
                Authorization : 'Bearer '+window.localStorage.getItem('accessToken')
            },
            body : JSON.stringify(selectedCars)
        }).then(res=>res.json())
    }
}

export function assignDriver({selectedDriver, selectedCar}){

    console.log("assignDriver 동작함")

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/carsservice/assign?selectedDriver=${selectedDriver}&selectedCar=${selectedCar}`

    return async (dispatch ,getState) =>{
        const result = await fetch(requestURL,{
            method : "PUT", 
            headers : {
                'Content-Type':'application/json',
                Accept : '*/*',
                Authorization : 'Bearer '+window.localStorage.getItem('accessToken')
            }
        }).then(res=>res.json())

        console.log('등록됨',result)
    }
}

export function unAssignDriver({selectedDriver, selectedCar}){
    console.log("unAssignDriver 동작")

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/carsservice/unassign?selectedDriver=${selectedDriver}&selectedCar=${selectedCar}`

    return async (dispatch,getState)=>{
        const result = await fetch(requestURL,{
            method : 'PUT',
            headers : {
                'Content-Type' : 'application/json',
                Accept : '*/*',
                Authorization : 'Bearer '+window.localStorage.getItem('accessToken')
            }
        }).then(res=>res.json())

        console.log('unAssignDriver reuslt',result)
    }
}