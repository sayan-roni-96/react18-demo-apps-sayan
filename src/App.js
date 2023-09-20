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
import SmallCalculator from './pages/smallApps/SmallCalculator';
import UserList from './pages/appUsingApi/jsonfakeapi/UserList';
import NewUserList from './pages/appUsingApi/jsonfakeapi/NewUserList';
import UserListPage from './pages/appUsingApi/jsonfakeapi/withoutModal/UserListPage';
import UserViewPage from './pages/appUsingApi/jsonfakeapi/withoutModal/UserViewPage';
import UserEditPage from './pages/appUsingApi/jsonfakeapi/withoutModal/UserEditPage';
import UserAddPage from './pages/appUsingApi/jsonfakeapi/withoutModal/UserAddPage';
import EmployeeList from './pages/appUsingJsonServer/EmployeeList';
import EmployeeAdd from './pages/appUsingJsonServer/EmployeeAdd';

function App() {
  return (
    <div className="App_class container mt-4">
      <h1>React18-New Applications</h1>
      <MenuBar />
      <Routes>
        <Route exact path="/" element={<MainTodo />} />
        <Route exact path="/practodo" element={<PracTodo />} />
        <Route exact path="/view" element={<ViewTodo />} />
        <Route exact path="/counter" element={<SmallCounter />} />
        <Route exact path="/calculator" element={<SmallCalculator />} />

        {/* API Ops */}
        <Route exact path="/userlist" element={<UserList />} />
        <Route exact path="/newuserlist" element={<NewUserList />} />

        {/* Without Modal */}
        <Route exact path="/alluser" element={<UserListPage />} />
        <Route exact path="/alluser/viewuser/:vid" element={<UserViewPage />} />
        <Route exact path="/alluser/edituser/:eid" element={<UserEditPage />} />
        <Route exact path="/alluser/adduser" element={<UserAddPage />} />

        {/* Using Json Server */}
        <Route exact path="/employeelist" element={<EmployeeList />} />
        <Route exact path="/employeeadd" element={<EmployeeAdd />} />
      </Routes>
    </div>
  );
}

export default App;
