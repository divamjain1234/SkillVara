import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import Navbar from '../components/Navbar'
import api from '../services/api'
import { AuthContext } from '../context/AuthContext'

const input = 'border-[2px] rounded-lg py-1 px-2 border-zinc-400 w-full'

const EmployerDashboard = () => {
  const { user } = useContext(AuthContext)
  const [jobs, setJobs] = useState(null)
  const [error, setError] = useState('')
  const { register, handleSubmit, reset } = useForm()

  const load = () =>
    api.get('/job/mine').then((res) => setJobs(res.data)).catch(() => setError('Could not load your jobs'))

  useEffect(() => { load() }, [])

  const post = async (data) => {
    setError('')
    try {
      await api.post('/job/create', data)
      reset()
      load()
    } catch (e) {
      setError(e.response?.data?.message || 'Could not post the job')
    }
  }

  const toggle = async (job) => {
    await api.patch(`/job/${job._id}/active`, { isActive: job.isActive === false })
    load()
  }

  return (
    <div>
      <Navbar />
      <div className='max-w-4xl mx-auto pt-24 px-4 pb-10 text-zinc-800'>
        <h1 className='text-3xl font-semibold'>{user?.companyName} dashboard</h1>

        <form onSubmit={handleSubmit(post)} className='mt-6 border rounded-lg p-4 grid gap-3 sm:grid-cols-2'>
          <h2 className='text-xl font-medium sm:col-span-2'>Post a new job</h2>
          <input className={input} {...register('Title', { required: true })} placeholder='Job title *' />
          <input className={input} {...register('Location')} placeholder='Location' />
          <input className={input} {...register('Salary')} placeholder='Salary (e.g. 6-8 LPA)' />
          <input className={input} {...register('Duration')} placeholder='Duration (e.g. Permanent, 3 months)' />
          <select className={input} {...register('Jobtype')}>
            <option value=''>Job type</option>
            <option>Full-time</option>
            <option>Internship</option>
            <option>Part-time</option>
            <option>Remote</option>
          </select>
          <input className={input} {...register('Skills')} placeholder='Skills, comma separated' />
          <textarea className={`${input} sm:col-span-2`} rows={4} {...register('Description', { required: true })} placeholder='Job description *' />
          {error && <p className='text-red-600 sm:col-span-2'>{error}</p>}
          <button className='bg-[#3495E1] text-white rounded-lg py-2 sm:col-span-2'>Post job</button>
        </form>

        <h2 className='text-2xl font-medium mt-10 mb-3'>Your jobs</h2>
        {jobs && jobs.length === 0 && <p>You have not posted any job yet.</p>}
        <div className='flex flex-col gap-3'>
          {jobs && jobs.map((job) => (
            <div key={job._id} className='border rounded-lg p-4 flex flex-wrap justify-between items-center gap-3'>
              <div>
                <p className='text-xl font-medium'>{job.Title} {job.isActive === false && <span className='text-sm text-red-600'>(closed)</span>}</p>
                <p className='text-zinc-600'>{job.Location} · {job.Jobtype} · {job.Salary}</p>
              </div>
              <div className='flex items-center gap-3'>
                <Link className='underline' to={`/employer/job/${job._id}`}>{job.applicantCount} applicant{job.applicantCount === 1 ? '' : 's'}</Link>
                <button className='border rounded-md px-3 py-1' onClick={() => toggle(job)}>
                  {job.isActive === false ? 'Reopen' : 'Close'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default EmployerDashboard
