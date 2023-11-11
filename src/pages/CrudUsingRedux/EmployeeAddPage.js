import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const EmployeeAddPage = () => {
  const [empAddState, setEmpAddState] = useState({
    empName: "",
    empEmail: "",
    empPhone: "",
    empGender: "",
  });

  const onFieldChange = (evt) => {
    setEmpAddState({
      ...empAddState,
      [evt.target.name]: evt.target.value,
    });
  };

  const addSubmit = (evt) => {
    evt.preventDefault();
    if (
      !empAddState.empName ||
      !empAddState.empEmail ||
      !empAddState.empPhone ||
      !empAddState.empGender
    ) {
      toast.error("Please fill all the fields!", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  return (
    <div className="container">
      <Form className="m-4" onSubmit={(evt) => addSubmit(evt)}>
        <div className="row">
          <div className="col-md-3">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="empName"
                value={empAddState.empName}
                onChange={(e) => onFieldChange(e)}
              />
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Employee Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter email"
                name="empEmail"
                value={empAddState.empEmail}
                onChange={(e) => onFieldChange(e)}
              />
            </Form.Group>
          </div>

          <div className="col-md-3">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Employee Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter phone"
                name="empPhone"
                value={empAddState.empPhone}
                onChange={(e) => onFieldChange(e)}
              />
            </Form.Group>
          </div>

          <div className="col-md-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              aria-label="Default select example"
              name="empGender"
              value={empAddState.empGender}
              onChange={(e) => onFieldChange(e)}
            >
              <option value="">--Select One--</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </Form.Select>
          </div>
        </div>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default EmployeeAddPage;
