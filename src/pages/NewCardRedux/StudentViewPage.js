import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { getSingleStudent } from '../../store/actions/studentMainAction';

const StudentViewPage = () => {
    const dispatch = useDispatch();
    const { stuid } = useParams();
    console.log('stuid=>', stuid);
  
    const { singleStudent } = useSelector((state) => state.student);
  
    console.log('singleStudent=>', singleStudent);
  
    useEffect(() => {
      dispatch(getSingleStudent(stuid));
    }, []);
  
    return (
      <Card>
        <Card.Header as="h5">View Details</Card.Header>
        <Card.Body>
          <Card.Title>Name : {singleStudent.studentname}</Card.Title>
          <Card.Text>
            Age :{singleStudent.age} Years.
            <br />
            Gender :{singleStudent.gender}
            <br />
           Subject: {singleStudent.favsubject}
           <br />
          </Card.Text>
          <Link variant="primary" to={'/redux/studentlist'}>
            Go Back
          </Link>
        </Card.Body>
      </Card>
    );
}

export default StudentViewPage
