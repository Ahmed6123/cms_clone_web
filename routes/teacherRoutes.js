import express from "express"
import { addMarks, getmyCourses, getmyStudents, teacherLogin } from "../controllers/teacherController.js"


const router = express.Router()

// routes

// GET all courses assigned to teachers || GET
router.get('/mycourses/:id',getmyCourses)
router.get('/mystudents/:id',getmyStudents)
router.post('/addmarks',addMarks)
router.get('/login/:email',teacherLogin)

export default router