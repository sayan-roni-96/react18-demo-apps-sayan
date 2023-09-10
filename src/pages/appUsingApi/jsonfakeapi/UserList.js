import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loaders from '../../components/Loaders';

const UserList = () => {
  const [allUserData, setAllUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const getAllUserData = () => {
    setIsLoading(true);
    axios
      .get('https://jsonplaceholder.typicode.com/users')
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

  console.log('allUserData==>', allUserData);

  return (
    <div className="container">
      <h1>User List</h1>
      <div className="mb-4">
        <button className="btn btn-primary">Add New User</button>{' '}
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
                      <button className="btn btn-info">View</button>{' '}
                      <button className="btn btn-warning">Edit</button>{' '}
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

export default UserList;
