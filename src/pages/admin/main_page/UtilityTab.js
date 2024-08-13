import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import './UtilityTabCss.css'
import 'animate.css'


export default function UtilityTab() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    

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
                            <div>정기점검비</div>
                            <div>200,002,000</div>
                        </div>
                        <div className='utilCost'>
                            <div>수리비</div>
                            <div>200,002,000</div>
                        </div>
                        <div className='utilCost'>
                            <div>부품교체</div>
                            <div>200,002,000</div>
                        </div>
                        <div className='utilCost'>
                            <div>정기청소</div>
                            <div>200,002,000</div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value="2">
                    <div className='utilCostBox'>
                        <div className='utilCost'>
                            <div>주유비</div>
                            <div>200,002,000</div>
                        </div>
                        <div className='utilCost'>
                            <div>정기점검비</div>
                            <div>200,002,000</div>
                        </div>
                        <div className='utilCost'>
                            <div>수리비</div>
                            <div>200,002,000</div>
                        </div>
                        <div className='utilCost'>
                            <div>기타</div>
                            <div>200,002,000</div>
                        </div>
                    </div>
                </TabPanel>
            </TabContext>
        </Box>
    );
}