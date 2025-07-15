import React from 'react'
import {LuPaperclip} from 'react-icons/lu'
import moment from 'moment'
import Progress from '../Progress'
import AvatarGroup from '../layout/AvatarGroup'

function TaskCard(
{  title,
  description,
  priority,
  status,
  progress,
  createdAt,
  dueDate,
  assignedTo,
  completedTodoCount,
  attachmentCount,
  todoChecklist,
  onClick}
) {
    
    function getStatusTagColor(){
        switch(status){
            case "In Progress": return "text-cyan-50 bg-cyan-500 border border-cyan-500/10"
            case "Completed": return "text-lime-50 bg-lime-500 border border-lime-500/20"
            default: return "text-violet-50 bg-violet-500 border border-violet-500/10"
        };
    };

    function getPriorityTagColor(){
        switch(priority){
            case "Low": return "text-emerald-50 bg-emerald-500 border border-emrald-500/10"
            case "Medium": return "text-amber-50 bg-amber-500 border border-amber-500/10"
            default: return "text-rose-50 bg-rose-500 border border-rose-500/10"
        };
    };



  return <div className='bg-white rounded-xl py-4 shadow-md shadow-gray-100 border border-gray-200/50 cursor-pointer' onClick={onClick}>
    <div className='flex items-end gap-3 px-3 '>
        <div className={`text-[11px] font-medium ${getStatusTagColor()} px-4 py-0.5 rounded`}>
            {status}
        </div>
        <div className={`text-[11px] font-medium ${getPriorityTagColor()} px-4 py-0.5 rounded`}>
            {priority} Priority
        </div>
    </div>
    <div className={`px-4 border-1-[3px] ${status === "In Progress" ? "border-cyan-500" : status=== "Completed" ? "border-indigo-500" :"border-violet-500"}`}>
        <p className='text-sm font-medium text-gray-800 mt-4 line-clamp-2 '>{title}</p>
        <p className='text-xs text-gray-500 mt-1.5 line-clamp-2 leading-[18px]'>{description}</p>
        <p className='text-[13px] text-gray-700/80 font-medium mt-2 mb-2 leading-[18px]'> Task Done:{' '}
            <span className='font-semibold text-gray-700'>{completedTodoCount} / {todoChecklist.length || 0}</span>
        </p>
        <Progress progress={progress} status={status}/>        
    </div>
    <div className='px-4'>
        <div className='flex items-center justify-between my-1'>
            <div>
                <label className="text-xs text-gray-500">
                    Start Date
                </label>
                <p className='text-[13px] font-medium text-gray-900'>
                {moment(createdAt).format("Do MMM YYYY")}
                </p>
            </div>
            <div className='text-xs text-gray-500'>
                <label className="">Due Date</label>
                <p className='text-[13px] font-medium text-gray-900'>{moment(dueDate).format("Do MMM YYYY")}</p>
            </div>
        </div>
        <div className='flex items-center justify-between mt-3'>
            <AvatarGroup
            avatars={assignedTo || []}
            />
            {attachmentCount > 0 && (
                <div className='flex items-center gap-2 bg-blue-50 px-2.5 py-1.5 rounded-lg'>
                    <LuPaperclip className='text-blue-600' />
                    {" "}
                    <span className='text-xs text-gray-900'>{attachmentCount}</span>
                </div>
            )}
        </div>
    </div>
  </div>
}

export default TaskCard