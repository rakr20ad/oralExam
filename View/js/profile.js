var updateUser = document.getElementById("updateUser")
updateUser.addEventListener("click", function(e) {
    e.preventDefault()
    var age = document.getElementById("age").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    fetch(`http://localhost:7071/api/updateUser?age=${age}&email=${email}&password=${password}`, {
        method: "PUT",
        body: JSON.stringify({
            age: age,
            email: email,
            password: password
        }),
        headers: {
            "Content-Type": "application/json; charset-UTG-8"
        }
    })
    .then((data) => {
        console.log(data)
        window.alert("Your user information has been updated!")
        
        })
        .catch((err) => {
          console.log(err)
    });
})


var logout = document.getElementById("logout")

logout.addEventListener("click", (userLogout))
    function userLogout() {
        localStorage.setItem("loggedin", JSON.stringify(false));
        localStorage.removeItem("email", JSON.stringify(email));
        localStorage.removeItem("password", JSON.stringify(password));
        window.location="index.html"; 
        console.log("User logged out")
            
        .catch((error) => {
        console.log(error)
        console.error("Kunne ikke logge ud");
        });
    }

var deleteUser = document.getElementById("deleteUser")

deleteUser.addEventListener('click', function(e) {
    e.preventDefault()
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    fetch(`http://localhost:7071/api/deleteUser?email=${email}&password=${password}`, {
    method: "DELETE",
    body: JSON.stringify({
        age: age,
        email: email,
    }),
    headers: {
        "Content-Type": "application/json; charset-UTG-8"
    }
    })
    .then((data) => {
        console.log(data)
        window.alert("Your account has been deleted")
        window.location = "index.html"
        
        })
        .catch((err) => {
        console.log(err)
    });
})