const express=require('express')
const router=express.Router()
const {Jobsdata}=require('../functions/Jobdata')
const { viewdetails } = require('../functions/viewdetails')
const { apply, myapplications } = require('../functions/applications')
const { createjob, myjobs, setactive, applicants, updatestatus } = require('../functions/employerjobs')
const { isloggedin, optionalauth, requireRole } = require('../middlewares/isloggedin')

const employer = [isloggedin, requireRole('employer')]
const candidate = [isloggedin, requireRole('candidate')]

// public
router.get('/jobsdata',Jobsdata)
router.get('/viewdetails/:id',optionalauth,viewdetails)

// candidate
router.post('/apply/:id',...candidate,apply)
router.get('/applications/mine',...candidate,myapplications)

// employer (static paths first so they are not read as :id)
router.post('/create',...employer,createjob)
router.get('/mine',...employer,myjobs)
router.patch('/application/:appId/status',...employer,updatestatus)
router.get('/:id/applicants',...employer,applicants)
router.patch('/:id/active',...employer,setactive)

module.exports=router
