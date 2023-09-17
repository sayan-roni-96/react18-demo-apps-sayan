import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';

const UserEditPage = () => {

    const {eid} = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [editData, setEditData] = useState([]);
    //const [editUserNewId, setEditUserNewId] = useState(null);
    const [editUserNewName, seteditUserNewName] = useState('');
    const [editUserNewMail, seteditUserNewMail] = useState('');
    const [editUserNewPhone, seteditUserNewPhone] = useState('');


    const editSingleUser = () =>{
        setIsLoading(true)
        axios.get(`${process.env.REACT_APP_BASE_URL}/users/${eid}`).then((eresp) => {
        console.log('eresp->', eresp);
        if(eresp.status == 200) {
            setIsLoading(false)
            setEditData(eresp.data);
            //setEditUserNewId(eresp.data.id);
            seteditUserNewName(eresp.data.name);
            seteditUserNewMail(eresp.data.email);
            seteditUserNewPhone(eresp.data.phone);
        }
    }).catch((err) => {
        console.log("err=>", err);
    })

     }
     //console.log('editUserName->',editUserName);
    const editDataSave = ()=> {
        const updatedData = { ...editData };
        updatedData.name = editUserNewName;
        updatedData.email = editUserNewMail;
        updatedData.phone = editUserNewPhone;
        setEditData(updatedData);
    }
     


     useEffect(() => {
        editSingleUser()
      }, [])


  return (
    <div className="container mt-4">
            <h1>Edit Page</h1>
            <div>
                <label>Name:</label>
                <input type="text" value={editUserNewName} onChange={(ev) => seteditUserNewName(ev.target.value)} />
            </div>
            <div>
                <label>Email:</label>
                <input type="text" value={editUserNewMail} onChange={(ev) => seteditUserNewMail(ev.target.value)} />
            </div>
            <div>
                <label>Phone:</label>
                <input type="text" value={editUserNewPhone} onChange={(ev) => seteditUserNewPhone(ev.target.value)} />
            </div>
            <button onClick={editDataSave}>Save</button>
            <Link to="/alluser" className="btn btn-primary">Go Back</Link>
        </div>
  )
}

export default UserEditPage