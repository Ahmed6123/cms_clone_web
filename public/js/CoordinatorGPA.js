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

const batch_sel = document.getElementById("batch-dropdown")
const batchBtn= document.getElementById("semester-btn")
const semester_sel = document.getElementById("semester-dropdown")


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
	const semester = semester_sel.options[semester_sel.selectedIndex].value;
   ShowResults(batch,semester)
  })

  const lowresultbtn=document.getElementById("show-low-results")
  lowresultbtn.addEventListener('click',()=>{
    const batch = batch_sel.options[batch_sel.selectedIndex].value;
	const semester = semester_sel.options[semester_sel.selectedIndex].value;
   ShowLowResults(batch,semester)
  })

async function ShowResults(batch,semester){
  try {
	const res = await fetch(`http://localhost:5000/coordinator/getresults/`, {
		method: 'POST',
		headers: {
		  'Content-Type': 'application/json',
		},
		body: JSON.stringify({batch,semester}),})
	if (!res.ok) {
	  result_tbl.innerHTML="No Batch available"
	  return
	}
	const semesters = await res.json()
	let HTML = `
	<table>
		<thead>
	<tr>
		<th>Student Name</th>
		<th>Credits</th>
		<th>Product</th>
		<th>GPA</th>
	</tr>
       </thead>
	   <tbody>`
	semesters.forEach((semester) => {
	HTML+=`
	<tr>
	<td>${semester.name}</td>
	<td>${semester.credits}</td>
	<td>${semester.product}</td>
	<td>${parseFloat(semester.gpa).toFixed(2)}</td>
	</tr>
	`
	});
	HTML+=`</tbody></table>`
	result_tbl.innerHTML=HTML
  } catch (error) {
	console.log('Error fetching Semesters', error)
  }
}


async function ShowLowResults(batch,semester){
	try {
	  const res = await fetch(`http://localhost:5000/coordinator/getlowresults/`, {
		  method: 'POST',
		  headers: {
			'Content-Type': 'application/json',
		  },
		  body: JSON.stringify({batch,semester}),})
	  if (!res.ok) {
		result_tbl.innerHTML="No Batch available"
		return
	  }
	  const semesters = await res.json()
	  let HTML = `
	  <table>
		  <thead>
	  <tr>
		  <th>Student Name</th>
		  <th>Credits</th>
		  <th>Product</th>
		  <th>GPA</th>
	  </tr>
		 </thead>
		 <tbody>`
	  semesters.forEach((semester) => {
	  HTML+=`
	  <tr>
	  <td>${semester.name}</td>
	  <td>${semester.credits}</td>
	  <td>${semester.product}</td>
	  <td>${parseFloat(semester.gpa).toFixed(2)}</td>
	  </tr>
	  `
	  });
	  HTML+=`</tbody></table>`
	  result_tbl.innerHTML=HTML
	} catch (error) {
	  console.log('Error fetching Semesters', error)
	}
  }