import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import DashBoardLayout from '../../components/layout/DashBoardLayout';
import moment from 'moment';
import AvatarGroup from '../../components/layout/AvatarGroup';
import {LuSquareArrowOutUpRight} from 'react-icons/lu'
function ViewTaskDeatils() {
  const {id} = useParams();
  const[task,setTask] = useState(null);

  function getStatusTagColor(status){
    switch(status){
      case "In Progress" : return "text-cyan-500 bg-cyan-50 border border-cyan-500/10"
      case "Completed" : return "text-lime-500 bg-lime-50 border border-lime-500/20"
      default  : return "text-violet-500 bg-violet-50 border border-violet-500/10"
    }
  };

  async function getTaskDetailsById(){
    try{
      const res = await axiosInstance.get(API_PATHS.TASK.GET_TASK_BY_ID(id),{withCredentials:true});
      if(res.data.message){
        const taskInfo = res.data.message.task;
        setTask(taskInfo);
      }

    }catch(e){
      console.error("Error fetching Users",e.message);
      
    }
  };

  async function updateTodoChecklist(index){
    const todoChecklist = [...task?.todoChecklist];
    const taskId = id;
    if(todoChecklist && todoChecklist[index]){
      todoChecklist[index].completed = !todoChecklist[index].completed;
    }
    try{
        const res = await axiosInstance.put(API_PATHS.TASK.UPDATE_TODO_CHECKLIST(taskId),{todoChecklist},{withCredentials:true});
        
        if(res.status === 200){
          setTask(res?.data?.message?.updateTask || task);
        }else{
          todoChecklist[index].completed = !todoChecklist[index].completed;
        }
    }catch(e){
      todoChecklist[index].completed = !todoChecklist[index].completed;
    }
  };

function handleLinkClick(link){
  if(!/^https?:\/\//i.test(link)){
    link = "https://"+link;
  };
  window.open(link,"_blank")
  };

  useEffect(()=>{
    if(id){
      getTaskDetailsById()
    }
  },[id])

  return (
    <DashBoardLayout activeMenu="My Tasks">
      <div className="mt-5">
        {task && (<div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-3 py-2 px-3 md:py-2 md:px-3">
            <div className="flex items-center justify-between ">
              <h2 className="text-sm md:text-xl font-medium">{task?.title}</h2>
              <div
                className={`text-[11px] md:text-[13px] font-medium ${getStatusTagColor(
                  task?.status
                )} px-4 py-0.5 rounded`}
              >
                {task?.status}
              </div>
            </div>
            <div className='mt-4'>
              <InfoBox label="Description" value={task?.description}/>
            </div>

            <div className='grid grid-cols-12 gap-4 mt-4'>
              <div className='col-span-6 md:col-span-4'>
                <InfoBox label="Priority" value={task?.priority} />
              </div>
              <div className='col-span-6 md:col-span-4'>
                <InfoBox label="Due Date" value={task?.dueDate ? moment(task?.dueDate).format("DD MMM YYYY") : "N/A"} />
              </div>
              <div className='col-span-6 md:col-span-4'>
                <label className="text-xs font-medium text-slate-500">Assigned To</label>
                <AvatarGroup avatars={task?.assignedTo?.map((item)=>item?.profileImageUrl) || [] } maxVisible={5} />
              </div>
            </div>
                
          <div className='mt-2'>
            <label className="text-xs font-medium text-slate-500">
              Todo Checklist
            </label>
            {task?.todoChecklist?.map((item,index)=>(
              <TodoChecklist
              key={`todo_${index}`}
              text={item?.text}
              isChecked={item?.completed}
              onChange={()=>updateTodoChecklist(index)}
              />

            ))}
          </div>

            {task?.attachments?.length > 0 && (
              <div className='mt-2'>
              <label className="text-xs font-medium text-slate-500">
                Attachments
              </label>
              {task?.attachments?.map((link,index)=>(
                <Attachments
                key={ `link_${index}`}
                link={link}
                index={index}
                onClick={()=>handleLinkClick(link)}
                />
              ))}
            </div>
            )}
            
          </div>
        </div>
      )}

      </div>
    </DashBoardLayout>
  );
}

export default ViewTaskDeatils;

function InfoBox({label,value}){
  return <>
  <label className="text-xs font-medium text-slate-500">{label}</label>
  <p className='text-[12px] md:[13px] font-medium text-gray-700 mt-0.5'>{value}</p>
  </>
};

function TodoChecklist({ text, isChecked, onChange }) {
  return <div className='flex items-center gap-3 p-3'>
    <input
    className='w-4 h-4 text-blue-600 bg-gray-100 border border-gray-300 rounded-sm outline-none cursor-pointer'
    type="checkbox"
    onChange={onChange}
    checked={isChecked}
     />
  <p className='text-[13px] text-gray-800'>{text}</p>
  </div>
};


function Attachments({link,index,onClick}){

  return <div 
          className='flex justify-between bg-gray-50 border border-gray-100 px-3 py-2 rounded-md mb-3 cursor-pointer'
          onClick={onClick}
          >
    <div className='flex-1 flex justify-center gap-3 '>
      <span className='text-xs text-gray-400 font-semibold mr-2'>{index > 9 ? `0${index + 1}` : index + 1}</span>
      <p className='text-xs text-black'>{link}</p>
    </div>
    <LuSquareArrowOutUpRight className='text-gray-400' />
  </div>
}