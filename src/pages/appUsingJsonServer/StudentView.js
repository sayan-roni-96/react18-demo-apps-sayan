import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const StudentView = () => {
    const location = useLocation();
    const { singledata } = location.state;
    console.log('singledata =>', location);
    
    return (
        
        <div className="container mt-4">
            <h2>Student Details</h2>
            <div>
                <strong>Student Name:</strong> {singledata.studentname}
            </div>
            <div>
                <strong>Student Age:</strong> {singledata.age}
            </div>
            <div>
                <strong>Favourite Subject:</strong> {singledata.favsubject}
            </div>
            <div>
            <Link className="btn btn-primary" to={'/studentlist'}>
          Go Back
        </Link>
            </div>
            {/* You can display more student details here */}
        </div>
        
    );
};

export default StudentView;