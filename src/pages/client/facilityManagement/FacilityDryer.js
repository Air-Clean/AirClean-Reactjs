


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
import Dryer from "./Dryer";

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
    (item) => item.facilityDTO.facilityCode === 2
  );


const [todoItems, setTodoItems] = useState(() => {
    return facilityLaundryWatyInfo.filter(dry=> dry.laundry.laundryCompleted==="Y").map((laundry) => ({
      id: laundry.laundryWayId,
      customer : laundry.laundry.laundryCustomerName,
      texture : laundry.laundry.laundryFabricType,
      level : laundry.laundry.laundryDirtyLevel,
      completed: laundry.laundry.dryStatus,
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
            <div className="Facility-washing-machine-item">
          <Dryer facility={facility} key={facility.facilityId} />
          </div>
        ))}
      </div>
      <div className="facilityBox">
        <div className="Facility-todo-post">
        <table className="Facility-todo-table" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Customer</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Texture</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Dirty</th>
            <th style={{ border: "1px solid #ddd", padding: "8px" }}>Completed</th>
          </tr>
        </thead>
        <tbody>
          {todoItems.map((item) => (
            <tr key={item.id} style={{textDecoration : item.completed === 'Y' ? 'line-through' : 'none'}}>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>{item.id}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>{item.customer}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>{item.texture}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>{item.level}</td>
              <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>
                {item.completed==='Y'? "Yes" : "No"}
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
