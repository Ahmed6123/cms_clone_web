import express from "express"
import { RegisterCourse,studentLogin,getCourses } from "../controllers/studentController.js"

const router = express.Router()

router.post('/registercourse',RegisterCourse)
router.get('/login/:email',studentLogin)
router.get('/courses/:semester',getCourses)

export default router