import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar'
import api from '../services/api'
import { STATUS_STYLE } from './MyApplications'

const STATUSES = ['applied', 'shortlisted', 'rejected', 'hired']

const Applicants = () => {
  const { id } = useParams()
  const [data, setData] = useState(null)
  const [error, setError] = useState('')

  useEffect(() => {
    api.get(`/job/${id}/applicants`)
      .then((res) => setData(res.data))
      .catch((e) => setError(e.response?.data?.message || 'Could not load applicants'))
  }, [id])

  const changeStatus = async (appId, status) => {
    try {
      await api.patch(`/job/application/${appId}/status`, { status })
      setData((d) => ({ ...d, applicants: d.applicants.map((a) => (a._id === appId ? { ...a, status } : a)) }))
    } catch (e) {
      setError(e.response?.data?.message || 'Could not update status')
    }
  }

  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto pt-24 px-4 text-zinc-800'>
        <Link className='underline' to='/employer'>← Back to dashboard</Link>
        {error && <p className='text-red-600 mt-4'>{error}</p>}
        {data && (
          <>
            <h1 className='text-3xl font-semibold mt-4'>Applicants for {data.job.Title}</h1>
            {data.applicants.length === 0 && <p className='mt-4'>No applications yet.</p>}
            <div className='flex flex-col gap-3 mt-6'>
              {data.applicants.map((a) => (
                <div key={a._id} className='border rounded-lg p-4 flex flex-wrap justify-between items-center gap-3'>
                  <div>
                    <p className='text-xl font-medium'>{a.username}</p>
                    <p className='text-zinc-600'>{a.email}{a.phone ? ` · ${a.phone}` : ''}</p>
                    {a.skills.length > 0 && <p className='text-sm text-zinc-500'>Skills: {a.skills.join(', ')}</p>}
                    <p className='text-sm text-zinc-500'>Applied on {new Date(a.appliedAt).toLocaleDateString()}</p>
                    {a.resume && <a className='underline text-blue-700' href={a.resume} target='_blank' rel='noreferrer'>View resume</a>}
                  </div>
                  <select
                    className={`rounded-full px-3 py-1 capitalize ${STATUS_STYLE[a.status]}`}
                    value={a.status}
                    onChange={(e) => changeStatus(a._id, e.target.value)}
                  >
                    {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Applicants
