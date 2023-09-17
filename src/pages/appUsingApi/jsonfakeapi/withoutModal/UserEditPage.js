import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams} from 'react-router-dom';
import Loaders from '../../../components/Loaders';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const UserEditPage = () => {
    const { eid } = useParams();
    //const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [editData, setEditData] = useState();
    const [editUserNewId, setEditUserNewId] = useState(null);
    const [editUserNewName, setEditUserNewName] = useState('');
    const [editUserNewMail, setEditUserNewMail] = useState('');
    const [editUserNewPhone, setEditUserNewPhone] = useState('');

    const editSingleUser = () => {
        setIsLoading(true);
        axios.get(`${process.env.REACT_APP_BASE_URL}/users/${eid}`).then((eresp) => {
            console.log('eresp->', eresp);
            if (eresp.status === 200) {
                setIsLoading(false);
                setEditData(eresp.data);
                setEditUserNewId(eresp.data.id);
                setEditUserNewName(eresp.data.name);
                setEditUserNewMail(eresp.data.email);
                setEditUserNewPhone(eresp.data.phone);
            }
        }).catch((err) => {
            console.log("err=>", err);
        });
    }
   
    const editDataSave = () => {
        console.log('editData=>',editData);
        console.log('editUserNewName=>',editUserNewName);
        console.log('editUserNewMail=>',editUserNewMail);
        console.log('editUserNewPhone=>',editUserNewPhone);

        // Check if editData is not empty (contains data fetched from the API)
         if (editData ) {
            const updatedData = [editData].map((dataNewEditUser) => {
                console.log('dataNewEditUser=>',dataNewEditUser);
                // Check if the current item matches the edited user's ID
                if (editUserNewId === dataNewEditUser.id) {
                    dataNewEditUser.name = editUserNewName;
                    dataNewEditUser.email = editUserNewMail;
                    dataNewEditUser.phone = editUserNewPhone;
                }
                return dataNewEditUser;
            });
            console.log('updatedData=>',updatedData);
            setEditData(updatedData);
            //history.push('/alluser');
    
       }
    }

    useEffect(() => {
        editSingleUser();
    }, []);

    return (
        <div className="container mt-4">
        {isLoading ? (
            <Loaders />
        ) : (
            <><Form>
    <Form.Group className="mb-3" controlId="formBasicName">
      <Form.Label>Name</Form.Label>
      <Form.Control type="text" id="name" value={editUserNewName} onChange={(ev) => setEditUserNewName(ev.target.value)}/>
    </Form.Group>

    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email</Form.Label>
      <Form.Control type="email" id="email" value={editUserNewMail} onChange={(ev) => setEditUserNewMail(ev.target.value)} />
    </Form.Group>
    <Form.Group className="mb-3" controlId="formBasicPhone">
      <Form.Label>Phone</Form.Label>
      <Form.Control type="text" id="phone" value={editUserNewPhone} onChange={(ev) => setEditUserNewPhone(ev.target.value)}/>
    </Form.Group>
    <Button variant="primary" type ="button" onClick={editDataSave}>
      Save
    </Button>
  </Form></>
            // <form>
            //     <h1>Edit Page</h1>
            //     <div className="mb-3">
            //         <label htmlFor="name" className="form-label">Name:</label>
            //         <input
            //             type="text"
            //             className="form-control"
            //             id="name"
            //             value={editUserNewName}
            //             onChange={(ev) => setEditUserNewName(ev.target.value)}
            //         />
            //     </div>
            //     <div className="mb-3">
            //         <label htmlFor="email" className="form-label">Email:</label>
            //         <input
            //             type="text"
            //             className="form-control"
            //             id="email"
            //             value={editUserNewMail}
            //             onChange={(ev) => setEditUserNewMail(ev.target.value)}
            //         />
            //     </div>
            //     <div className="mb-3">
            //         <label htmlFor="phone" className="form-label">Phone:</label>
            //         <input
            //             type="text"
            //             className="form-control"
            //             id="phone"
            //             value={editUserNewPhone}
            //             onChange={(ev) => setEditUserNewPhone(ev.target.value)}
            //         />
            //     </div>
            //     <button className="btn btn-primary" onClick={() => editDataSave()}>Save</button>
            //     <Link to="/alluser" className="btn btn-secondary ml-2">Go Back to List</Link>
            // </form>
        )}
    </div>
    
    )
}

export default UserEditPage;
