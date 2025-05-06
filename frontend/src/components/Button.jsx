import { Link } from "react-router-dom";
const Button = ({name,to}) => {
  return (
    <>
    <Link to={to}>
      <button className="not-first:min-w-18 py-1 px-3 text-white bg-[#5776c9] rounded-md ">{name}</button>
    </Link>
    </>
  )
}

export default Button