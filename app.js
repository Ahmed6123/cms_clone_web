import express from "express"
import path from "path"
import { fileURLToPath } from "url"
import {getCourses, getCourse,  registerCourse, getTeachers} from "./database.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app =express()

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use(express.static(path.join(__dirname,'public')))

app.get('/teachers', async (req,res) => {
  const teachers = await getTeachers()
  res.status(200).json(teachers)
  })



app.get('/courses', async (req,res) => {
  const courses = await getCourses()
  res.status(200).json(courses)
  })

  app.get('/courses/:id', async (req,res) => {
    const id = parseInt(req.params.id)
    const course = await getCourse(id)
    res.status(200).json(course)
    })

app.listen(5000, () => {
  console.log("Server is running on port 5000 ")
})