import express from "express"
import {addTeacherCourse, deletCourse, getAllCoursess, getAllTeachers, getCoursesAssigned} from "../controllers/coordinatorController.js"

const router = express.Router()

// routes

// GET all courses assigned to teachers || GET
router.get('/teacherscourses/:id',getCoursesAssigned)

// GET all teachers || GET
router.get('/getallteachers',getAllTeachers)

// GET all teachers || GET
router.get('/courses',getAllCoursess)

// GET all teachers || DELETE
router.delete('/delete/:id',deletCourse)

// POST add teacher course || POST
router.post('/addteachercourse', addTeacherCourse)

export default router