import './Branch.css';
import Map from '../../components/branch/Map';
import BranchList from '../../components/branch/BranchList';
import BranchInformation from '../../components/branch/Branchinformation';

function Branch() {
    return (
        <div className="branch_layout" style={{ height: 'calc(100vh - 130px)' }}>
            <div className='flex_wrap' style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{padding: '30px'}}>
                    <Map />
                    <div style={{height:'30px'}}></div>
                    <BranchList />
                </div>

                <div style={{ padding: '30px 30px 30px 0' }}>
                    <BranchInformation />
                </div>
            </div>
        </div>
    );
}

export default Branch;

