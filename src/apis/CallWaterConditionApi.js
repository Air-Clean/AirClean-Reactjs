import { LOCATION_WATER } from '../modules/LandlyModule';

export function fetchWaterLevel() {
    let branchCode = null;
    try {
        const branch = JSON.parse(window.localStorage.getItem('branch'));
        if (branch) {
            branchCode = branch.branchCode;
        }
    } catch (error) {
        console.error("조회한 브런치 코드가 없습니다.", error);
    }

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/location/water/${branchCode}`;
    console.log('Request URL:', requestURL);  // URL이 올바른지 확인

    return async (dispatch) => {
        try {
            const response = await fetch(requestURL, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
                }
            });

            if (!response.ok) {
                throw new Error('네트워크 응답이 좋지 않습니다.');
            }

            const result = await response.json();
            console.log('[fetchWaterLevel] fetchWaterLevel result: ', result);

            dispatch({
                type: LOCATION_WATER,
                payload: result.data // 서버에서 받아온 데이터를 payload에 저장
            });
        } catch (error) {
            console.error('디스패치 실패 했습니다.', error);
        }
    };
}
