import React, { useEffect, useState } from 'react'
import DashBoardLayout from '../../components/layout/DashBoardLayout'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuFileSpreadsheet } from 'react-icons/lu';
import UserCard from '../../components/Cards/UserCard';
import toast from 'react-hot-toast';

function ManageUser() {
  const [allUsers,setAllusers]=useState([]);

async function getAllUsers(){
  try{
    const res = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS,{withCredentials:true});
    if(res.data.message.message.length > 0){
      setAllusers(res.data.message.message);
    }
   

  }catch(e){
    console.error("Error Fetching Users",e); 
  }
};

 async function handleDownLoadReport(){
    try{
        const res = await axiosInstance.get(API_PATHS.REPORTS.USERS,{
          responseType:"blob",
          withCredentials:true,
        });
        const url = window.URL.createObjectURL(new Blob ([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download","user_deatils.xlsx");
        document.body.append(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);

    }catch(e){
      console.error("Error Download User Report failed",e);
      toast.error("failed to download user report");
    }
  };

useEffect(()=>{
  getAllUsers()
},[]);

  return (
    <DashBoardLayout activeMenu="Team Members">
      <div className='mt-5 mb-10'>
        <div className='flex md:flex-row md:items-center justify-between'>
          <h2 className='text-xl md:text-xl font-medium'>Team Members</h2>
          <button className='flec md:flex download-btn' onClick={handleDownLoadReport}>
            <LuFileSpreadsheet className='text-lg'/>
            Download Report</button>
        </div> 
        {/* <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4  '>
            {allUsers?.map((user)=>(
              <UserCard key={user._id} userInfo={user} />
            ))}
        </div>  */}

        <div className="grid gap-4 mt-4 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
  {allUsers?.map((user) => (
    <UserCard key={user._id} userInfo={user} />
  ))}
</div>

      </div>
    </DashBoardLayout> 
  )
}

export default ManageUser