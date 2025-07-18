import React, { useState } from 'react'
import { HiMiniPlus,HiOutlineTrash } from "react-icons/hi2"
import {LuPaperclip} from 'react-icons/lu'

function AddAttachmentInput({attachments,setAttachments}) {
    const[option,setOption]=useState("")
    
    function handleAddOption(){
        if(option.trim()){
            setAttachments([...attachments,option.trim()])
            setOption('')
        };
    };

    function handleDeleteOption(index) {
      const updateArr = attachments.filter((_, ind) => ind !== index);
      setAttachments(updateArr);
    };



  return (
    <div>
        {attachments.map((item,index)=>(
            <div 
            key={index}
            className='flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 mt-2'>
                <div className='flex-1 flex items-center gap-3 border border-gray-100'>
                    <LuPaperclip
                    className='text-gray-400'
                     />
                     <p className='text-xs text-black'>{item}</p>
                </div>
                <button
                onClick={()=>handleDeleteOption(index)}
                className='cursor-pointer'>
                    <HiOutlineTrash className='text-lg text-red-500'/>
                </button>
            </div>
        ))}

        <div className='flex items-center gap-5 mt-4 '>
            <div className='flex-1 flex items-center gap-3 border border-gray-100 rounded-md px-3'>
                <LuPaperclip className='text-gray-400' />

                <input 
                className='w-full text-[13px] text-black outline-none bg-white py-2'
                onChange={({target})=>setOption(target.value)}
                type="text" 
                value={option}
                placeholder="Add flie link" />

            </div>
            <button 
            onClick={handleAddOption}
            className='card-btn text-nowrap'>
                <HiMiniPlus className='text-lg' /> Add
            </button>
        </div>

    </div>
  )
}

export default AddAttachmentInput