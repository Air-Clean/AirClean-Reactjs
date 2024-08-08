import React, { useState } from 'react';
import styles from './NewReports.module.css';
import ReportsModal from './ReportsModal';


function NewReports() {
    console.log('보고서 작성 페이지');

    // 모달창
    const [showModal, setShowModal] = useState(true);
  
    // 모달창
    const handleOpenModal = () => {
      setShowModal(true);
    }

    const handleCloseModal = () => {
      setShowModal(false);
    }


  return (
    <div className={styles.menu1_layout}>
      <div className={styles.flex_wrap}>
        <div className={styles.report_section}>
          <div className={styles.report_create}>
            <h1>보고서 양식</h1>
            <table className={styles.report_table}>
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
          </div>
        </div>
        <div className={styles.modal_section}>
          <ReportsModal show={showModal} onClose={handleCloseModal}/>
        </div>
      </div>
    </div>
  );
}

export default NewReports;