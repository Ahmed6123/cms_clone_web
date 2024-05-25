const btn = document.querySelector("#get-courses-btn")
const output = document.querySelector("#output")

async function showCourses() 
{
 try {
    const res = await fetch('http://localhost:5000/courses/')
    if (!res.ok) 
    {
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
            <th>Semester</th>
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
      <td class="test">${course.semester}</td>
      <td class="test"><input type="checkbox" value ='${course.id}' class="checkbox"></td>
      </tr>
      `
     });
     HTML+=`
     </tbody>
     </table>
     <div><button id = "btn-register">Register</button></div>
     `
     output.innerHTML=HTML
         
     const btn1= document.getElementById('btn-register')
     btn1.addEventListener('click', () =>{
      let listArray = []
      document.querySelectorAll(".checkbox").forEach(item => {
        if (item.checked === true){
          listArray.push(item.value)
        }
      })
        console.log(listArray)

     })
    
  } catch (error) 
  {
    console.log('Error fetching courses', error)
  }  
}

btn.addEventListener('click', showCourses)