import express from "express"
import { Login, addMarks, getmyCourses, getmyStudents } from "../controllers/teacherController.js"


const router = express.Router()

// routes

// GET all courses assigned to teachers || GET
router.get('/mycourses/:id',getmyCourses)
router.get('/mystudents/:id',getmyStudents)
router.post('/addmarks',addMarks)
router.post('/login',Login)

export default router