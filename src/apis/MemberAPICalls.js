import { carList } from '../modules/CarModule'; // 올바른 경로로 수정

export const callCarList = ({ current }) => {
    let requestURL;

    if (current !== undefined && current !== null) {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/cars?offset=${current}`;
    } else {
        requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/cars`;
    }

    console.log('callCarList 동작함');
    console.log(requestURL);

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            },
        }).then(res => res.json());

        if (result.status === 200) {
            console.log('callCarList 조회 성공 ', result);
            dispatch(carList(result.data));
        }
    };
};
