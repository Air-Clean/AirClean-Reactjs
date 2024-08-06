import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Cardelivery.module.css';
import Paging from '../../../components/paging/Paging';
import { callCarInfoListAPI } from '../../../apis/CarAPICalls';

function Cardelivery() {
    const dispatch = useDispatch();
    const car = useSelector(state => state.carReducer);

    console.log('차량정보', car);

    const carList = car?.carList?.content;
    const totalpage = car?.carList?.totalPages;

    const [current, setCurrent] = useState(1);

    useEffect(() => {
        dispatch(callCarInfoListAPI({ current }));
    }, [dispatch, current]);

    return (
        <div className={styles.cardeliveryLayout}>
            <div className={styles.flexWrap}>
                <div className={styles.cardeliveryLayer}>
                    <h1 className={styles.title}>물류 시스템 관리</h1>
                    <table className={styles.cardeliveryTable}>
                        <thead>
                            <tr className={styles.cardeliveryTr}>
                                <th className={styles.cardeliveryTh}>순서</th>
                                <th className={styles.cardeliveryTh}>차량 번호</th>
                                <th className={styles.cardeliveryTh}>지역</th>
                                <th className={styles.cardeliveryTh}>배송 상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {carList?.map((car, index) => (
                                <tr key={car.carNumber} className={styles.cardeliveryTr}>
                                    <td className={styles.cardeliveryTd}>{index + 1}</td>
                                    <td className={styles.cardeliveryTd}>{car.carNumber}</td>
                                    <td className={styles.cardeliveryTd}>{car.branchRegion}</td>
                                    <td className={`${car.deliveryStatus === "배송중" ? styles.assigned : styles.notAssigned} ${styles.cardeliveryTd}`}>
                                        {car.deliveryStatus}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <Paging setCurrent={setCurrent} end={totalpage} />
                </div>
            </div>
        </div>
    );
}

export default Cardelivery;
