const logout= document.getElementById("logout-btn")
logout.addEventListener('click',()=>{
    sessionStorage.clear()
    window.location.href="http://localhost:5000"
  })