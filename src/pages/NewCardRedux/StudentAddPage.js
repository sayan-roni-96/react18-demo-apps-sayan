import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { postNewStudent } from "../../store/actions/studentMainAction";
import { Link, Navigate } from "react-router-dom";

const StudentAddPage = () => {
  const dispatch = useDispatch();
  const [stuAddState, setStuAddState] = useState({
    stuName: "",
    stuAge: "",
    stuSubject: "",
    stuGender: "",
    stuPerformance: "",
  });

  const onFieldChange = (evt) => {
    setStuAddState({
      ...stuAddState,
      [evt.target.name]: evt.target.value,
    });
  };

  const addSubmit = (evt) => {
    evt.preventDefault();
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
      };

      dispatch(postNewStudent(newData))
        .then((resp) => {
          console.log("resp=>", resp);
          setStuAddState({
            stuName: "",
            stuAge: "",
            stuSubject: "",
            stuGender: "",
            stuPerformance: ""
          });
        })
        .catch((err) => {
          console.log("err=>", err);
        });
    }
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
                placeholder="Enter Subject"
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
