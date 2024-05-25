import mysql from "mysql2"
import dotenv from 'dotenv'
dotenv.config()

const db = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
}).promise()


export async function getCourses() {
  const [result] =await db.query("select * from courses ")
  return result
}

export async function getTeachers() {
  const [result] =await db.query("select * from teachers ")
  return result
}


export async function getCourse(semester) {
  const [result] =await db.query("select * from courses where semester = ?",[semester])
  return result[0]
}

export async function registerCourse(student_id,course_id) {
  const [result] =await db.query("INSERT INTO students_courses (student_id,course_id) VALUES (?,?) ",[student_id,course_id])
  const id= result.insertId
  return getCourse(id)
}

// To fetch Current Teachers Courses' 
export async function getTeacherCourses(teacher_id) {
  const [result] =await db.query("select courses.title from teachers_courses inner join courses on teachers_courses.course_id=courses.id inner join teachers on teachers_courses.teacher_id = teachers.id where teacher_id=?",[teacher_id])
  return result
}
export async function getCoursesStudents(course_id) {
  const [result] =await db.query("select students.name from students_courses inner join courses on students_courses.id=courses.id inner join students on students_courses.student_id=students.id where course_id=?;",[course_id])
  return result
}

