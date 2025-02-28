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

const getmyResult = async (req,res) => {
  try {
    const student_id = parseInt(req.body.student_id)
    const semester_id = parseInt(req.body.semester_id)

    if(!semester_id || !student_id){
      return res.status(404).send({
        success: false,
        message: "Invalid or provide id"
      })
    }
    const [result] =await db.query("SELECT courses.title,credits,students_courses.grade,gp,credits*gp as product from students_courses inner join students on students_courses.student_id=students.id inner join courses on students_courses.course_id=courses.id left join grades on students_courses.grade=grades.grade where students.id= ? and semester= ? order by title",[student_id,semester_id])

    if(result.length==0){
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

const getallResult = async (req,res) => {
  try {
    const student_id = parseInt(req.params.student_id)

    if(!student_id){
      return res.status(404).send({
        success: false,
        message: "Invalid or provide id"
      })
    }
    const [result] =await db.query("SELECT semester, courses.title,credits,students_courses.grade,gp,credits*gp as product from students_courses inner join students on students_courses.student_id=students.id inner join courses on students_courses.course_id=courses.id left join grades on students_courses.grade=grades.grade where students.id= ? order by semester,title",[student_id])

    if(result.length==0){
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


const getmyCourses = async (req,res) => {
  try {
    const student_id = parseInt(req.body.student_id)
    const semester_id = parseInt(req.body.semester_id)

    if(!semester_id || !student_id){
      return res.status(404).send({
        success: false,
        message: "Invalid or provide id"
      })
    }
    const [result] =await db.query("SELECT courses.id,code,title,credits,course_id from courses left join students_courses on courses.id=students_courses.course_id and students_courses.student_id=? where semester=? order by title",[student_id,semester_id])

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

const registerCourse = async (req,res) => {
  try {
    const course_id = parseInt(req.body.course_id)
    const student_id = parseInt(req.body.student_id)
    const result = await db.query("INSERT INTO students_courses (student_id,course_id) VALUES (?,?) ",[student_id,course_id])
        
    if(result[0].affectedRows>0){
      res.status(200).send({
        success:true,
        message: "course Added"
      })
    }
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in Registering students course API",
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
    const [result] = await db.query("select id,name,batch from students where email = ? and password = ? limit 1",[email,password])
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


const semesterOpen = async (req,res) => {
  try {
    const batch = req.params.batch

    
    if(!batch || batch=='' ){
      return res.status(404).send({
        success: false,
        message: "Invalid or provide id"
      })
    }
    const [result] = await db.query("select semester from batch_semester where batch = ? and open=1",[batch])
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

const getCourses = async (req,res) => {
  try {
    const semester=parseInt(req.params.semester)
    const [result] =await db.query("select * from courses where semester = ? order by title",[semester])
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
      message: "Error: Courses API not found",
      error

    })
  }
}

const showWarnings = async (req,res) => {
  try {
    const student_id = req.params.student_id

    
    if(!student_id){
      return res.status(404).send({
        success: false,
        message: "Invalid or provide id"
      })
    }
    const [result] = await db.query("SELECT warning FROM `warnings` WHERE student_id= ?",[student_id])
      if(!result[0]){
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


export {getallResult,showWarnings,getmyResult,getmyCourses,registerCourse,Login,semesterOpen,getCourses}