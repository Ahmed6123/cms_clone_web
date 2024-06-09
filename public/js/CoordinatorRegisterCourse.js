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
   OpenSemesters(batch)
  })

  async function OpenSemesters(batch) {
  
    result_tbl.innerHTML=''
    try {
  
      const res = await fetch('http://localhost:5000/coordinator/getopensemesters/'+batch)
    
      if (res.ok) {
        const semester = await res.json()
  
        let HTML =
        `<table>
              <thead>
            <tr>
                <th>Batch</th>
                <th class="test">Semester</th>
                <th class="test">Open/Close</th>
                <th class="test">Action</th>
            </tr>
        </thead>
        <tbody>
        <tr>
        <td>${semester.batch}</td>
        <td class="test">${semester.semester}</td>
        <td class="test">${semester.open ? 'Open': 'Close'}</td>
        <td>${semester.open ? `<button data-id="${semester.id}" id="close">Close</button>`:''}</td>
        </tr>
        </tbody>
        </table>      
      `
      result_tbl.innerHTML=HTML
      o = document.getElementById("close")
      o.addEventListener('click', () =>{
        const id= o.dataset.id
        closeSemester(id)
        batchBtn.click()
        
      })
      } else {
        const res = await fetch('http://localhost:5000/coordinator/getnextsemester/'+batch)
        if (res.ok) {
          const semester = await res.json()
    
          let HTML =
          `<table>
                <thead>
              <tr>
                  <th>Batch</th>
                  <th class="test">Semester</th>
                  <th class="test">Open/Close</th>
                  <th class="test">Action</th>
              </tr>
          </thead>
          <tbody>
          <tr>
          <td>${batch}</td>
          <td class="test">${semester.semester}</td>
          <td class="test">Close</td>
          <td><button id="open" data-semester="${semester.semester}">Open</button></td>
          </tr>
          </tbody>
          </table>      
        `
        result_tbl.innerHTML=HTML
        o = document.getElementById("open")
        o.addEventListener('click', () =>{
          const semester= o.dataset.semester
          openSemester(batch,semester)
          setTimeout(()=>{batchBtn.click()},500)
          
          
        })
        }        
      }
        

    } catch (error) {
      console.log('Error fetching Semesters', error)
    }
    
  }

  async function closeSemester(id) {
      
  const res = await fetch('http://localhost:5000/coordinator/closesemester/'+id)
    
  }

  async function openSemester(batch,semester) {
      
      const res = await fetch('http://localhost:5000/coordinator/opensemester', {
        method: "POST",
        headers: {"Content-type": 'application/json'},
        body: JSON.stringify ({
          batch,
          semester
        })
    
      })
       
     }


// SELECT batch,semester,open from batch_semester where open=1 and batch='2022