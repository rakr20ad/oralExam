var login = document.getElementById("login")
login.addEventListener("click", function(e) {
    e.preventDefault()
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    fetch(`http://localhost:7071/api/login?email=${email}&password=${password}`, {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password
        }),
        headers: {
            "Content-Type": "application/json; charset-UTG-8"
        }
    })
    .then((response) => {
        return response.json()
    })
    .then((data) => {
        console.log(data)
            console.log("Ja tak")
            localStorage.setItem("loggedin", JSON.stringify(true));
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            window.location = 'profile.html'

        })
        .catch((err) => {
          console.log(err)
          window.alert("Vi kunne desværre ikke finde dig i systemet")
        });
    })
