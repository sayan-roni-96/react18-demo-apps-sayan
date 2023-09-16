import React,{useEffect,useState} from 'react';
import Loaders from '../../components/Loaders';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import NewViewModal from './modals/NewViewModal';
import NewEditModal from './modals/NewEditModal';
import AddModal from './modals/AddModal';

 
const NewUserList = () => {
    const[allNewUserData, setAllNewUserData] = useState([]);
    const [newLoading, addNewLoading] = useState(false);
    const [newDatashow, setnewDatashow] = useState(false);
    const [newEditDatashow, setnewEditDatashow] = useState(false);
    const [newAddDatashow, setnewAddDatashow] = useState(false);
    //const [edituserDetail, setedituserDetail] = useState();
    const [userDetail, setuserDetail] = useState();
    const [editUserId, setEditUserId] = useState(null);
    const [editUserName, setEditUserName] = useState('');
    const [editUserPhone, setEditUserPhone] = useState('');
    const [editUserEmail, setEditUserEmail] = useState('');
    const [editUserCity, setEditUserCity] = useState('')
    const [addUserName, setaddUserName] = useState('');
    const [addUserPhone, setaddUserPhone] = useState('');
    const [addUserEmail, setaddUserEmail] = useState('');
    //const [addUserCity, setaddUserCity] = useState('');

    
 
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

    {/*this modal operation use for Add User  purpose*/ }
    const addHandleClose = () => setnewAddDatashow(false);
    //const handleShow = () => setnewDatashow(true);
    
      const addUser = ()=>{
        const newUserAdd = {
          id: Date.now(),
          name: addUserName,
          phone: addUserPhone,
          email:addUserEmail,
        }
        setAllNewUserData([...allNewUserData,newUserAdd]);
        setnewAddDatashow(true);
        setaddUserName('');
        setaddUserPhone('');
        setaddUserEmail('');
  }
    
    
   {/*this modal operation use for view purpose*/ }
    const handleClose = () => setnewDatashow(false);
    //const handleShow = () => setnewDatashow(true);
    const showDataModal = (newVData)=>{
      console.log('newVData=>',newVData);
      setnewDatashow(true);
      setuserDetail(newVData);
    }
   
    {/*this modal operation use for edit  purpose*/ }
    const editHandleClose = () => setnewEditDatashow(false);
    //const handleShow = () => setnewDatashow(true);
    const showEditDataModal = (newEData)=>{
      console.log('newEData=>',newEData);
      setnewEditDatashow(true);
      setEditUserId(newEData.id);
      setEditUserName(newEData.name);
      setEditUserPhone(newEData.phone);
      setEditUserEmail(newEData.email);
      setEditUserCity(newEData.address.city);
    }

    console.log('editUserId->',editUserId);
     {/*end  this modal operation use for edit purpose*/ }


    /* delete user data from api*/ 
    const deleteUserClick = (deluserid) =>{
      if(window.confirm('Do you want to Delete Data ?')){
        //console.log('deluserid=>',deluserid)
        const deleteUserData = [...allNewUserData].filter((deluserdata) => {
          //console.log('deluserdata=>',deluserdata);
          return deluserdata.id != deluserid;
        })
        setAllNewUserData(deleteUserData);
      }
    }

    {/*Edit Submit */ }
  const editUserSubmit = () => {
      const updatedUser = [...allNewUserData].map((dataEditUser) => {
        console.log('dataEditUser=>', dataEditUser)
        if (editUserId == dataEditUser.id) {
          dataEditUser.name = editUserName;
          dataEditUser.phone = editUserPhone;
          dataEditUser.email = editUserEmail;
          dataEditUser.address.city = editUserCity;
        }
        return dataEditUser;
      })
      setAllNewUserData(updatedUser);
      editHandleClose();
      editUserDataCancel();
    
  };
   {/*Edit Submit End */ }

    {/*User Cancel Button */ }
  const editUserDataCancel = () => {
      setEditUserName('');
      setEditUserPhone('');
      setEditUserEmail('');
      setEditUserCity('');
      setEditUserId(null)
  };

  return (
    <div className='container'>
      {/* Add data Modal*/}
      <AddModal addUserPhone ={addUserPhone} setaddUserName = {setaddUserName} addUserName ={addUserName}
      addHandleClose = {addHandleClose} newAddDatashow = {newAddDatashow} setaddUserPhone = {setaddUserPhone}
      addUserEmail = {addUserEmail} setaddUserEmail = {setaddUserEmail} addUser = {addUser}
     />
     
       {/* End Add data Modal*/}
      {/* view modal */}
      {/*this modal use for view purpose*/}
      <NewViewModal newDatashow = {newDatashow} handleClose = {handleClose} userDetail = {userDetail}/>
      {/* view modal end*/}

      {/*this modal use for edit purpose*/}
       <NewEditModal newEditDatashow = {newEditDatashow} editHandleClose = {editHandleClose} editUserName = {editUserName}
       setEditUserName = {setEditUserName} editUserPhone = {editUserPhone} setEditUserPhone = {setEditUserPhone}
       editUserEmail = {editUserEmail} setEditUserEmail = {setEditUserEmail} editUserCity = {editUserCity}
       setEditUserCity = {setEditUserCity} editUserDataCancel = {editUserDataCancel} editUserSubmit ={editUserSubmit}
       />
      {/* edit modal end*/}


       
        <h1>User List</h1>
         <div className="mb-4">
           <button className="btn btn-primary" onClick={()=> addUser()}>Add New User</button>{' '}
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
                      {/* <td>{unData.address.city}</td> */}
                      <td>
                          <button className="btn btn-info" onClick={()=> showDataModal(unData)}>View</button>{' '}
                          <button className="btn btn-warning" onClick={() => showEditDataModal(unData)}>Edit</button>{' '}
                          <button className="btn btn-danger" onClick={() => deleteUserClick(unData.id)}>Delete</button>
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