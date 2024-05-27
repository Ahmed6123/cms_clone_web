import mysql from "mysql2/promise"

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'cms_clone'
})

export async function getCourses() {
  const [result] =await db.query("select * from courses ")
  return result
}

export async function getTeachers() {
  const [result] =await db.query("select * from teachers order by name")
  return result
}

export async function getCoursesAssigned(id) {
  const [result] =await db.query("select courses.id,teachers_courses.id as del_id, code,title,credits,name from courses left join teachers_courses on courses.id=teachers_courses.course_id left join teachers on teachers_courses.teacher_id=teachers.id where semester = ? ",[id])
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

export async function registerTeacherCourse(teacher_id,course_id) {
  const [result] =await db.query("INSERT INTO teachers_courses (teacher_id,course_id) VALUES (?,?) ",[teacher_id,course_id])
  const id= result.insertId
  return id
}

export async function deleteTeachersCourse(id) {
  await db.query("DELETE FROM teachers_courses where id = ? ",[id])
 }




