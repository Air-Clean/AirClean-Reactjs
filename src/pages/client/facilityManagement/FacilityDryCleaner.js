// import { useState, useEffect, useRef } from 'react';
// import './FacilityManagement.css';
// import { useDispatch, useSelector } from 'react-redux';
// import { callFacilityDetailInfoAPI } from '../../../apis/FacilityAPICalls';
// import { fetchWaterLevel } from '../../../apis/LandryAPICall';

// function FacilityDrum() {
//     const dispatch = useDispatch();
//     const facilityDetail = useSelector(state => state.facilityDetailInfoReducer);
//     const branchWaterInfo = useSelector(state => state.waterLevelReducer);

//     const branch = JSON.parse(window.localStorage.getItem('branch'));

//     useEffect(() => {
//         dispatch(callFacilityDetailInfoAPI({ branchCode: branch.branchCode }));
//         dispatch(fetchWaterLevel());
//     }, [dispatch, branch.branchCode]);

//     const [currentTimes, setCurrentTimes] = useState({});
//     const [isRunning, setIsRunning] = useState({});
//     const [updatedWaterTanks, setUpdatedWaterTanks] = useState({});

//     const maxTime = 0.2; // 최대 시간 (분 단위)
//     const intervalRefs = useRef({});

//     useEffect(() => {
//         setUpdatedWaterTanks(branchWaterInfo.waterTanks.reduce((acc, tank) => {
//             acc[tank.branchCode] = tank;
//             return acc;
//         }, {}));
//     }, [branchWaterInfo]);

//     useEffect(() => {
//         console.log('물탱크 상태 업데이트 됨:', updatedWaterTanks);
//     }, [updatedWaterTanks]);

//     useEffect(() => {
//         Object.keys(isRunning).forEach(facilityId => {
//             if (isRunning[facilityId]) {
//                 intervalRefs.current[facilityId] = setInterval(() => {
//                     setCurrentTimes(prevTimes => {
//                         const newTime = (prevTimes[facilityId] || 0) + 1 / 60; // 1초마다 1/60분 증가
//                         if (newTime >= maxTime) {
//                             clearInterval(intervalRefs.current[facilityId]);
//                             return { ...prevTimes, [facilityId]: maxTime };
//                         }
//                         return { ...prevTimes, [facilityId]: newTime };
//                     });
//                 }, 1000); // 1초마다 업데이트

//                 return () => clearInterval(intervalRefs.current[facilityId]);
//             } else {
//                 clearInterval(intervalRefs.current[facilityId]);
//             }
//         });
//     }, [isRunning]);

//     const handleStart = (facilityId) => {
//         if (!isRunning[facilityId]) {
//             setIsRunning(prev => ({ ...prev, [facilityId]: true }));
//         }
//     };

//     const handleComplete = async (facilityId) => {
//         if (isRunning[facilityId]) {
//             const facility = facilityDetail.find(item => item.facilityId === facilityId);
//             if (facility) {
//                 const branchCode = facility.branchDTO.branchCode;
//                 const tank = updatedWaterTanks[branchCode];
//                 if (tank) {
//                     const newWaterCurCapacity = tank.waterCurCapacity - (maxTime * 0.4);
//                     const updatedTank = {
//                         ...tank,
//                         waterCurCapacity: newWaterCurCapacity,
//                     };
    
//                     console.log('업데이트된 물탱크:', updatedTank);
    
//                     setUpdatedWaterTanks(prevTanks => ({
//                         ...prevTanks,
//                         [branchCode]: updatedTank
//                     }));
    
//                     try {
//                         const waterTankUpdatedUrl = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/location/facility/waterTankUpdate`;
//                         const updatedWaterResponse = await fetch(waterTankUpdatedUrl, {
//                             method: 'PUT',
//                             headers: {
//                                 'Content-Type': 'application/json',
//                                 Accept: '*/*',
//                                 Authorization: 'Bearer ' + window.localStorage.getItem('accessToken'),
//                             },
//                             body: JSON.stringify(updatedTank),
//                         });
    
//                         if (updatedWaterResponse.ok) {
//                             console.log('물탱크가 성공적으로 업데이트되었습니다.', updatedTank);
//                             dispatch(fetchWaterLevel());
//                         } else {
//                             console.error('물탱크 업데이트 오류:', updatedWaterResponse.statusText);
//                         }
//                     } catch (error) {
//                         console.error('물탱크 업데이트 중 오류 발생:', error);
//                     }
//                 }
//             }
//             setCurrentTimes(prevTimes => ({ ...prevTimes, [facilityId]: 0 }));
//             setIsRunning(prev => ({ ...prev, [facilityId]: false }));
//         }
//     };

//     const percentage = (currentTime) => {
//         const percent = (currentTime / maxTime) * 100;
//         return isNaN(percent) ? 0 : percent;
//     };

//     const isComplete = (facilityId) => percentage(currentTimes[facilityId]) >= 100;
//     const currentMinutes = (facilityId) => {
//         const minutes = Math.floor(currentTimes[facilityId] || 0);
//         return isNaN(minutes) ? 0 : minutes;
//     };

//     const filteredFacilities = facilityDetail.filter(item => item.facilityDTO.facilityCode === 1);

//     const [todoItems, setTodoItems] = useState([
//         { id: 1, text: '예시 작업 1', completed: false },
//         { id: 2, text: '예시 작업 2', completed: false },
//         { id: 3, text: '예시 작업 3', completed: false }
//     ]);

//     const handleCheckboxChange = (id) => {
//         setTodoItems(prevItems =>
//             prevItems.map(item =>
//                 item.id === id ? { ...item, completed: !item.completed } : item
//             )
//         );
//     };

//     return (
//         <div className='facility-content'>
//             <div className='Facility-washing-machine-content'>
//                 {filteredFacilities.map((facility) => (
//                     <div key={facility.facilityId} className="Facility-washing-machine" style={{ backgroundColor: '#CBE6FF' }}>
//                         <div className="Facility-control-panel">
//                             <div className="Facility-gauge-container">
//                                 <div className="Facility-gauge-background"></div>
//                                 <div className="Facility-gauge-foreground" style={{ backgroundColor:'#516AA6', width: `${percentage(currentTimes[facility.facilityId])}%` }}></div>
//                             </div>
//                         </div>
//                         <div className="Facility-door" style={{ border: '0.16rem solid #627195' }}>
//                             <div className="Facility-door-content">
//                                 <img src="https://cdn-icons-png.flaticon.com/512/1827/1827463.png" alt="Clock Icon" className="Facility-icon" />
//                                 <div className="Facility-laundry-number">{facility.facilityId}번 세탁기</div>
//                                 {isRunning[facility.facilityId] && (
//                                     <div className='Facility-laundry-timer'>{currentMinutes(facility.facilityId)} / {maxTime} 분</div>
//                                 )}
//                             </div>
//                             {isComplete(facility.facilityId) ? (
//                                 <button className="Facility-button" style={{ backgroundColor: '#516AA6' }} onClick={() => handleComplete(facility.facilityId)}>
//                                     완료
//                                 </button>
//                             ) : !isRunning[facility.facilityId] ? (
//                                 <button className="Facility-button" style={{ backgroundColor: '#516AA6' }} onClick={() => handleStart(facility.facilityId)}>
//                                     시작
//                                 </button>
//                             ) : null}
//                         </div>
//                         <div className="Facility-percentage-display">
//                             {isRunning[facility.facilityId] && !isComplete(facility.facilityId) ? `${percentage(currentTimes[facility.facilityId]).toFixed(0)}% 완료` : ''}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             <div className='Facility-todo-post'>
//                 <ul className='Facility-todo-content'>
//                     {todoItems.map(item => (
//                         <li key={item.id} className={`Facility-todo-item ${item.completed ? 'completed' : ''}`}>
//                             <input
//                                 type="checkbox"
//                                 checked={item.completed}
//                                 onChange={() => handleCheckboxChange(item.id)}
//                             />
//                             <span className="Facility-todo-text">{item.text}</span>
//                         </li>
//                     ))}
//                 </ul>
//             </div>
//         </div>
//     );
// }

// export default FacilityDrum;


import React, { useState, useRef } from "react";
import "./FacilityManagement.css";
import { useDispatch, useSelector } from "react-redux";
import {
  callFacilityDetailInfoAPI,
  callFacilityLaundryWayInfoAPI,
} from "../../../apis/FacilityAPICalls";
import { fetchWaterLevel } from "../../../apis/LandryAPICall";
// import { facilityLaundryWayReducer } from '../../../modules/FacilityModule';
// import { S } from '@table-library/react-table-library/select-d972db04';
import DryCleaner from "./DryCleaner";

function FacilityDryer() {
  const dispatch = useDispatch();
  const branch = JSON.parse(window.localStorage.getItem("branch"));

  const facilityDetail = useSelector(
    (state) => state.facilityDetailInfoReducer
  );
  // const branchWaterInfo = useSelector(state => state.waterLevelReducer);
  const facilityLaundryWatyInfo = useSelector(
    (state) => state.facilityLaundryWayReducer
  );

  console.log('세탁물 정보 ',facilityLaundryWatyInfo)

  // useEffect(() => {
  //     dispatch(callFacilityDetailInfoAPI({ branchCode: branch.branchCode }));
  //     dispatch(fetchWaterLevel());
  //     dispatch(callFacilityLaundryWayInfoAPI({ branchCode: branch.branchCode }));
  // }, [dispatch, branch.branchCode]);

  // const [currentTimes, setCurrentTimes] = useState({});
  // const [isRunning, setIsRunning] = useState({});
  // const [updatedWaterTanks, setUpdatedWaterTanks] = useState({});

  const [isRegisterFormVisible, setIsRegisterFormVisible] = useState(false);
  


  const formRef = useRef(null); // Ref for the form element

  const filteredFacilities = facilityDetail.filter(
    (item) => item.facilityDTO.facilityCode === 3
  );

  const [todoItems, setTodoItems] = useState(() => {
    return facilityLaundryWatyInfo.map((laundry) => ({
      id: laundry.laundryWayId,
      text: ` 옷감: ${laundry.laundry.laundryFabricType} level: ${laundry.laundry.laundryDirtyLevel}`,
      completed: false,
    }));
  });

 
    const exportToCSV = () => {

        const csvRows = [
            ["ID" , "TEXT" , "Completed"],
            ...todoItems.map(item => [
                item.id,
                item.text,
                item.completed ? "Yes" : 'No'
            ])
        ].map(row=> row.join(',')).join('\n')

        const blob = new Blob([csvRows],{type : 'text/csv'})
        // 다운로드 링크 생성 및 클릭
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "todo_list.csv");
    a.click();
    }

    

  const handleCheckboxChange = (id) => {
    setTodoItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  // /// 시설물 등록

  const [selectedFacilityCode, setSelectedFacilityCode] = useState("");
  const [selectedFacilityId, setSelectedFacilityId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const handleRegister = async () => {
    if (selectedFacilityCode && selectedFacilityId && selectedStatus) {
      let newFacility = {};
      let apiUrl = "";
      let httpMethod = "";

      if (selectedFacilityId === "신규") {
        if (selectedStatus === "등록") {
          newFacility = {
            branchCode: branch.branchCode,
            facilityCode: selectedFacilityCode,
            facilityStatus: "H",
          };
          apiUrl = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/location/facility/register`;
          httpMethod = "POST";
        } else {
          alert("신규 시설은 고장 및 삭제가 불가합니다");
          return;
        }
      } else {
        if (selectedStatus === "등록") {
          alert("신규만 등록이 가능합니다");
          return;
        } else {
          newFacility = {
            facilityId: selectedFacilityId,
            branchCode: branch.branchCode,
            facilityCode: selectedFacilityCode,
            facilityStatus:
              selectedStatus === "고장"
                ? "F"
                : selectedStatus === "삭제"
                ? "D"
                : "H",
          };
          apiUrl = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/location/facility/update`;
          httpMethod = "PUT";
        }
      }

      const confirmMessage =
        selectedFacilityId === "신규"
          ? "새로운 시설물을 등록하시겠습니까?"
          : "시설물 상태를 변경하시겠습니까?";

      if (window.confirm(confirmMessage)) {
        try {
          const response = await fetch(apiUrl, {
            method: httpMethod,
            headers: {
              "Content-Type": "application/json",
              Accept: "*/*",
              Authorization:
                "Bearer " + window.localStorage.getItem("accessToken"),
            },
            body: JSON.stringify(newFacility),
          });

          if (response.ok) {
            console.log(
              "시설물 상태가 성공적으로 변경되었습니다.",
              newFacility
            );
            dispatch(
              callFacilityDetailInfoAPI({ branchCode: branch.branchCode })
            );
          } else {
            console.error("시설물 상태 변경 오류:", response.statusText);
          }
        } catch (error) {
          console.error("시설물 상태 변경 중 오류 발생:", error);
        }
        setIsRegisterFormVisible(false);
      }
    }

    setSelectedFacilityId("");
    setSelectedFacilityCode("");
    setSelectedStatus("");
  };

  // // 시설물 등록

  const facilityIds = facilityDetail
    .filter(
      (facility) =>
        facility.facilityDTO.facilityCode === parseInt(selectedFacilityCode)
    )
    .map((facility) => facility.facilityId);


  return (
    <div className="facility-content">
      <div className="Facility-washing-machine-content">
        {filteredFacilities.map((facility) => (
          <DryCleaner facility={facility} key={facility.facilityId} />
        ))}
      </div>
      <div className="facilityBox">
        <div className="Facility-todo-post">
        <table className="Facility-todo-table" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Task</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Completed</th>
          </tr>
        </thead>
        <tbody>
          {todoItems.map((item) => (
            <tr key={item.id}>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>{item.id}</td>
              <td
                style={{
                  border: "1px solid #ddd",
                  padding: "8px",
                  textDecoration: item.completed ? "line-through" : "none",
                }}
              >
                {item.text}
              </td>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>
                {item.completed ? "Yes" : "No"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
          <button 
          className="facility-reg-button"
          onClick={exportToCSV}>Export to CSV</button>
        </div>
        <button
          className="facility-reg-button"
          onClick={() => setIsRegisterFormVisible(true)}
        >
          시설물 등록하기
        </button>
      </div>

      {isRegisterFormVisible && (
        <div className="Facility-register-form" ref={formRef}>
          시설물 등록
          <select
            value={selectedFacilityCode}
            onChange={(e) => setSelectedFacilityCode(e.target.value)}
            className="Facility-select"
          >
            <option value="">시설물 선택</option>
            <option value="1">세탁기</option>
            <option value="2">건조기</option>
            <option value="3">드라이클리너</option>
          </select>
          <select
            value={selectedFacilityId}
            onChange={(e) => setSelectedFacilityId(e.target.value)}
            className="Facility-select"
          >
            <option value="">시설물 ID 선택</option>
            <option value="신규">신규</option>
            {facilityIds.map((id) => (
              <option key={id} value={id}>
                {id}
              </option>
            ))}
          </select>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="Facility-select"
          >
            <option value="">상태 선택</option>
            <option value="등록" disabled={selectedFacilityId !== "신규"}>
              등록
            </option>
            <option value="고장" disabled={selectedFacilityId === "신규"}>
              고장
            </option>
            <option value="삭제" disabled={selectedFacilityId === "신규"}>
              삭제
            </option>
            <option value="수리 완료" disabled={selectedFacilityId === "신규"}>
              수리 완료
            </option>
          </select>
          <button onClick={handleRegister} className="Facility-register-button">
            저장
          </button>
        </div>
      )}
    </div>
  );
}

export default FacilityDryer;
