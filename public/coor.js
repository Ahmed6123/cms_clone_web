
const teachersel = document.getElementById("teacherSel")
const frm =document.querySelector("form")


const dialog = document.querySelector("dialog")
const closeButton = document.querySelector("dialog button");

const btn2 = document.getElementById("semester-btn")
const output = document.getElementById("output")

let teachers1 =[]


// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});


showTeachers()

async function showTeachers() {
  
  try {

    const res = await fetch('http://localhost:5000/coordinator/getallteachers')
  
    if (!res.ok) {
      throw new Error('Failed to fetch teachers')
    }
    
    const teachers = await res.json()
    teachers1=teachers
    
    let HTML = ``
  teachers1.forEach((teacher) => {
  HTML+=`
  <option value='${teacher.id}'>${teacher.name}</option>
  `
  });
  // console.log(HTML)
  
 
  teachersel.innerHTML=HTML

  } catch (error) {
    console.log('Error fetching terachers', error)
  }
  
}

async function showCoursesteachers(id) {
  
  try {

    const res = await fetch('http://localhost:5000/coordinator/teacherscourses/'+id)
  
    if (!res.ok) {
      throw new Error('Failed to fetch courses')
    }

    const courses = await res.json()
    // console.log(res)
    // console.log(courses)
    let HTML =
    `<table>
          <thead>
        <tr>
            <th>code</th>
            <th>Title</th>
            <th>Credits</th>
            <th>Teacher</th>
            <th>Actions</th>
        </tr>
    </thead>
    <tbody>
    `
     courses.forEach((course) => {
      HTML+=`
      <tr>
      <td>${course.code}</td>
      <td>${course.title}</td>
      <td class="test">${course.credits}</td>
      <td>${course.name===null ? '' : course.name}</td>
      <td> ${course.name===null ? `<button class="add" data-course="${course.title}" id=${course.id}>Add</button>` : `<button class="remove" id=${course.del_id}>Remove</button>`}</td>
      </tr>
      `
     });
     HTML+=`
     </tbody>
     </table>
     `
     output.innerHTML=HTML
     const o = document.querySelectorAll(".add")
     o.forEach((item) => {
      item.addEventListener('click',()=> {
        sessionStorage.setItem("coursedata", JSON.stringify({id: item.id, course: item.dataset.course}))
        dialog.showModal();
        })

      })
    

     const r = document.querySelectorAll(".remove")
     r.forEach((item) => {
      item.addEventListener('click',()=> {
        deletecourse(item.id)
      })
     })

    } catch (error) {
      console.log('Error fetching terachers', error)
    }
}

async function deletecourse(id) {
  // console.log("Deleted")
  const res = await fetch('http://localhost:5000/coordinator/delete/'+id, {
    method: "DELETE"
  })
  btn2.click()

}

frm.addEventListener('submit',(e) =>{
  e.preventDefault()
  const teacherId = teachersel.options[teachersel.selectedIndex].value
  const courseId= JSON.parse(sessionStorage.getItem('coursedata')).id
  AddTeacherCourse(teacherId,courseId)
  dialog.close();
  btn2.click()
  
})

async function AddTeacherCourse(teacherId,courseId) {
  
  const res = await fetch('http://localhost:5000/coordinator/addteachercourse', {
    method: "POST",
    headers: {"Content-type": 'application/json'},
    body: JSON.stringify ({
      teacher_id: teacherId,
      course_id: courseId
    })

  })
   
 }


btn2.addEventListener('click',()=>{
  const tt =document.getElementById("semester")
  const s_id = tt.options[tt.selectedIndex].value;
  showCoursesteachers(s_id)
//  console.log('You selected: ', strUser);

})






