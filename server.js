import express from "express"
import path from "path"
import { fileURLToPath } from "url"

import co_router from "./routes/coordinatorRoutes.js"
import te_router from "./routes/teacherRoutes.js"
import st_router from "./routes/studentRoutes.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const app =express()

app.use(express.json())
app.use(express.urlencoded({ extended: false}))

app.use(express.static(path.join(__dirname,'public')))


app.use("/coordinator",co_router)
app.use("/teacher",te_router)
app.use("/student",st_router)




app.listen(5000, () => {
  console.log("Server is running on port 5000 ")
})