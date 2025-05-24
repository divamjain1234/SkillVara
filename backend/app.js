require('dotenv').config();
require('./config/mongoose-connection');
const express=require('express')
const app=express();
const router = express.Router();
const path =require('path')
const dbgr=require('debug')("development:app")
const cookieparser=require('cookie-parser')
const userroutes=require('./routes/userRoutes')
const jobroutes=require('./routes/jobRoutes')
const cors=require('cors')
app.use(cors({
    origin: "https://localhost:5173", 
    credentials: true
  }));
app.use(cookieparser())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

app.use('/user',userroutes)
app.use('/job',jobroutes)
const port = process.env.PORT; 
app.listen(port, () => {
    dbgr('Server running on port ' + port);
});
