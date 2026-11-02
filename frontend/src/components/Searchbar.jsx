const Searchbar = ({ value = '', onChange }) => {
  return (
    <div className="w-full p-6">
        <div className="w-full flex flex-col items-center gap-6 mt-38">
            <h1 className="text-5xl font-semibold">Start your dream career today</h1>
            <h5 className="text-xl font-medium">Search roles, companies and skills</h5>
            <input
              className="w-[60%] mt-10 h-15 rounded-3xl border px-6"
              type="search"
              placeholder="search for jobs, companies or skills"
              value={value}
              onChange={(e) => onChange && onChange(e.target.value)}
            />
        </div>
    </div>
  )
}

export default Searchbar
