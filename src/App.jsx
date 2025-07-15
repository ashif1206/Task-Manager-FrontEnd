import React, { useContext } from 'react'
import {BrowserRouter,Navigate,Outlet,Route,Routes} from 'react-router-dom'
import Login from './pages/Auth/Login'
import SignUp from './pages/Auth/SignUp'
import PrivateRoutes from './routes/PrivateRoutes'
import AdminDashboard from './pages/Admin/AdminDashboard'
import ManageTask from './pages/Admin/ManageTask'
import CreateTask from './pages/Admin/CreateTask'
import ManageUser from './pages/Admin/ManageUser'
import UserDashboard from './pages/User/UserDashboard'
import MyTask from './pages/User/MyTask'
import ViewTaskDeatils from './pages/User/ViewTaskDeatils'
import  { UserContext } from './context/userContext'
import { Toaster } from 'react-hot-toast'


function App() {
  return (
   <>
  <Toaster
  toastOptions={{
    className:"",
    style:{
      fontSize:"13px"
    },
  }}
  />
     <BrowserRouter>
   <Routes>

    {/* Public routes */}
    <Route  path='/login' element={<Login/>} />
    <Route  path='/signUp' element={<SignUp/>} />

    {/* Admin routes */}
    <Route element={<PrivateRoutes allowedRoles={["admin"]} />} >
    <Route  path='/admin/dashboard' element={<AdminDashboard/>} />
    <Route  path='/admin/task' element={<ManageTask/>} />
    <Route  path='/admin/create-task' element={<CreateTask/>} />
    <Route  path='/admin/users' element={<ManageUser/>} />
    </Route>

    {/* User routes */}
    <Route element={<PrivateRoutes allowedRoles={["admin"]} />} >
    <Route  path='/user/dashboard' element={<UserDashboard/>} />
    <Route  path='/user/task' element={<MyTask/>} />
    <Route  path='/user/task-details/:id' element={<ViewTaskDeatils/>} />
    <Route  path='/admin/users' element={<ManageUser/>} />
    </Route>

    
     <Route path='/' element={<Root/>} />
     <Route path='/' element={<Root />} />

     
   </Routes>
   </BrowserRouter>
  
   </>
  )
}

export default App;


const Root = ()=>{
  const {user,loading} = useContext(UserContext);

    if(loading) {
      return <Outlet/>
    };

  if(!user){
    return <Navigate to="/login" />;
  };

  return user.role === "admin" ? <Navigate to="/admin/dashboard"/> : <Navigate to="/user/dashboard" />

}