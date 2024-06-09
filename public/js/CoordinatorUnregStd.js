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

const batch_sel = document.getElementById("batch-dropdown")
const result_tbl=document.getElementById("output")
const batchBtn= document.getElementById("semester-btn")
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
   ShowUnregStudents(batch)
  })

  async function ShowUnregStudents(batch){
    try {
      const res = await fetch(`http://localhost:5000/coordinator/getunregstudents/${batch}`)
      if (!res.ok) {
        result_tbl.innerHTML="No Student available"
        return
      }
      const students = await res.json()
      let HTML = `
	<table>
		<thead>
	<tr>
		<th>Student Name</th>
		<th>Father Name</th>
		<th>Email</th>
	</tr>
       </thead>
	   <tbody>`
      students.forEach((student) => {
      HTML+=`
      <tr>
      <td>${student.name}</td>
      <td>${student.f_name}</td>
      <td>${student.email}</td>
      </tr>
      `
      });
      HTML+=`</tbody></table>`
      result_tbl.innerHTML=HTML
    } catch (error) {
      console.log('Error fetching Students', error)
    }
  }