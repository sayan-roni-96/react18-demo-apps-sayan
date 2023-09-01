import React, { Fragment, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
//import './App.css';

function PracTodo() {
  const [todos, setTodos] = useState([]);
  const [errorMsg, setErrorMsg] = useState('')
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    if (newTodo !== '') {
      const newPracTodo = {
        todoData:newTodo, 
      }
      console.log('newPracTodo->',newPracTodo)
      setTodos([...todos,newPracTodo]);
      setNewTodo('');
    }else{
      setErrorMsg('Please fill the field!');
      setTimeout(() => {
        setErrorMsg('');
      }, 1000);
    }
  };
console.log('todos->',todos)
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
          placeholder="Enter a new todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <div className="input-group-append ml-2">
          <button className="btn btn-primary" type="button" onClick={addTodo}>
            Add
          </button>
        </div>
      </div>
      <div>
          <p style={{ color: 'red', fontSize: '16px' }}>{errorMsg}</p>
        </div>
      {<div className="lists">
        {todos.map((todo, index) => (
          <Fragment Key = {index}>
          <div className='list-flex'>{index + 1}.</div>
          <div className='list-flex'>
            {todo.todoData}
          </div>
          </Fragment>
        ))}
      </div>}

        

      </div>
      </div>

      
    </div>
  );
}

export default PracTodo;
