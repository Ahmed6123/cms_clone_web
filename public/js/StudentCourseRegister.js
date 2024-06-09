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

//All Logic Below

const btn = document.getElementById("semester-btn")
const semester_Sel= document.getElementById("semester")
const result_tbl=document.getElementById("output")

//Semester DropDown Logic
showSemesters()
async function showSemesters() {
	try {
	  const res = await fetch('http://localhost:5000/student/open/'+batch)
	  if (!res.ok) {
		teachersel.innerHTML="No Semester open for Registertion"
		return
	  }
	  const semester = await res.json()
	  let HTML = `<option value='${semester.semester}'>Semester ${semester.semester}</option>`
	  semester_Sel.innerHTML=HTML
	} catch (error) {
	  console.log('Error fetching Semesters', error)
	}
  }

  btn.addEventListener('click',()=>{
	const tt =document.getElementById("semester")
	const s_id = tt.options[tt.selectedIndex].value;
	showMyCourses(s_id,student_id)
  })

//Show Courses Logic
  async function showMyCourses(s_id,student_id) {
	try {
	 const res = await fetch('http://localhost:5000/student/mycourses',{
	 method: "POST", 
	 headers: {"Content-type": 'application/json'},
	  body: JSON.stringify ({
		  semester_id:s_id,
		  student_id
	  })
	 })
	 if (!res.ok) {
	   throw new Error('Failed to fetch students')
	 }
	 const results = await res.json()
	 
	 let HTML =
	 `<table>
		   <thead>
		 <tr>
			 <th>Title</th>
			 <th class="test">Credits</th>
			 <th class="test">Register</th>
		 </tr>
	 </thead>
	 <tbody>
	 `

	 results.forEach((result) => {  
	   HTML+=`
	   <tr>
		<td>${result.title}</td>
		<td class="test">${result.credits}</td>
		<td> ${result.course_id===null ? `<button class="add" data-course="${result.title}" id=${result.id}>Register</button>` : `Registered`}</td>
	   </tr>
	   `
	  });
	  HTML+=`
	  </tbody>
	  </table>
	  `
	  result_tbl.innerHTML=HTML
  
	  output.innerHTML=HTML
	  const o = document.querySelectorAll(".add")
	  o.forEach((item) => {
	   item.addEventListener('click',()=> {
		course_id = item.id
		addCourse(course_id,student_id)
		setTimeout(()=>{btn.click()},100)
		
		 })
  
	   })
  
   } catch (error) {
	 console.log('Error fetching results', error)
   }
   
  }

  async function addCourse(course_id,student_id) {
  
	const res = await fetch('http://localhost:5000/student/register', {
	  method: "POST",
	  headers: {"Content-type": 'application/json'},
	  body: JSON.stringify ({
		student_id,
		course_id
	  })
  
	})
	 
   }