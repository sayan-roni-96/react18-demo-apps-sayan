import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loaders from '../../../components/Loaders';
import { Link, useNavigate } from 'react-router-dom';

const UserListPage = () => {
   const navigate = useNavigate();
  const [allUserData, setAllUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewSingleUser, setViewSingleUser] = useState({});
  const [editSingleUser, setEditSingleUser] = useState({})

  const getAllUserData = () => {
    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/users`)
      .then((res) => {
        setIsLoading(true);
        console.log('res==>', res);
        if (res.status == 200) {
          setAllUserData(res.data);

          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log('err==>', err);
      });
  };

  useEffect(() => {
    getAllUserData();
  }, []);

  // console.log('allUserData==>', allUserData);


  const viewUserDetail = (viewUser) => {
    // console.log('viewUser=>', viewUser);
    
    if (viewUser) {
        navigate(`/alluser/viewuser/${viewUser.id}`)
      setViewSingleUser(viewUser);
    }
  };
  console.log('viewSingleUser==>', viewSingleUser);

  //open page for edit purpose
  const editUserDetail = (editUser)=> {
        console.log('editUser=>', editUser);
        if (editUser) {
          navigate(`/alluser/edituser/${editUser.id}`)
          setEditSingleUser(editUser);
      }
      console.log('editSingleUser->',editSingleUser);
  }

  return (
    <div className="container">

      <h1>User List</h1>
      <div className="mb-4">
        <button className="btn btn-primary" onClick = {()=>navigate('/alluser/adduser')} >Add New User</button>{' '}
        <Link to="/alluser/adduser" className="btn btn-primary">Add New User Link</Link>
      </div>
      {isLoading ? (
        <>
          <Loaders />
        </>
      ) : !allUserData ? (
        <h2>No User Found!</h2>
      ) : (
        <table className="table table-hover mt-4">
          <thead>
            <tr>
              <th scope="col">#Sl. No.</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone</th>
              <th scope="col">Action</th>
            </tr>
          </thead>

          {allUserData &&
            allUserData.map((uData, index) => {
              // console.log('uData=>', uData);
              return (
                <tbody key={uData.id}>
                  <tr>
                    <th scope="row">{uData.id}</th>
                    <td>{uData.name}</td>
                    <td>{uData.email}</td>
                    <td>{uData.phone}</td>
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={() => viewUserDetail(uData)}
                      >
                        View
                      </button>{' '}
                      <button className="btn btn-warning" onClick={() => editUserDetail(uData)}>Edit</button>{' '}
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
        </table>
      )}
    </div>
  );
};

export default UserListPage;