import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const StudentAdd = () => {
    const navigate = useNavigate();
    const [studentAddField, setstudentAddField] = useState({
      stuName: '',
      stuAge: '',
      stuSubject: '',
    });
  
    const [errorMsg, setErrorMsg] = useState('');
  
    const studentSubmit = (e) => {
      e.preventDefault();
      if (
        !studentAddField.stuName ||
        !studentAddField.stuAge ||
        !studentAddField.stuSubject
      ) {
        setErrorMsg('Please fill all fields');
        setTimeout(() => {
          setErrorMsg('');
        }, 2000);
      } else {
        const newStudentData = {
          id: uuidv4(),
          studentname: studentAddField.stuName,
          age: studentAddField.stuAge,
          favsubject: studentAddField.stuSubject,
          
        };
        axios
          .post(`${process.env.REACT_APP_NEW_JSON_URL}/student`, newStudentData)
          .then((resp) => {
            console.log('resp=>', resp);
            if (resp.status == 201) {
                setstudentAddField({
                stuName: '',
                stuAge: '',
                stuSubject: '',
              });
              navigate('/studentlist');
            }
          })
          .catch((err) => {
            console.log('save_error=>', err);
          });
      }
    };
  
    return (
      <div className="container mt-4">
        <Form onSubmit={studentSubmit}>
          <Row className="mb-3">
            <Form.Group as={Col} md="4" controlId="validationCustom01">
              <Form.Label>Student name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Student name"
                value={studentAddField.stuName}
                onChange={(e) => {
                    setstudentAddField({
                    ...studentAddField,
                    stuName: e.target.value,
                  });
                }}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustom02">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="text"
                placeholder="Age"
                value={studentAddField.stuAge}
                onChange={(e) => {
                    setstudentAddField({
                    ...studentAddField,
                    stuAge: e.target.value,
                  });
                }}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="4" controlId="validationCustomUsername">
              <Form.Label>Favourite Subject</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="text"
                  placeholder="Favourite Subject"
                  value={studentAddField.stuSubject}
                  onChange={(e) => {
                    setstudentAddField({
                      ...studentAddField,
                      stuSubject: e.target.value,
                    });
                  }}
                />
              </InputGroup>
            </Form.Group>
          </Row>
          <Button type="submit">Submit form</Button>{' '}
          <Link className="btn btn-secondary" to={'/studentlist'}>
            Go Back
          </Link>{' '}
          <h4 style={{ color: 'red' }}>{errorMsg}</h4>
        </Form>
      </div>
    );
  };
  

export default StudentAdd