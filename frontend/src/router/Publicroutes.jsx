import Skillsinput from "../components/Skills";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Logout from "../Pages/Logout";
import Main from "../Pages/Main";
import ProfileForm from "../Pages/ProfileForm";
import Signup from "../Pages/Signup";
import Profile from "../Pages/Profile"
import PrivateRoute from "../services/PrivateRoute";
import ViewDetails from "../Pages/ViewDetails";

const Publicroutes=[
    {path:"/Signup",element:<Signup/>},
    {path:"/",element:<Home/>},{path:"/login",element:<Login/>},
    {path:'/logout',element:<Logout/>},{path:'/main',element:
      <PrivateRoute>
           <Main/>
      </PrivateRoute>
   },
    {path:'/profileform',element:
    <PrivateRoute>
      <ProfileForm/>
    </PrivateRoute>},
    {path:'/skills',element:<Skillsinput/>},
    {path:'/profile',element:
    <PrivateRoute>
      <Profile/>
    </PrivateRoute>
    },
    {path:'/createprofile',element:<ProfileForm/>},
    {path:'/viewdetails/:id',element:<ViewDetails/>}
]
export default Publicroutes