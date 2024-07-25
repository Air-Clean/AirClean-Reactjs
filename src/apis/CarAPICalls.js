// import { CARLIST } from "../modules/CarModule"; // 대소문자 수정
// import jwtDecode from "jwt-decode";

// export const callCarList = ({ current }) => {
//     const members = jwtDecode(window.localStorage.getItem('accessToken'));
//     console.log('members 보기', members);
//     const requestURL = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/cars?offset=${current}&memberName=${members.memberName}&memberRole=${members.memberRole}&sub=${members.sub}`;

//     console.log('callCarList 동작함');
//     console.log(requestURL);

//     return async (dispatch, getState) => {
//         const result = await fetch(requestURL, {
//             method: 'GET',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Accept: '*/*',
//                 Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
//             }
//         }).then((response) => response.json());

//         console.log('Car List API 응답:', result.data);

//         // 액션 디스패치
//         dispatch({ type: CARLIST, payload: result.data });
//     };
// }
