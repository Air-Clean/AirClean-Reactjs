import React, { useState } from 'react';
import styles from './LocationNewReports.module.css';
import BranchSalesModal from './BranchSalesModal';
import ExpenseModal from './ExpenseModal';
import RepairModal from './RepairModal';

function LocationNewReports() {
    // State to manage which modal is currently open
    const [activeModal, setActiveModal] = useState(null);

    // Handle opening a modal
    const handleOpenModal = (modalType) => {
        setActiveModal(modalType);
    };

    // Handle closing a modal
    const handleCloseModal = () => {
        setActiveModal(null);
    };

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
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleOpenModal('branchSales')}
                                    >
                                        매출보고서
                                    </td>
                                    <td>하루 매출 보고서 작성</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleOpenModal('expense')}
                                    >
                                        지출보고서
                                    </td>
                                    <td>한달 지출 보고서 작성</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td
                                        style={{ cursor: 'pointer' }}
                                        onClick={() => handleOpenModal('repair')}
                                    >
                                        시설물수리보고서
                                    </td>
                                    <td>고장난 시설물 수리보고서 작성</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    {activeModal && (
                        <div className={styles.image_section}>
                            {activeModal === 'branchSales' && (
                                <>
                                    <h2>매출보고서 작성 예시</h2>
                                    <p>* 비고는 선택사항 입니다.</p>
                                    <img
                                        src="http://localhost:8080/memberimgs/branchSalesReports.png"
                                        alt="매출보고서 예시"
                                        className={`${styles.branchSalesImage}`}
                                    />
                                </>
                            )}
                            {activeModal === 'expense' && (
                                <>
                                    <h2>지출보고서 작성 예시</h2>
                                    <p>* 지출 달은 꼭 선택해 주세요.비고는 선택사항 입니다.</p>
                                    <p>* 비고는 선택사항 입니다.</p>
                                    <img
                                        src="http://localhost:8080/memberimgs/expenseReport.png"
                                        alt="지출보고서 예시"
                                        className={`${styles.expenseImage}`}
                                    />
                                </>
                            )}
                            {activeModal === 'repair' && (
                                <>
                                    <h2>시설물수리보고서 작성 예시</h2>
                                    <p>* 고장난 부위, 기계의 증상을 자세하게 적어주세요.</p>
                                    <p>* 사진은 선택사항입니다.</p>
                                    <img
                                        src="http://localhost:8080/memberimgs/repairReports.png"
                                        alt="시설물수리보고서 예시"
                                        className={` ${styles.repairImage}`}
                                    />
                                </>
                            )}
                        </div>
                    )}
                </div>
                <div className={styles.modal_section}>
                    {activeModal === 'branchSales' && (
                        <BranchSalesModal show={true} onClose={handleCloseModal} />
                    )}
                    {activeModal === 'expense' && (
                        <ExpenseModal show={true} onClose={handleCloseModal} />
                    )}
                    {activeModal === 'repair' && (
                        <RepairModal show={true} onClose={handleCloseModal} />
                    )}
                </div>
            </div>
        </div>
    );
}

export default LocationNewReports;
