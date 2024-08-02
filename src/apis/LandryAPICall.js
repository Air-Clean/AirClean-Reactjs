import { SET_WATER_LEVEL, SET_WATER_SUPPLY } from '../modules/LandlyModule';

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

            console.log('[fetchWaterLevel] fetchWaterLevel result: ', result);

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

            console.log('supply result: ', result);

            dispatch({
                type: SET_WATER_SUPPLY,
                payload: result.data.waterSupply
            });
            
        } catch (error) {
            console.error('디스패치 실패 했습니다.', error);
        }
    };

}