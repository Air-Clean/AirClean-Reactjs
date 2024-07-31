import './Branch.css';
import Map from '../../../components/branch/Map';
import BranchList from '../../../components/branch/BranchList';
import BranchInformation from '../../../components/branch/Branchinformation';
// import { Provider } from 'react-redux';
import { useState , useEffect} from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import { callBranchInfo } from '../../../apis/CallBranchInfoApi';


function Branch() {

    const [locationName, setLocationName] = useState('전체');


    const [selectedBranch, setSelectedBranch] = useState('');


    const [local,setLocal] = useState({
        '전체' : [],
        '중앙' : [],
        '동부' : [],
        '서부' : [],
        '남부' : [],
        '북부' : []
    })

    const [facility , setFacility] =useState({
        laundry : [],
        dry : [],
        cleaner : []
    })

    const handleBranchSelect = (branch) => {
        setSelectedBranch(branch);
    };

    const handleLocationChange = (name) => {
        setLocationName(name);
    }

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(callBranchInfo());
    },[])

    const branchInfo = useSelector(state=>state.branchInfoReducer);

    useEffect(()=>{
        const center = branchInfo.filter(branch=>branch.branchRegion==='중앙')
        const east = branchInfo.filter(branch=>branch.branchRegion==='동부')
        const west = branchInfo.filter(branch=>branch.branchRegion==='서부')
        const south = branchInfo.filter(branch=>branch.branchRegion==='남부')
        const north = branchInfo.filter(branch=>branch.branchRegion==='북부')

        const changeData = {...local, '전체': branchInfo ,'중앙' : center , '동부' : east , '서부' : west , '남부' : south , '북부' : north}

        console.log('data 가 잘 정렬 되었는가 ?', changeData)

        setLocal(changeData);

    },[branchInfo])

    return (
        // <Provider store={store}>
            <div className="branch_layout" style={{ height: 'calc(100vh - 130px)' }}>
                <div className='flex_wrap' style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{padding: '30px'}}>
                        <Map onLocationChange={handleLocationChange} local={local}/>
                        <div style={{height:'30px'}}></div>
                        <BranchList locationName={locationName} facility={facility} setFacility={setFacility} setSelectedBranch={setSelectedBranch} onBranchSelect={handleBranchSelect} local={local}/>
                    </div>
                    <div style={{ padding: '30px 30px 30px 0' }}>
                        <BranchInformation branch={selectedBranch} facility={facility} />
                    </div>
                </div>
            </div>
        
    );
}

export default Branch;
