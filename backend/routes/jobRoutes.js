const express=require('express')
const router=express.Router()
const {Jobsdata}=require('../functions/Jobdata')
const { viewdetails } = require('../functions/viewdetails')
router.get('/jobsdata',Jobsdata)
router.get('/viewdetails/:id',viewdetails)
module.exports=router