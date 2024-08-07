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
  Row
} from "reactstrap";
import { useState, useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDropzone } from "react-dropzone";
import { callCarMembersAPI, callNewVehicleRepairAPI } from "../../../../apis/ReportAPICalls";
import "animate.css";

function ReportsModal({ show, onClose }) {
  const dispatch = useDispatch();

  const [minDate, setMinDate] = useState('');
  const carMembers = useSelector(state => state.carMembersReducer);
  // const newVehicleRepairResult = useSelector(state => newVehicleRepairReducer);
  const [selectedCarNumber, setSelectedCarNumber] = useState('');
  const [selectedDriverName, setSelectedDriverName] = useState('');
  const [selectedDriverLicenseNumber, setSelectedDriverLicenseNumber] = useState(''); // 추가된 상태
  const [selectedType, setSelectedType] = useState('');

  const [form, setForm] = useState({
    vehicleReportStatus: 'N',
    vehicleRemark: '',
    vehicleFuelCost: '',
    vehicleRegularInspection: '',
    vehicleVehicleRepairCost: '',
    vehicleMiscellaneous: '',
    vehicleSubmissionDate: '',
    driverLicenseNumber: '',
    totalVehicleRepairCost: '',
    beforeVehiclePhoto: '',
    afterVehiclePhoto: '',
    vehicleType: ''
  });

  useEffect(() => {
    setForm({
      vehicleReportStatus: 'N',
      vehicleRemark: '',
      vehicleFuelCost: '',
      vehicleRegularInspection: '',
      vehicleVehicleRepairCost: '',
      vehicleMiscellaneous: '',
      vehicleSubmissionDate: '',
      driverLicenseNumber: '',
      totalVehicleRepairCost: '',
      beforeVehiclePhoto: '',
      afterVehiclePhoto: '',
      vehicleType: ''
    });
    setSelectedDriverName('');
    setSelectedDriverLicenseNumber(''); // 상태 초기화
  }, [show]);

  useEffect(() => {
    if (show) {
      dispatch(callCarMembersAPI());
    }
  }, [dispatch, show]);

  useEffect(() => {
    const selectedCar = carMembers.find(car => car.carNumber === selectedCarNumber);
    setSelectedDriverName(selectedCar ? selectedCar.memberName : '');
    setSelectedDriverLicenseNumber(selectedCar ? selectedCar.driverLicenseNumber : ''); // 상태 설정
  }, [selectedCarNumber, carMembers]);

  useEffect(() => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    setMinDate(formattedDate);
  }, []);

  const addComma = (price) => {
    let returnString = price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return returnString;
  }

  const removeComma = (price) => {
    return price?.toString().replace(/,/g, '');
  }

  const inputHandler = (e) => {
    const { name, value } = e.target;
    const formattedValue = name === 'vehicleSubmissionDate' ? value : addComma(value.replace(/,/g, ''));
    setForm({ ...form, [name]: formattedValue });

    // 종류에 따른 필드 값 설정
    if (name === 'totalVehicleRepairCost') {
      switch (selectedType) {
        case '주유비':
          setForm(prevForm => ({ ...prevForm, vehicleFuelCost: formattedValue }));
          break;
        case '수리비':
          setForm(prevForm => ({ ...prevForm, vehicleVehicleRepairCost: formattedValue }));
          break;
        case '정기점검':
          setForm(prevForm => ({ ...prevForm, vehicleRegularInspection: formattedValue }));
          break;
        case '기타':
          setForm(prevForm => ({ ...prevForm, vehicleMiscellaneous: formattedValue }));
          break;
        default:
          break;
      }
    }
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
    setForm({ ...form, vehicleType: e.target.value });
  };

  const onDropBeforeImage = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setForm(form => ({
        ...form,
        beforeVehiclePhoto: file,
        beforeImagePreview: URL.createObjectURL(file)
      }));
    },
    []
  );

  const onDropAfterImage = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setForm(form => ({
        ...form,
        afterVehiclePhoto: file,
        afterImagePreview: URL.createObjectURL(file)
      }));
    },
    []
  );

  const { getRootProps: getBeforeImageRootProps, getInputProps: getBeforeImageInputProps } = useDropzone({
    onDrop: onDropBeforeImage,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"]
    }
  });

  const { getRootProps: getAfterImageRootProps, getInputProps: getAfterImageInputProps } = useDropzone({
    onDrop: onDropAfterImage,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"]
    }
  });

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('vehicleReportStatus', form.vehicleReportStatus);
    formData.append('vehicleRemark', form.vehicleRemark);
    formData.append('vehicleFuelCost', Number(removeComma(form.vehicleFuelCost)));
    formData.append('vehicleRegularInspection', Number(removeComma(form.vehicleRegularInspection)));
    formData.append('vehicleVehicleRepairCost', Number(removeComma(form.vehicleVehicleRepairCost)));
    formData.append('vehicleMiscellaneous', Number(removeComma(form.vehicleMiscellaneous)));
    formData.append('vehicleSubmissionDate', form.vehicleSubmissionDate);
    formData.append('driverLicenseNumber', selectedDriverLicenseNumber); // 수정된 부분
    formData.append('totalVehicleRepairCost', Number(removeComma(form.totalVehicleRepairCost)));
    formData.append('memberName', selectedDriverName);
    formData.append('carNumber', selectedCarNumber);
    formData.append('vehicleType', form.vehicleType);
    formData.append('beforeImage', form.beforeVehiclePhoto);
    formData.append('afterImage', form.afterVehiclePhoto);

    const newVehicleRepairResult = await dispatch(callNewVehicleRepairAPI({ form: formData }));
    if (newVehicleRepairResult.ok) {
      alert('등록이 완료되었습니다!');
      onClose();
    } else {
      alert('등록에 실패하였습니다. 다시 시도해주세요.');
    }
  };

  if (!show) {
    return null;
  }

  return (
    <Modal
      isOpen={show}
      toggle={onClose}
      centered
      className="animate__animated animate__fadeInLeftBig custom-modal"
    >
      <ModalHeader toggle={onClose}>차량 수리비 보고서</ModalHeader>
      <ModalBody>
        <Row form>
          <Col md={6}>
            <FormGroup>
              <Label for="carNumber">차량번호</Label>
              <Input
                type="select"
                name="carNumber"
                id="carNumber"
                value={selectedCarNumber}
                onChange={e => setSelectedCarNumber(e.target.value)}
              >
                <option value="">차량번호를 선택해주세요</option>
                {carMembers.map(car => (
                  <option key={car.carNumber} value={car.carNumber}>
                    {car.carNumber}
                  </option>
                ))}
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="selectedDriverName">차량기사</Label>
              <Input
                type="text"
                name="selectedDriverName"
                id="selectedDriverName"
                value={selectedDriverName}
                readOnly
              />
            </FormGroup>
            <FormGroup>
              <Label for="vehicleReportStatus">종류</Label>
              <Input
                type="select"
                name="vehicleType"
                id="vehicleType"
                value={selectedType}
                onChange={handleTypeChange}
              >
                <option value="">종류 선택</option>
                <option value="주유비">주유비</option>
                <option value="수리비">수리비</option>
                <option value="정기점검">정기점검</option>
                <option value="기타">기타</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label for="totalVehicleRepairCost">총 금액</Label>
              <Input
                type="text"
                name="totalVehicleRepairCost"
                id="totalVehicleRepairCost"
                value={addComma(form.totalVehicleRepairCost)}
                onChange={inputHandler}
                placeholder="총 금액을 입력해주세요"
              />
            </FormGroup>
          </Col>
          <Col md={6}>
            <FormGroup>
              <Label for="vehicleSubmissionDate">제출일</Label>
              <Input
                type="date"
                name="vehicleSubmissionDate"
                id="vehicleSubmissionDate"
                min={minDate}
                value={form.vehicleSubmissionDate}
                onChange={inputHandler}
              />
            </FormGroup>
            <FormGroup>
              <Label for="beforeVehiclePhoto">수리 사진 전</Label>
              <div {...getBeforeImageRootProps()} className="dropzone">
                <input {...getBeforeImageInputProps()} />
                {form.beforeImagePreview ? (
                  <img src={form.beforeImagePreview} alt="Before Preview" style={{ width: '100%' }} />
                ) : (
                  <p>이미지를 드롭하거나 클릭하여 업로드</p>
                )}
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="afterVehiclePhoto">수리 사진 후</Label>
              <div {...getAfterImageRootProps()} className="dropzone">
                <input {...getAfterImageInputProps()} />
                {form.afterImagePreview ? (
                  <img src={form.afterImagePreview} alt="After Preview" style={{ width: '100%' }} />
                ) : (
                  <p>이미지를 드롭하거나 클릭하여 업로드</p>
                )}
              </div>
            </FormGroup>
            <FormGroup>
              <Label for="vehicleRemark">특이사항</Label>
              <Input
                type="textarea"
                name="vehicleRemark"
                id="vehicleRemark"
                value={form.vehicleRemark}
                onChange={inputHandler}
                placeholder="특이사항을 입력하세요"
              />
            </FormGroup>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSubmit}>
          등록
        </Button>
        <Button color="secondary" onClick={onClose}>
          닫기
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default ReportsModal;
