const loginfield = document.getElementById("login-field")
const signinbtn = document.getElementById("sign-in")

signinbtn.addEventListener("click", async (e) => {
    e.preventDefault()
    const email = loginfield.value
    const res = await fetch(`http://localhost:5000/teacher/login/${email}`)
    const data = await res.json()
    sessionStorage.setItem('teacher_id' , data)
    window.location.href = "http://localhost:5000/courses.html"
})