import { SET_WATER_LEVEL } from '../modules/LandlyModule';

export function fetchWaterLevel() {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/management/waterTank`;
    
    return async (dispatch) => {
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
            payload: result.level
        });
    };
}
