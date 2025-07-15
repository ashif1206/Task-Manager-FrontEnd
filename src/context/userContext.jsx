import React, { createContext, useEffect, useState }  from 'react'
import axiosInstance from "../utils/axiosInstance";
import { API_PATHS } from '../utils/apiPaths';

export const UserContext = createContext();

function UserProvider({children}) {
const [user,setUser]  = useState(null);
const [loading,setLoading]  = useState(true);

useEffect(()=>{
    if(user){
        return;
    };
    const accessToken = localStorage.getItem("token");
    if(!accessToken){
        setLoading(false);
        return;
    };

    async function fetchUser(){
      try{
          const res = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE,{withCredentials: true,});
        const result = res.data.message.user;
        setUser(result);
        
      }catch(e){
        console.log("User not authenticated", e);
        clearUser();
      }finally{
        setLoading(false)
      }

    };
    fetchUser()
},[]);

function updateUser(userData){
    setUser(userData.user);
    localStorage.setItem("token",userData.token);
    setLoading(false);
};

function clearUser(){
    setUser(null);
    localStorage.removeItem("token");
};

return(
    <UserContext.Provider value={{user,loading,updateUser,clearUser}}>
        {children}
    </UserContext.Provider>
)


};

export default UserProvider;