import React, { useState } from 'react';
import styles from './NewReports.module.css';
import ReportsModal from './ReportsModal';

function NewReports() {
  console.log('보고서 작성 페이지');

  // 모달창
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState(null);

  // 모달창
  const handleOpenModal = (report) => {
    setShowModal(true);
    setSelectedReport(report);
  }

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedReport(null);
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
                <tr>
                  <td>1</td>
                  <td
                    className={selectedReport === '차량수리보고서' ? styles.selectedCell : ''}
                    style={{ cursor: 'pointer' }}
                    onClick={() => handleOpenModal('차량수리보고서')}
                  >
                    차량수리보고서
                  </td>
                  <td>차량수리비 영수증 청구 보고서</td>
                </tr>
              </tbody>
            </table>
          </div>
          {selectedReport === '차량수리보고서' && (
            <div className={styles.image_section} style={{ display: showModal ? 'block' : 'none' }}>
              <h2>차량수리비 영수증 청구 예시</h2>
              <p>* 사진, 특이사항 은 선택사항 입니다.</p>
              <img src="http://localhost:8080/memberimgs/vehicleReport.png" alt="고정 이미지" className={styles.fixed_image} />
            </div>
          )}
        </div>
        <div className={styles.modal_section}>
          <ReportsModal show={showModal} onClose={handleCloseModal}/>
        </div>
      </div>
    </div>
  );
}

export default NewReports;
