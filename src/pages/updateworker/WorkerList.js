
import axios from 'axios';
import Loaders from '../components/Loaders';
import React, { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const WorkerList = () => {
    const [allWorker, setallWorker] = useState([]);
    const [dataLoading, setDataLoading] = useState(false);

    // Replace with your default image URL
    const defaultImageUrl = 'https://robohash.org/perferendisideveniet.png'; 

    const getAllWorker = () => {
        setDataLoading(true);
        axios
          .get(`${process.env.REACT_APP_NEW_WORKER_JSON_URL}/workers`)
          .then((resp) => {
            console.log('resp=>', resp);
            if (resp.status === 200) {
              setDataLoading(false);
              setallWorker(resp.data.reverse());
            }
          })
          .catch((err) => {
            console.log('error=>', err);
            setDataLoading(false);
          });
      };
    
      useEffect(() => { 
        getAllWorker();
        return () => {
            getAllWorker();
        };
      }, []);



  return (
    <div className="container mt-4">
      <div className="mb-4">
        <Link className="btn btn-primary" to={''}>
          Add Worker
        </Link>
        </div>
        {dataLoading ? (
        <Loaders />
      ) : allWorker.length == 0 ? (
        <h3>No data found!</h3>
      ) : (
        <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Worker Name</th>
            <th>Age</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Gender</th>
            <th>Image</th>
            <th>Action</th>
          </tr>
        </thead>
        {allWorker &&
            allWorker.map((wData, index) => {
              return (
        <tbody key={wData.id}>
            <tr>
             <th scope="row">1</th>
                <td>{wData.name}</td>
                <td>{wData.age}</td>
                <td>{wData.email}</td>
                <td>{wData.phone}</td>
                <td>{wData.gender}</td>
                <td>
                                    <img
                                        src={wData.image || defaultImageUrl}
                                        alt="Worker"
                                        width="100"
                                        height="100"
                                    />
                                </td>
                <td>
                     <Button variant="success">
                        View
                      </Button>{' '}
                      <Button variant="warning">
                        Edit
                      </Button>{' '}
                      <Button variant="danger" >
                        Delete
                      </Button>
                </td>
            </tr>
        </tbody>
              )
            })}
        </Table>
      )}
    </div>
  )
}

export default WorkerList