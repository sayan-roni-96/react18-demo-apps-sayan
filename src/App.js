import React from "react";
import logo from "./logo.svg";
import "./App.css";
//import MainTodo from './pages/todoApp/MainTodo';
import PracTodo from "./pages/newtodoApp/PracTodo";
import MainTodo from "./pages/todoApp/MainTodo";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import ViewTodo from "./pages/todoApp/ViewTodo";
import MenuBar from "./pages/navmenu/MenuMar";
import SmallCounter from "./pages/smallApps/SmallCounter";
import SmallCalculator from "./pages/smallApps/SmallCalculator";
import UserList from "./pages/appUsingApi/jsonfakeapi/UserList";
import NewUserList from "./pages/appUsingApi/jsonfakeapi/NewUserList";
import UserListPage from "./pages/appUsingApi/jsonfakeapi/withoutModal/UserListPage";
import UserViewPage from "./pages/appUsingApi/jsonfakeapi/withoutModal/UserViewPage";
import UserEditPage from "./pages/appUsingApi/jsonfakeapi/withoutModal/UserEditPage";
import UserAddPage from "./pages/appUsingApi/jsonfakeapi/withoutModal/UserAddPage";
import EmployeeList from "./pages/appUsingJsonServer/EmployeeList";
import EmployeeAdd from "./pages/appUsingJsonServer/EmployeeAdd";
import EmployeeEdit from "./pages/appUsingJsonServer/EmployeeEdit";
import EmployeeDetails from "./pages/appUsingJsonServer/EmployeeDetails";
import StudentList from "./pages/appUsingJsonServer/StudentList";
import StudentView from "./pages/appUsingJsonServer/StudentView";
import StudentAdd from "./pages/appUsingJsonServer/StudentAdd";
import StudentEdit from "./pages/appUsingJsonServer/StudentEdit";
import WorkerList from "./pages/updateworker/WorkerList";
import EmployeeListPage from "./pages/CrudUsingRedux/EmployeeListPage";
import EmployeeViewPage from "./pages/CrudUsingRedux/EmployeeViewPage";
import EmployeeAddPage from "./pages/CrudUsingRedux/EmployeeAddPage";
import ToastMessage from "./pages/components/ToastMessage";
import StudentListPage from "./pages/NewCardRedux/StudentListPage";
import StudentViewPage from "./pages/NewCardRedux/StudentViewPage";
import StudentAddPage from "./pages/NewCardRedux/StudentAddPage";
import EmployeeEditPage from "./pages/CrudUsingRedux/EmployeeEditPage";
import StudentEditPage from "./pages/NewCardRedux/StudentEditPage";

function App() {
  return (
    <div className="App_class container mt-4">
      <h1>React18-New Applications</h1>
      <ToastMessage />
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
        <Route exact path="/employeeedit/:empid" element={<EmployeeEdit />} />
        <Route path="/employeedetails/:id" element={<EmployeeDetails />} />

        <Route exact path="/studentlist" element={<StudentList />} />
        <Route path="/studentview/:id" element={<StudentView />} />
        <Route exact path="/studentadd" element={<StudentAdd />} />
        <Route exact path="/studentedit/:stuid" element={<StudentEdit />} />

        {/* New Worker Crud*/}
        <Route exact path="/workerlist" element={<WorkerList />} />

        {/* CRUD Using Redux */}
        <Route
          exact
          path="/redux/employeelist"
          element={<EmployeeListPage />}
        />
        <Route exact path="/redux/employee/add" element={<EmployeeAddPage />} />
        <Route
          exact
          path="/redux/employeedetail/:rvid"
          element={<EmployeeViewPage />}
        />
        <Route
          exact
          path="/redux/employeedetail/edit/:revid"
          element={<EmployeeEditPage />}
        />

        {/* Student Work */}
        <Route exact path="/redux/studentlist" element={<StudentListPage />} />
        <Route
          exact
          path="/redux/studentdetail/:stuid"
          element={<StudentViewPage />}
        />
        <Route exact path="/redux/student/add" element={<StudentAddPage />} />
        <Route
          exact
          path="/redux/studentdetail/edit/:stuedid"
          element={<StudentEditPage />}
        />
      </Routes>
    </div>
  );
}

export default App;
