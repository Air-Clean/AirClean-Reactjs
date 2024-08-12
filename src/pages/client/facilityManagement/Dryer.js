import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  callFacilityDetailInfoAPI,
  callFacilityLaundryWayInfoAPI,
} from "../../../apis/FacilityAPICalls";
import { fetchWaterLevel } from "../../../apis/LandryAPICall";

export default function Drum({ facility }) {
  const dispatch = useDispatch();

  const facilityDetail = useSelector(
    (state) => state.facilityDetailInfoReducer
  );


  const branchWaterInfo = useSelector((state) => state.waterLevelReducer);


  // const [currentTimes, setCurrentTimes] = useState({});
  // const [isRunning, setIsRunning] = useState({});
  const [updatedWaterTanks, setUpdatedWaterTanks] = useState({});

  // const [selectedFacilityCode, setSelectedFacilityCode] = useState("");
  const [selectedFacilityId, setSelectedFacilityId] = useState("");
  // const [selectedStatus, setSelectedStatus] = useState("");
  const [isRegisterFormVisible, setIsRegisterFormVisible] = useState(false);
  // const [laundryTodoId, setLaundryTodoId] = useState([]);

  const maxTimeDefault = 0.2; // 기본 최대 시간 (분 단위)
  // const [maxTime, setMaxTime] = useState(maxTimeDefault); // 최대 시간 상태 관리
  // const intervalRefs = useRef({});
  const formRef = useRef(null); // Ref for the form element

  // // Modal states

  const [isModalVisible, setIsModalVisible] = useState(false);

  // const handleModalConfirm = () => {
  //   setMaxTime(laundryTime);
  //   setIsRunning((prev) => ({ ...prev, [selectedFacilityId]: true }));
  //   const changeId = [...laundryTodoId];
  //   changeId.concat(selectedLaundryWayId);
  //   setLaundryTodoId(changeId);
  //   setIsModalVisible(false);
  // };

  const [selectedLaundryWayId, setSelectedLaundryWayId] = useState("");

  useEffect(() => {
    setUpdatedWaterTanks(
      branchWaterInfo.waterTanks.reduce((acc, tank) => {
        acc[tank.branchCode] = tank;
        return acc;
      }, {})
    );
  }, [branchWaterInfo]);

  // useEffect(() => {
  //   console.log("물탱크 상태 업데이트 됨:", updatedWaterTanks);
  // }, [updatedWaterTanks]);

  // useEffect(() => {
  //   Object.keys(isRunning).forEach((facilityId) => {
  //     if (isRunning[facilityId]) {
  //       intervalRefs.current[facilityId] = setInterval(() => {
  //         setCurrentTimes((prevTimes) => {
  //           const newTime = (prevTimes[facilityId] || 0) + 1 / 60; // 1초마다 1/60분 증가
  //           if (newTime >= maxTime) {
  //             clearInterval(intervalRefs.current[facilityId]);
  //             return { ...prevTimes, [facilityId]: maxTime };
  //           }
  //           return { ...prevTimes, [facilityId]: newTime };
  //         });
  //       }, 1000); // 1초마다 업데이트

  //       return () => clearInterval(intervalRefs.current[facilityId]);
  //     } else {
  //       clearInterval(intervalRefs.current[facilityId]);
  //     }
  //   });
  // }, [isRunning, maxTime]);

  const handleStart = (facilityId) => {
    console.log("handleStart 호출됨:", facilityId);
    const selectedFacility = facilityDetail.find(
      (item) => item.facilityId === facilityId
    );
    if (selectedFacility) {
      setSelectedLaundryWayId(selectedFacility.laundryWayId); // Set the correct laundry way ID
    }
    setSelectedFacilityId(facilityId);
    setIsModalVisible(true);
  };

  // const filteredFacilities = facilityDetail.filter(
  //   (item) => item.facilityDTO.facilityCode === 1
  // );

  // const [todoItems, setTodoItems] = useState(() => {
  //   return facilityLaundryWatyInfo.map((laundry) => ({
  //     id: laundry.laundryWayId,
  //     text: `${laundry.laundryWayId}번. 옷감: ${laundry.laundry.laundryFabricType} level: ${laundry.laundry.laundryDirtyLevel}`,
  //     completed: false,
  //   }));
  // });

  // const handleCheckboxChange = (id) => {
  //   setTodoItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item.id === id ? { ...item, completed: !item.completed } : item
  //     )
  //   );
  // };

  // const facilityIds = facilityDetail
  //   .filter(
  //     (facility) =>
  //       facility.facilityDTO.facilityCode === parseInt(selectedFacilityCode)
  //   )
  //   .map((facility) => facility.facilityId);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (formRef.current && !formRef.current.contains(event.target)) {
        setIsRegisterFormVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // useEffect(() => {
  //   if (selectedLaundryWayId) {
  //     const selectedLaundryWay = facilityLaundryWatyInfo.find(
  //       (way) => way.laundryWayId === selectedLaundryWayId
  //     );
  //     if (selectedLaundryWay) {
  //       setLaundryTime(selectedLaundryWay.time || maxTimeDefault);
  //       setLaundryDetergentAmount(selectedLaundryWay.detergentAmount || 0);
  //       setLaundryWaterAmount(selectedLaundryWay.waterAmount || 0);
  //     }
  //   }
  // }, [selectedLaundryWayId, facilityLaundryWatyInfo]);

  // 새로 만듬

  const [currentTime, setCurrentTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [progress, setProgress] = useState("");
  const [max, setMax] = useState("");
  const [elapse, setElapse] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [laundryWay, setLaundryWay] = useState("");
  const [laundryTime, setLaundryTime] = useState(0);
  const [laundryDetergentAmount, setLaundryDetergentAmount] = useState(0);
  const [laundryWaterAmount, setLaundryWaterAmount] = useState(0);
  const [laundryCode , setLaundryCode ] = useState('')

  // const []

  const facilityLaundryWatyInfo = useSelector(
    (state) => state.facilityLaundryWayReducer
  );

  useEffect(() => {
    const savedStartTime = localStorage.getItem(
      `startTime-${facility.facilityId}`
    );
    const savedDuration = localStorage.getItem(
      `duration-${facility.facilityId}`
    );
    const savedMaxTime = localStorage.getItem(`drymaxTime-${facility.facilityId}`);
    const laundryWay = localStorage.getItem(
      `laundryWay-${facility.facilityId}`
    );


    
    const newComplete = localStorage.getItem(`drycomplete-${facility.facilityId}`)==='true'

    if (savedStartTime && savedDuration) {
      const elapsedTime = (Date.now() - parseInt(savedStartTime)) / 1000 / 60; // in minutes
      const remainingTime = savedDuration - elapsedTime;

      if (remainingTime > 0) {
        setCurrentTime(remainingTime);
        setProgress(Math.round((elapsedTime / savedDuration) * 100));
        setElapse(elapsedTime);
        setMax(savedMaxTime);
        setRunning(true);
        setLaundryWay(laundryWay);
        setIsComplete(newComplete)
        setLaundryCode(localStorage.getItem(`laundryCode-${facility.facilityId}`))
        setLaundryDetergentAmount(localStorage.getItem(`detergent-${facility.facilityId}`))
        
      } else {
        setIsComplete(true);
        localStorage.removeItem(`drystartTime-${facility.facilityId}`);
        localStorage.removeItem(`dryduration-${facility.facilityId}`);
        localStorage.removeItem(`drymaxTime-${facility.facilityId}`);
        localStorage.removeItem(`drylaundryWay-${facility.facilityId}`);
        localStorage.removeItem(`drycomplete-${facility.facilityId}`)
      }
    }
  }, []);

  console.log('isCompltete', isComplete)
  useEffect(() => {
    let timer;
    if (running && currentTime > 0) {
      timer = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 1;
          if (newProgress >= 100) {
            setIsComplete(true);

            clearInterval(timer);

            localStorage.removeItem(`drystartTime-${facility}`);
            localStorage.removeItem(`dryduration-${facility}`);
            localStorage.removeItem(`drymaxTime-${facility.facilityId}`);
            localStorage.removeItem(`drylaundryWay-${facility.facilityId}`);
            localStorage.removeItem(`drycomplete-${facility.facilityId}`)
            return 0;
          }
          return newProgress;
        });
      }, (currentTime * 60 * 1000) / (100 - progress));
    }

    return () => clearInterval(timer);
  }, [running, currentTime, elapse]);

  const insertTime = async () => {
    console.log("insertTime");
    const duration = currentTime; // store original duration
    const startTime = Date.now();
    setMax(currentTime);

    localStorage.setItem(`drystartTime-${facility.facilityId}`, startTime);
    localStorage.setItem(`dryduration-${facility.facilityId}`, duration);
    localStorage.setItem(`drymaxTime-${facility.facilityId}`, duration);
    localStorage.setItem(`drycomplete-${facility.facilityId}`,isComplete)
    localStorage.setItem(`drydetergent-${facility.facilityId}`,laundryDetergentAmount);
    localStorage.setItem(`drylaundryCode-${facility.facilityId}`,laundryCode);
      

    setIsModalVisible(false);
    setProgress(0); // Reset progress
    setRunning(true); // Start the progress
    


  };

  // const currentMinutes = (facilityId) => {
  //   const minutes = Math.floor(currentTimes[facilityId] || 0);
  //   return isNaN(minutes) ? 0 : minutes;
  // };

  const currentMinutes = () => {
    const minutes = Math.floor(elapse || 0);
    return isNaN(minutes) ? 0 : minutes;
  };

  const percentage = (elapse) => {
    const percent = (elapse / max) * 100;
    return isNaN(percent) ? 0 : percent;
  };

  const handleLaundryWayChange = (e) => {
    console.log("asdfsdadsaf");
    // setSelectedLaundryWayId(e.target.value);

    console.log("ddddd", e.target.value);

    localStorage.setItem(`drylaundryWay-${facility.facilityId}`, e.target.value);
    setLaundryWay(e.target.value);

    setCurrentTime(
      facilityLaundryWatyInfo.filter(
        (luaundry) => luaundry.laundryWayId === parseInt(e.target.value)
      )[0].laundryTime
    );
    setLaundryDetergentAmount(
      facilityLaundryWatyInfo.filter(
        (luaundry) => luaundry.laundryWayId === parseInt(e.target.value)
      )[0].laundryDetergentAmount
    );
    setLaundryWaterAmount(
      facilityLaundryWatyInfo.filter(
        (luaundry) => luaundry.laundryWayId === parseInt(e.target.value)
      )[0].laundryWaterAmount
    );

    setLaundryCode(
      facilityLaundryWatyInfo.filter(
        (luaundry) => luaundry.laundryWayId === parseInt(e.target.value)
      )[0].laundry.laundryCode
    )


    
  };

  console.log('laudryCode ',laundryCode)

  const handleComplete =  async (facilityId) => {
    console.log("버튼 눌림");

    console.log(running);
    // if (running) {
      
    //   // const facility = facilityDetail.find(
    //   //   (item) => item.facilityId === facilityId
    //   // );
    //   // if (facility) {
    //   //   const branchCode = facility.branchDTO.branchCode;
    //   //   const tank = updatedWaterTanks[branchCode];
    //   //   if (tank) {
    //   //     const newWaterCurCapacity = tank.waterCurCapacity - maxTime * 0.4;
    //   //     const updatedTank = {
    //   //       ...tank,
    //   //       waterCurCapacity: newWaterCurCapacity,
    //   //     };

    //   //     console.log("업데이트된 물탱크:", updatedTank);

    //   //     setUpdatedWaterTanks((prevTanks) => ({
    //   //       ...prevTanks,
    //   //       [branchCode]: updatedTank,
    //   //     }));

    //   //     try {
    //   //       const waterTankUpdatedUrl = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/location/facility/waterTankUpdate`;
    //   //       const updatedWaterResponse = await fetch(waterTankUpdatedUrl, {
    //   //         method: "PUT",
    //   //         headers: {
    //   //           "Content-Type": "application/json",
    //   //           Accept: "*/*",
    //   //           Authorization:
    //   //             "Bearer " + window.localStorage.getItem("accessToken"),
    //   //         },
    //   //         body: JSON.stringify(updatedTank),
    //   //       });

    //   //       if (updatedWaterResponse.ok) {
    //   //         console.log(
    //   //           "물탱크가 성공적으로 업데이트되었습니다.",
    //   //           updatedTank
    //   //         );
    //   //         dispatch(fetchWaterLevel());
    //   //       } else {
    //   //         console.error(
    //   //           "물탱크 업데이트 오류:",
    //   //           updatedWaterResponse.statusText
    //   //         );
    //   //       }
    //   //     } catch (error) {
    //   //       console.error("물탱크 업데이트 중 오류 발생:", error);
    //   //     }
    //   //   }
    //   // }

      

    //   setRunning(false);
    //   setCurrentTime(0);
    //   setElapse(0);
    //   setIsComplete(false);
    //   setLaundryWay("");
    //   localStorage.removeItem(`laundryCode-${facility.facilityId}`)
    //   localStorage.removeItem(`detergent-${facility.facilityId}`)
    // }

    if (facility) {

      console.log('slkdsjlkjfdlk')

      const branchCode = facility.branchDTO.branchCode;

      const tank = updatedWaterTanks[branchCode];

      if (tank) {
        const newWaterCurCapacity = tank.waterCurCapacity - laundryWaterAmount;

        console.log('newWaterCurCapacity',newWaterCurCapacity)
        const updatedTank = {
          ...tank,
          waterCurCapacity: newWaterCurCapacity,
        };

        console.log("업데이트된 물탱크:", updatedTank);

        setUpdatedWaterTanks((prevTanks) => ({
          ...prevTanks,
          [branchCode]: updatedTank,
        }));



        try {
        const waterTankUpdatedUrl = `http://${process.env.REACT_APP_RESTAPI_IP}:8080/location/facility/dryupdate?laundryCode=${localStorage.getItem(`dry-laundryCode-${facility.facilityId}`)}&branchCode=${branchCode}`;

        
          const updatedWaterResponse = await fetch(waterTankUpdatedUrl, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Accept: "*/*",
              Authorization:
                "Bearer " + window.localStorage.getItem("accessToken"),
            },
            // body: JSON.stringify(updatedTank),
          });

          if (updatedWaterResponse.ok) {
            console.log(
              "물탱크가 성공적으로 업데이트되었습니다.",
              updatedTank
            );
            dispatch(fetchWaterLevel());
          } else {
            console.error(
              "물탱크 업데이트 오류:",
              updatedWaterResponse.statusText
            );
          }
        } catch (error) {
          console.error("물탱크 업데이트 중 오류 발생:", error);
        }
      }

      setRunning(false);
      setCurrentTime(0);
      setElapse(0);
      setIsComplete(false);
      setLaundryWay("");
      localStorage.removeItem(`drylaundryCode-${facility.facilityId}`)
      localStorage.removeItem(`drydetergent-${facility.facilityId}`)
    }

    
  };

  return (
    <div
      key={facility.facilityId}
      className="Facility-washing-machine"
      style={{ backgroundColor: "#E0F2F1" }}
    >
      <div className="Facility-control-panel">
        <div className="Facility-gauge-container">
          <div className="Facility-gauge-background"></div>
          <div
            className="Facility-gauge-foreground"
            style={{
              backgroundColor: "#43A047",
              // width: `${percentage(currentTimes[facility.facilityId])}%`,
              width: `${progress}%`,
              textAlign: "center",
              color: "white",
            }}
          >
            {progress}
          </div>
        </div>
      </div>
      <div
        className="Facility-door"
        style={{ border: "0.16rem solid #66BB6A" }}
      >
        <div className="Facility-door-content">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1827/1827463.png"
            alt="Clock Icon"
            className="Facility-icon"
          />
          <div className="Facility-laundry-number">
            {facility.facilityId}번 세탁기
          </div>
          {/* {isRunning[facility.facilityId] && (
            <div className="Facility-laundry-timer">
              {currentMinutes(facility.facilityId)} / {laundryTime} 분
            </div>
          )} */}
          {running && (
            <div className="Facility-laundry-timer">
              {currentMinutes()} / {max} 분
            </div>
          )}
        </div>
        {facility.facilityStatus === "F" ? (
          <div className="Facility-status-broken">수리 중</div>
        ) : isComplete ? (
          <button
            className="Facility-button"
            style={{ backgroundColor: "#66BB6A" , width : '50%'}}
            onClick={() => handleComplete(facility.facilityId)}
          >
            완료
          </button>
        ) : !running ? (
          <button
            className="Facility-button"
            style={{ backgroundColor: "#66BB6A", width: "50%" }}
            onClick={() => handleStart(facility.facilityId)}
          >
            시작
          </button>
        ) : null}
      </div>
      {isModalVisible && (
        <div className="facility-modal">
          <div className="facility-modal-content">
            <h2>세탁 설정</h2>
            <label>
              세탁 방법:
              <select
                name={selectedLaundryWayId}
                onChange={handleLaundryWayChange}
              >
                <option value="">선택하세요</option>
                {facilityLaundryWatyInfo.filter(laundry=>laundry.laundry.laundryCompleted==='Y'&& laundry.laundry.dryStatus==='N').map((way) => (
                  <option key={way.laundryWayId} value={way.laundryWayId}>
                    {way.laundryWayId}
                  </option>
                ))}
              </select>
            </label>
            <label>
              건조 시간 (분):
              <input
                type="number"
                // value={laundryTime}
                value={currentTime}
                // onChange={(e) => setLaundryTime(e.target.value)}
                onChange={(e) => setCurrentTime(Number(e.target.value))}
              />
            </label>
            {/* <label>
              세제 양 (ml):
              <input
                type="number"
                value={laundryDetergentAmount}
                onChange={(e) => setLaundryDetergentAmount(e.target.value)}
                min="1"
                step="5"
              />
            </label>
            <label>
              물 양 (L):
              <input
                type="number"
                value={laundryWaterAmount}
                onChange={(e) => setLaundryWaterAmount(e.target.value)}
                min="1"
                step="1"
              />
            </label> */}
            {/* <button onClick={handleModalConfirm}>확인</button> */}
            <button onClick={insertTime}>확인</button>
            <button onClick={() => setIsModalVisible(false)}>취소</button>
          </div>
        </div>
      )}
    </div>
  );
}
