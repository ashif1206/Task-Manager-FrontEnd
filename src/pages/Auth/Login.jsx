import React, { useContext } from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/userContext';

function Login() {
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [error,setError] = useState(true);
  const [showPassword,setShowPassword] = useState(false);

  const {updateUser} = useContext(UserContext)

  const navigate = useNavigate();

  function togglePassword(){
    setShowPassword(!showPassword)
  }

  async function handleLogin(e){
    e.preventDefault();
    if(!password || !email){
      return setError("Enter Password or email")
    }
    if(!validateEmail(email)){
      setError("Please enter a valid email addresss");
      return;
    };
   try{
     const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN,{email,password},{withCredentials: true,});
    const {token,user} = res.data.message.data;
    const {role} = user;
    if(token){
      localStorage.setItem("token",token);
      updateUser(res.data.message.data);
      if(role === "admin"){
        navigate("/admin/dashboard");
      }else{
        navigate("/user/dashboard")
      }
    }
   }catch(e){
   if(e.response && e.response.data.message.message){
    setError(e.response.data.message.message)
   }else{
    setError("Somthing went wrong. Please tryagain later")
   }
   }

  };

  return (
    <>
     <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-300 to-blue-200 px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome Back!</h2>
        <form
        onSubmit={handleLogin}
        className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              onChange={({target})=>setEmail(target.value)}
              value={email}
              type="text"
              placeholder="Enter your email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={({target})=>setPassword(target.value)}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 pr-10"
                
              />
              <div
                onClick={togglePassword}
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-500"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          {/* <div className="text-right">
            <a href="#" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </a>
          </div> */}
           {error &&(
            <p className='text-red-600 text-center'>{error}</p>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign In
          </button>
         
        </form>
        <p className="text-center text-sm mt-6">
          Don't have an account?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
    </>
  )
}

export default Login