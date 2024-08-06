import styles from './LocationNewReports.module.css';
import BranchSalesModal from './BranchSalesModal';
import ExpenseModal from './ExpenseModal';
import RepairModal from './RepairModal';
import { useState } from 'react';

function LocationNewReports() {
    const [showBranchSalesModal, setShowBranchSalesModal] = useState(false);
    const [showExpenseModal, setShowExpenseModall] = useState(false);
    const [showRepairModal, setShowRepairModal] = useState(false);

    // 매출보고서 모달
    const handleBranchSalesOpenModal = () => {
        setShowBranchSalesModal(true);
    };
    const handleBranchSalesCloseModal = () => {
        setShowBranchSalesModal(false);
    };

    // 지출보고서 모달
    const handleExpenseOpenModal = () => {
        setShowExpenseModall(true);
    };
    const handleExpenseCloseModal = () => {
        setShowExpenseModall(false);
    };

    // 시설물수리보고서 모달
    const handleRepairOpenModal = () => {
        setShowRepairModal(true);
    };
    const handleRepairCloseModal = () => {
        setShowRepairModal(false);
    };
    return (
        <div className={styles.menu1_layout}>
            <div className={styles.flex_wrap}>
                <div className={styles['report-create']}>
                    <h1>보고서 양식</h1>
                    <div className={styles['button-group']}></div>
                    <table className={styles['report-table']}>
                        <thead>
                            <tr>
                                <th>보고서번호</th>
                                <th>양식명</th>
                                <th>서류설명</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th>1</th>
                                <th style={{ cursor: 'pointer' }} onClick={handleBranchSalesOpenModal}>매출보고서</th>
                                <th>하루 매출 보고서 작성</th>
                            </tr>
                            <tr>
                                <th>2</th>
                                <th  style={{ cursor: 'pointer' }} onClick={handleExpenseOpenModal}>지출보고서</th>
                                <th>한달 지출 보고서 작성</th>
                            </tr>
                            <tr>
                                <th>3</th>
                                <th  style={{ cursor: 'pointer' }} onClick={handleRepairOpenModal}>시설물수리보고서</th>
                                <th>고장난 시설물 수리보고서 작성</th>
                            </tr>
                        </tbody>
                    </table>
                    <BranchSalesModal show={showBranchSalesModal} onClose={handleBranchSalesCloseModal} />
                    <ExpenseModal show={showExpenseModal} onClose={handleExpenseCloseModal} />
                    <RepairModal show={showRepairModal} onClose={handleRepairCloseModal} />
                </div>
            </div>
        </div>
    );
}

export default LocationNewReports;