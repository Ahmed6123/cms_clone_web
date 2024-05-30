import express from "express"
import path from "path"
import { fileURLToPath } from "url"

import router2 from "./routes/coordinatorRoutes.js"
import r_teacher from "./routes/teacherRoutes.js"
import r_student from "./routes/studentRoutes.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app =express()

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use(express.static(path.join(__dirname,'public')))


app.use("/coordinator",router2)
app.use("/teacher",r_teacher)
app.use("/student",r_student)




app.listen(5000, () => {
  console.log("Server is running on port 5000 ")
})