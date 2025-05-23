import { useContext,useState } from "react"
import Button from "../components/Button"
import SkillsInput from "../components/Skills"
import {createprofile} from '../services/Profileservice'
import { useForm } from "react-hook-form"
import { AuthContext } from "../context/AuthContext"
const ProfileForm = () => {

  const {user}=useContext(AuthContext)
  const [skills, setSkills] = useState([]);

  const postsubmit=async (data)=>{
    const formData = new FormData();
  
    if (data.image?.[0]) formData.append('image', data.image[0]);
    if (data.resume?.[0]) formData.append('resume', data.resume[0]);
    if (data.refrence?.[0]) formData.append('refrence', data.refrence[0]);

  // Append other fields
  for (const key in data) {
    if (!['image', 'resume', 'refrence'].includes(key)) {
      formData.append(key, data[key]);
    }
  }
  skills.forEach(skill => {
    formData.append('skills[]', skill);  // Use 'skills[]' to send an array of skills
  });
  // Log FormData entries
  for (const [key, value] of formData.entries()) {
  }
    await createprofile(formData)
  }
 const{register,handleSubmit} =useForm()
 if (!user) {
  return <div className="text-center text-xl p-4">Loading user...</div>;
}
  return (
    <div className="h-full w-[60%] rounded-2xl text-zinc-700 border-[1px] border-[#64B4F5] mx-auto">
      <div className="h-full w-full p-4">
        <form encType="multipart/form-data" onSubmit={handleSubmit(postsubmit)}>
          <div>
          <h1 className="text-2xl font-lg mb-2">Personal details</h1>
         <div className="flex gap-[5px]">
          <input {...register('username')} className="ml-1 px-[2px] border-[1px] border-[#E00E0]  outline-[1px] outline-transparent focus:border-[#E0E0E0] focus:outline-[#64B4F5]" type="text" placeholder="Username" value={user.username} />
          <input {...register('email')} className="ml-1 px-[2px] border border-[#E00E0]  outline-[1px] outline-transparent focus:border-[#E0E0E0] focus:outline-[#64B4F5]" type="email" value={user.email} />
          <input {...register('phoneNo')} className="ml-1 px-[2px] border border-[#E00E0]  outline-[1px] outline-transparent focus:border-[#E0E0E0] focus:outline-[#64B4F5]" type="tel" placeholder="Phone-no" />
         </div>
        <h2 className="m-2 text-2xl font-lg ml-1">Location</h2>
       <div className="flex gap-8"> 
  <label>
    <input {...register('region')} type="radio"  value="india" />
    India
  </label>
  <label>
    <input {...register('region')} type="radio"  value="outside" />
    Outside India
  </label>
  <input {...register('image')} type="file"/>
       </div>
          </div>
<div>
<h1 className="m-2 text-2xl font-lg ml-1 ">Education</h1>
       <div className="flex gap-4 flex-wrap">
        <input {...register('degree')} className="px-3 border border-[#E00E0]  outline-[1px] outline-transparent focus:border-[#E0E0E0] focus:outline-[#64B4F5]" type="text" placeholder="Graduation"/>
        <input {...register('institution')} className="px-3 border border-[#E00E0]  outline-[1px] outline-transparent focus:border-[#E0E0E0] focus:outline-[#64B4F5]" type="text" placeholder="Instituion"/>
        <input {...register('startyear')} className="px-3 border border-[#E00E0]  outline-[1px] outline-transparent focus:border-[#E0E0E0] focus:outline-[#64B4F5]"type="number"placeholder="startyear" />
        <input {...register('finishyear')} className="px-3 border border-[#E00E0]  outline-[1px] outline-transparent focus:border-[#E0E0E0] focus:outline-[#64B4F5]"type="number"placeholder="endyear" />
       </div>
</div>
<div>
  <h1 className="m-2 text-2xl font-lg ml-1 " >Skills </h1>
  <div>
   <label>
    <SkillsInput skills={skills} setSkills={setSkills}/>
   </label>
    {/* <input className="px-3 m-2 ml-1 border border-[#E00E0]  outline-[1px] outline-transparent focus:border-[#E0E0E0] focus:outline-[#64B4F5]" type="text" placeholder="skills"/> */}
  </div>
    <h2 className="m-2 text-2xl font-lg ml-1 ">Job-type</h2>
  <div className="flex gap-4">
  <label>
    <input {...register('jobtype')} type="radio" value="Part-time" />
    Part-time
  </label>
  <label>
    <input {...register('jobtype')} type="radio" value="Fulltime" />
    Full-time
  </label>
  </div>
</div>
<div>
            <h1 className="text-2xl font-lg m-2 ml-1 ">Experience</h1>
            <div className="flex gap-1">
            <input {...register('company')} className="rounded-lg px-1 border border-[#E00E0]  outline-[1px] outline-transparent focus:border-[#E0E0E0] focus:outline-[#64B4F5] m-2" type="text" placeholder="company name"/>
            <input {...register('position')} className="rounded-lg px-1 border border-[#E00E0]  outline-[1px] outline-transparent focus:border-[#E0E0E0] focus:outline-[#64B4F5] m-2" type="text" placeholder="Position"/>
            <input {...register('expyear')} className="rounded-lg px-1 w-32 border border-[#E00E0]  outline-[1px] outline-transparent focus:border-[#E0E0E0] focus:outline-[#64B4F5] m-2" type="number" placeholder="experience"/>
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-lg  mr-2 ml-1 ">Social links</h1>
            <input {...register('github')} className="rounded-md px-1 border border-[#E00E0]  outline-[1px] outline-transparent focus:border-[#E0E0E0] focus:outline-[#64B4F5] m-2" type="url" placeholder="github Account"/>
            <input {...register('linkedin')} className="rounded-md px-1 border border-[#E00E0]  outline-[1px] outline-transparent focus:border-[#E0E0E0] focus:outline-[#64B4F5] m-2" type="url" placeholder="Linkedn Account"/>
          </div>
          <div>
            <h1 className="text-2xl font-lg m-2 ml-1 ">Upload Resume & Refrence letter</h1>
            <div className="flex gap-1">
            <input className=" px-1 w-52 border-[1px] m-2" type="file" {...register('resume')}/>
            <input className=" px-1 w-52 border-[1px] m-2" type="file" {...register('refrence')} />
            </div>
          </div>

        <div className="flex gap-3 justify-end mt-4 ">
        <input className="min-w-18 py-1 px-3 text-white bg-[#5776c9] rounded-md" type="submit"  value={'save'}/>
        <Button name={'Cancel'} to={'/profile'}/>
        </div>
        </form>
      </div>
    </div>
  )
}

export default ProfileForm
