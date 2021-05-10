//login datingUser - stay signed in
var login = document.getElementById("loginNow")

login.addEventListener("click", function() {
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    fetch(`http://localhost:7071/api/login`, {
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
    .then(function (data) {
        for (var i=0;i<data.length;i++) {
            localStorage.setItem("id", data[i].id)
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            localStorage.setItem("city", data[i].city);
            window.location = 'profile.html'
            }
        })
        .catch((err) => {
          console.log(err)
          window.alert("Vi kunne desværre ikke finde dig i systemet")
        });
    })
