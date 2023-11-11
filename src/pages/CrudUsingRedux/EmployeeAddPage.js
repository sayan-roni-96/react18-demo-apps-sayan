import React from "react";
import { Button, Form } from "react-bootstrap";

const EmployeeAddPage = () => {
  return (
    <div className="container">
      <Form className="m-4">
        <div className="row">
          <div className="col-md-3">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Employee Name</Form.Label>
              <Form.Control type="text" placeholder="Enter name" />
            </Form.Group>
          </div>
          <div className="col-md-3">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Employee Email</Form.Label>
              <Form.Control type="text" placeholder="Enter email" />
            </Form.Group>
          </div>

          <div className="col-md-3">
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Employee Phone</Form.Label>
              <Form.Control type="text" placeholder="Enter phone" />
            </Form.Group>
          </div>

          <div className="col-md-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
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
