import React from 'react';
import logo from './logo.svg';
import './App.css';
//import MainTodo from './pages/todoApp/MainTodo';
import PracTodo from './pages/newtodoApp/PracTodo';
import MainTodo from './pages/todoApp/MainTodo';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import ViewTodo from './pages/todoApp/ViewTodo';

function App() {
  return (
    <div className="App">
      <h1>React18-New Applications</h1>
      <Routes>
        <Route exact path="/" element={<MainTodo />} />
        <Route exact path="/practodo" element={<PracTodo />} />
        <Route exact path="/view" element={<ViewTodo />} />
      </Routes>
    </div>
  );
}

export default App;
