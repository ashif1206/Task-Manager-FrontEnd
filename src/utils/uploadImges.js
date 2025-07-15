import { API_PATHS } from "./apiPaths";
import axiosInstance from "./axiosInstance";

async function uploadImage(imageFile){

    const formData = new FormData();

    formData.append("image", imageFile);

    try{

        const res = await axiosInstance.post(API_PATHS.IMAGE.UPLOAD_IMAGE,formData,{
            withCredentials:true,
            headers:{
                'Content-Type' :'multipart/formdata',
            },
        });
        //  res.data.message.imageUrl
        return res.data.message.imageUrl;

    }catch(e){
        console.error("Error uploading the file",e);
        throw error;
    }

};

export default uploadImage;