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
const getCoursesAssigned = async (req,res) => {
  try {
    const id = parseInt(req.params.id)
    if(!id){
      return res.status(404).send({
        success: false,
        message: "Invalid or provide id"
      })
    }
    const [result] =await db.query("select courses.id,teachers_courses.id as del_id, code,title,credits,name from courses left join teachers_courses on courses.id=teachers_courses.course_id left join teachers on teachers_courses.teacher_id=teachers.id where semester = ? order by title",[id])

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


const getAllTeachers = async (req,res) => {
  try {
    const [result] =await db.query("select * from teachers order by name")

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
      message: "Error in getting teachers API",
      error

    })
  }
}

const deletCourse = async (req,res) => {
  
  try {
    const id = req.params.id
    if(!id){
      return res.status(404).send({
        success: false,
        message: "Invalid or provide id"
      })
    }
   
    const result = await db.query("DELETE FROM teachers_courses where id = ? ",[id])
    if(result[0].affectedRows>0){
      res.status(200).send({
        success:true,
        message: "course Deleted"
      })
    }


  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in getting teachers API",
      error

    })
  }
}

const getAllCoursess = async (req,res) => {
  try {
    const [result] =await db.query("select * from courses")

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
      message: "Error in getting all courses API",
      error

    })
  }
}

const addTeacherCourse = async (req,res) => {
  try {
    const course_id = parseInt(req.body.course_id)
    const teacher_id = parseInt(req.body.teacher_id)
    const result = await db.query("INSERT INTO teachers_courses (teacher_id,course_id) VALUES (?,?) ",[teacher_id,course_id])
        
    if(result[0].affectedRows>0){
      res.status(200).send({
        success:true,
        message: "course Deleted"
      })
    }

    // return result.insertId
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in Inseerting Teachers course API",
      error

    })
  }
}

const getBatches = async (req,res) => {
  try {
    const [result] =await db.query("SELECT DISTINCT batch from students")

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
      message: "Error in getting all courses API",
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
    const [result] = await db.query("select id,name,role from teachers where email = ? and password = ? and role = 1 limit 1",[email,password])
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

const getOpenSemesters = async (req,res) => {
  try {
    const batch = req.params.batch
    if(!batch){
      return res.status(404).send({
        success: false,
        message: "Invalid or provide id"
      })
    }
    const [result] =await db.query("SELECT batch,semester,open,id from batch_semester where open=1 and batch= ?",[batch])

    if(result.length==0){
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
      message: "Error in getting Open Semesters",
      error

    })
  }
}

const closeSemester = async (req,res) => {
  try {
    const id = parseInt(req.params.id)
    if(!id){
      return res.status(404).send({
        success: false,
        message: "Invalid or provide id"
      })
    }
    const [result] =await db.query("update batch_semester set open=0 where id= ?",[id])

    if(!result){
      return res.status(404).send({
        success: false,
        message: "No update"
      })
    }
    res.status(200).json(result)

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in updating Semesters",
      error

    })
  }
}

const getNextSemester = async (req,res) => {
  try {
    const batch = req.params.batch
    if(!batch){
      return res.status(404).send({
        success: false,
        message: "Invalid or provide id"
      })
    }
    const [result] =await db.query("SELECT max(semester)+1 as semester from batch_semester where open=0 and batch= ?",[batch])
    console.log(result[0])
    if(!result){
      return res.status(404).send({
        success: false,
        message: "No update"
      })
    }
    res.status(200).json(result[0])

  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in updating Semesters",
      error

    })
  }
}

const opneNewSemester = async (req,res) => {
  try {
    const batch = req.body.batch
    const semester = parseInt(req.body.semester)
    const result = await db.query("INSERT INTO batch_semester (batch,semester,open) VALUES (?,?,?) ",[batch,semester,1])
        
    if(result[0].affectedRows>0){
      res.status(200).send({
        success:true,
        message: "Semester Opened"
      })
    }

    // return result.insertId
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in Inseerting openeing new semster course API",
      error

    })
  }
}


const getStudents = async (req,res) => {
  try {
    const batch = req.params.batch
    if(!batch){
      return res.status(404).send({
        success: false,
        message: "Invalid or provide id"
      })
    }
    const [result] =await db.query("SELECT * from students where batch= ?",[batch])

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
      message: "Error in getting Open Semesters",
      error

    })
  }
}

const getAllResults = async (req,res) => {
  try {
    const batch = parseInt(req.body.batch)
    const semester = parseInt(req.body.semester)
    if(!batch){
      return res.status(404).send({
        success: false,
        message: "Invalid or provide id"
      })
    }
    const [result] =await db.query("SELECT semester,students.name,sum(credits) as credits,sum(credits*gp) as product,sum(credits*gp)/sum(credits) as gpa from students_courses inner join students on students_courses.student_id=students.id inner join courses on students_courses.course_id=courses.id inner join grades on students_courses.grade=grades.grade where  batch=? and semester = ? group by name,semester",[batch,semester])

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
      message: "Error in getting Open Semesters",
      error

    })
  }
}

const getLowResults = async (req,res) => {
  try {
    const batch = parseInt(req.body.batch)
    const semester = parseInt(req.body.semester)
    if(!batch){
      return res.status(404).send({
        success: false,
        message: "Invalid or provide id"
      })
    }
    const [result] =await db.query("SELECT semester, students.name, sum(credits) as credits, sum(credits*gp) as product, sum(credits*gp)/sum(credits) as gpa FROM students_courses INNER JOIN students ON students_courses.student_id = students.id INNER JOIN courses ON students_courses.course_id = courses.id INNER JOIN grades ON students_courses.grade = grades.grade WHERE batch = ? AND semester = ? GROUP BY semester, name HAVING sum(credits*gp)/sum(credits) < 2.0;",[batch,semester])

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
      message: "Error in getting Open Semesters",
      error

    })
  }
}

const getUnregStudents = async (req,res) => {
  try {
    const batch = req.params.batch
    if(!batch){
      return res.status(404).send({
        success: false,
        message: "Invalid or provide id"
      })
    }
    const [result] =await db.query("SELECT name,f_name,email from students where students.batch=? and id not in (select DISTINCT student_id from students_courses)",[batch])

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
      message: "Error in getting Open Semesters",
      error

    })
  }
}
const addWarning = async (req,res) => {
  try {
    const war = req.body.war
    const student_id = parseInt(req.body.student_id)
    const result = await db.query("INSERT INTO warnings (student_id,warning,active) VALUES (?,?,?) ",[student_id,war,1])
        
    if(result[0].affectedRows>0){
      res.status(200).send({
        success:true,
        message: "Warning Added"
      })
    }

    // return result.insertId
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in Inseerting openeing new semster course API",
      error

    })
  }
}
export {getLowResults,addWarning,Login,getUnregStudents,getAllResults,getCoursesAssigned,getAllTeachers, deletCourse,  getAllCoursess, addTeacherCourse,getBatches,getOpenSemesters,closeSemester,getNextSemester,opneNewSemester,getStudents}