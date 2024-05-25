const teachersdiv = document.getElementById("teachers")
const coursesdiv = document.getElementById("courses")

showCourses()

showTeachers()

async function showCourses() {
  
  try {

    const res = await fetch('http://localhost:5000/courses')
  
    if (!res.ok) {
      throw new Error('Failed to fetch courses')
    }
    const courses = await res.json()
    let HTML = `
    <label for="course">Select Course</label>
    <select name="course" id="course">
    `
      courses.forEach((course) => {
      HTML+=`
      <option value='${course.id}'>${course.title}</option>
      `
      });
      HTML+= `<select>`
     
          coursesdiv.innerHTML=HTML
    
  } catch (error) {
    console.log('Error fetching courses', error)
  }
  
}


async function showTeachers() {
  
  try {

    const res = await fetch('http://localhost:5000/teachers')
  
    if (!res.ok) {
      throw new Error('Failed to fetch courses')
    }
    const teachers = await res.json()
        let HTML = `
    <label for="teacher">Select Teacher</label>
    <select name="teacher" id="teacher">
    `
      teachers.forEach((teacher) => {
      HTML+=`
      <option value='${teacher.id}'>${teacher.name}</option>
      `
      });
      HTML+= `<select>`
     
          teachersdiv.innerHTML=HTML
    
  } catch (error) {
    console.log('Error fetching terachers', error)
  }
  
}