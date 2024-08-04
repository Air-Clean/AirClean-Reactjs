import BioCard from "./BioCard";
import Searchbar from "../Searchbar";
import "../HumanResource.css"


import Paging from "../../../../components/paging/Paging";
import { useState ,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { callDriverList, callSoftDeleteDriver } from "../../../../apis/HRAPICalls";
import { Grid } from "@mui/material";
import 'animate.css';
import Snackbar from '@mui/material/Snackbar';



export default function DriverResource() {
  console.log("====================================차량기사페이지 입니다");

    const [state, setState] = useState({
        open : false,
        vertical : 'top',
        horizontal : 'left',
    })
    const [copy , setCopy] = useState('');
    const {vertical , horizontal , open}=state;

    const handleClick=()=>{
        setState({...state,open : true})
    }
    const handleClose = () => {
        setCopy('')
        setState({ ...state, open: false });
    };

    

    const [isRegist , setIsRegist] = useState('');
    const [current , setCurrent] = useState(1);
    const [deleteMember, setDeleteMember] = useState([]);
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const [animationClass, setAnimationClass] = useState('animate__animated animate__fadeInUp');
    
    // redux

    const dispatch = useDispatch();

    const result = useSelector(state=>state.humanReducer);

    console.log("result 값",result)

    const driver = result?.data?.content;
    const totalPage = result?.data?.totalPages;

    console.log("driver",driver)
    


    useEffect(()=>{
        dispatch(
            callDriverList({current : current})
        )
    },[current, dispatch])

    useEffect(() => {
      if (deleteMember.length > 0) {
        setAnimationClass('animate__animated animate__fadeInUp');
        setIsButtonVisible(true);
      } else if (deleteMember.length === 0 && isButtonVisible) {
        setAnimationClass('animate__animated animate__fadeOutDown');
        setTimeout(() => setIsButtonVisible(false), 1000); // 애니메이션 시간 후에 버튼 숨기기
      }
      console.log("deleteMember 변함", deleteMember);
    }, [deleteMember, isButtonVisible]);
  

    const softDeleteHandler=()=>{
        dispatch(
            callSoftDeleteDriver({deleteMember: deleteMember ,})
        )
        
        window.location.reload();
    }

  return (
    <>

      <div className="menu1_layout">
       <div className="flex_wrap">
        <div className="searchbar_container">
          <Searchbar setRegist={setIsRegist} isRegist={isRegist} />
        </div>
        <Grid container spacing={1} justifyContent="flex-start">
          {driver?.map((b) => (
              <BioCard driver={b} key={b.memberId} setDeleteMember={setDeleteMember} deleteMember={deleteMember} setCopy={setCopy} handleClick={handleClick}/>
          ))}
          {isButtonVisible && (
          <div className={`deleteButtonCss ${animationClass}`}>
            <button className="button-45" onClick={softDeleteHandler}>
              {deleteMember.length} 명을 삭제하시겠습니까?
            </button>
          </div>
        )}
        </Grid>
        
        
          <Paging setCurrent={setCurrent} end={totalPage} />
          <Snackbar
          anchorOrigin={{vertical , horizontal}}
          open={open}
          onClose={handleClose}
          message={`${copy} Copied!`}
          key={vertical+horizontal}
          />
          <Snackbar

          />
        </div>
      </div>
    </>
  );
}


