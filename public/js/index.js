const stdbtn = document.getElementById("stdSignin")
const fabtn = document.getElementById("faSignin")
const adminbtn = document.getElementById("adminSignin")


stdbtn.addEventListener('click', () =>{
    sessionStorage.setItem("sign","student")
    window.location.href="/StudentLogin.html"
})

fabtn.addEventListener('click', () =>{
    sessionStorage.setItem("sign","faculty")
    window.location.href="/TeacherLogin.html"
})

adminbtn.addEventListener('click', () =>{
    sessionStorage.setItem("sign","admin")
    window.location.href="/CoordinatorLogin.html"
    
})