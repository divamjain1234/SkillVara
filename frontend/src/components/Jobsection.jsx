import Jobcomponent from "./Jobcomponent"
import { useEffect, useState } from "react"
import api from "../services/api"

// value is a partial match on the backend, so "Full" also finds "Fulltime" and "Full-time"
const JOB_TYPES = [
  { label: 'All job types', value: '' },
  { label: 'Full-time', value: 'Full' },
  { label: 'Internship', value: 'Intern' },
  { label: 'Part-time', value: 'Part' },
  { label: 'Remote', value: 'Remote' },
]

const Jobsection = ({ search = '' }) => {
  const [jobs, setjobs] = useState(null)
  const [location, setLocation] = useState('')
  const [jobtype, setJobtype] = useState('')
  const [page, setPage] = useState(1)
  const [pages, setPages] = useState(1)
  const [debounced, setDebounced] = useState({ search, location })

  // wait until the user stops typing before calling the API
  useEffect(() => {
    const t = setTimeout(() => setDebounced({ search, location }), 350)
    return () => clearTimeout(t)
  }, [search, location])

  // any filter change goes back to page 1
  useEffect(() => { setPage(1) }, [debounced, jobtype])

  useEffect(() => {
    let cancelled = false
    const load = async () => {
      try {
        const response = await api.get('/job/jobsdata', {
          params: { search: debounced.search, location: debounced.location, jobtype, page, limit: 12 },
        })
        if (cancelled) return
        setjobs(response.data.jobs)
        setPages(response.data.pages)
      } catch (error) {
        console.log(error)
        if (!cancelled) setjobs([])
      }
    }
    load()
    return () => { cancelled = true }
  }, [debounced, jobtype, page])

  return (
    <div>
      <div className="w-full p-4">
        <div className="w-full flex flex-col gap-10 items-center justify-center">
            <div className="heading mt-24 ">
                <h1 className="text-4xl font-semibold ">Latest Jobs & Internships on SkillVara</h1>
            </div>
            <div className="flex gap-3 flex-wrap justify-center">
              <input
                className="border rounded-lg px-3 py-2"
                placeholder="Location (e.g. Delhi)"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <select className="border rounded-lg px-3 py-2" value={jobtype} onChange={(e) => setJobtype(e.target.value)}>
                {JOB_TYPES.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
              </select>
            </div>
            {jobs && jobs.length === 0 && <p className="text-zinc-600">No jobs match your search.</p>}
            <div className="jobs flex flex-wrap gap-3 items-center justify-center">
                {jobs && jobs.map((item) => (
                  <Jobcomponent item={item} key={item._id}/>
                ))}
            </div>
            {pages > 1 && (
              <div className="flex items-center gap-4">
                <button className="px-3 py-1 border rounded-md disabled:opacity-40" disabled={page <= 1} onClick={() => setPage(page - 1)}>Previous</button>
                <span>Page {page} of {pages}</span>
                <button className="px-3 py-1 border rounded-md disabled:opacity-40" disabled={page >= pages} onClick={() => setPage(page + 1)}>Next</button>
              </div>
            )}
        </div>
    </div>
    </div>
  )
}

export default Jobsection
