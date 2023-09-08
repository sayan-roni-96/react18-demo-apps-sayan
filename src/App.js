import React from 'react';
import logo from './logo.svg';
import './App.css';
//import MainTodo from './pages/todoApp/MainTodo';
import PracTodo from './pages/newtodoApp/PracTodo';
import MainTodo from './pages/todoApp/MainTodo';
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import ViewTodo from './pages/todoApp/ViewTodo';
import MenuBar from './pages/navmenu/MenuMar';
import SmallCounter from './pages/smallApps/SmallCounter';

function App() {
  return (
    <div className="App">
      <h1>React18-New Applications</h1>
      <MenuBar />
      <Routes>
        <Route exact path="/" element={<MainTodo />} />
        <Route exact path="/practodo" element={<PracTodo />} />
        <Route exact path="/view" element={<ViewTodo />} />
        <Route exact path="/counter" element={<SmallCounter />} />
      </Routes>
    </div>
  );
}

export default App;
