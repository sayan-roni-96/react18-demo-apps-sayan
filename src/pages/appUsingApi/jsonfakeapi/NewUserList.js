import React,{useEffect,useState} from 'react';
import Loaders from '../../components/Loaders';

import axios from 'axios';
 
const NewUserList = () => {
    const[allNewUserData, setAllNewUserData] = useState([]);
    const [newLoading, addNewLoading] = useState(false);
 
    const getUserlist = ()=> {
        addNewLoading(true);
        axios.get('https://jsonplaceholder.typicode.com/users').then((resp)=>{
          console.log('resp->',resp);
          addNewLoading(true);
          if(resp.status === 200){
            setAllNewUserData(resp.data);
            addNewLoading(false);
          }}).catch((error)=>{
             console.log('resp->',error);
           })
    } 
   {/* amra ekhane browser load er jnno data pa66i tai browser loader jnn o use effect hook use hy */
    /*r niche black array h66e use effect er dipendency eta inffinite loop ke nulify kr */}
    useEffect(() => {
        getUserlist();
      }, []);

      console.log('allNewUserData->',allNewUserData);
  return (
    <div className='container'>
        <h1>User List</h1>
         <div className="mb-4">
           <button className="btn btn-primary">Add New User</button>{' '}
         </div>
         {newLoading ? (
           <><Loaders /></>
         ):!allNewUserData ?
         (<><h2>No data Found</h2> </>)
         :(
         <table class="table table-success table-striped mt-4">
            <thead>
                <tr>
                    <th scope="col">#User Id</th>
                    <th scope="col">Name </th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone</th>
                    <th scope="col">City</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
         {
          allNewUserData && allNewUserData.map((unData,index)=>{
              return(
                  <> 
                  <tbody key={unData.id}>
                   <tr>
                      <th scope="row">{unData.id}</th>
                      <td>{unData.name}</td>
                      <td>{unData.phone}</td>
                      <td>{unData.email}</td>
                      <td>{unData.address.city}</td>
                      <td>
                          <button className="btn btn-info">View</button>{' '}
                          <button className="btn btn-warning">Edit</button>{' '}
                          <button className="btn btn-danger">Delete</button>
                      </td>
                   </tr>
              </tbody></>
              )
          })
         }
         
      </table>) }
        

    </div>
  )
}

export default NewUserList;