import axios from 'axios';
import React, { useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';

const EmployeeEdit = () => {
  const { empid } = useParams();

  console.log('empid=>', empid);

  const { state } = useLocation();
  console.log('state=>', state);

  const navigate = useNavigate();

  const [employeeEditField, setEmployeeEditField] = useState({
    empName: state.singledata.employeename || '',
    empEmail: state.singledata.email || '',
    empPhone: state.singledata.phone || '',
  });

  const [errorMsg, setErrorMsg] = useState('');

  const employeeSubmit = (e) => {
    e.preventDefault();
    if (
      !employeeEditField.empName ||
      !employeeEditField.empEmail ||
      !employeeEditField.empPhone
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
        {/* <Row className="mb-3">
          <Form.Group as={Col} md="6" controlId="validationCustom03">
            <Form.Label>City</Form.Label>
            <Form.Control type="text" placeholder="City"  />
            <Form.Control.Feedback type="invalid">
              Please provide a valid city.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom04">
            <Form.Label>State</Form.Label>
            <Form.Control type="text" placeholder="State"  />
            <Form.Control.Feedback type="invalid">
              Please provide a valid state.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom05">
            <Form.Label>Zip</Form.Label>
            <Form.Control type="text" placeholder="Zip"  />
            <Form.Control.Feedback type="invalid">
              Please provide a valid zip.
            </Form.Control.Feedback>
          </Form.Group>
        </Row> */}
        {/* <Form.Group className="mb-3">
          <Form.Check
            
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group> */}
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
