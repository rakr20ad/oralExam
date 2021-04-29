
var login = document.getElementById("login")
// HAS TO BE A SUBMIT bubtton
login.addEventListener("submit", function(e) {
    e.preventDefault()
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    fetch("http://localhost:7071/api/login", {
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
        return response
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
    //?email=${email}&password=${password}