import Jobcomponent from '../components/Jobcomponent'
import Filters from './Filters'
import { useEffect, useState } from "react"
import axios from 'axios'
const Mainsection = () => {
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
      {jobs && (<div className="pt-17 px-4 bg-[#BDD2D2] flex justify-between">
        <div>
        <Filters/>
        </div>
        <div className='w-[78%] rounded-xl h-[90%] px-5 py-3' >
            <div className='w-full h-full flex flex-wrap gap-[7px] '>
          {jobs.map((item,index)=>(
           <Jobcomponent item={item} key={index}/>
          ))}
            </div>
        </div>
    </div>)}
    </div>
    
  
)
}

export default Mainsection
