import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../context/AuthContext"
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'
import { MdEdit } from "react-icons/md";

const Profile = () => {
  let {user}= useContext(AuthContext)
  const [profile,setprofile]=useState(null)
  useEffect(()=>{
    const fetchprofile=async()=>{
     try {
      let response=await axios.get(`${import.meta.env.VITE_API_URL}/user/profileview`,{
        params:{
          username:user.username,
          email:user.email
        }
       })
       setprofile(response.data)
     } catch (error) {
      console.log(error)
     }
    }
      fetchprofile()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
  return (
    <div>
     {profile && (<div className="bg-white h-screen w-full p-6 text-zinc-700 flex flex-col gap-3 py-14 ">

<div className="bg-[#F9F6EE] h-50 w-[88%] rounded-xl mx-auto border border-zinc-300">
  <div className="w-full h-full flex gap-8 p-6 px-14 justify-between">
  <div className="relative rounded-full bg-green-300 h-40 w-40">
    <img className=" object-cover object-top-left rounded-full w-full h-full" src={profile?.imageURL || "https://via.placeholder.com/150"} />
  <Link className="absolute top-0 right-[-40px]" to={'/profileform'}><MdEdit/></Link>
  </div>
  
  
  <div className="flex flex-col gap-6">          
   <div><h1 className="text-2xl text-black font-semibold">{user.username}</h1></div> 
    <div className="flex gap-6 justify-between">
      <div className="p-1">
        <h5 className=" mb-[9px]">{profile.preferences?.[0]?.location || "location"}</h5>
        <h5 className=" mb-[9px]">Fresher</h5>
        <h5 className=" mb-[9px]">{profile.preferences?.[0]?.jobType || "Jobtype"}</h5>
      </div>
      <div className="flex flex-col gap-3">
        {profile && (<h5 className="mt-1">{profile.PhoneNo||'phoneNo'}</h5>)}
        
        <h5 className="">{user.email}</h5>
      </div>
    </div>
  </div>
  {profile && (
<div className="flex flex-col gap-4">
<h1 className="text-3xl font-md text-black">Education</h1>
<p>{profile.education?.[0]?.institution || "Institution Name"}</p>
<p>{profile.education?.[0]?.degree || "Degree"}</p>
<p><span>{profile.education?.[0]?.startYear || "Start year"}</span>-<span>{profile.education?.[0]?.endYear || "End year"}</span></p>
</div>
)}
  </div>
</div>


<div className="w-[88%] h-50  mx-auto flex gap-1  rounded-xl">
<div className="w-[30%] h-52 rounded-xl px-5 py-1 bg-[#F9F6EE] border border-zinc-300">
<h1 className="text-black  font-bold px-10 text-3xl">Skills</h1>
<div className="flex-col flex-wrap gap-1 px-6 py-2">
{profile.skills?.map((skill)=>(
  <h1 className="text-xl font-medium text-zinc-800 overflow-y-auto">{skill}</h1>
))||'Skills'}
</div>
</div>
<div className="w-[70%] h-52 rounded-xl bg-[#F9F6EE] flex justify-evenly px-6 py-3 border border-zinc-300">
{profile && ( <div className="px-4 py-2 flex flex-col gap-4">
<h1 className="font-lg text-black text-2xl">Experience</h1>
<p>{profile.experience?.[0]?.company || "Company name"}</p>
<p>{profile.experience?.[0]?.position || "Position"}</p>
<p>{profile.experience?.[0]?.expyear || "Serving years"}</p>
 
</div>)}

<div className="flex flex-col gap-4 px-4 py-2"> 
<h1 className="text-2xl font-lg text-black">Resume & links</h1>
{/* <p>{profile.Resume||'Resume'}</p> */}
<p>
  <a
    href={profile?.resumeURL}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 underline"
  >
   Resume
  </a>
</p> 



<p>
  <a
    href={profile?.socialLinks?.[0]?.linkedin || "#"}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 underline"
  >
    LinkedIn
  </a>
</p>
<p>
  <a
    href={profile?.socialLinks?.[0]?.github || "#"}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 underline"
  >
    GitHub
  </a>
</p>
</div>
</div>
</div>
</div>)}
    </div>
   
    
  )
}

export default Profile
