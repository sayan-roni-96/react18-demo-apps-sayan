import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const EmployeeAdd = () => {
  const navigate = useNavigate();
  const [employeeAddField, setEmployeeAddField] = useState({
    empName: '',
    empEmail: '',
    empPhone: '',
    empGender: '',
  });

  const [errorMsg, setErrorMsg] = useState('');

  const employeeSubmit = (e) => {
    e.preventDefault();
    if (
      !employeeAddField.empName ||
      !employeeAddField.empEmail ||
      !employeeAddField.empPhone ||
      !employeeAddField.empGender
    ) {
      setErrorMsg('Please fill all fields');
      setTimeout(() => {
        setErrorMsg('');
      }, 2000);
    } else {
      const newData = {
        id: uuidv4(),
        employeename: employeeAddField.empName,
        email: employeeAddField.empEmail,
        phone: employeeAddField.empPhone,
        gender: employeeAddField.empGender,
      };
      axios
        .post(`${process.env.REACT_APP_JSON_URL}/employee`, newData)
        .then((resp) => {
          console.log('resp=>', resp);
          if (resp.status == 201) {
            setEmployeeAddField({
              empName: '',
              empEmail: '',
              empPhone: '',
            });
            navigate('/employeelist');
          }
        })
        .catch((err) => {
          console.log('save_error=>', err);
        });
    }
  };

  console.log('empGender=>', employeeAddField.empGender);

  return (
    <div className="container mt-4">
      <Form onSubmit={employeeSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Employee name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Employee name"
              value={employeeAddField.empName}
              onChange={(e) => {
                setEmployeeAddField({
                  ...employeeAddField,
                  empName: e.target.value,
                });
              }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom02">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Email"
              value={employeeAddField.empEmail}
              onChange={(e) => {
                setEmployeeAddField({
                  ...employeeAddField,
                  empEmail: e.target.value,
                });
              }}
            />
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustomUsername">
            <Form.Label>Phone</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type="text"
                placeholder="Phone"
                value={employeeAddField.empPhone}
                onChange={(e) => {
                  setEmployeeAddField({
                    ...employeeAddField,
                    empPhone: e.target.value,
                  });
                }}
              />
            </InputGroup>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="3" controlId="validationCustom03">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              aria-label="Default select example"
              value={employeeAddField.empGender}
              onChange={(e) => {
                setEmployeeAddField({
                  ...employeeAddField,
                  empGender: e.target.value,
                });
              }}
            >
              <option value="">--Select One--</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </Form.Select>
            {/* <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback> */}
          </Form.Group>
          {/* <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="State" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Zip</Form.Label>
            <Form.Control type="text" placeholder="Zip" />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group> */}
        </Row>
        <Button type="submit">Submit form</Button>{' '}
        <Link className="btn btn-secondary" to={'/employeelist'}>
          Go Back
        </Link>{' '}
        <h4 style={{ color: 'red' }}>{errorMsg}</h4>
      </Form>
    </div>
  );
};

export default EmployeeAdd;
