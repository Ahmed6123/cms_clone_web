import mysql from "mysql2/promise"

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '1234',
  database: 'cms_clone'
})


const RegisterCourse = async (req,res) => {
    try {
      const course_id = parseInt(req.body.course_id)
      const student_id = parseInt(req.body.student_id)
      const result = await db.query("INSERT INTO students_courses (student_id,course_id) VALUES (?,?) ",[student_id,course_id])
          
      if(result[0].affectedRows>0){
        res.status(200).send({
          success:true,
          message: "Course Registered Successfully!"
        })
      }
  
      // return result.insertId
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: "Error: Course has not been registered",
        error
  
      })
    }
  }

  const studentLogin = async (req,res) => {
    try {
      const email = req.params.email
      const result = await db.query("select * FROM students WHERE email = ?",[email])
      const id = result[0][0].id
      if(result[0].length>0){
        res.status(200).json(id)
      }else{
        res.status(404).send({
          success:false,
          message: "Student not found"
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: "Error",
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
export {RegisterCourse,studentLogin,getCourses}