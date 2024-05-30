const btn2 = document.getElementById("semester-btn")

btn2.addEventListener('click',()=>{
    const tt =document.getElementById("semester")
    const s_id = tt.options[tt.selectedIndex].value;
    showCoursesteachers(s_id)
})

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
  
      courses.forEach((course) => {
        HTML+=`
        <tr>
        <td>${course.code}</td>
        <td>${course.title}</td>
        <td class="test">${course.credits}</td>
        <td>${course.name===null ? '' : course.name}</td>
        <td> ${course.name===null ? `<button class="register" data-course="${course.title}" id=${course.id}>Register</button>` : `<label class='registered-labrl'>Registered</label`}</td>
        </tr>
        `
       });
       HTML+=`
       </tbody>
       </table>
       `
       output.innerHTML=HTML
  
      } catch (error) {
        console.log('Error fetching terachers', error)
      }
  }
