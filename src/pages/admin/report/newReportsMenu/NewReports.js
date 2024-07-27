import { useEffect, useState } from 'react';
import './NewReports.css';
import ReportsModal  from './ReportsModal';
import { useDispatch } from 'react-redux';
import { callFindVehicleRepairAPI } from '../../../../apis/ReportAPICalls';

function NewReports() {
    console.log('보고서 작성 페이지')

    // 모달창
    const [showModal, setShowModal] = useState(false);
    // API
    const dispatch = useDispatch();
    // const result = useSelector(state => state.vehicleRepairReducer)

    // 모달창
    const handleOpenModal = () => {
      setShowModal(true);
    }

    const handleCloseModal= () => {
      setShowModal(false);
    }

    // API
    useEffect(() => {
      // console.log("리덕스 상태 :", result);
      dispatch(callFindVehicleRepairAPI());
    }, [dispatch])

  //   useEffect(() => {
  //     if (result) {
  //         // result가 변경될 때 수행할 작업
  //         console.log("result가 변경되었습니다:", result);
  //     }
  // }, [result]);

  return (
    <div className="menu1_layout">
      <div className='flex_wrap'>
        <div className="report-create">
          <h1>보고서 작성</h1>
          {/* <div className="button-group">
            <button className="register-button" onClick={handleOpenModal}>보고서 작성</button>
          </div> */}
          <table className="report-table">
            <thead>
              <tr>
                <th>보고서번호</th>
                <th>양식명</th>
                <th>서류설명</th>
              </tr>
            </thead>
            <tbody>
              {/* 데이터가 들어갈 부분 */}
             <tr>
              <td>1</td>
              <td style={{ cursor: 'pointer' }} onClick={handleOpenModal}>차량수리보고서</td>
              <td>차량수리비 영수증 청구 보고서</td>
             </tr>
            </tbody>
          </table>
          <div className="pagination">
            <button>1</button>
            <button>2</button>
            <button>3</button>
          </div>
          <ReportsModal show={showModal} onClose={handleCloseModal}/>
        </div>
      </div>
    </div>
  );
}

export default NewReports;
