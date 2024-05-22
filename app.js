import express from 'express'

import {getCourses} from './database.js'


const app = express()


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