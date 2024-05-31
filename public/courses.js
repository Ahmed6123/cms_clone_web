const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})







const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})





if(window.innerWidth < 768) {
	sidebar.classList.add('hide');
} else if(window.innerWidth > 576) {
	searchButtonIcon.classList.replace('bx-x', 'bx-search');
	searchForm.classList.remove('show');
}


window.addEventListener('resize', function () {
	if(this.innerWidth > 576) {
		searchButtonIcon.classList.replace('bx-x', 'bx-search');
		searchForm.classList.remove('show');
	}
})



const switchMode = document.getElementById('switch-mode');

switchMode.addEventListener('change', function () {
	if(this.checked) {
		document.body.classList.add('dark');
	} else {
		document.body.classList.remove('dark');
	}
})

//Courses Dropdown
const courses_sel = document.getElementById("mycourse")
const btn_students = document.getElementById("btn-get-students")
const frm = document.querySelector("form")
const dialog = document.querySelector("dialog")
const closeButton = document.querySelector("dialog button");
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

 //Show Course Students
 const student_tbl= document.getElementById("students")
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
	  // frm.marks.value=item.dataset.marks
	  dialog.showModal();
		})

	  })
	

 } catch (error) {
   console.log('Error fetching terachers', error)
 }
 
}

//Get Students Button
 btn_students.addEventListener('click',()=>{
	const course_id = courses_sel.options[courses_sel.selectedIndex].value;
	sessionStorage.setItem("course_id",course_id)
   showstudents(course_id)})


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