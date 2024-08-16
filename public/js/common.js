const student_id = JSON.parse(sessionStorage.student).id
const batch = JSON.parse(sessionStorage.student).batch

const logout= document.getElementById("logout-btn")
logout.addEventListener('click',()=>{
    sessionStorage.clear()
    window.location.href="https://cms-clone.vercel.app/"
  })