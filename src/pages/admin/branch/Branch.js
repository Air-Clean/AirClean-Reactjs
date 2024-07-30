import './Branch.css';
import Map from '../../../components/branch/Map';
import BranchList from '../../../components/branch/BranchList';
import BranchInformation from '../../../components/branch/Branchinformation';
// import { Provider } from 'react-redux';
import { useState } from 'react';

function Branch() {

    const [locationName, setLocationName] = useState('');
    const [selectedBranch, setSelectedBranch] = useState(null);

    const handleBranchSelect = (branch) => {
        setSelectedBranch(branch);
    };

    const handleLocationChange = (name) => {
        setLocationName(name);
    }

    return (
        // <Provider store={store}>
            <div className="branch_layout" style={{ height: 'calc(100vh - 130px)' }}>
                <div className='flex_wrap' style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{padding: '30px'}}>
                        <Map onLocationChange={handleLocationChange}/>
                        <div style={{height:'30px'}}></div>
                        <BranchList locationName={locationName} onBranchSelect={handleBranchSelect} />
                    </div>
                    <div style={{ padding: '30px 30px 30px 0' }}>
                        <BranchInformation branch={selectedBranch} />
                    </div>
                </div>
            </div>
        
    );
}

export default Branch;
