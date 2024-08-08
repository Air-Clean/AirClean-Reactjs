import { FACILITYDETAIL, FACILITYLAUNDRYWAY } from "../modules/FacilityModule";
import jwtDecode from "jwt-decode";

export const callFacilityDetailInfoAPI = ({branchCode}) => {

    console.log("callFacilityDetailInfoAPI")

    const members = jwtDecode(window.localStorage.getItem('accessToken'));
    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/location/facility?branchCode=${branchCode}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            }
        }
        ).then((response) => response.json());

        console.log('시설물상세 API 응답:', result.data);

        dispatch({type: FACILITYDETAIL, payload: result.data})
    };

}

export const callFacilityLaundryWayInfoAPI = ({branchCode}) => {

    console.log('callFacilityLaundryWayInfoAPI')

    const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/location/facility/laundryWay?branchCode=${branchCode}`;

    return async (dispatch, getState) => {
        const result = await fetch(requestURL, {
            method: 'GET',
            headers: {
                'content-Type': 'application/json',
                Accept: '*/*',
                Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
            }
        }
        ).then((response) => response.json());

        console.log('시설 도출된 세탁 API 응답:', result.data);

        dispatch({type: FACILITYLAUNDRYWAY, payload: result.data})
    };
}