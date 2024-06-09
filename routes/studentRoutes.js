import express from "express"
import {getallResult,showWarnings, Login, getmyCourses, getmyResult, registerCourse, semesterOpen,getCourses } from "../controllers/studentController.js"


const router = express.Router()

router.post('/myresult',getmyResult)
router.post('/mycourses',getmyCourses)
router.post('/register',registerCourse)
router.post('/login',Login)
router.get('/open/:batch',semesterOpen)
router.get('/courses/:semester',getCourses)
router.get('/mywarnings/:student_id',showWarnings)
router.get('/allresult/:student_id',getallResult)


export default router