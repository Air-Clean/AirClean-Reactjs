import styles from './LocationNewReports.module.css';
import BranchSalesModal from './BranchSalesModal';
import ExpenseModal from './ExpenseModal';
import RepairModal from './RepairModal';
import { useState } from 'react';

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
                        <div className={styles.button_group}></div>
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
