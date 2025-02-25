import mysql from "mysql2/promise"
import dotenv from "dotenv"
dotenv.config()

const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
  port: process.env.MYSQL_PORT,
})

const getmyCourses = async (req,res) => {
  try {
    const id = parseInt(req.params.id)
    if(!id){
      return res.status(404).send({
        success: false,
        message: "Invalid or provide id"
      })
    }
    const [result] =await db.query("select courses.id, code,title,credits from courses inner join teachers_courses on courses.id=teachers_courses.course_id where teacher_id = ? order by title",[id])

    if(!result){
      return res.status(404).send({
        success: false,
        message: "No records found"
      })
    }
    res.status(200).json(result)

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in getting courses",
      error

    })
  }
}

const getmyStudents = async (req,res) => {
  try {
    const id = parseInt(req.params.id)
    if(!id){
      return res.status(404).send({
        success: false,
        message: "Invalid or provide id"
      })
    }
    const [result] =await db.query("select students.id,name,f_name,grade,completed from students inner join students_courses on students.id=students_courses.student_id where course_id = ? order by name",[id])

    if(!result){
      return res.status(404).send({
        success: false,
        message: "No records found"
      })
    }
    // res.status(200)
    res.json(result)

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in getting students",
      error

    })
  }
}

const addMarks = async (req,res) => {
  try {
    const course_id = parseInt(req.body.course_id)
    const student_id = parseInt(req.body.student_id)
    const grade = req.body.grade
    
    if(!course_id || !student_id ){
      return res.status(404).send({
        success: false,
        message: "Invalid or provide id"
      })
    }
    const result = await db.query("update students_courses set grade= ?, completed =1 where course_id = ? and student_id = ?",[grade,course_id,student_id])

    if(!result){
      return res.status(404).send({
        success: false,
        message: "No records found"
      })
    }
    res.status(200).json(result)

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in getting students",
      error

    })
  }
}

const Login = async (req,res) => {
  try {
    const email = req.body.email
    const password = req.body.password
    
    if(!email || !password ){
      return res.status(404).send({
        success: false,
        message: "Invalid or provide id"
      })
    }
    const [result] = await db.query("select id,name,role from teachers where email = ? and password = ? limit 1",[email,password])
    if(!result[0]){
      return res.status(404).send({
        success: false,
        message: "No records found"
      })
    }
    res.status(200).json(result[0])

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in getting students",
      error

    })
  }
}

export {getmyCourses, getmyStudents,addMarks, Login}