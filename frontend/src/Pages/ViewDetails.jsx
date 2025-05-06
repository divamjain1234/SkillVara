import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
const ViewDetails = () => {
  const{id}=useParams()
  const[job,setjob]=useState(null)
  const[applied,setapplied]=useState(false)
  const [message, setMessage] = useState('');
  const handlesubmit=()=>{
    setapplied(true)
    setMessage('Your details have been sent to recruiter ✅');

    // Hide message after 3 seconds
    setTimeout(() => {
      setMessage('');
    }, 3000);
  };
  
  useEffect(()=>{
    const handlejobs=async()=>{
      let response=await axios.get(`http://localhost:3000/job/viewdetails/${id}`)
         setjob(response.data)
    }
    if(id){
      handlejobs()
    }
  },[id])
  return (
    <div>
    {job && (
      <div className='w-full h-screen bg-amber-100 p-1 text-black' >
        {message && (
            <div className='bg-green-500 text-white px-4 py-2 text-center font-medium'>
              {message}
            </div>
          )}
      <div className='w-[900px] border[1px] border-zinc-800 bg-sky-300 mx-auto my-10 h-[80%]'>
     
        <div className='w-full h-full p-3 px-5'>
          <h1 className='text-3xl font-bold mx-60'>{job.Title}</h1>
          <div className=''>
            <h1 className='font-semibold '>{job.Title}</h1>
            <h1 className='font-medium text-zinc-600 '>{job.Company}</h1>
          </div>
          <div className='desc mt-4'>
            <h1 className=' font-semibold '>About the job</h1>
            <p className='text-zinc-700'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa voluptatem harum aliquid nesciunt accusamus, assumenda officia accusantium ad illum vitae nulla nihil quasi, at quod. Ipsa, quam repudiandae debitis labore voluptatem porro numquam, deleniti totam fugit maiores, ea temporibus reiciendis.</p></div>
          <div className='flex justify-between items-center font-lg text-xl mt-8 px-10'>
            <h1>{job.Salary}</h1>
            <h1>{job.Duration}</h1>
            <h1>{job.Location}</h1>
            <h1>{job.Jobtype}</h1>
          </div>
          <div className='flex gap-8 mt-5 px-10'>
            <h1 className='text-green-600'>Posted just now</h1>
            <h1 className='text-zinc-700'>fresher job</h1>
          </div>
          <div className='mt-10 justify-between px-4 flex '>
            <p className='text-zinc-700'>Be an early applicant</p>
            {<button onClick={handlesubmit} className={`px-3 py-2 ${applied?'bg-blue-700':'bg-red-200'} rounded-xl`}>{applied ? 'Applied' : 'Apply'}</button>}
            
          </div>
        </div>
      </div>
    </div>
  )}
    </div>
  )
}

export default ViewDetails