import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
  Col,
  Card,
  CardBody,
  Row,
  ButtonGroup,
} from "reactstrap";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useDispatch, useSelector } from "react-redux";

import "animate.css";
import "./RegistDriverCss.css";
import {
  registDriver,
  callBranchWithoutOwner,
  callBranchCount
} from "../../../../apis/HRAPICalls";
import InputMask from "react-input-mask";

export default function RegistDriver({ openModal, regist }) {
  const dispatch = useDispatch();

  const [rSelected, setRSelected] = useState(null);

  const [form, setForm] = useState({
    memberName: "",
    memberPhoneNumber: "",
    branchCode: "",
    memberEmail: "",
    memberBirthDate: "",
    memberGender: "",
    memberAddress: "",
    image: null,
    imagePreview: "",
    memberHireDate: "",
    driverRegion : '',
    drvierLicenseNumber : ''
  });

  const [secondModal, setSecondModal] = useState(false);

  // 입력 제한
  const [emailValid, setEmailValid] = useState(true);
  const inputHandler = (e) => {
    const { name, value } = e.target;
    if (name === 'memberEmail') {
      setEmailValid(validateEmail(value));
    }
    setForm({ ...form, [name]: value });
    if (name === "memberGender") {
      setRSelected(value);
    }
  };

  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    const rawValue = value.replace(/-/g, ''); // Remove dashes to store raw value
    setForm({ ...form, memberPhoneNumber: rawValue });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  //

  const [postcodeVisible, setPostcodeVisible] = useState(false);

  // const inputHandler = (e) => {
  //   const { name, value } = e.target;
  //   const changeForm = { ...form, [name]: value };
  //   if (name === "memberGender") {
  //     setRSelected(value);
  //   }
  //   setForm(changeForm);
  // };

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      setForm({
        ...form,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    },
    [form]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
  });

  const handleAddressSelect = (data) => {
    const fullAddress = data.address;
    setForm({
      ...form,
      memberAddress: fullAddress,
      fullAddress,
    });
    setPostcodeVisible(false); // Close accordion after selection
  };

  const handleAddressClick = () => {
    setPostcodeVisible(!postcodeVisible); // Show the postcode component when address input is clicked
  };

  const submitHandler = () => {
    if(!form.driverLicenseNumber){
      alert('면허증 번호를 입력하세요')
      return;
    }else if(!form.driverRegion){
      alert('서비스 지역을 선택하세요')
      return;
    }
    const formData = new FormData();

    formData.append("memberName", form.memberName);
    formData.append("memberPhoneNumber", form.memberPhoneNumber);
    formData.append("memberEmail", form.memberEmail);
    formData.append("memberBirthDate", form.memberBirthDate);
    formData.append("memberGender", form.memberGender);
    formData.append("memberAddress", form.memberAddress);
    formData.append("memberHireDate", form.memberHireDate);
    formData.append("branchCode", form.branchCode);
    formData.append("driverRegion",form.driverRegion)
    formData.append("driverLicenseNumber",form.driverLicenseNumber)

    if (form.image) {
      formData.append("image", form.image);
    }

    dispatch(registDriver({ form: formData }));

    window.location.reload();
  };

  useEffect(() => {
    dispatch(callBranchWithoutOwner());
  }, []);

  

  const toggleSecondModal = () => {

    if(!form.memberName){
      alert('이름을 입력해주세요');
      return;
    }
    else if(!form.memberPhoneNumber){
      alert('전화번호를 입력해주세요');
      return;
    }else if(!form.memberEmail){
      alert('이메일을 입력해주세요');
      return;
    }else if (!emailValid) {
      alert('적절한 이메일을 입력해주세요');
      return;
    }else if(!form.memberGender){
      alert('성별을 입력해주세요');
      return;
    }else if(!form.memberBirthDate){
      alert('생일을 입력해주세요');
      return;
    }else if(!form.memberHireDate){
      alert('입사일을 입력해주세요');
      return;
    }
    else if(!form.memberAddress){
      alert('거주지를 입력해주세요');
      return;
    }

    setSecondModal(!secondModal);
    openModal();
    dispatch(callBranchCount())
  };

  const regionCount = useSelector(state=> state.branchCountReducer)

  console.log('지역별갯수 확인',regionCount)
  return (
    <>
      <Modal
        isOpen={regist}
        toggle={openModal}
        centered
        className="animate__animated animate__fadeInLeftBig custom-modal"
      >
        <ModalHeader toggle={openModal}>Driver Registration</ModalHeader>
        <ModalBody>
          <Row form>
            <Col md={6}>
              <FormGroup>
                <FormGroup>
                  <Label for="image" sm={3}>
                    Profile Image
                  </Label>
                  <Col sm={9}>
                    <div
                      {...getRootProps({ className: "dropzone" })}
                      style={{
                        border: "2px dashed #ccc",
                        padding: "10px",
                        textAlign: "center",
                        width: "100px",
                        aspectRatio: "1/1",
                        objectFit: "cover",
                      }}
                    >
                      <input {...getInputProps()} />
                      {form.imagePreview ? (
                        <img
                          src={form.imagePreview}
                          alt="Preview"
                          style={{ width: "100%", height: "auto" }}
                        />
                      ) : (
                        <p>Profile</p>
                      )}
                    </div>
                  </Col>
                </FormGroup>
                <Label for="memberName">Name</Label>
                <Input
                  type="text"
                  name="memberName"
                  id="memberName"
                  value={form.memberName}
                  onChange={inputHandler}
                  placeholder="Enter Member Name"
                />
              </FormGroup>
              {/* <FormGroup>
                <Label for="memberPhonNumber">Phone</Label>
                <Input
                  type="text"
                  name="memberPhoneNumber"
                  id="memberPhoneNumber"
                  value={form.memberPhoneNumber}
                  onChange={inputHandler}
                  placeholder="Enter Phone"
                />
              </FormGroup> */}
              <FormGroup>
              <Label for="memberPhoneNumber">Phone</Label>
              <InputMask
                mask="999-9999-9999"
                value={form.memberPhoneNumber}
                onChange={handlePhoneNumberChange}
                maskChar=""
              >
                {(inputProps) => (
                  <Input
                    {...inputProps}
                    type="text"
                    name="memberPhoneNumber"
                    id="memberPhoneNumber"
                    placeholder="###-####-####"
                  />
                )}
              </InputMask>
            </FormGroup>
              {/* <FormGroup>
                <Label for="memberEmail">Email</Label>
                <Input
                  type="email"
                  name="memberEmail"
                  id="memberEmail"
                  value={form.memberEmail}
                  onChange={inputHandler}
                  placeholder="Enter Email"
                />
              </FormGroup> */}
              <FormGroup>
              <Label for="memberEmail">Email</Label>
              <Input
                type="email"
                name="memberEmail"
                id="memberEmail"
                value={form.memberEmail}
                onChange={inputHandler}
                placeholder="Enter Email"
                invalid={!emailValid && form.memberEmail.length > 0}
              />
              {!emailValid && form.memberEmail.length > 0 && (
                <p className="text-danger">Please enter a valid email address.</p>
              )}
            </FormGroup>

              <FormGroup>
                <Label for="memberGender">Gender</Label>
                <ButtonGroup
                  className="my-2"
                  size="m"
                  style={{ width: "100%" }}
                  onClick={inputHandler}
                >
                  <Button
                    outline
                    value="M"
                    name="memberGender"
                    active={rSelected === "M"}
                  >
                    남자
                  </Button>
                  <Button
                    outline
                    value="F"
                    name="memberGender"
                    active={rSelected === "F"}
                  >
                    여자
                  </Button>
                </ButtonGroup>
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label for="memberBrithDate">Birthday</Label>
                <Input
                  type="date"
                  name="memberBirthDate"
                  id="memberBrithDate"
                  value={form.memberBirthDate}
                  onChange={inputHandler}
                  placeholder="Enter birthdate"
                />
              </FormGroup>
              <FormGroup>
                <Label for="memberHireDate">Hire Date</Label>
                <Input
                  type="date"
                  name="memberHireDate"
                  id="memberHireDate"
                  value={form.memberHireDate}
                  onChange={inputHandler}
                />
              </FormGroup>
              <FormGroup>
                <Label for="address" sm={3}>
                  Address
                </Label>

                <Input
                  type="text"
                  name="memberAddress"
                  id="memberAddress"
                  value={form.memberAddress}
                  onChange={inputHandler}
                  onClick={handleAddressClick}
                  placeholder="Enter address"
                  readOnly
                />
              </FormGroup>
              {postcodeVisible && (
                <Card>
                  <CardBody>
                    <DaumPostcodeEmbed
                      onComplete={handleAddressSelect}
                      style={{ height: "400px" }}
                    />
                  </CardBody>
                </Card>
              )}
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleSecondModal}>
            Next
          </Button>
        </ModalFooter>
      </Modal>

      <Modal
        isOpen={secondModal}
        toggle={toggleSecondModal}
        centered
        className="animate__animated animate__fadeInLeftBig custom-modal"
      >
        <ModalHeader toggle={toggleSecondModal}>
          Driver Registration
        </ModalHeader>
        <ModalBody>
        <FormGroup>
              <Label for="driverLicenseNumber">Driver License</Label>
              <InputMask
                mask="99-99-999999-99"
                value={form.driverLicenseNumber}
                onChange={inputHandler}
                maskChar={null}
              >
                {(inputProps) => (
                  <Input
                    {...inputProps}
                    type="text"
                    name="driverLicenseNumber"
                    id="driverLicenseNumber"
                    placeholder="##-##-######-##"
                  />
                )}
              </InputMask>
            </FormGroup>
          <FormGroup>
              <Label for="branchCode">지역 선택</Label>
              <Input
              type="select"
              name="driverRegion"
              id="driverRegion"
              onChange={inputHandler}
            >
              <option value="">Select Region</option>
              {regionCount?.map(
                region => <option value={region.driverRegion}>
                  {`${region.driverRegion} \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 차량기사 : ${region.regionCount} 명`}
                </option>
              )}
            </Input>
            </FormGroup>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={submitHandler}>
            Submit
          </Button>
          <Button color="secondary" onClick={toggleSecondModal}>
            Back
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
