import React, { useEffect, useState, useCallback } from 'react';
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { callNewRepairAPI } from "../../../../apis/ReportAPICalls";
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
} from 'reactstrap';
import jwt_decode from 'jwt-decode';
import './Modal.css';

function RepairModal({ show, onClose }) {
    const dispatch = useDispatch();
    const [minDate, setMinDate] = useState('');
    const branch = JSON.parse(window.localStorage.getItem('branch'));
    const member = jwt_decode(window.localStorage.getItem('accessToken'));
    const [form, setForm] = useState({
        repairSubmissionDate: '',
        repairContent: '',
        facilityCount: '',
        facilityType: '',
        repairPhoto: '',
        repairReportStatus: 'N',
        branchName: branch.branchName,
        memberName: member.memberName,
        branchCode  : branch.branchCode
    });

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('repairSubmissionDate', minDate);
        formData.append('repairContent', form.repairContent);
        formData.append('facilityCount', form.facilityCount);
        formData.append('facilityType', form.facilityType);
        formData.append('repairImage', form.repairPhoto);
        formData.append('repairReportStatus', form.repairReportStatus);
        formData.append('branchName', form.branchName);
        formData.append('memberName', form.memberName);
        formData.append('branchCode', form.branchCode);
        const newRepirResult  = await dispatch(callNewRepairAPI({ form: formData }));
        if (newRepirResult.ok) {  // 불필요한 공백 제거
        alert('등록이 완료되었습니다!');
        onClose();
        } else {
        alert('등록에 실패하였습니다. 다시 시도해주세요.');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({
            ...form,
            [name]: value
        });
    };

    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setMinDate(formattedDate);
    }, []);

    useEffect(() => {
        setForm({
            repairReportStatus: 'N',
            repairSubmissionDate: '',
            repairContent: '',
            facilityCount: '',
            facilityType: '',
            repairPhoto: '',
            branchName: branch.branchName,
            memberName: member.memberName,
            branchCode  : branch.branchCode
        });
    }, [show, branch.branchName, member.memberName, branch.branchCode]);

    const onDropImage = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        setForm(form => ({
            ...form,
            repairPhoto: file,
            repairImagePreview: URL.createObjectURL(file)
        }));
    }, []); 

    const { getRootProps: getImageRootProps, getInputProps: getImageInputProps } = useDropzone({
        onDrop: onDropImage,
        accept: {
            "image/*": [".jpeg", ".jpg", ".png"]
        }

    });

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
            <ModalHeader toggle={onClose}>시설물수리 보고서</ModalHeader>
            <ModalBody>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="branchName">지점명</Label>
                            <Input
                                type='text'
                                id="branchName"
                                value={form.branchName}
                                readOnly
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="memberName">지점장명</Label>
                            <Input
                                type='text'
                                id="memberName"
                                value={form.memberName}
                                readOnly
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="repairSubmissionDate">제출일</Label>
                            <Input 
                                type="date" 
                                id="repairSubmissionDate"
                                name="repairSubmissionDate"
                                value={minDate}
                                readOnly                           
                                />
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="facilityType">종류 : </Label>
                            <Input
                                type='select'
                                id="facilityType"
                                name="facilityType"
                                value={form.facilityType}
                                onChange={handleChange}
                            >
                                <option value="">종류 선택</option>
                                <option value="세탁기">세탁기</option>
                                <option value="건조기">건조기</option>
                                <option value="드라이클리너">드라이클리너</option>
                            </Input>
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="facilityCount">수리 시설물 갯수 : </Label>
                            <Input
                                type='number'
                                id="facilityCount"
                                name="facilityCount"
                                value={form.facilityCount}
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row form>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="repairContent">내용 : </Label>
                            <Input
                                type='textarea'
                                id="repairContent"
                                name="repairContent"
                                placeholder='수리가 필요한 내용을 자세하게 입력해주세요.'
                                value={form.repairContent}
                                onChange={handleChange}
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup>
                            <Label for="repairPhoto">첨부 사진: </Label>
                            <div {...getImageRootProps()} className="dropzone">
                                <input {...getImageInputProps()} />
                                {form.repairImagePreview ? (
                                    <img src={form.repairImagePreview} alt="After Preview" style={{ width: '100%' }} />
                                ) : (
                                    <p>이미지를 드롭하거나 클릭하여 업로드</p>
                                )}
                            </div>
                        </FormGroup>
                    </Col>
                </Row>
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={handleSubmit}>등록</Button>
                <Button color="secondary" onClick={onClose}>닫기</Button>
            </ModalFooter>
        </Modal>
    );
}

export default RepairModal;