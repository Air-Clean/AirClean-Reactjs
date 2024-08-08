import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './Cardelivery.module.css';
import Paging from '../../../components/paging/Paging';
import { callCarInfoListAPI,callCarWithLaundry  } from '../../../apis/CarAPICalls';
import ArrowToggle from './ArrowToggle';

function Cardelivery() {
    const dispatch = useDispatch();
    const car = useSelector(state => state.carReducer);

    const branch = JSON.parse(window.localStorage.getItem('branch'));


    const carList = car?.carList?.content;

    console.log('carList',carList)
    const totalpage = car?.carList?.totalPages;

    const [current, setCurrent] = useState(1);
    const [isFoward , setIsFoward] = useState(false)

    useEffect(() => {
        dispatch(callCarWithLaundry({ current :current , branchCode : branch.branchCode , isFoward}));
    }, [dispatch, current , isFoward]);

    console.log('cardadfasf', car)
    

    return (
        <div className={styles.cardeliveryLayout}>
            <div className={styles.flexWrap}>
                <div className={styles.cardeliveryLayer}>
                    <div style={{display : 'flex'}}>
                    <h1 className={styles.title}>물류 시스템 관리</h1>
                    </div>
                    <div style={{display : 'flex', justifyContent : 'flex-end', width: '100%'}} >
                    <ArrowToggle isFoward={isFoward} setIsFoward={setIsFoward}/>
                    </div>
                    <table className={styles.cardeliveryTable}>
                        <thead>
                            <tr className={styles.cardeliveryTr}>
                                <th className={styles.cardeliveryTh}>순서</th>
                                <th className={styles.cardeliveryTh}>운전 면허 번호</th>
                                <th className={styles.cardeliveryTh}>차량 기사</th>
                                <th className={styles.cardeliveryTh}>세탁물 번호</th>
                                <th className={styles.cardeliveryTh}>고객 이름</th>
                                <th className={styles.cardeliveryTh}>배송 상태</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* {carList?.map((car, index) => (
                                <tr key={car.carNumber} className={styles.cardeliveryTr}>
                                    <td className={styles.cardeliveryTd}>{index + 1}</td>
                                    <td className={styles.cardeliveryTd}>{car.carNumber}</td>
                                    <td className={styles.cardeliveryTd}></td>
                                    <td className={styles.cardeliveryTd}>{}</td>
                                    <td className={styles.cardeliveryTd}>{}</td>
                                    <td className={`${car.deliveryStatus === "배송중" ? styles.assigned : styles.notAssigned} ${styles.cardeliveryTd}`}>
                                        {car.deliveryStatus}
                                    </td>
                                </tr>
                            ))} */}

                            {
                                !isFoward ? (
                                    carList?.map((car,index)=>(
                                        <tr key={car.carNumber} className={styles.cardeliveryTr}>
                                            <td className={styles.cardeliveryTd}>{index + 1}</td>
                                            <td className={styles.cardeliveryTd}>{car.pickDriverMember?.driverLicenseNumber}</td>
                                            <td className={styles.cardeliveryTd}>{car.pickDriverMember?.memberDTO.memberName}</td>
                                            <td className={styles.cardeliveryTd}>{car.laundryCode}</td>
                                            <td className={styles.cardeliveryTd}>{car.laundryCustomerName}</td>
                                            <td className={`${car.laundryArriveStatus === "Y" ? styles.assigned : styles.notAssigned} ${styles.cardeliveryTd}`}>{car.laundryArriveStatus==='Y' ?'배송완료':'배송중'}</td>
                                        </tr>
                                    ))
                                ) : (
                                    carList?.map((car,index)=>(
                                        <tr key={car.carNumber} className={styles.cardeliveryTr}>
                                            <td className={styles.cardeliveryTd}>{index + 1}</td>
                                            <td className={styles.cardeliveryTd}>{car.deliveryDriverMember?.driverLicenseNumber}</td>
                                            <td className={styles.cardeliveryTd}>{car.deliveryDriverMember?.memberDTO.memberName}</td>
                                            <td className={styles.cardeliveryTd}>{car.laundryCode}</td>
                                            <td className={styles.cardeliveryTd}>{car.laundryCustomerName}</td>
                                            <td className={`${car.laundryArriveStatus === "Y" ? styles.assigned : styles.notAssigned} ${styles.cardeliveryTd}`}>{car.laundryArriveStatus==='Y' ?'수거완료':'수거중'}</td>
                                        </tr>
                                    ))
                                )
                            }
                        </tbody>
                    </table>
                    <Paging setCurrent={setCurrent} end={totalpage} />
                </div>
            </div>
        </div>
    );
}

export default Cardelivery;
