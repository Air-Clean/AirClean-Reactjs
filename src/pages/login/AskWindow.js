import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
  ButtonGroup,
} from "reactstrap";

import { useState , useEffect } from "react";
import LoginCss from "./Login.module.css";

import { useDispatch , useSelector} from "react-redux"; 
import { callFindUserAPI } from "../../apis/MemberAPICalls";


export default function AskWindow() {
    //useState
  const [modal, setModal] = useState(false);
  const [rSelected, setRSelected] = useState(null);
  const [form, setForm] = useState({
    memberName : '',
    memberPhone : '',
    memberEmail : '',
    memberRole : '',
    askDescription : ''
  })

  // redux
  const dispatch = useDispatch();

  const isSuccess = useSelector(state=> state.memberReducer)

  const toggle = () => {
    setModal(!modal)
  };
  
  const inputHandler = e=>{
    const changeForm = {...form,[e.target.name]:e.target.value}

    if(e.target.name === 'memberRole'){
        setRSelected(e.target.value)
    }
    setForm(changeForm)
  }

  const submitHandler=()=>{
    dispatch(callFindUserAPI({form}))

    setForm({})
    // window.location.reload();
  }

  useEffect(()=>{
    console.log(form)
  },[form])


  return (
    <>
      <p
        style={{ textAlign: "center" }}
        onClick={toggle}
        className={LoginCss.ModalButton}
      >
        문의하기
      </p>
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader toggle={toggle}> ID / PASSWORD 문의 </ModalHeader>
        <ModalBody>
          <FormGroup floating>
            <Input
              id="memberName"
              name="memberName"
              placeholder="Name"
              type="text"
              autoComplete="off"
              onChange={inputHandler}
            />
            <Label for="memberName">Name</Label>
          </FormGroup>
          <FormGroup floating>
            <Input
              id="memberPhone"
              name="memberPhone"
              placeholder="phone"
              type="text"
              autoComplete="off"
              onChange={inputHandler}
            />
            <Label for="memberPhone">Phone</Label>
          </FormGroup>
          <FormGroup floating>
            <Input
              id="memberEmail"
              name="memberEmail"
              placeholder="Email"
              type="email"
              autoComplete="off"
              onChange={inputHandler}
            />
            <Label for="exampleEmail">Email</Label>
          </FormGroup>
          <ButtonGroup className="my-2" size="m" style={{ width: "100%" }} onClick={inputHandler}>
            <Button outline value='e' name='memberRole' active={rSelected === 'e'}>직원</Button>
            <Button outline value='b' name='memberRole'  active={rSelected === 'b'}>지점장</Button>
          </ButtonGroup>
          <FormGroup floating>
            <Input
              id="askDescription"
              name="askDescription"
              placeholder="Description"
              type="textarea"
              autoComplete="off"
              onChange={inputHandler}
            />
            <Label for="askDescription">Description</Label>
          </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={submitHandler}>
            문의하기
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
