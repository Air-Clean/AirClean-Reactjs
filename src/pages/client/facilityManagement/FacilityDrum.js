import React, { useState, useRef, useEffect } from "react";
import "./FacilityManagement.css";
import { useDispatch, useSelector } from "react-redux";
import {
  callFacilityDetailInfoAPI,
  callFacilityLaundryWayInfoAPI,
} from "../../../apis/FacilityAPICalls";
import { fetchWaterLevel } from "../../../apis/LandryAPICall";
import Drum from "./Drum";

function FacilityDrum() {
  const dispatch = useDispatch();
  const branch = JSON.parse(window.localStorage.getItem("branch"));

  const facilityDetail = useSelector(
    (state) => state.facilityDetailInfoReducer
  );

  const facilityLaundryWatyInfo = useSelector(
    (state) => state.facilityLaundryWayReducer
  );

  useEffect(() => {
    dispatch(callFacilityDetailInfoAPI({ branchCode: branch.branchCode }));
    dispatch(fetchWaterLevel());
    dispatch(callFacilityLaundryWayInfoAPI({ branchCode: branch.branchCode }));
  }, [dispatch, branch.branchCode]);

  const [isRegisterFormVisible, setIsRegisterFormVisible] = useState(false);

  const formRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsRegisterFormVisible(false);
      }
    };

    if (isRegisterFormVisible) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isRegisterFormVisible]);

  const filteredFacilities = facilityDetail.filter(
    (item) => item.facilityDTO.facilityCode === 1
  );

  const [todoItems, setTodoItems] = useState(() => {
    return facilityLaundryWatyInfo.map((laundry) => ({
      id: laundry.laundryWayId,
      customer: laundry.laundry.laundryCustomerName,
      texture: laundry.laundry.laundryFabricType,
      level: laundry.laundry.laundryDirtyLevel,
      isDryCleaning: laundry.laundry.laundryDryCleaningStatus,
      completed: laundry.laundry.laundryCompleted,
    }));
  });

  const exportToCSV = () => {
    const csvRows = [
      ["ID", "customer", "texture", "dirty-level", "드라이클리닝 여부", "Completed"],
      ...todoItems.map((item) => [
        item.id,
        item.texture,
        item.level,
        item.isDryCleaning === "Y" ? "Yes" : "No",
        item.completed === "Y" ? "Yes" : "No",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvRows], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "todo_list.csv");
    a.click();
  };

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
          <div className="Facility-washing-machine-item" key={facility.facilityId}>
            <Drum facility={facility} key={facility.facilityId} />
          </div>
        ))}
      </div>
      <div className="facilityBox">
        <div className="Facility-todo-post">
          <table className="Facility-todo-table" style={{ width: "100%", overflow: "hidden" }}>
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
                <tr key={item.id} style={{ textDecoration: item.completed === "Y" ? "line-through" : "none" }}>
                  <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>{item.id}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>{item.customer}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>{item.texture}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>{item.level}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "center" }}>
                    {item.completed === "Y" ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
            <button
              className="facility-reg-button"
              onClick={exportToCSV}>Export to CSV</button>
          </div>
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

export default FacilityDrum;
