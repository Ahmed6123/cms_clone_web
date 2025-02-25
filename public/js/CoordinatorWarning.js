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

const batch_sel = document.getElementById("semester-dropdown")
const batchBtn= document.getElementById("semester-btn")

const frm = document.getElementById("warning-form")
const dialog = document.querySelector("dialog")
const closeButton = document.querySelector("dialog button");
const result_tbl=document.getElementById("output")

showBatches()

async function showBatches() {
  
  try {

    const res = await fetch('http://localhost:5000/coordinator/batches')
  
    if (!res.ok) {
      result_tbl.innerHTML="No Batch available"
      return
    }
    
    const batches = await res.json()

    let HTML = ``
    batches.forEach((batch) => {
    HTML+=`
    <option value='${batch.batch}'>${batch.batch}</option>
    `
    });
    
    batch_sel.innerHTML=HTML

  } catch (error) {
    console.log('Error fetching Semesters', error)
  }
  
}

batchBtn.addEventListener('click',()=>{
  const batch = batch_sel.options[batch_sel.selectedIndex].value;
 showstudents(batch)
})

async function showstudents(batch) {
  
  try {

    const res = await fetch('/coordinator/getstudents/'+batch)
  
    if (!res.ok) {
      throw new Error('Failed to fetch students')
    }

    const students = await res.json()
    let HTML =
    `<table>
          <thead>
        <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Father's Name</th>
            <th>Email</th>
            <th>Warnings</th>
        </tr>
    </thead>
    <tbody>
    `
    students.forEach((student) => {
      HTML+=`
      <tr>
      <td>${student.id}</td>
      <td>${student.name}</td>
      <td>${student.f_name}</td>
      <td>${student.email}</td>
      <td><button class="add" data-user="${student.name}" id=${student.id}>Issue</button><button class="show" id=${student.id}>Show</button></td>
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
        sessionStorage.setItem("student_id",item.id)
        frm.name.value=item.dataset.user
        dialog.showModal();

        })

      })

      const r = document.querySelectorAll(".show")
      r.forEach((item) => {
       item.addEventListener('click',()=> {
        showwarning(item.id)
         })
 
       })

    } catch (error) {
      console.log('Error fetching terachers', error)
    }
}

frm.addEventListener('submit',(e) =>{
  e.preventDefault()
  const war = frm.complaint.value
  const student_id = sessionStorage.getItem("student_id")
  Addcompaint(student_id,war)
  dialog.close()
})
async function Addcompaint (student_id,war) {
  const res = await fetch('http://localhost:5000/coordinator/addwarning', {
    method: "POST",
    headers: {"Content-type": 'application/json'},
    body: JSON.stringify ({
        war,
        student_id
    })

  })
  return
}

const war_div = document.getElementById("war")
async function showwarning(student_id) {

  try {

    const res = await fetch('http://localhost:5000/student/mywarnings/'+student_id)
  
    if (!res.ok) {
      war_div.innerHTML="No Warnings"
      throw new Error('Failed to fetch courses')
    }
    
    const warnings = await res.json()

      let HTML =
      `<table>
        <thead>
          <tr>
              <th>Warning</th>
          </tr>
        </thead>
      <tbody>
      `
      warnings.forEach((warning) => {
        HTML+=`
        <tr>
        <td>${warning.warning}</td>
        </tr>
        `
       });
       HTML+=`
       </tbody>
       </table>
       `
       war_div.innerHTML=HTML
    
    } catch (error) {
    console.log('Error fetching Semesters', error)
  }
}
closeButton.addEventListener('click', ()=>{
	dialog.close()
  })