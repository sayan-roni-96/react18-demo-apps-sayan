import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import React, { useEffect, useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ToastMessage from '../components/ToastMessage';

const StudentEdit = () => {
  const [errorMsg, setErrorMsg] = useState('');
  const { stuid } = useParams();
  //console.log('stuid=>',stuid);
  const { state } = useLocation();
  console.log('state=>', state);
  const [studentEditField, setstudentEditField] = useState({
    studentEName: state.stuData.studentname || '',
    studentEAge: state.stuData.age || '',
    stuESubject: state.stuData.favsubject || '',
    stuEGender: state.stuData.gender || '',
    stuEDetails: state.stuData.details || '',
    studentPerformance: state.stuData.performance || '',
  });
  const navigate = useNavigate();
  const genderStuData = [
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
      name: 'Trnas',
      value: 'Others',
    },
  ];

  const studenteditSubmit = (e) => {
    e.preventDefault();
    // Validation for name (only text)
    const nameEditRegex = /^[A-Za-z\s]+$/;
    if (!nameEditRegex.test(studentEditField.studentEName)) {
      toast.error('Name must contain only letters and spaces', {
        position: toast.POSITION.TOP_RIGHT,
      });
      //setErrorMsg('Name must contain only letters and spaces');
      setTimeout(() => {
        setErrorMsg('');
      }, 2000);
      return;
    }

    // Validation for age (only numbers)
    const ageEditRegex = /^[0-9]+$/;
    if (!ageEditRegex.test(studentEditField.studentEAge)) {
      toast.error('Age must contain only numbers', {
        position: toast.POSITION.TOP_RIGHT,
      });
      //setErrorMsg('Age must contain only numbers');
      setTimeout(() => {
        setErrorMsg('');
      }, 2000);
      return;
    }

    // Validation for text area length
    if (
      studentEditField.stuEDetails.split(/\s+/).length < 20 ||
      studentEditField.stuEDetails.split(/\s+/).length > 200
    ) {
      toast.error('Student Details should be between 20 and 200 words.', {
        position: toast.POSITION.TOP_RIGHT,
      });
      //setErrorMsg('Student Details should not exceed 200 characters');
      setTimeout(() => {
        setErrorMsg('');
      }, 2000);
      return;
    }

    if (
      !studentEditField.studentEName ||
      !studentEditField.studentEAge ||
      !studentEditField.stuESubject ||
      !studentEditField.stuEGender ||
      !studentEditField.stuEDetails ||
      !studentEditField.studentPerformance
    ) {
      //setErrorMsg('Please fill all fields');

      setTimeout(() => {
        toast.error('Please fill all fields!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }, 2000);
    } else {
      const newStuEditedData = {
        id: uuidv4(),
        studentname: studentEditField.studentEName,
        age: studentEditField.studentEAge,
        favsubject: studentEditField.stuESubject,
        gender: studentEditField.stuEGender,
        details: studentEditField.stuEDetails,
        performance: studentEditField.studentPerformance,
      };

      axios
        .put(
          `${process.env.REACT_APP_NEW_JSON_URL}/student/${stuid}`,
          newStuEditedData
        )
        .then((sdResp) => {
          console.log('sdResp=>', sdResp);
          if (sdResp.status == 200) {
            toast.success('Edit Student Data', {
              position: toast.POSITION.TOP_RIGHT,
            });
            setTimeout(() => {
              navigate('/studentlist');
            }, 2000);
          }
        })
        .catch((err) => {
          console.log('edit_error=>', err);
        });
    }
  };
  return (
    <div className="container mt-4">
      <ToastMessage />
      <Form onSubmit={studenteditSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col} md="4" controlId="validationCustom01">
            <Form.Label>Student name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Student name"
              value={studentEditField.studentEName}
              onChange={(e) => {
                setstudentEditField({
                  ...studentEditField,
                  studentEName: e.target.value,
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
              value={studentEditField.studentEAge}
              onChange={(e) => {
                setstudentEditField({
                  ...studentEditField,
                  studentEAge: e.target.value,
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
                value={studentEditField.stuESubject}
                onChange={(e) => {
                  setstudentEditField({
                    ...studentEditField,
                    stuESubject: e.target.value,
                  });
                }}
              />
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              value={studentEditField.stuEGender}
              onChange={(e) => {
                setstudentEditField({
                  ...studentEditField,
                  stuEGender: e.target.value,
                });
              }}
            >
              <option value="">--Select One--</option>
              {genderStuData.map((gsData, i) => {
                return (
                  <option key={gsData.id} value={gsData.value}>
                    {gsData.name}
                  </option>
                );
              })}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>Student Performance:</Form.Label>
            <Form.Group>
              <label className="form-check-label">Outstanding</label>{' '}
              <input
                className="form-check-input"
                type="radio"
                value="Outstanding"
                checked={studentEditField.studentPerformance === 'Outstanding'}
                onChange={(e) => {
                  setstudentEditField({
                    ...studentEditField,
                    studentPerformance: e.target.value,
                  });
                }}
              />{' '}
              <label className="form-check-label">Excellent</label>{' '}
              <input
                className="form-check-input"
                type="radio"
                value="Excellent"
                checked={studentEditField.studentPerformance === 'Excellent'}
                onChange={(e) => {
                  setstudentEditField({
                    ...studentEditField,
                    studentPerformance: e.target.value,
                  });
                }}
              />{' '}
              <label className="form-check-label">Best</label>{' '}
              <input
                className="form-check-input"
                type="radio"
                value="Best"
                checked={studentEditField.studentPerformance === 'Best'}
                onChange={(e) => {
                  setstudentEditField({
                    ...studentEditField,
                    studentPerformance: e.target.value,
                  });
                }}
              />{' '}
              <label className="form-check-label">Poor</label>{' '}
              <input
                className="form-check-input"
                type="radio"
                value="Poor"
                checked={studentEditField.studentPerformance === 'Poor'}
                onChange={(e) => {
                  setstudentEditField({
                    ...studentEditField,
                    studentPerformance: e.target.value,
                  });
                }}
              />{' '}
            </Form.Group>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom04">
            <Form.Label>Students Details</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Type here..."
              style={{ height: '100px' }}
              value={studentEditField.stuEDetails}
              onChange={(e) => {
                setstudentEditField({
                  ...studentEditField,
                  stuEDetails: e.target.value,
                });
              }}
            />
          </Form.Group>
        </Row>
        <Button type="submit">Save form</Button>{' '}
        <Link className="btn btn-secondary" to={'/studentlist'}>
          Go Back
        </Link>{' '}
        <h4 style={{ color: 'red' }}>{errorMsg}</h4>
      </Form>
    </div>
  );
};

export default StudentEdit;
