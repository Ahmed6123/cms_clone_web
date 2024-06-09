const frm=document.getElementById("loginForm")
const loginBtn=document.getElementById("login")
const error = document.querySelector(".error")

loginBtn.addEventListener('click', (e)=>{
    e.preventDefault()
    const email=frm.email.value
    const password = frm.password.value
    Login(email,password)
})

async function Login(email,password){
    try {
        const url = "http://localhost:5000/coordinator/login"
        const res = await fetch(url, {
            method: "POST",
            headers: {"Content-type": 'application/json'},
            body: JSON.stringify ({
              email,
              password
            })
          })
        if (!res.ok) {
            error.style.display="block"
            error.innerHTML="invalid email or password"
            return
        }
        const user = await res.json()
        window.location.href='http://localhost:5000/CoordinatorDashboard.html'
    } catch (error) {
        console.log('Error fetching users', error)
    }
      
}
