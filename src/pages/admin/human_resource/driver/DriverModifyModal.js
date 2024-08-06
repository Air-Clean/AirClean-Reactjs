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
import { useDispatch, useSelector } from "react-redux";
import { modifyDriver , callBranchCount} from "../../../../apis/HRAPICalls";
import jwtDecode from "jwt-decode";

export default function DriverModifyModal({ modal, toggle, driver ,form, setForm,regionCount}) {
  const dispatch = useDispatch();

  const members = jwtDecode(window.localStorage.getItem('accessToken'))

  console.log("regionCount",regionCount)
  console.log("form.driverRegion",form.driverRegion)

  console.log('member token 확인',members)

  console.log('동일값 확인',regionCount.filter(region=>region.driverRegion === form.driverRegion))

  const [postcodeVisible, setPostcodeVisible] = useState(false);

  useEffect(() => {
    if (modal) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [modal]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    const changeForm = { ...form, [name]: value };

    setForm(changeForm);
  };

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
      address: fullAddress,
      fullAddress,
    });
    setPostcodeVisible(false); // Close accordion after selection
  };

  const handleAddressClick = () => {
    setPostcodeVisible(!postcodeVisible); // Show the postcode component when address input is clicked
  };

  const submitHandler = () => {
    const formData = new FormData();

    formData.append("memberId", form.memberId);
    formData.append("memberName", form.memberName);
    formData.append("driverRegion",form.driverRegion)
    formData.append("phone", form.phone);
    formData.append("email", form.email);
    formData.append("address", form.address);
    formData.append("image", form.image);

    dispatch(
      modifyDriver({ formData: formData, employeeCode: form.memberId })
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
          <Label for="phone" sm={3}>
            Phone
          </Label>
          <Col sm={9}>
            <Input
              type="text"
              name="phone"
              id="phone"
              value={form.phone}
              onChange={inputHandler}
              placeholder="Enter your phone number"
            />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="driverRegion" sm={3}>
            운송 지역
          </Label>
          <Col sm={9}>
            <Input
              type="select"
              name="driverRegion"
              id="driverRegion"
              value={form.driverRegion}
              onChange={inputHandler}
            >
              <option value="">Select Position</option>
              {regionCount?.map(
                region => <option value={region.driverRegion}>
                   {`${region.driverRegion} \u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0\u00A0 차량기사 : ${region.regionCount} 명`}
                </option>
              )}
            </Input>
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
            />
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
