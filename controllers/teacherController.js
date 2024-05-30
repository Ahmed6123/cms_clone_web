import mysql from "mysql2/promise"

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '1234',
  database: 'cms_clone'
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
    const [result] =await db.query("select students.id,name,f_name,marks,completed from students inner join students_courses on students.id=students_courses.student_id where course_id = ? order by name",[id])

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

const addMarks = async (req,res) => {
  try {
    const course_id = parseInt(req.body.course_id)
    const student_id = parseInt(req.body.student_id)
    const marks = parseInt(req.body.marks)
    
    if(!course_id || !student_id ){
      return res.status(404).send({
        success: false,
        message: "Invalid or provide id"
      })
    }
    const result = await db.query("update students_courses set marks= ?, completed =1 where course_id = ? and student_id = ?",[marks,course_id,student_id])

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

export {getmyCourses, getmyStudents,addMarks}