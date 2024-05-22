import express from 'express'
import cors from 'cors'

import {getCourses,createStudent,getStudentbyFname} from './database.js'


const app = express()
app.use(cors())

app.get("/courses", async (req, res) => {
    const courses= await getCourses()
    res.send(courses)
})

app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
})

app.listen(8080, () => {
    console.log('Server is running on port 8080')
})  