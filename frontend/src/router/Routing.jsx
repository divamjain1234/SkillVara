import React from 'react'
import { Routes,Route} from 'react-router-dom'
import Publicroutes from "./Publicroutes";
const indexroutes=[...Publicroutes]

const Routing = () => {
  return (
    <Routes>
        {indexroutes.map((item,index)=>(
          <Route key={index} path={item.path} element={item.element}/>
        ))}
    </Routes>
  )
}

export default Routing