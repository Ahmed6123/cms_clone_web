const stdbtn = document.getElementById("stdSignin")
const fabtn = document.getElementById("faSignin")
const adminbtn = document.getElementById("adminSignin")


stdbtn.addEventListener('click', () =>{
    sessionStorage.setItem("sign","student")
    window.location.href="http://localhost:5000/StudentLogin.html"
})

fabtn.addEventListener('click', () =>{
    sessionStorage.setItem("sign","faculty")
    window.location.href="http://localhost:5000/TeacherLogin.html"
})

adminbtn.addEventListener('click', () =>{
    sessionStorage.setItem("sign","admin")
    window.location.href="http://localhost:5000/CoordinatorLogin.html"
    
})