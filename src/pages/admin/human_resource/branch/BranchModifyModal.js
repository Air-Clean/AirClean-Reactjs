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
} from "reactstrap";
import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import DaumPostcodeEmbed from "react-daum-postcode";
import { useDispatch } from "react-redux";
import { modifyBranch } from "../../../../apis/HRAPICalls";
import jwtDecode from "jwt-decode";
import InputMask from "react-input-mask";


export default function BranchModifyModal({ modal, toggle, branch ,form, setForm}) {
  const dispatch = useDispatch();

  const members = jwtDecode(window.localStorage.getItem('accessToken'))

  console.log('member token 확인',members)
  console.log('branch 확인',branch)

  const [postcodeVisible, setPostcodeVisible] = useState(false);

  const [emailValid, setEmailValid] = useState(true);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmailValid(validateEmail(value));
    }
    setForm({ ...form, [name]: value });
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handlePhoneNumberChange = (e) => {
    const { value } = e.target;
    const rawValue = value.replace(/-/g, ''); // Remove dashes to store raw value
    setForm({ ...form, phone: rawValue });
  };

  useEffect(() => {
    if (modal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [modal]);

  // const inputHandler = (e) => {
  //   const { name, value } = e.target;
  //   const changeForm = { ...form, [name]: value };

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

  const changePass = () => {
    setForm({ ...form, isPass: !form.isPass });
  };
  const handleAddressSelect = (data) => {
    const fullAddress = data.address;
    setForm({
      ...form,
      address: fullAddress,
      fullAddress,
    });
    setPostcodeVisible(false); // Close accordion after selection
  };

  const handleAddressClick = () => {
    setPostcodeVisible(!postcodeVisible); // Show the postcode component when address input is clicked
  };

  const submitHandler = () => {
    if (!emailValid) {
      alert('Please enter a valid email address.');
      return;
    }
    const formData = new FormData();

    formData.append("memberId", form.memberId);
    formData.append("memberName", form.memberName);
    formData.append("isPass", form.isPass);
    formData.append("phone", form.phone);
    formData.append("email", form.email);
    formData.append("address", form.address);
    formData.append("image", form.image);

    dispatch(
      modifyBranch({ formData: formData, employeeCode: branch.memberDTO.memberId })
    );

    window.location.reload();
  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>User Information</ModalHeader>
      <ModalBody>
        <FormGroup row>
          <Label for="name" sm={3}>
            Name
          </Label>
          <Col sm={9}>
            <Input
              type="text"
              name="memberName"
              id="memberName"
              value={form.memberName}
              onChange={inputHandler}
              autoComplete="off"
              placeholder="Enter your name"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="password" sm={3}>
            Password
          </Label>
          <Col
            sm={9}
            className="d-flex align-items-center justify-content-between"
          >
            <span
              className={`status-text ${
                form.isPass ? "text-success" : "text-danger"
              }`}
            >
              {form.isPass ? "Changed" : "Unchanged"}
            </span>
            <Button
              color={form.isPass ? "secondary" : "primary"}
              onClick={changePass}
              className="ml-3" // 버튼과 텍스트 사이에 여백 추가
            >
              {form.isPass ? "Revert Changes" : "Change Password"}
            </Button>
          </Col>
        </FormGroup>
        <FormGroup row>
              <Label for="phone" sm={3}>Phone</Label>
              <Col sm={9}>
              <InputMask
                mask="999-9999-9999"
                value={form.phone}
                onChange={handlePhoneNumberChange}
                maskChar=""
              >
                {(inputProps) => (
                  <Input
                    {...inputProps}
                    type="text"
                    name="phone"
                    id="phone"
                    placeholder="###-####-####"
                  />
                )}
              </InputMask>
              </Col>
            </FormGroup>
            <FormGroup row>
          <Label for="email" sm={3}>
            Email
          </Label>
          <Col sm={9}>
            <Input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={inputHandler}
              placeholder="Enter your email"
              invalid={!emailValid && form.email.length > 0}
              />
              {!emailValid && form.email.length > 0 && (
                <p className="text-danger">Please enter a valid email address.</p>
              )}
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="address" sm={3}>
            Address
          </Label>
          <Col sm={9}>
            <Input
              type="text"
              name="address"
              id="address"
              value={form.address}
              onChange={inputHandler}
              onClick={handleAddressClick}
              placeholder="Enter address"
              readOnly
            />
          </Col>
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
        <FormGroup row>
          <Label for="image" sm={3}>
            Profile
          </Label>
          <Col sm={9}>
            <div
              {...getRootProps({ className: "dropzone" })}
              style={{
                border: "2px dashed #ccc",
                padding: "10px",
                textAlign: "center",
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
                <p>Drag & drop an image here, or click to select one</p>
              )}
            </div>
          </Col>
        </FormGroup>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={submitHandler}>
          Modify
        </Button>
      </ModalFooter>
    </Modal>

    
  );
}
