import mysql from "mysql2/promise"

const db = mysql.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: '1234',
  database: 'cms_clone'
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
      message: "Error in delete course assigned to teachers API",
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
    const [result] =await db.query("INSERT INTO teachers_courses (teacher_id,course_id) VALUES (?,?) ",[teacher_id,course_id])
    const id= result.insertId
  } catch (error) {
    console.log(error)
    res.status(500).send({
      success: false,
      message: "Error in Inseerting Teachers course API",
      error

    })
  }
}

export {getCoursesAssigned,getAllTeachers, deletCourse,  getAllCoursess, addTeacherCourse}