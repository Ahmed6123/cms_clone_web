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


const output = document.getElementById('output');
const btn = document.getElementById('semester-btn')
btn.addEventListener('click',()=> {
    showwarning(student_id)})
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
         output.innerHTML=HTML
      
      } catch (error) {
      console.log('Error fetching Semesters', error)
    }
  }