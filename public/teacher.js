const courses_sel = document.getElementById("mycourse")
const btn_students = document.getElementById("btn-get-students")
const student_tbl= document.getElementById("students")

const dialog = document.querySelector("dialog")
const closeButton = document.querySelector("dialog button");
const frm = document.querySelector("form")

const id = sessionStorage.getItem("teacher_id")
if (id) {
  showCourses(id)
}

async function showCourses(id) {

   try {

    const res = await fetch('http://localhost:5000/teacher/mycourses/'+id)
  
    if (!res.ok) {
      throw new Error('Failed to fetch teachers')
    }
    const courses = await res.json()
    
    // console.log("success")
    let HTML = ``
  courses.forEach((course) => {
  HTML+=`
  <option value='${course.id}'>${course.title}</option>
  `
  });
   
 
  courses_sel.innerHTML=HTML

  } catch (error) {
    console.log('Error fetching terachers', error)
  }
  
}

async function showstudents(id) {

  try {

   const res = await fetch('http://localhost:5000/teacher/mystudents/'+id)
 
   if (!res.ok) {
     throw new Error('Failed to fetch studnets')
   }
   const students = await res.json()
   
    // console.log("sucess")
   let HTML =
   `<table>
         <thead>
       <tr>
           <th>ID</th>
           <th>Name</th>
           <th>Father's Name</th>
           <th>Marks</th>
           <th>Completed</th>
           <th>Actions</th>
       </tr>
   </thead>
   <tbody>
   `
   // output.innerHTML=''

   students.forEach((student) => {
     HTML+=`
     <tr>
     <td>${student.id}</td>
     <td>${student.name}</td>
     <td>${student.f_name}</td>
     <td class="test">${student.marks===null ? '' : student.marks}</td>
     <td class="test"><input type="checkbox" name="chk" ${student.marks===null ? '' : 'checked'} disabled></td>
     <td><button class="add" data-marks="${student.marks}" id=${student.id}>Edit Marks</button></td>
     </tr>
     `
    });
    HTML+=`
    </tbody>
    </table>
    `
    student_tbl.innerHTML=HTML

    const o = document.querySelectorAll(".add")
     o.forEach((item) => {
      item.addEventListener('click',()=> {
      sessionStorage.setItem("student_id",item.id)
      frm.marks.value=item.dataset.marks
      dialog.showModal();
        })

      })
    

 } catch (error) {
   console.log('Error fetching terachers', error)
 }
 
}


btn_students.addEventListener('click',()=>{
   const course_id = courses_sel.options[courses_sel.selectedIndex].value;
   sessionStorage.setItem("course_id",course_id)
  showstudents(course_id)
//  console.log('You selected: ', strUser);

})

frm.addEventListener('submit',(e) =>{
  e.preventDefault()
  const course_id = sessionStorage.getItem("course_id")
  const student_id = sessionStorage.getItem("student_id")
  const marks = frm.marks.value
  Addmarks(course_id,student_id,marks)
  dialog.close()
  btn_students.click()
    
})


closeButton.addEventListener('click', ()=>{
  dialog.close()
})

async function Addmarks (course_id, student_id, marks) {
  
  const res = await fetch('http://localhost:5000/teacher/addmarks', {
    method: "POST",
    headers: {"Content-type": 'application/json'},
    body: JSON.stringify ({
        course_id,
        student_id,
        marks
    })

  })
  return

}
