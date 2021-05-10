//This is for the admin to login, after creating account
var adminLogin = document.getElementById("adminLogin")
adminLogin.addEventListener("submit", function(e) {
    e.preventDefault()
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    fetch("http://localhost:7071/api/sysadminLogin", {
        method: "post",
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
            localStorage.setItem("email", data[i].email);
            localStorage.setItem("password", data[i].password);
            window.location = 'adminPage.html'
            }
        })
        .catch((err) => {
          console.log(err)
          window.alert("Vi kunne desværre ikke finde dig i systemet")
        });
    })