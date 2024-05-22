import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config()

const db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DB,
}).promise()


export async function getCourses()
{
    const [result] = await db.query("Select * from Courses  limit 5");
    return result
}

export async function createStudent(fname,lname,email)
{
    const result = await db.query(`Insert into Students (fname,lname,email) values(? , ? , ?)`,[fname,lname,email])
    const id = result[0].insertId
    return createStudent(id)
}

export async function getStudentbyFname(name)
{
    const [result] = await db.query("Select * from Students Where fname=?",[name]);
    return result[0]
}