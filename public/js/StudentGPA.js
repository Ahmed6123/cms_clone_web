document.addEventListener('DOMContentLoaded', function () {
    // Sidebar menu item activation
    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');
    allSideMenu.forEach(item => {
        const li = item.parentElement;
        item.addEventListener('click', function () {
            allSideMenu.forEach(i => {
                i.parentElement.classList.remove('active');
            });
            li.classList.add('active');
        });
    });

    // Toggle sidebar
    const menuBar = document.querySelector('#content nav .bx.bx-menu');
    const sidebar = document.getElementById('sidebar');
    menuBar.addEventListener('click', function () {
        sidebar.classList.toggle('hide');
    });

    // Search button functionality
    const searchButton = document.querySelector('#content nav form .form-input button');
    const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
    const searchForm = document.querySelector('#content nav form');
    searchButton.addEventListener('click', function (e) {
        if (window.innerWidth < 576) {
            e.preventDefault();
            searchForm.classList.toggle('show');
            if (searchForm.classList.contains('show')) {
                searchButtonIcon.classList.replace('bx-search', 'bx-x');
            } else {
                searchButtonIcon.classList.replace('bx-x', 'bx-search');
            }
        }
    });

    // Responsive adjustments
    if (window.innerWidth < 768) {
        sidebar.classList.add('hide');
    } else if (window.innerWidth > 576) {
        searchButtonIcon.classList.replace('bx-x', 'bx-search');
        searchForm.classList.remove('show');
    }

    window.addEventListener('resize', function () {
        if (this.innerWidth > 576) {
            searchButtonIcon.classList.replace('bx-x', 'bx-search');
            searchForm.classList.remove('show');
        }
    });

    // Dark mode switch
    const switchMode = document.getElementById('switch-mode');
    switchMode.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
    });


});


//Functionality

const btn = document.getElementById("semester-btn")
const result_tbl=document.getElementById("output")

btn.addEventListener('click',()=>{
    const tt =document.getElementById("semester")
    const s_id = tt.options[tt.selectedIndex].value;
    showMyResult(s_id,student_id)
  })

  async function showMyResult(s_id,student_id) {

    try {
  
     const res = await fetch('http://localhost:5000/student/myresult',{
     method: "POST", 
     headers: {"Content-type": 'application/json'},
      body: JSON.stringify ({
          semester_id:s_id,
          student_id
      })
     })
     
     if (!res.ok) {
        result_tbl.innerHTML="No result Available"
        return
     }
     const results = await res.json()
     
     let HTML =
     `<table>
           <thead>
         <tr>
             <th>Title</th>
             <th class="test">Credits</th>
             <th class="test">Grade</th>
             <th class="test">Grade Points</th>
             <th class="test">Prodcut</th>
         </tr>
     </thead>
     <tbody>
     `
  let product_tot=0
  let credits_tot=0
     results.forEach((result) => {
      
      product_tot+=parseInt(result.product)
      credits_tot+=parseInt(result.credits)
  
       HTML+=`
       <tr>
        <td>${result.title}</td>
        <td class="test">${result.credits}</td>
        <td class="test">${result.grade ?? 'N/A'}</td>
        <td class="test">${result.gp ?? 'N/A'}</td>
        <td class="test">${result.product ?? 'N/A'}</td>
       </tr>
       `
      });
       
      HTML+=`
      <tr>
      <td colspan="3"></td>
      <td class="test">GPA</td>
      <td class="test">${(product_tot/credits_tot).toFixed(2)}</td></tr>
      <tr><td colspan="5"><button id="download-btn">Download PDF</button></td></tr>
      </tbody>
      </table>
      `
      result_tbl.innerHTML=HTML
      const dl = document.getElementById("download-btn")
      dl.addEventListener('click', () => {
        html2pdf().from(result_tbl).save()
      })
   } catch (error) {
     console.log('Error fetching results', error)
   }
  }
   
   
async function showAllResult(student_id) {
    try {
  
     const res = await fetch('http://localhost:5000/student/allresult/'+student_id)
     
     if (!res.ok) {
        result_tbl.innerHTML="No result Available"
        return
     }
     const results = await res.json()
     
     let semesterNo=1
     const tblhead = `
    <table>
     <thead>
       <tr>
       <th>Title</th>
       <th class="test">Credits</th>
       <th class="test">Grade</th>
       <th class="test">Grade Points</th>
       <th class="test">Prodcut</th>
   </tr>
  </thead>
  <tbody>
  `
     let HTML =tblhead
   
     let product_tot=0
     let credits_tot=0
     let gpa=0
     let gpa_tot=0
     let cgpa=0
     
     results.forEach((result) => {
      if (semesterNo!=parseInt(result.semester)) {
        gpa= (product_tot/credits_tot).toFixed(2)
        gpa_tot+=parseFloat(gpa)
        cgpa=gpa_tot/semesterNo
        HTML+=`
        <tr>
        <td colspan="3"></td>
        <td class="test">GPA</td>
        <td class="test">${gpa}</td></tr>
        <tr>
        <td colspan="3"></td>
        <td class="test">CGPA</td>
        <td class="test">${cgpa.toFixed(2)}</td></tr>
        </tbody>
        </table>
        `
        HTML+=tblhead
        product_tot=0
        credits_tot=0
        
        semesterNo=result.semester
      }
      
      product_tot+=parseInt(result.product)
      credits_tot+=parseInt(result.credits)
  
       HTML+=`
       <tr>
        <td>${result.title}</td>
        <td class="test">${result.credits}</td>
        <td class="test">${result.grade ?? 'N/A'}</td>
        <td class="test">${result.gp ?? 'N/A'}</td>
        <td class="test">${result.product ?? 'N/A'}</td>
       </tr>
       `
       });
       gpa= (product_tot/credits_tot).toFixed(2)
       gpa_tot+=parseFloat(gpa)
       cgpa=gpa_tot/semesterNo
       
        HTML+=`
        <tr>
        <td colspan="3"></td>
        <td class="test">GPA</td>
        <td class="test">${gpa}</td></tr>
        <tr>
        <td colspan="3"></td>
        <td class="test">CGPA</td>
        <td class="test">${cgpa.toFixed(2)}</td></tr>
        <tr><td colspan="5"><button id="download-btn">Download PDF</button></td></tr>
        </tbody>
        </table>
  
      `
      result_tbl.innerHTML=HTML
      const dl = document.getElementById("download-btn")
      dl.addEventListener('click', () => {
        html2pdf().from(result_tbl).save()
      })
      
  
  
   } catch (error) {
     console.log('Error fetching results', error)
   }
   
  }
  const showAllBtn =document.getElementById("show-All")
  showAllBtn.addEventListener('click',()=>{
    showAllResult(student_id)
  })


