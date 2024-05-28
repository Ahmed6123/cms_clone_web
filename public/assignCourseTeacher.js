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

const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})


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

// After this Point , JS will be for functionality


//Populate Table Stuff
const assignteacherdiv = document.getElementById("output")

async function showCoursesteachers(id) {
    try {
      const res = await fetch('http://localhost:5000/coordinator/teacherscourses/' + id);
      if (!res.ok) {
        throw new Error('Failed to fetch courses');
      }
      const courses = await res.json();
      let HTML = `
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Title</th>
            <th>Credits</th>
            <th>Teacher</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
      `;
      courses.forEach((course) => {
        HTML += `
        <tr>
          <td>${course.code}</td>
          <td>${course.title}</td>
          <td>${course.credits}</td>
          <td>${course.name === null ? '' : course.name}</td>
          <td>
            ${course.name === null ? `<button class="add" data-course="${course.title}" id=${course.id}>Add</button>` : `<button class="remove" id=${course.del_id}>Remove</button>`}
          </td>
        </tr>
        `;
      });
      HTML += `
        </tbody>
      </table>
      `;
      assignteacherdiv.innerHTML = HTML;

      const addButtons = document.querySelectorAll(".add");
      addButtons.forEach((item) => {
        item.addEventListener('click', () => {
          console.log(item.id);
          sessionStorage.setItem("coursedata", JSON.stringify({ id: item.id, course: item.dataset.course }));
          const courseData = JSON.parse(sessionStorage.getItem("coursedata"));
          if (courseData) {
            course_current.value = `${courseData.course}`;
           }
          dialog.showModal();
        });
      });

      const removeButtons = document.querySelectorAll(".remove");
      removeButtons.forEach((item) => {
        item.addEventListener('click', () => {
          deletecourse(item.id);
        });
      });

    } catch (error) {
      console.log('Error fetching teachers', error);
    }
  }

//Populate Teacher Selection Dropdown Stuff
const teachersel = document.getElementById("teacherSel")
const course_current = document.getElementById("current-course");
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
    teachersel.innerHTML=HTML
    } catch (error) {
      console.log('Error fetching terachers', error)
    }
  }
showTeachers();

//Modal Stuff
const dialog = document.querySelector("dialog")
const closeButton = document.querySelector("dialog button");
const frm =document.getElementById("assign-form")
async function deletecourse(id) {
  const res = await fetch('http://localhost:5000/coordinator/delete/'+id, {
    method: "DELETE"
  })
  sem_btn.click()
}

  async function AddTeacherCourse(teacherId,courseId) {
    console.log(teacherId,courseId)
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
frm.addEventListener('submit',(e) =>{
  e.preventDefault()
  const teacherId = teachersel.options[teachersel.selectedIndex].value
  const courseId= JSON.parse(sessionStorage.getItem('coursedata')).id
  console.log(teacherId,courseId)
  const result = AddTeacherCourse(teacherId,courseId)
  sem_btn.click()  
  dialog.close()
  })

  closeButton.addEventListener("click", () => {
  dialog.close();
});


//Main Semester Selection Stuff
const sem_dropdown = document.getElementById('semester-dropdown');
const sem_btn = document.getElementById("semester-btn");
sem_btn.addEventListener('click', () => {
    const semesterSelect = document.getElementById("semester-dropdown");
    const selectedSemester = semesterSelect.options[semesterSelect.selectedIndex].value;
    showCoursesteachers(selectedSemester);
  });
;