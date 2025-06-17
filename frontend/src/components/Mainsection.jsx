import Jobcomponent from '../components/Jobcomponent'
import Filters from './Filters'
import { useEffect, useState } from "react"
import axios from 'axios'

const Mainsection = () => {
  const [jobs, setJobs] = useState(null)

  useEffect(() => {
    const AllJobs = async () => {
      let response = await axios.get(`${import.meta.env.VITE_API_URL}/job/jobsdata`)
      setJobs(response.data)
    }
    AllJobs()
  }, [])

  return (
    <div className="bg-[#BDD2D2] min-h-screen pt-20 px-6">
      {jobs && (
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Filters Panel */}
          <div className="w-full lg:w-1/4 bg-white rounded-xl p-4 shadow-md">
            <Filters />
          </div>

          {/* Job Cards Section */}
          <div className="w-full lg:w-3/4 bg-white rounded-xl p-5 shadow-md">
            <div className="flex flex-wrap gap-6">
              {jobs.map((item, index) => (
                <Jobcomponent item={item} key={index} />
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  )
}

export default Mainsection
