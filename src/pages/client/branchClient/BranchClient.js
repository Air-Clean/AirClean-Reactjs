import './Branch.css';
import Map from '../../../components/branch/Map';
import BranchList from '../../../components/branchClient/BranchListClient';
import BranchInformation from '../../../components/branchClient/BranchinformationClient';
import { useState , useEffect} from 'react';
import { useDispatch ,useSelector } from 'react-redux';
import { callBranchInfo } from '../../../apis/CallBranchInfoApi';
import { useLocation } from 'react-router-dom';


function Branch() {

    console.log('branch 정보 정보')

    const [locationName, setLocationName] = useState('전체');
    const [branchData , setBranchData] = useState([]); 

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
    const location = useLocation();

    const handleLocationChange = (name) => {
        setLocationName(name);
    }

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(callBranchInfo());
    },[])

    useEffect(()=>{
    
         // 페이지 이동을 감지하여 상태 초기화
         setFacility({ laundry: [], dry: [], cleaner: [] });

         // 언마운트 시 상태 초기화
         return () => {
             console.log("Component unmounted, resetting facility state");
             setFacility({ laundry: [], dry: [], cleaner: [] });
         };
    },[location])

    const branchInfo = useSelector(state=>state.branchInfoReducer);

    useEffect(()=>{
        const center = branchInfo.filter(branch=>branch.branchRegion==='중앙')
        const east = branchInfo.filter(branch=>branch.branchRegion==='동부')
        const west = branchInfo.filter(branch=>branch.branchRegion==='서부')
        const south = branchInfo.filter(branch=>branch.branchRegion==='남부')
        const north = branchInfo.filter(branch=>branch.branchRegion==='북부')

        const changeData = {...local, '전체': branchInfo ,'중앙' : center , '동부' : east , '서부' : west , '남부' : south , '북부' : north}

        console.log('branch data 가 잘 정렬 되었는가 ?', changeData)

        setLocal(changeData);
        const myBranch = JSON.parse(window.localStorage.getItem('branch'));
        console.log('myBranch',myBranch)
        const data = changeData.전체.filter(b=>b.branchCode===myBranch.branchCode)
        setSelectedBranch(data[0])

        console.log('branchdata 형식으로 만들어 졌는가',data)

    },[branchInfo])

    useEffect(()=>{
        setBranchData(local[locationName])
    },[locationName, local])

    console.log('branch facility',facility)

    return (
            <div className="branch_layout" style={{ height: 'calc(100vh - 130px)' }}>
                <div className='flex_wrap' style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{padding: '30px'}}>
                        <Map onLocationChange={handleLocationChange} local={local}/>
                        <div style={{height:'30px'}}></div>
                        <BranchList branchData={branchData} locationName={locationName} facility={facility} setFacility={setFacility} setSelectedBranch={setSelectedBranch}/>
                    </div>
                    <div style={{ padding: '30px 30px 30px 0' }}>
                        <BranchInformation branch={selectedBranch} facility={facility} />
                    </div>
                </div>
            </div>
    );
}

export default Branch;
