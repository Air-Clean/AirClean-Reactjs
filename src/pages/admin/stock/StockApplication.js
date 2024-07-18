import './StockApplication.css';
import {useState} from 'react';
import StockBarChart from './StockBarChart';

function StockApplication() {

    const [detergent, setDetergent] = useState('');
    const [softener, setSoftener] = useState('');
    const [bleach, setBleach] = useState('');
    const [remover, setRemover] = useState('');
    const [drumCleaner, setDrumCleaner] = useState('');
    const [sheet, setSheet] = useState('');
    const [laundryFilter, setLaundryFilter] = useState('');
    const [dryerFilter, setDryerFilter] = useState('');
    const [dryCleanerFilter, setDryCleanerFilter] = useState('');
    
        // Handlers for input changes
        const handleDetergentChange = (event) => {
        setDetergent(event.target.value);
        };
    
        const handleSoftenerChange = (event) => {
        setSoftener(event.target.value);
        };

        const handleBleachChange = (event) => {
        setBleach(event.target.value);
        };

        const handleRemoverChange = (event) => {
            setRemover(event.target.value);
        };

        const handleDrumCleanerChange = (event) => {
            setDrumCleaner(event.target.value);
        };

        const handleSheetChange = (event) => {
            setSheet(event.target.value);
        };

        const handleLaundryFilterChange = (event) => {
            setLaundryFilter(event.target.value);
        };

        const handleDryerFilterChange = (event) => {
            setDryerFilter(event.target.value);
        };

        const handleDryCleanerFilter = (event) => {
            setDryCleanerFilter(event.target.value);
        };

    return(
        <>
            <div className="menu1_layout">
                <div className='flex_wrap'>
                    <div className='stock_application'>

                        <div className='stock_bar_chart'>
                            <StockBarChart/>
                        </div>

                        <div className='stock_input'>
                            <div>
                            <label>
                                세제: 
                                <input type="number" value={detergent} onChange={handleDetergentChange} min='1'/>
                            </label>
                            </div>

                            <div>
                            <label>
                                섬유유연제: 
                                <input type="number" value={softener} onChange={handleSoftenerChange} min='1'/>
                            </label>
                            </div>

                            <div>
                            <label>
                                표백제: 
                                <input type="number" value={bleach} onChange={handleBleachChange} min='1'/>
                            </label>
                            </div>

                            <div>
                            <label>
                                얼룩제거제: 
                                <input type="number" value={remover} onChange={handleRemoverChange} min='1'/>
                            </label>
                            </div>

                            <div>
                            <label>
                                세탁조 클리너: 
                                <input type="number" value={drumCleaner} onChange={handleDrumCleanerChange} min='1'/>
                            </label>
                            </div>

                            <div>
                            <label>
                                건조기 시트: 
                                <input type="number" value={sheet} onChange={handleSheetChange} min='1'/>
                            </label>
                            </div>

                            <div>
                            <label>
                                세탁기 필터: 
                                <input type="number" value={laundryFilter} onChange={handleLaundryFilterChange} min='1'/>
                            </label>
                            </div>

                            <div>
                            <label>
                                건조기 필터: 
                                <input type="number" value={dryerFilter} onChange={handleDryerFilterChange} min='1'/>
                            </label>
                            </div>

                            <div>
                            <label>
                                드라이클리너 필터: 
                                <input type="number" value={dryCleanerFilter} onChange={handleDryCleanerFilter} min='1'/>
                            </label>
                            </div>
                        </div>

                        <div className='app_appli_info' style={{ position: 'relative', padding: '3vh' }}>
                        <div className='supply_appli_info'>
                            <h4>신청정보</h4>
                            <table style={{ marginTop: '0',  textAlign: 'center', borderCollapse: 'collapse' }}>
                            <thead>
                            <tr>
                                <th style={{ backgroundColor: '#f2f2f2', padding: '0.3vh', width: '8vw'}}>세제</th>
                                <th style={{ backgroundColor: '#f2f2f2', padding: '0.3vh', width: '8vw'}}>섬유유연제</th>
                                <th style={{ backgroundColor: '#f2f2f2', padding: '0.3vh', width: '8vw'}}>표백제</th>
                                <th style={{ backgroundColor: '#f2f2f2', padding: '0.3vh', width: '8vw'}}>얼룩제거제</th>
                                <th style={{ backgroundColor: '#f2f2f2', padding: '0.3vh', width: '8vw'}}>세탁조 클리너</th>
                                <th style={{ backgroundColor: '#f2f2f2', padding: '0.3vh', width: '8vw'}}>건조기 시트</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{detergent}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{softener}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{bleach}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{remover}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{drumCleaner}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{sheet}</td>
                            </tr>
                            </tbody>
                            </table>
                        </div>

                        <div className='part_appli_info' style={{ marginTop: '5vh' }}>
                            <table style={{ marginTop: '0',  textAlign: 'center', borderCollapse: 'collapse' }}>
                            <thead>
                            <tr>
                                <th style={{ backgroundColor: '#f2f2f2', padding: '0.3vh', width: '8vw'}}>세탁기 필터</th>
                                <th style={{ backgroundColor: '#f2f2f2', padding: '0.3vh', width: '8vw'}}>건조기 필터</th>
                                <th style={{ backgroundColor: '#f2f2f2', padding: '0.3vh', width: '8vw'}}>드라이클리너 필터</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{laundryFilter}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{dryerFilter}</td>
                                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{dryCleanerFilter}</td>
                            </tr>
                            </tbody>
                            </table>
                        </div>

                        <button  style={{ position: 'absolute', right: '3vh', bottom: '3vh' }}>신청하기</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default StockApplication;