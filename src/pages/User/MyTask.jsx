import React, { useEffect, useState } from 'react'
import DashBoardLayout from '../../components/layout/DashBoardLayout'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { LuFileSpreadsheet } from 'react-icons/lu'
import TaskStatusTab from '../../components/layout/TaskStatusTab'
import TaskCard from '../../components/Cards/TaskCard'
import toast from 'react-hot-toast'

function MyTask() {
  const [allTasks,setAllTAsks] = useState([])
  const [tabs,setTabs] = useState([])
  const [filterStatus,setFilterStatus] = useState("All")
  const navigate = useNavigate()

  async function getAllTask (){
    try{
      const res = await axiosInstance.get(API_PATHS.TASK.GET_ALL_TASK,{
        params:filterStatus === "All" ? {} : {status:filterStatus},
        withCredentials:true
      });
      const result = res.data.message

      setAllTAsks(result.tasks.length > 0 ? result.tasks : [] );

      const statusSummary = result.statusSummary || {};

      const statusArr = [
        {label:"All", count:statusSummary.all || 0},
        {label:"Pending", count:statusSummary.pendingTask || 0},
        {label:"In Progress", count:statusSummary.inProgressTask || 0},
        {label:"Completed", count:statusSummary.completedTask || 0},
      ]

      setTabs(statusArr)

    }catch(e){
      console.error("Error Fetching get All Task",e);
    }
  }

  function handleClick(userId){
    navigate(`/user/task-details/${userId}`)
  }

  useEffect(()=>{
    getAllTask(filterStatus);

    return ()=>{};
  },[filterStatus])

  return (
    <DashBoardLayout activeMenu="My Tasks">
      <div className='my-5'>
        <div className='flex flex-col lg:flex-row lg:items-center justify-between'>
         <h2 className='text-xl md:text-xl font-medium'>My Tasks</h2>
          {
            tabs?.[0]?.count > 0 && (
                <TaskStatusTab
                tabs={tabs}
                activeTabs={filterStatus}
                setActiveTabs={setFilterStatus}
                />
            )
          }
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-4 mt-4'>
          {allTasks?.map((item,index)=>(
            <TaskCard
            key={item._id}
            title={item.title}
            description={item.description}
            priority={item.priority}
            status={item.status}
            progress={item.progress}
            createdAt={item.createdAt}
            dueDate={item.dueDate}
            assignedTo={item.assignedTo?.map((item)=>item.profileImageUrl)}
            completedTodoCount={item.completedTodoCount ||0}
            attachmentCount={item?.attachments?.length || 0}
            todoChecklist={item.todoChecklist || []}
            onClick={()=>handleClick(item._id)}
            />
          ))}
        </div>
      </div>
    </DashBoardLayout>
  )
}

export default MyTask