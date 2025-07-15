import React, { useEffect } from 'react'
import DashBoardLayout from '../../components/layout/DashBoardLayout'
import axiosInstance from '../../utils/axiosInstance'
import { API_PATHS } from '../../utils/apiPaths'
import { PRIORITY_DATA } from '../../utils/data'
import toast from 'react-hot-toast'
import moment from 'moment'
import {useNavigate,useLocation} from 'react-router-dom'
import {LuTrash2} from 'react-icons/lu'
import { useState } from 'react'
import SelectDropDown from '../../components/inputs/SelectDropDown'
import SelectUsers from '../../components/inputs/SelectUsers'
import TodoListInput from '../../components/inputs/TodoListInput'
import AddAttachmentInput from '../../components/inputs/AddAttachmentInput'
import Modal from '../../components/layout/Modal'
import DeleteAlert from '../../components/layout/DeleteAlert'

function CreateTask() {
  
  const[taskData,setTaskData] = useState({
    title:"",
    description:"",
    priority:"Low",
    dueDate:null,
    assignedTo:[],
    todoChecklist:[],
    attachments:[],
  });

  const navigate = useNavigate();
  const location = useLocation();
  const {taskId}= location.state || {};
  const [currentTask,setCurrentTask] = useState(null);
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false);
  const [openDeleteAlert,setOpenDeleteAlert] = useState(false);

  function clearData(){
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: null,
      assignedTo: [],
      todoChecklist: [],
      attachments: [],
    });

  };

  function handleChangeValues(key,value){
    setTaskData((prevData)=>({...prevData,[key]:value}))
  };

  async function createTask() {
    setLoading(true)
    try{
      
      const todolist = taskData.todoChecklist?.map((item)=>({
        text:item,
        completed:false

      }));
             
      const res = await axiosInstance.post(API_PATHS.TASK.CREATE_TASK,{
        ...taskData,
         dueDate: new Date(taskData.dueDate).toISOString(),
         todoChecklist: todolist,
      },{withCredentials:true});
      
      toast.success("Task Created Succefully");

      clearData();

    }catch(e){
      console.error("Error Creating Task",e);
      setLoading(false);
    }finally{
      setLoading(false);
    };


  };

  async function handleSubmit() {
    setError(null);
    try{
      if(!taskData.title.trim() || !taskData.description.trim() || !taskData.dueDate.trim()){
        setError("All fields are requird.")
        return;
      };
      if(taskData.assignedTo?.length === 0 || taskData.todoChecklist?.length === 0){
        setError("Task not Assigned to any Member or Add atleast one TODO task.");
        return;
      };

      if(taskId){
        updateTask();
        return;
      };
       
     createTask();

    }catch(e){
      console.error("Task Does not create",e);
    }
  };

  async function updateTask() {
    setLoading(true)
    try{
      const prevTodoChecklist = currentTask?.todoCheckList || [];

        const todolist = taskData?.todoChecklist?.map((item)=>{
          const matchedTask = prevTodoChecklist.find((task)=>task.text == item);
          return {
            text:item,
            completed:matchedTask ? matchedTask.completed : false,
          }
        });

        const res = await axiosInstance.put(API_PATHS.TASK.UPDATE_TASK(taskId),{
          ...taskData,
          dueDate: new Date(taskData.dueDate).toISOString(),
          todoChecklist:todolist
        },{withCredentials:true});
        toast.success("Task Updated Succefully")
    }catch(e){
      console.error("Error Update Task",e);
      setLoading(false);
    }finally{
      setLoading(true)
    }

  };

  async function getTaskDetailsById() {
    try{
          const res = await axiosInstance.get(API_PATHS.TASK.GET_TASK_BY_ID(taskId),{withCredentials:true});
          if(res.data.message){
            const taskInfo = res.data.message.task;
            setCurrentTask(taskInfo);
            
            setTaskData((prevState)=>({
              title: taskInfo.title,
              description: taskInfo.description,
              priority: taskInfo.priority,
              dueDate: taskInfo.dueDate ? moment(taskInfo.dueDate).format('YYYY-MM-DD') : null,
              assignedTo:taskInfo?.assignedTo?.map((item)=>item?._id) || [] ,
              todoChecklist:taskInfo?.todoChecklist?.map((item)=>item?.text) || [],
              attachments:taskInfo?.attachments ||[],
            }))
          }
    }catch(e){
      console.error("Error Fetching User",e);
    }
  };
  
  async function deleteTask() {
    try{
      console.log(taskId)
       await axiosInstance.delete(API_PATHS.TASK.DELETE_TASK(taskId),{withCredentials:true})
      
      setOpenDeleteAlert(false);
      toast.success("Task Deleted Succefully");
      navigate("/admin/task");
    }catch(e){
      console.error("Error Deleting Task",e.message);     
    }
  };

  useEffect(()=>{
    if(taskId){
      getTaskDetailsById(taskId)
    }
  },[taskId])

  return (
  <DashBoardLayout activeMenu="Create Task">
    <div className="px-3 md:px-8 lg:pl-12 lg:pr-20">
      <div className="grid grid-cols-1 md:grid-cols-4 mt-4 gap-4">
        <div className="form-card col-span-1 md:col-span-3 w-full p-4 md:p-6 lg:p-8">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-xl font-medium">
              {taskId ? "Update Task" : "Create Task"}
            </h2>
            {taskId && (
              <button
                className="flex items-center gap-1.5 text-sm font-medium text-rose-500 bg-rose-50 rounded px-3 py-1 hover:border-rose-300"
                onClick={() => setOpenDeleteAlert(true)}
              >
                <LuTrash2 className="text-base" />
                Delete
              </button>
            )}
          </div>

          <div className="mt-4">
            <label className="text-xs font-medium text-slate-600">
              Task Title
            </label>
            <input
              placeholder="Create app UI"
              className="form-input w-full"
              value={taskData.title}
              onChange={({ target }) =>
                handleChangeValues("title", target.value)
              }
              type="text"
            />
          </div>

          <div className="mt-3">
            <label className="text-xs font-medium text-slate-600">
              Description
            </label>
            <textarea
              placeholder="Describe task"
              className="form-input w-full"
              rows={4}
              value={taskData.description}
              onChange={({ target }) =>
                handleChangeValues("description", target.value)
              }
            ></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <div>
              <label className="text-xs font-medium text-slate-600">
                Priority
              </label>
              <SelectDropDown
                option={PRIORITY_DATA}
                value={taskData?.priority}
                onChange={(value) => handleChangeValues("priority", value)}
                placeholder="Select Priority"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-600">
                Due Date
              </label>
              <input
                className="form-input w-full"
                value={taskData.dueDate || null}
                onChange={({ target }) =>
                  handleChangeValues("dueDate", target.value)
                }
                type="date"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-600">
                Assign To
              </label>
              <SelectUsers
                selectedUSers={taskData.assignedTo}
                setSelectedUSers={(value) =>
                  handleChangeValues("assignedTo", value)
                }
              />
            </div>
          </div>

          <div className="mt-4">
            <label className="text-xs font-medium text-slate-600">
              TODO Checklist
            </label>
            <TodoListInput
              todoList={taskData?.todoChecklist}
              setTodoList={(value) =>
                handleChangeValues("todoChecklist", value)
              }
            />
          </div>

          <div className="mt-4">
            <label className="text-xs font-medium text-slate-600">
              Add Attachments
            </label>
            <AddAttachmentInput
              attachments={taskData?.attachments}
              setAttachments={(values) =>
                handleChangeValues("attachments", values)
              }
            />
          </div>

          {error && (
            <p className="text-xs font-medium text-red-500 mt-4">{error}</p>
          )}

          <div className="flex justify-end mt-6">
            <button
              className="add-btn"
              onClick={handleSubmit}
              disabled={loading}
            >
              {taskId ? "UPDATE TASK" : "CREATE TASK"}
            </button>
          </div>
        </div>
      </div>
    </div>
    <Modal
    isOpen={openDeleteAlert}
    onClose={()=>setOpenDeleteAlert(false)}
    title="Delete Task"
    >
      <DeleteAlert
      content="Are you sure you want ti delete this task?"
      onDelete={()=>deleteTask()}
      />
    </Modal>
  </DashBoardLayout>
);

}

export default CreateTask