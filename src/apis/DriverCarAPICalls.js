import axios from 'axios';

export const DRIVERCARINFOLIST = 'DRIVERCARINFOLIST';

export const getDriverCarListSuccess = (driverCarList) => ({
    type: DRIVERCARINFOLIST,
    payload: driverCarList
});

export const callDriverCarInfoListAPI = () => {
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/api/driver/list`;

    return async (dispatch) => {
        try {
            const response = await axios.get(requestURL, {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: '*/*',
                    Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
                },
            });
            dispatch(getDriverCarListSuccess(response.data.data)); // Assuming the data is in the `data` field of the response
        } catch (error) {
            console.error('Failed to fetch driverCar list', error);
        }
    };
};
