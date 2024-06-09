import express from "express"
import {addWarning,Login,getUnregStudents,getAllResults,addTeacherCourse, closeSemester, deletCourse, getAllCoursess, getAllTeachers, getBatches, getCoursesAssigned, getOpenSemesters, getNextSemester, opneNewSemester, getStudents, getLowResults} from "../controllers/coordinatorController.js"

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

router.post('/addteachercourse', addTeacherCourse)

router.get('/batches',getBatches)

router.get('/getopensemesters/:batch',getOpenSemesters)

router.get('/closesemester/:id',closeSemester)

router.get('/getnextsemester/:batch',getNextSemester)
router.post('/opensemester',opneNewSemester)

router.get('/getstudents/:batch',getStudents)
router.post('/getresults',getAllResults)
router.get('/getunregstudents/:batch',getUnregStudents)
router.post('/addwarning',addWarning)
router.post('/login', Login)
router.post('/getlowresults',getLowResults)
export default router