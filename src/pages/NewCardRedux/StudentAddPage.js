import React, { useState } from "react";
import { Button, Col, Form, FormSelect } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { postNewStudent } from "../../store/actions/studentMainAction";
import { Link, Navigate } from "react-router-dom";
import makeAnimated from "react-select/animated";
import ReactSelect from "react-select";

const StudentAddPage = () => {
  const dispatch = useDispatch();
  const [stuAddState, setStuAddState] = useState({
    stuName: "",
    stuAge: "",
    stuSubject: "",
    stuGender: "",
    stuPerformance: "",
    interest: [],
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
      !stuAddState.stuGender
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
            interest: "",
          });
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
        <div className="row">
          <div className="col-md-3">
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
          </div>
          <div className="col-md-3">
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
          </div>

          <div className="col-md-3">
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
          </div>

          <div className="col-md-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="stuGender"
              value={stuAddState.stuGender}
              onChange={(e) => onFieldChange(e)}
            >
              <option value="">--Select One--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </Form.Select>
          </div>
        </div>
        <div className="col-md-3">
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
          </div>
          <div>
          <Form.Group as={Col} md="3" controlId="validationCustom03" style={{ marginBottom: '10px' }}>
        <Form.Label>Student Interest</Form.Label>
        <ReactSelect
          placeholder="Add Student's Interest"
          options={curricularOptions}
          isMulti
          components={animatedComponents}
          value={stuAddState.interest}
          onChange={(option) => onChangeSelect(option)}
        />
      </Form.Group>
          </div>
        <Button variant="primary" type="submit" style={{ marginRight: '10px' }}>
          Submit
        </Button>
        <Link variant="primary" to={'/redux/studentlist'}>
            Go Back
          </Link>
      </Form>
    </div>
  )
}

export default StudentAddPage
