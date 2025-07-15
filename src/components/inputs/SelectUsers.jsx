import React, { useEffect, useState } from 'react'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { LuUsers } from 'react-icons/lu';
import Modal from '../layout/Modal';
import AvatarGroup from '../layout/AvatarGroup';

function SelectUsers({selectedUSers,setSelectedUSers}) {
    const [allUsers,setAllUsers] = useState([]);
    const [isModalOpen,setIsModalOpen] = useState(false)
    const [tempSelectedUsers,setTempSelectedUsers] = useState([])

    async function getAllUsers() {

            try{
                const res = await axiosInstance.get(API_PATHS.USERS.GET_ALL_USERS,{withCredentials:true})
                if(res.data.message.message.length > 0){
                  setAllUsers(res.data.message.message);
                };
            }catch(e){
                console.error("Error fetching Users",e);    
            };
    };

    useEffect(()=>{
      getAllUsers()
    },[]);

    function toggleUserSelection (userId){
      setTempSelectedUsers((prev)=>
        prev.includes(userId) ? prev.filter((id)=> id !== userId) : [...prev,userId]
      );
    };

    function handleAssign(){
      setSelectedUSers(tempSelectedUsers);
      setIsModalOpen(false);
    };

    const selectedUserAvatars = allUsers.filter((user)=>selectedUSers.includes(user._id))
    .map((user)=>user.profileImageUrl);

     useEffect(()=>{
      if(selectedUSers.length === 0){
        setTempSelectedUsers([])
      };

      return ()=>{};
    },[selectedUSers]);
    
  return (
    <div className='space-y-4 mt-2'>
      {selectedUserAvatars.length === 0 && (
        <button className='card-btn' onClick={()=>setIsModalOpen(true)}>
          <LuUsers className='text-sm' /> Add Members
        </button>
      )}

      {selectedUserAvatars.length > 0 && (
        <div 
        onClick={()=>setIsModalOpen(true)}
        className='cursor-pointer'>
          <AvatarGroup avatars={selectedUserAvatars} maxVisible={3} />
        </div>
      )}

      <Modal
      isOpen={isModalOpen}
      onClose={()=>setIsModalOpen(false)}
      title="Selected Users"
      >
        <div className='space-y-4 h-[60vh] overflow-y-auto'>
          {allUsers.map((user)=>(
            <div 
            className='flex items-center gap-4 p-3 border-b border-gray-200' 
            key={user._id}>

            <img src={user.profileImageUrl} 
            alt={user.name} 
            className='w-10 h-10 rounded-full' />

            <div className='flex-1'>
              <p className='font-medium text-gray-800 dark:text-white'>{user.name}</p>
              <p className='text=[13px] text-gray-500'>{user.email}</p>
            </div>
            <input
            type='checkbox'
            checked={tempSelectedUsers.includes(user._id)}
            onChange={()=>toggleUserSelection(user._id)}
            className='w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm outline-none '
            />
            </div>
          ))}

        </div>
        <div className='flex justify-end gap-4 pt-4'>
          <button 
          onClick={()=>setIsModalOpen(false)}
          className='card-btn'>
            CANCEL
          </button>
          <button 
          onClick={handleAssign}
          className='card-btn-fill'>
            DONE
          </button>
        </div>
      </Modal>

    </div>
  )
}

export default SelectUsers