const teachersdiv = document.getElementById("teachers")
const coursesdiv = document.getElementById("courses")

const teachersel = document.getElementById("teacherSel")
const showIdBtn = document.getElementById("showID")
const frm =document.querySelector("form")


const dialog = document.querySelector("dialog")
const show_btn = document.querySelector("dialog + button");
const closeButton = document.querySelector("dialog button");

let teachers1 =[]

show_btn.addEventListener("click", () => {
  dialog.showModal();
});

// "Close" button closes the dialog
closeButton.addEventListener("click", () => {
  dialog.close();
});


const btn = document.getElementById("assign-btn")
const btn2 = document.getElementById("semester-btn")
const output = document.getElementById("output")

showCourses()
showTeachers()
showTeachers1()




async function showCourses() {
  
  try {

    const res = await fetch('http://localhost:5000/coordinator/courses')
  
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

    const res = await fetch('http://localhost:5000/coordinator/getallteachers')
  
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

async function showTeachers1() {
  
  try {

    const res = await fetch('http://localhost:5000/coordinator/getallteachers')
  
    if (!res.ok) {
      throw new Error('Failed to fetch teachers')
    }
    const teachers = await res.json()
    teachers1=teachers
    // console.log(teachers1)
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
    // output.innerHTML=''

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
  const result = AddTeacherCourse(teacherId,courseId)
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
  return res

}


showIdBtn.addEventListener('click', ()=>{
  
  const teachersId = teachersel.options[teachersel.selectedIndex].value
  const courseId= JSON.parse(sessionStorage.getItem('coursedata')).id
  console.log(teachersId, courseId)
  
})

btn.addEventListener('click', select_teacher)
 
function select_teacher() {
  const dd =document.getElementById("teacher")
  var strUser = dd.options[dd.selectedIndex].value;
 console.log('You selected: ', strUser);
 }

btn2.addEventListener('click',()=>{
  const tt =document.getElementById("semester")
  const s_id = tt.options[tt.selectedIndex].value;
  showCoursesteachers(s_id)
//  console.log('You selected: ', strUser);

})






