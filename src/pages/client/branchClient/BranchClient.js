import './Branch.css';
import BranchListClient from '../../../components/branchClient/BranchListClient';
import BranchInformationClient from '../../../components/branchClient/BranchinformationClient';
// import { Provider } from 'react-redux';
import { useState } from 'react';
import MapClient from '../../../components/branchClient/MapClient';

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
                        <MapClient onLocationChange={handleLocationChange}/>
                        <div style={{height:'30px'}}></div>
                        <BranchListClient locationName={locationName} onBranchSelect={handleBranchSelect} />
                    </div>
                    <div style={{ padding: '30px 30px 30px 0' }}>
                        <BranchInformationClient branch={selectedBranch} />
                    </div>
                </div>
            </div>
        
    );
}

export default Branch;
