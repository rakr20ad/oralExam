var logout = document.getElementById("logout")

logout.addEventListener("click", (userLogout))
    function userLogout() {
        localStorage.setItem("loggedin", JSON.stringify(false));
        //localStorage.removeItem("email", JSON.stringify(email));
        //localStorage.removeItem("password", JSON.stringify(password));
        window.location="index.html"; 
        console.log("User logged out")
            
        .catch((error) => {
        console.log(error)
        console.error("Kunne ikke logge ud");
        });
    }