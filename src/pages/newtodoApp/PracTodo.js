import React, { Fragment, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.css';

function PracTodo() {
  const [todos, setTodos] = useState([]);
  const [errorMsg, setErrorMsg] = useState('')
  const [newName, setNewName] = useState('');
  const [newAbout, setNewAbout] = useState('');

  const addProfile = () => {
    if (newName !== '' || newAbout !== '') {
      const newProfileTodo = {
        todoId:Date.now(),
        todoName:newName,
        todoAbout:newAbout
      }
      console.log('newProfileTodo->',newProfileTodo)
      setTodos([...todos,newProfileTodo]);
      setNewName('');
      setNewAbout('');
    }else{
      setErrorMsg('Please fill the field!');
      setTimeout(() => {
        setErrorMsg('');
      }, 1000);
    }
  };
//console.log('todos->',todos)
  return (
    <div className="container mt-5">

      <div className="row justify-content-center">
      <div className="col-sm-4">

      <h1 className="mb-4">Todo List</h1>
      <div className="input-group mb-3">
        <input
        style = {{width: "20%" , marginleft: '24px'}}
          type="text"
          className="form-control"
          placeholder="Name"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />
        <input
        style = {{width: "20%" , marginleft: '24px'}}
          type="text"
          className="form-control"
          placeholder="About"
          value={newAbout}
          onChange={(e) => setNewAbout(e.target.value)}
        />
        <div className="input-group-append ml-2">
          <button className="btn btn-primary" type="button" onClick={addProfile}>
            Add
          </button>
        </div>
      </div>
      <div>
          <p style={{ color: 'red', fontSize: '16px' }}>{errorMsg}</p>
        </div>
        <h2>Todo List</h2>
        {todos.length == 0 ?(
          <div>
          <h2>No Data Found!</h2>
          </div>
        ):(
          <table style={{ margin: '0 auto', width: '70%' }}>
        <thead>
                <th>Sl.No</th>
                <th>Name</th>
                <th>About</th>
                <th>Action</th>
              </thead>
              {todos.map((todo, index) => (
              <tr>
                <td>{index+1}.</td>
                <td>{todo.todoName}</td>
                <td>{todo.todoAbout}</td>
                <td><button
                              style={{
                                backgroundColor: 'blue',
                                color: '#fff',
                                fontSize: '18px',
                              }}
                            >
                              View
                            </button>
                            &nbsp;
                            <button
                              style={{
                                backgroundColor: 'yellow',
                                color: '#000',
                                fontSize: '18px',
                              }}
                            >
                              Edit
                            </button>
                            &nbsp;
                            <button
                              style={{
                                backgroundColor: 'red',
                                color: '#fff',
                                fontSize: '18px',
                              }}
                            >
                              Delete
                            </button></td>
              </tr>
              ))}
        </table>
        )}
      </div>
      </div>

      
    </div>
  );
}

export default PracTodo;
