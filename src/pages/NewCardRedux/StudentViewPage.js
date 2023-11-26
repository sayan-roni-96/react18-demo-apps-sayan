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
  
  const stripHtmlTags = (htmlString) => {
    if (!htmlString || typeof htmlString !== 'string') {
      return htmlString;
    }
    return htmlString.replace(/<[^>]*>?/gm, ''); // Regex to remove HTML tags
  };

  console.log('singleStudent=>', singleStudent);

  useEffect(() => {
    dispatch(getSingleStudent(stuid));
  }, []);

  return (
    <Card>
      <Card.Header as="h5">View Details</Card.Header>
      <Card.Body>
        <Card.Title>Name : {singleStudent.studentname}</Card.Title>
        <div>
          {/* Render other details */}
          {singleStudent.age && (
            <div>
              Age: {singleStudent.age} Years.
              <br />
            </div>
          )}
          {singleStudent.gender && (
            <div>
              Gender: {singleStudent.gender}
              <br />
            </div>
          )}
          {singleStudent.favsubject && (
            <div>
              Subject: {singleStudent.favsubject}
              <br />
            </div>
          )}
          {singleStudent.interest && singleStudent.interest.length > 0 ? (
            <div>
              Favourite Subjects:
              <ul>
                {singleStudent.interest.map((interest) => (
                  <li key={interest.value}>{interest.label}</li>
                ))}
              </ul>
            </div>
          ) : (
            <div>No favourite subjects.</div>
          )}
          {singleStudent.advicestudent && (
            <div>
              Student Advice: {stripHtmlTags(singleStudent.advicestudent)}
              <br />
            </div>
          )}
        </div>
        <Link variant="primary" to={'/redux/studentlist'}>
          Go Back
        </Link>
      </Card.Body>
    </Card>
  );
};

export default StudentViewPage;
