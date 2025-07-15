
export const BASE_URL = "http://localhost:8000";

export const API_PATHS ={
    AUTH:{
        REGISTER:"/api/auth/register",
        LOGIN:"/api/auth/login",
        GET_PROFILE:"/api/auth/profile",
    },
    USERS:{
        GET_ALL_USERS:"/api/user",
        GET_USER_BY_ID:(userID)=>`api/user/${userID}`,
        CREATE_USER:`/api/user`,
        UPDATE_USER:(userID)=>`/api/user/${userID}`,
        DELETE_USER:(userID)=>`/api/user/${userID}`,
    },
    TASK:{
        GET_DASHBOARD_DATA:"/api/tasks/dashboard-data",
        GET_USER_DASHBOARD_DATA:"/api/tasks/user/dashboard-data", 
        GET_ALL_TASK:"/api/tasks",
        GET_TASK_BY_ID:(taskId)=>`/api/tasks/${taskId}`,
        CREATE_TASK:"/api/tasks",
        UPDATE_TASK:(taskId)=>`/api/tasks/${taskId}`,
        DELETE_TASK:(taskId)=>`/api/tasks/${taskId}`,
        UPDATE_TASK_STATUS:(taskId)=>`/api/tasks/${taskId}/status`,
        UPDATE_TODO_CHECKLIST:(taskId)=>`/api/tasks/${taskId}/todo`,
    },

    REPORTS:{
        EXPORT_TASKS:"/api/reports/export/tasks",
        USERS:"/api/reports/export/users",
    },

    IMAGE:{
        UPLOAD_IMAGE:"/api/auth/upload-image"
    }
}