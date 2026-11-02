import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import api from '../services/api'
import { AuthContext } from '../context/AuthContext'

const ViewDetails = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user, isAuthenticated } = useContext(AuthContext)
  const [job, setjob] = useState(null)
  const [notFound, setNotFound] = useState(false)
  const [applied, setapplied] = useState(false)
  const [sending, setSending] = useState(false)
  const [message, setMessage] = useState(null) // { text, ok, profileLink }

  useEffect(() => {
    const handlejobs = async () => {
      try {
        const response = await api.get(`/job/viewdetails/${id}`)
        setjob(response.data)
        setapplied(!!response.data.hasApplied)
      } catch (error) {
        console.log(error)
        setNotFound(true)
      }
    }
    if (id) handlejobs()
  }, [id])

  const handlesubmit = async () => {
    if (!isAuthenticated) {
      navigate('/login')
      return
    }
    setSending(true)
    try {
      await api.post(`/job/apply/${id}`)
      setapplied(true)
      setMessage({ text: 'Your application has been sent to the employer ✅', ok: true })
    } catch (error) {
      const data = error.response?.data
      if (error.response?.status === 409) setapplied(true)
      setMessage({
        text: data?.message || 'Could not send your application',
        ok: false,
        profileLink: data?.code === 'PROFILE_INCOMPLETE',
      })
    } finally {
      setSending(false)
      setTimeout(() => setMessage(null), 5000)
    }
  }

  if (notFound) return <div className='p-10 text-center'>This job could not be found. <Link className='underline' to='/'>Back to jobs</Link></div>
  if (!job) return null

  const isEmployer = user?.role === 'employer'
  const closed = job.isActive === false

  return (
    <div className='w-full min-h-screen bg-amber-100 p-1 text-black'>
      {message && (
        <div className={`${message.ok ? 'bg-green-500' : 'bg-red-500'} text-white px-4 py-2 text-center font-medium`}>
          {message.text}{' '}
          {message.profileLink && <Link className='underline' to='/profileform'>Complete profile</Link>}
        </div>
      )}
      <div className='max-w-[900px] bg-sky-300 mx-auto my-10 p-5 rounded-lg'>
        <h1 className='text-3xl font-bold text-center'>{job.Title}</h1>
        <h2 className='font-medium text-zinc-700 text-center'>{job.Company}</h2>
        <div className='mt-6'>
          <h1 className='font-semibold'>About the job</h1>
          <p className='text-zinc-700 whitespace-pre-line'>{job.Description || 'No description provided.'}</p>
        </div>
        {job.Skills?.length > 0 && (
          <div className='mt-4 flex flex-wrap gap-2'>
            {job.Skills.map((s) => <span key={s} className='bg-white/70 rounded-full px-3 py-1 text-sm'>{s}</span>)}
          </div>
        )}
        <div className='flex flex-wrap justify-between gap-4 text-xl mt-8 px-4'>
          <h1>{job.Salary}</h1>
          <h1>{job.Duration}</h1>
          <h1>{job.Location}</h1>
          <h1>{job.Jobtype}</h1>
        </div>
        {job.createdAt && (
          <p className='mt-5 px-4 text-green-700'>Posted on {new Date(job.createdAt).toLocaleDateString()}</p>
        )}
        <div className='mt-10 flex justify-between items-center px-4'>
          <p className='text-zinc-700'>{closed ? 'This job is closed' : 'Be an early applicant'}</p>
          {!isEmployer && (
            <button
              onClick={handlesubmit}
              disabled={applied || sending || closed}
              className={`px-4 py-2 rounded-xl ${applied ? 'bg-blue-700 text-white' : 'bg-red-200'} disabled:opacity-70`}
            >
              {applied ? 'Applied' : sending ? 'Sending...' : 'Apply'}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default ViewDetails
