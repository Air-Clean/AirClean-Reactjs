import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import './UtilityTabCss.css'
import 'animate.css'

import { useDispatch , useSelector } from 'react-redux';
import { callMaintenanceCost } from '../../../apis/MainAPICalls';
import { useEffect , useState} from 'react';



export default function UtilityTab({com}) {

    const dispatch= useDispatch();
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
        
        dispatch(callMaintenanceCost({ value : newValue}))
    };

    useEffect(()=>{
        dispatch(callMaintenanceCost({ value : value}))
    },[])

    const result = useSelector(state=>state.maintainReducer)

    console.log('maintenaince',result)

    let laundryFilter = 0; 
    let dryerFilter =0;
    let cleanerFilter = 0;

    let fuel = 0;
    let mis = 0;
    let regular = 0;
    let repair = 0;

    let maintenance= result.result;
    if(parseInt(value)===1){

        console.log('유지관리',result)
        maintenance.forEach(e => {
        laundryFilter += e.laundryFilterExpense;
        dryerFilter += e.dryerFilterExpense;
        cleanerFilter += e.dryCleanerFilterExpense;
        });

    }else{
        console.log('차량값',result)
        maintenance.forEach(m=>{
            fuel += m.vehicleFuelCost
            mis += m.vehicleMiscellaneous
            regular += m.vehicleRegularInspection
            repair +=m.vehicleVehicleRepairCost
        })
    }
    

    return (
        <Box sx={{ width: '100%', typography: 'body1' }}>
            <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="시설 유지 관리비" value="1" />
                        <Tab label="차량 유지비" value="2" />
                    </TabList>
                </Box>
                <TabPanel value="1">
                    <div className='utilCostBox'>
                        <div className='utilCost'>
                            <div>세탁기 필터</div>
                            <div>{
                                new Intl.NumberFormat('ko-KR',{
                                    style : 'currency',
                                    currency : 'KRW'
                                }).format(laundryFilter)
                                }</div>
                        </div>
                        <div className='utilCost'>
                            <div>건조기 필터</div>
                            <div>{
                                new Intl.NumberFormat('ko-KR',{
                                    style : 'currency',
                                    currency : 'KRW'
                                }).format(dryerFilter)
                                }</div>
                        </div>
                        <div className='utilCost'>
                            <div>드라이클리너 필터</div>
                            <div>{
                                new Intl.NumberFormat('ko-KR',{
                                    style : 'currency',
                                    currency : 'KRW'
                                }).format(cleanerFilter)
                                }</div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value="2">
                    <div className='utilCostBox'>
                        <div className='utilCost'>
                            <div>주유비</div>
                            <div>{
                                new Intl.NumberFormat('ko-KR',{
                                    style : 'currency',
                                    currency : 'KRW'
                                }).format(fuel)
                                }</div>
                        </div>
                        <div className='utilCost'>
                            <div>정기점검비</div>
                            <div>
                            {
                                new Intl.NumberFormat('ko-KR',{
                                    style : 'currency',
                                    currency : 'KRW'
                                }).format(regular)
                                }
                            </div>
                        </div>
                        <div className='utilCost'>
                            <div>수리비</div>
                            <div>

                            {
                                new Intl.NumberFormat('ko-KR',{
                                    style : 'currency',
                                    currency : 'KRW'
                                }).format(repair)
                                }
                            </div>
                        </div>
                        <div className='utilCost'>
                            <div>기타</div>
                            <div>
                            {
                                new Intl.NumberFormat('ko-KR',{
                                    style : 'currency',
                                    currency : 'KRW'
                                }).format(mis)
                                }
                            </div>
                        </div>
                    </div>
                </TabPanel>
            </TabContext>
        </Box>
    );
}