import {Link} from 'react-router-dom'
const Jobcomponent = ({item}) => {
    return (
      <div className="w-62 h-56 border-[1px] border-zinc-400 bg-[#fcfcfcd7] text-zinc-800 rounded-lg px-4 py-3">
          <div className="post ">
        <h1 className="text-xl font-semibold">{item?.Title || "Untitled Role"}</h1>
        <h2 className="text-base">{item?.Company || "Unknown Company"}</h2>
          </div>
          <div className="location mt-3 text-lg font-medium">
              <h1>{item?.Location || "Location N/A"}</h1>
              <h1>{item?.Salary || "Salary not specified"}</h1>
              <h1>{item?.Duration || "Duration not available"}</h1>
          </div>
          <div className="flex justify-between items-center mt-6">
              <h1>Job</h1>
              <Link to={`/viewdetails/${item._id}`}>view details</Link>
          </div>
      </div>
    )
  }
  
  export default Jobcomponent
  
  