import React, { useState } from "react";
import { Button, Col, Form, FormSelect, InputGroup, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { postNewStudent } from "../../store/actions/studentMainAction";
import { Link, Navigate, useNavigate } from "react-router-dom";
import makeAnimated from "react-select/animated";
import ReactSelect from "react-select";
import ReactQuill from "react-quill";

const StudentAddPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [studentAddField, setstudentAddField] = useState({
    studentStatus: false, // Initial status is set to false (inactive)
    // other fields...
  });
  const handleStatusChange = (e) => {
    setstudentAddField({
      ...studentAddField,
      studentStatus: e.target.checked,
    });
  };
  const [stuAddState, setStuAddState] = useState({
    stuName: "",
    stuAge: "",
    stuSubject: "",
    stuGender: "",
    stuPerformance: "",
    interest: [],
    stuAdvice:"",
    stuBehave:"Good"
  });

  const onFieldChange = (evt) => {
    setStuAddState({
      ...stuAddState,
      [evt.target.name]: evt.target.value,
    });
  };
   

  const addSubmit = (evt) => {
    evt.preventDefault();
    // Validation for name (only text)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(stuAddState.stuName)) {
      toast.error("Name must contain only letters and spaces", {
        position: toast.POSITION.TOP_RIGHT,
      });
      //setErrorMsg('Name must contain only letters and spaces');
      return;
    }

    // Validation for age (only numbers)
    const ageRegex = /^[0-9]+$/;
    if (!ageRegex.test(stuAddState.stuAge)) {
      toast.error("Age must contain only numbers", {
        position: toast.POSITION.TOP_RIGHT,
      });
      //setErrorMsg('Age must contain only numbers');
      return;
    }

   

    // interest field vallidation
    if (!stuAddState.interest || stuAddState.interest.length === 0) {
      toast.error("Please select at least one interest", {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (
      !stuAddState.stuName ||
      !stuAddState.stuAge ||
      !stuAddState.stuSubject ||
      !stuAddState.stuPerformance||
      !stuAddState.stuGender ||
      !stuAddState.stuAdvice ||
      !studentAddField.studentStatus ||
      !stuAddState.stuBehave
    ) {
      toast.error("Please fill all the fields!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    } else {
      const newData = {
        studentname: stuAddState.stuName,
        age: stuAddState.stuAge,
        favsubject: stuAddState.stuSubject,
        gender: stuAddState.stuGender,
        performance: stuAddState.stuPerformance,
        interest: stuAddState.interest,
        advicestudent:stuAddState.stuAdvice,
        status:studentAddField.studentStatus,
        behave:stuAddState.stuBehave
      };

      dispatch(postNewStudent(newData))
        .then((resp) => {
          console.log("resp=>", resp);
          setStuAddState({
            stuName: "",
            stuAge: "",
            stuSubject: "",
            stuGender: "",
            stuPerformance: "",
            interest: [],
            stuAdvice: "",
            stuStatus: "false",
            stuBehave:""
          });
          navigate("/redux/studentlist");
        })
        .catch((err) => {
          console.log("err=>", err);
        });
    }
  };
  const animatedComponents = makeAnimated();

  const curricularOptions = [
    { value: 'drawing', label: 'Drawing' },
    { value: 'singing', label: 'Singing' },
    { value: 'swimming', label: 'Swimming' }, // Corrected typo here
  ];

  const onChangeSelect = (curriData) => {
    console.log('curriData =>', curriData);
    setStuAddState({
      ...stuAddState,
      interest: curriData,
    });
  };
  return (
<div className="container">
      <Form className="m-4" onSubmit={(evt) => addSubmit(evt)}>
        <Row className="mb-3">
          <Col md={3}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Student Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="stuName"
                value={stuAddState.stuName}
                onChange={(e) => onFieldChange(e)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3" controlId="formBasicAge">
              <Form.Label>Student Age</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Age"
                name="stuAge"
                value={stuAddState.stuAge}
                onChange={(e) => onFieldChange(e)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3" controlId="formBasicSubject">
              <Form.Label>Student Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Subject"
                name="stuSubject"
                value={stuAddState.stuSubject}
                onChange={(e) => onFieldChange(e)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3" controlId="formBasicGender">
              <Form.Label>Gender</Form.Label>
              <Form.Control
                as="select"
                name="stuGender"
                value={stuAddState.stuGender}
                onChange={(e) => onFieldChange(e)}
              >
                <option value="">--Select One--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Others">Others</option>
              </Form.Control>
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={3}>
            <Form.Group className="mb-3" controlId="formBasicPerformance">
              <Form.Label>Student Performance</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Performance"
                name="stuPerformance"
                value={stuAddState.stuPerformance}
                onChange={(e) => onFieldChange(e)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3" controlId="formBasicStatus">
              <Form.Label>Student Status</Form.Label>
              <InputGroup className="mb-3">
                <InputGroup.Checkbox
                  aria-label="Checkbox for following text input"
                  checked={studentAddField.studentStatus}
                  onChange={handleStatusChange}
                />
                &nbsp; &nbsp;
                <span>{studentAddField.studentStatus ? "Active" : "Inactive"} Student</span>
              </InputGroup>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3" controlId="validationCustom03">
              <Form.Label>Student Interest</Form.Label>
              <ReactSelect
                placeholder="Add Student's Interest"
                options={curricularOptions}
                isMulti
                value={stuAddState.interest}
                onChange={(option) => onChangeSelect(option)}
              />
            </Form.Group>
          </Col>
        </Row>
        <Col md={3}>
  <Form.Group className="mb-3" controlId="validationCustom03">
    <Form.Label>Student Behaviour</Form.Label>
    <div>
      <Form.Check
        inline
        label="Good"
        type="radio"
        value="Good"
        checked={stuAddState.stuBehave === "Good"}
        onChange={(e) => {
          setStuAddState({
            ...stuAddState,
            stuBehave: e.target.value,
          });
        }}
        name="stuBehave"
        id="goodRadio"
      />
      <Form.Check
        inline
        label="Bad"
        type="radio"
        value="Bad"
        checked={stuAddState.stuBehave === "Bad"}
        onChange={(e) => {
          setStuAddState({
            ...stuAddState,
            stuBehave: e.target.value,
          });
        }}
        name="stuBehave"
        id="badRadio"
      />
    </div>
  </Form.Group>
</Col>
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group controlId="validationCustom04">
              <Form.Label>Advice For Student</Form.Label>
              <ReactQuill
                theme="snow"
                name="stuAdvice"
                value={stuAddState.stuAdvice}
                onChange={(value) => setStuAddState({ ...stuAddState, stuAdvice: value })}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Button variant="primary" type="submit" style={{ marginRight: '10px' }}>
              Submit
            </Button>
            <Link variant="primary" to={'/redux/studentlist'}>
              Go Back
            </Link>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default StudentAddPage
