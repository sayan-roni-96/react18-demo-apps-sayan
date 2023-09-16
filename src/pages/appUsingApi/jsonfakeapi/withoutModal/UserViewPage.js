import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Loaders from '../../../components/Loaders';

const UserViewPage = () => {
    // Taken from App.js url path
  const {vid} = useParams()
  const [viewData, setViewData] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  console.log('vid->', vid);

  const viewSingleUser = () => {
    setIsLoading(true)
    axios.get(`${process.env.REACT_APP_BASE_URL}/users/${vid}`).then((resp) => {
        console.log('resp->', resp);
        if(resp.status == 200) {
            setIsLoading(false)
            setViewData(resp.data);
        }
    }).catch((err) => {
        console.log("err=>", err);
    })
  }


  useEffect(() => {
    viewSingleUser()
  }, [])

  console.log('viewData=>', viewData);
  return (
    <div className="container mt-4">
        {
            isLoading ? (<><Loaders /></>) : (<div className="card">
            <div className="card-header">
              Hi {viewData.name} 
            </div>
            <div className="card-body">
              <h5 className="card-title">Email: {viewData.email}</h5>
              <h5 className="card-title">Phone: {viewData.phone}</h5>
              
              <Link to="/alluser" className="btn btn-primary">Go Back</Link>
            </div>
          </div>)
        }
    </div>
   
      
   
  )
}

export default UserViewPage
