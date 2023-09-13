import React,{useEffect,useState} from 'react';
import Loaders from '../../components/Loaders';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
//import NewViewModel from './modals/NewViewModel';
 
const NewUserList = () => {
    const[allNewUserData, setAllNewUserData] = useState([]);
    const [newLoading, addNewLoading] = useState(false);
    const [newDatashow, setnewDatashow] = useState(false);
    const [userDetail, setuserDetail] = useState()
 
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

    

    const handleClose = () => setnewDatashow(false);
    //const handleShow = () => setnewDatashow(true);
    const showDataModal = (newVData)=>{
      console.log('newVData=>',newVData);
      setnewDatashow(true);
      setuserDetail(newVData);
    }
  return (
    <div className='container'>
      {/* view modal */}
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal show={newDatashow} onHide={handleClose}  aria-labelledby="contained-modal-title-vcenter"
       centered>
        <Modal.Header closeButton>
          <Modal.Title>User Details Of {userDetail && userDetail.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            <li> Name : {userDetail && userDetail.name}</li>
            <li> Phone : {userDetail && userDetail.phone}</li>
            <li> Email :{userDetail && userDetail.email}</li>
            <li> City : {userDetail && userDetail.address.city}</li>
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      {/* view modal end*/}
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
                          <button className="btn btn-info" onClick={()=> showDataModal(unData)}>View</button>{' '}
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