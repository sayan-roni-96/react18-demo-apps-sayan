import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import React, { useState } from 'react';
import { Button, Col, Form, InputGroup, Row } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ToastMessage from '../components/ToastMessage';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import ReactQuill from 'react-quill';

const StudentAdd = () => {
  const navigate = useNavigate();
  const [studentAddField, setstudentAddField] = useState({
    stuName: '',
    stuAge: '',
    stuSubject: '',
    stuGender: '',
    studentPerformance: '',
    stuDetails: '',
    interest: []
  });
  const [studentAdvice, setstudentAdvice] = useState();

  const [errorMsg, setErrorMsg] = useState('');

  const studentSubmit = (e) => {
    e.preventDefault();
    // Validation for name (only text)
    const nameRegex = /^[A-Za-z\s]+$/;
    if (!nameRegex.test(studentAddField.stuName)) {
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
    const ageRegex = /^[0-9]+$/;
    if (!ageRegex.test(studentAddField.stuAge)) {
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
      studentAddField.stuDetails.split(/\s+/).length < 20 ||
      studentAddField.stuDetails.split(/\s+/).length > 200
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
      studentAdvice.split(/\s+/).length < 20 ||
      studentAdvice.split(/\s+/).length > 200
    ) {
      toast.error('Student Advice should be between 20 and 200 words.', {
        position: toast.POSITION.TOP_RIGHT,
      });
      //setErrorMsg('Student Details should not exceed 200 characters');
      setTimeout(() => {
        setErrorMsg('');
      }, 2000);
      return;
    }
   
  // interest field vallidation
    if (!studentAddField.interest || studentAddField.interest.length === 0) {
      toast.error('Please select at least one interest', {
        position: toast.POSITION.TOP_RIGHT,
      });
      return;
    }
    if (
      !studentAddField.stuName ||
      !studentAddField.stuAge ||
      !studentAddField.stuSubject ||
      !studentAddField.stuGender ||
      !studentAddField.studentPerformance ||
      !studentAddField.stuDetails ||
      !studentAdvice 
    ) {
      //setErrorMsg('Please fill all fields');
      setTimeout(() => {
        toast.error('Please fill all fields!', {
          position: toast.POSITION.TOP_RIGHT,
        });
      }, 2000);
    } else {
      const newStudentData = {
        id: uuidv4(),
        studentname: studentAddField.stuName,
        age: studentAddField.stuAge,
        favsubject: studentAddField.stuSubject,
        gender: studentAddField.stuGender,
        performance: studentAddField.studentPerformance,
        details: studentAddField.stuDetails,
        status: studentAddField.studentStatus,
        advicestudent : studentAdvice,
        interest : studentAddField.interest
      };
      axios
        .post(`${process.env.REACT_APP_NEW_JSON_URL}/student`, newStudentData)
        .then((resp) => {
          console.log('resp=>', resp);
          if (resp.status == 201) {
            toast.success('New Student created!', {
              position: toast.POSITION.TOP_RIGHT,
            });
            setTimeout(() => {
              setstudentAddField({
                stuName: '',
                stuAge: '',
                stuSubject: '',
                stuGender: '',
                studentPerformance: '',
                stuDetails: '',
                studentStatus: 'false',
                studentAdvice: '',
                interest:[]
              });
              setstudentAdvice('');
              navigate('/studentlist');
            }, 2000);
          }
        })
        .catch((err) => {
          console.log('save_error=>', err);
        });
    }
  };
   // For React Select
   const animatedComponents = makeAnimated();

   const curricularOptions = [
     { value: 'drawing', label: 'Drawing' },
     { value: 'singing', label: 'Singing' },
     { value: 'swiwming', label: 'Swiming' },
   ];
   const onChangeSelect = (curriData) => {
    console.log('curriData=>', curriData);
    setstudentAddField({
      ...studentAddField,
      interest: [...curriData],
    });
  };

  return (
    <div className="container mt-4">
      <ToastMessage />
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
          <Form.Group as={Col} md="4" controlId="validationCustom03">
            <Form.Label>Gender</Form.Label>
            <Form.Select
              value={studentAddField.stuGender}
              onChange={(e) => {
                setstudentAddField({
                  ...studentAddField,
                  stuGender: e.target.value,
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
            <Form.Label>Student Performence : </Form.Label>
            <Form.Group>
              <label className="form-check-label">Outstanding</label>{' '}
              <input
                className="form-check-input"
                type="radio"
                value="Outstanding"
                checked={
                  studentAddField.studentPerformance === 'Outstanding'
                    ? true
                    : false
                }
                onChange={(e) => {
                  setstudentAddField({
                    ...studentAddField,
                    studentPerformance: e.target.value,
                  });
                }}
              />{' '}
              <label className="form-check-label">Excellent</label>{' '}
              <input
                className="form-check-input"
                type="radio"
                value="Excellent"
                checked={
                  studentAddField.studentPerformance === 'Excellent'
                    ? true
                    : false
                }
                onChange={(e) => {
                  setstudentAddField({
                    ...studentAddField,
                    studentPerformance: e.target.value,
                  });
                }}
              />{' '}
              <label className="form-check-label">Best</label>{' '}
              <input
                className="form-check-input"
                type="radio"
                value="Best"
                checked={
                  studentAddField.studentPerformance === 'Best' ? true : false
                }
                onChange={(e) => {
                  setstudentAddField({
                    ...studentAddField,
                    studentPerformance: e.target.value,
                  });
                }}
              />{' '}
              <label className="form-check-label">Poor</label>{' '}
              <input
                className="form-check-input"
                type="radio"
                value="Poor"
                checked={
                  studentAddField.studentPerformance === 'Poor' ? true : false
                }
                onChange={(e) => {
                  setstudentAddField({
                    ...studentAddField,
                    studentPerformance: e.target.value,
                  });
                }}
              />{' '}
            </Form.Group>
          </Form.Group>
          <Form.Group as={Col} md="3" controlId="validationCustom03">
            <Form.Label>Student Interest</Form.Label>
            <Select
              placeholder="Add Students Interest"
              options={curricularOptions}
              isMulti
              components={animatedComponents}
              value={studentAddField.interest}
              onChange={(option) => onChangeSelect(option)}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
        <Form.Group as={Col} md="3" controlId="validationCustom03">
            <Form.Label>Student Status</Form.Label>
            <InputGroup className="mb-3">
              <InputGroup.Checkbox
                aria-label="Checkbox for following text input"
                checked={studentAddField.studentStatus}
                onChange={(e) =>
                  setstudentAddField({
                    ...studentAddField,
                    studentStatus: e.target.checked,
                  })
                }
              />{' '}
              &nbsp; &nbsp;
              <span>
                {studentAddField.studentStatus == true
                  ? 'Active'
                  : 'Inactive'}{' '}
                Student
              </span>
            </InputGroup>
          </Form.Group>
          
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom04">
            <Form.Label>Students Details</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Type here..."
              style={{ height: '100px' }}
              value={studentAddField.stuDetails}
              onChange={(e) => {
                setstudentAddField({
                  ...studentAddField,
                  stuDetails: e.target.value,
                });
              }}
            />
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group as={Col} md="12" controlId="validationCustom04">
            <Form.Label>Advice For Student</Form.Label>
            <ReactQuill
              theme="snow"
              value={studentAdvice}
              onChange={setstudentAdvice}
            />
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

export default StudentAdd;
