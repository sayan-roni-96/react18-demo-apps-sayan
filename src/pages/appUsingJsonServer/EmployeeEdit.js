import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

const EmployeeEdit = () => {
  const { empid } = useParams();

  console.log('empid=>', empid);

  const { state } = useLocation();
  console.log('state=>', state);

  const genderData = [
    {
      id: 1,
      name: 'Male',
      value: 'Male',
    },
    {
      id: 2,
      name: 'Female',
      value: 'Female',
    },
    {
      id: 3,
      name: 'Others',
      value: 'Others',
    },
  ];

  const navigate = useNavigate();

  const [employeeEditField, setEmployeeEditField] = useState({
    empName: state.singledata.employeename || '',
    empEmail: state.singledata.email || '',
    empPhone: state.singledata.phone || '',
    empGender: state.singledata.gender || '',
    technology: state.singledata.technology || [],
  });

  const [errorMsg, setErrorMsg] = useState('');

  const employeeSubmit = (e) => {
    e.preventDefault();
    if (
      !employeeEditField.empName ||
      !employeeEditField.empEmail ||
      !employeeEditField.empPhone ||
      !employeeEditField.empGender
    ) {
      setErrorMsg('Please fill all fields');
      setTimeout(() => {
        setErrorMsg('');
      }, 2000);
    } else {
      const newEditedData = {
        employeename: employeeEditField.empName,
        email: employeeEditField.empEmail,
        phone: employeeEditField.empPhone,
        gender: employeeEditField.empGender,
        technology: employeeEditField.technology,
      };

      axios
        .put(
          `${process.env.REACT_APP_JSON_URL}/employee/${empid}`,
          newEditedData
        )
        .then((edResp) => {
          console.log('edResp=>', edResp);
          if (edResp.status == 200) {
            navigate('/employeelist');
          }
        })
        .catch((err) => {
          console.log('edit_error=>', err);
        });
    }
  };

  console.log('employeeEditField.empGender=>', employeeEditField.empGender);

  // For React Select
  const animatedComponents = makeAnimated();

  const techOptions = [
    { value: 'angular', label: 'Angular' },
    { value: 'react', label: 'React' },
    { value: 'node', label: 'Node' },
  ];

  const onChangeSelect = (techData) => {
    console.log('techData=>', techData);
    setEmployeeEditField({
      ...employeeEditField,
      technology: [...techData],
    });
  };
  console.log('technology=>', employeeEditField.technology);

  return (
    <div className="container mt-4">
      <Form onSubmit={employeeSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Employee name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Employee name"
              value={employeeEditField.empName}
              onChange={(e) => {
                setEmployeeEditField({
                  ...employeeEditField,
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
              value={employeeEditField.empEmail}
              onChange={(e) => {
                setEmployeeEditField({
                  ...employeeEditField,
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
                value={employeeEditField.empPhone}
                onChange={(e) => {
                  setEmployeeEditField({
                    ...employeeEditField,
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
              value={employeeEditField.empGender}
              onChange={(e) => {
                setEmployeeEditField({
                  ...employeeEditField,
                  empGender: e.target.value,
                });
              }}
            >
              <option value="">--Select One--</option>
              {genderData.map((gData, i) => {
                return (
                  <option key={gData.id} value={gData.value}>
                    {gData.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom03">
            <Form.Label>Technology</Form.Label>
            <Select
              placeholder="Add your skills"
              options={techOptions}
              isMulti
              components={animatedComponents}
              value={employeeEditField.technology}
              onChange={(option) => onChangeSelect(option)}
            />
          </Form.Group>
        </Row>
        <Button type="submit">Save form</Button>{' '}
        <Link className="btn btn-secondary" to={'/employeelist'}>
          Go Back
        </Link>{' '}
        <h4 style={{ color: 'red' }}>{errorMsg}</h4>
      </Form>
    </div>
  );
};

export default EmployeeEdit;
