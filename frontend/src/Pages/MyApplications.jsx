import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import api from '../services/api'

export const STATUS_STYLE = {
  applied: 'bg-blue-100 text-blue-800',
  shortlisted: 'bg-green-100 text-green-800',
  rejected: 'bg-red-100 text-red-800',
  hired: 'bg-emerald-200 text-emerald-900',
}

const MyApplications = () => {
  const [apps, setApps] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get('/job/applications/mine')
      .then((res) => setApps(res.data))
      .catch(() => setError('Could not load your applications'))
  }, [])

  return (
    <div>
      <Navbar />
      <div className='max-w-3xl mx-auto pt-24 px-4 text-zinc-800'>
        <h1 className='text-3xl font-semibold mb-6'>My applications</h1>
        {error && <p className='text-red-600'>{error}</p>}
        {apps && apps.length === 0 && (
          <p>You have not applied to any job yet. <Link className='underline' to='/main'>Browse jobs</Link></p>
        )}
        <div className='flex flex-col gap-3'>
          {apps && apps.map((a) => (
            <div key={a._id} className='border rounded-lg p-4 flex justify-between items-center'>
              <div>
                <Link className='text-xl font-medium underline' to={`/viewdetails/${a.job._id}`}>{a.job.Title}</Link>
                <p className='text-zinc-600'>{a.job.Company} · {a.job.Location}</p>
                <p className='text-sm text-zinc-500'>Applied on {new Date(a.appliedAt).toLocaleDateString()}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm capitalize ${STATUS_STYLE[a.status]}`}>{a.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyApplications
