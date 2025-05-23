import Jobcomponent from "./Jobcomponent"
import { useEffect, useState } from "react"
import axios from 'axios'
const Jobsection = () => {
  const[jobs,setjobs]=useState(null)
  useEffect( ()=>{
    const Alljobes=async ()=>{
      let response=await axios.get(`${process.env.REACT_APP_API_URL}/job/jobsdata`)
      setjobs(response.data)
    }
    Alljobes()
  },[])
  return (
    <div>
      {jobs && (<div className="w-full p-4">
        <div className="w-full flex flex-col gap-10 items-center justify-center">
            <div className="heading mt-24 ">
                <h1 className="text-4xl font-semibold ">Latest Jobs & Internships on SkillVara</h1>
            </div>
            <div className="jobs flex flex-wrap gap-3 items-center justify-center">
                {jobs.map((item,index)=>(
                  <Jobcomponent item={item}key={index}/>
                ))}
            </div>
        </div>
    </div>)}
    </div>
    
  )
}

export default Jobsection
