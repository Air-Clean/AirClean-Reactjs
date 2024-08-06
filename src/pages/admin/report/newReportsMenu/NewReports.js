import { useEffect, useState } from 'react';
import './NewReports.css';
import ReportsModal  from './ReportsModal';
import { useDispatch } from 'react-redux';
// import { callCarMembersAPI } from '../../../../apis/ReportAPICalls';

function NewReports() {
    console.log('보고서 작성 페이지')

    // 모달창
    const [showModal, setShowModal] = useState(false);
    // API
    const dispatch = useDispatch();

    // 모달창
    const handleOpenModal = () => {
      setShowModal(true);
    }

    const handleCloseModal= () => {
      setShowModal(false);
    }

    // // API
    // useEffect(() => {
    //   dispatch(callCarMembersAPI());
    // }, [dispatch])


  return (
    <div className="menu1_layout">
      <div className='flex_wrap'>
        <div className="report-create">
          <h1>보고서 작성</h1>
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
          <ReportsModal show={showModal} onClose={handleCloseModal}/>
        </div>
      </div>
    </div>
  );
}

export default NewReports;
