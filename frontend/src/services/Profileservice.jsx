import axios from "axios"
export const createprofile=async (formData)=>{
   try {
    let res=await axios.post(`${import.meta.env.VITE_API_URL}/user/createprofile`,formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Required for file upload
      },
    })
    return res
   } catch (error) {
    console.log(error)
    return null
   }}
   
