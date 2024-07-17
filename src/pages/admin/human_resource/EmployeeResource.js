import BioCard from "./BioCard";
import Searchbar from "./Searchbar";
import "./HumanResource.css";
import { EMPLOYEE } from "../../../modules/HRModule";
import Paging from "./Paging";
import { useState ,useEffect} from "react";
import { useDispatch,useSelector } from "react-redux";
import { callEmployeeList } from "../../../apis/HRAPICalls";

function EmployeeResource() {
  console.log("직원페이지 입니다");



    const [current , setCurrent] = useState(1)
    const [start, setStart] = useState(0)
    const [end , setEnd] = useState(1);

    // redux

    const dispatch = useDispatch();

    const employee = useSelector(state=>state.humanReducer)

   

    useEffect(()=>{
        dispatch(
            callEmployeeList({current : current})
        )
    },[current])
  return (
    <>
      <div className="menu1_layout">
                
                <div className='flex_wrap'>
                        <Searchbar/>
                        <BioCard/>
                        <Paging setCurrent={setCurrent} start={start} end={end}/>
                </div>
                
            </div>
    </>
  );
}

export default EmployeeResource;
