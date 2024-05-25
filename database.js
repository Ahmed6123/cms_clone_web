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


export async function getCourse(id) {
  const [result] =await db.query("select * from courses where id = ?",[id])
  return result[0]
}

export async function registerCourse(student_id,course_id) {
  const [result] =await db.query("INSERT INTO students_courses (student_id,course_id) VALUES (?,?) ",[student_id,course_id])
  const id= result.insertId
  return getCourse(id)
}




