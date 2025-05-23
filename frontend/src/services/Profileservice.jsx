import axios from "axios"
export const createprofile=async (formData)=>{
   try {
    let response=await axios.post(`${process.env.REACT_APP_API_URL}/user/createprofile`,formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Required for file upload
      },
    })
   } catch (error) {
    console.log(error)
   }}
   
