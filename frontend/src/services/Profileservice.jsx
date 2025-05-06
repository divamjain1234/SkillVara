import axios from "axios"
export const createprofile=async (formData)=>{
   try {
    let response=await axios.post("http://localhost:3000/user/createprofile",formData, {
      headers: {
        "Content-Type": "multipart/form-data", // Required for file upload
      },
    })
    console.log(response.data)
   } catch (error) {
    console.log(error)
   }}
   