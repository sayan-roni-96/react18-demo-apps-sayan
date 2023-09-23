import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import React, { useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import ToastMessage from '../components/ToastMessage';

const EmployeeAdd = () => {
  const navigate = useNavigate();
  const [employeeAddField, setEmployeeAddField] = useState({
    empName: '',
    empEmail: '',
    empPhone: '',
    empGender: '',
    empDetails: '',
    empPerformance: 'Good',
  });

  const [errorMsg, setErrorMsg] = useState('');

  const employeeSubmit = (e) => {
    e.preventDefault();
    if (
      !employeeAddField.empName ||
      !employeeAddField.empEmail ||
      !employeeAddField.empPhone ||
      !employeeAddField.empGender ||
      !employeeAddField.empDetails
    ) {
      // setErrorMsg('Please fill all fields');
      toast.error('Please fill all fields!', {
        position: toast.POSITION.TOP_RIGHT,
      });
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
        details: employeeAddField.empDetails,
        details: employeeAddField.empDetails,
        performance: employeeAddField.empPerformance,
      };
      axios
        .post(`${process.env.REACT_APP_JSON_URL}/employee`, newData)
        .then((resp) => {
          console.log('resp=>', resp);
          if (resp.status == 201) {
            toast.success('New employee created!', {
              position: toast.POSITION.TOP_RIGHT,
            });
            setTimeout(() => {
              setEmployeeAddField({
                empName: '',
                empEmail: '',
                empPhone: '',
              });
              navigate('/employeelist');
            }, 1000);
          }
        })
        .catch((err) => {
          console.log('save_error=>', err);
        });
    }
  };

  console.log('empPerformance=>', employeeAddField.empPerformance);

  return (
    <div className="container mt-4">
      <ToastMessage />
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
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>Employee Performence</Form.Label>
            <Form.Group>
              <label className="form-check-label">Good</label>{' '}
              <input
                className="form-check-input"
                type="radio"
                value="Good"
                checked={
                  employeeAddField.empPerformance === 'Good' ? true : false
                }
                onChange={(e) => {
                  setEmployeeAddField({
                    ...employeeAddField,
                    empPerformance: e.target.value,
                  });
                }}
              />{' '}
              <label className="form-check-label">Better</label>{' '}
              <input
                className="form-check-input"
                type="radio"
                value="Better"
                checked={
                  employeeAddField.empPerformance === 'Better' ? true : false
                }
                onChange={(e) => {
                  setEmployeeAddField({
                    ...employeeAddField,
                    empPerformance: e.target.value,
                  });
                }}
              />{' '}
              <label className="form-check-label">Best</label>{' '}
              <input
                className="form-check-input"
                type="radio"
                value="Best"
                checked={
                  employeeAddField.empPerformance === 'Best' ? true : false
                }
                onChange={(e) => {
                  setEmployeeAddField({
                    ...employeeAddField,
                    empPerformance: e.target.value,
                  });
                }}
              />{' '}
              <label className="form-check-label">Worst</label>{' '}
              <input
                className="form-check-input"
                type="radio"
                value="Worst"
                checked={
                  employeeAddField.empPerformance === 'Worst' ? true : false
                }
                onChange={(e) => {
                  setEmployeeAddField({
                    ...employeeAddField,
                    empPerformance: e.target.value,
                  });
                }}
              />{' '}
            </Form.Group>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom04">
            <Form.Label>Employee Details</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Type here..."
              style={{ height: '100px' }}
              value={employeeAddField.empDetails}
              onChange={(e) => {
                setEmployeeAddField({
                  ...employeeAddField,
                  empDetails: e.target.value,
                });
              }}
            />
          </Form.Group>
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
