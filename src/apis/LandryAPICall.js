import { SET_WATER_LEVEL, SET_WATER_SUPPLY, SET_LAUNDRY_SELECT , SET_LAUNDRYWAY_SELECT} from '../modules/LandlyModule';
import axios from 'axios';

export function fetchWaterLevel() {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/management/waterTank`;
    
    return async (dispatch) => {
        try {
            const result = await fetch(requestURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization : 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            }).then(res => res.json());

            // console.log('[fetchWaterLevel] fetchWaterLevel result: ', result);

            dispatch({
                type: SET_WATER_LEVEL,
                payload: result.data.waterTank // 올바른 경로로 waterTank 데이터를 추출
            });
        } catch (error) {
            console.error('디스패치 실패 했습니다.', error);
        }
    };
}

export function fetchWaterSupply() {
    let branchCode = null;
    try {
        const branch = JSON.parse(window.localStorage.getItem('branch'));
        if (branch) {
            branchCode = branch.branchCode;
        }
    } catch (error) {
        console.error("조회한 브런치 코드가 없습니다.", error);
    }

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/management/waterSupply/${branchCode}`;

    return async (dispatch) => {
        try {
            const result = await fetch(requestURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            }).then(res => res.json());

            // console.log('supply result: ', result);

            dispatch({
                type: SET_WATER_SUPPLY,
                payload: result.data.waterSupply
            });
            
        } catch (error) {
            console.error('디스패치 실패 했습니다.', error);
        }
    };
}

export function fetchLaundrySelect(branchCode) {
    // console.log("패치 실행되었습니다");
    // console.log("패치 안에서의 출력입니다: ", branchCode);

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/management/selectLaundry/${branchCode}`;

    return async (dispatch) => {
        try {
            const result = await fetch(requestURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            }).then(res => res.json());

            // console.log('supply result: ', result);

            dispatch({
                type: SET_LAUNDRY_SELECT,
                payload: result.data.selectLandry 
            });
            
        } catch (error) {
            console.error('디스패치 실패 했습니다.', error);
        }
    };
}

export function fetchArrivedLaundry(branchCode){
    console.log('fetchArrivedLaundry 동작')

    const ruquestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/management/arrivedLaundry/${branchCode}`

    return async (dispatch , getState)=> {
        const result = await fetch(ruquestURL ,{
            method : 'GET',
            headers : {
                'Content-Type' : 'application/json',
                Accept : '*/*',
                Authorization : 'Bearer '+window.localStorage.getItem('accessToken')
            }
        }).then(res=>res.json())

        console.log('도착한 세탁물 조회',result.data)

        dispatch({
            type : SET_LAUNDRYWAY_SELECT,
            payload : result.data
        })
    }
}

export function updateLaundryStatus(laundryCode, statusType, statusValue, branchCode) {
    return async (dispatch) => {
        try {
            const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/management/updateLaundryStatus`;
            await axios.put(requestURL, {
                laundryCode,
                statusType,
                statusValue
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            });
            // 서버에서 업데이트된 데이터를 다시 가져오기
            dispatch(fetchLaundrySelect(branchCode));
        } catch (error) {
            console.error('Failed to update laundry status', error);
        }
    };
}

export function selectLaundryWay(branchCode) {
    // console.log("패치 실행되었습니다");
    // console.log("패치 안에서의 출력입니다: ", branchCode);

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/registration/selectLaundryWay/${branchCode}`;

    return async (dispatch) => {
        try {
            const result = await fetch(requestURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            }).then(res => res.json());

            console.log('supply Way result: ', result);

            dispatch({
                type: SET_LAUNDRYWAY_SELECT,
                payload: result.data.laundryWayList 
            });
            
        } catch (error) {
            console.error('디스패치 실패 했습니다.', error);
        }
    };
}