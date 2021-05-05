//const datingUser = require('../../Model/user')

var login = document.getElementById("loginNow")

login.addEventListener("click", function() {
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    //let user = new datingUser(firstName, lastName, email, password, age, city, country, gender, preferred_gender, false)
    //console.log(datingUser1)
    fetch(`http://localhost:7071/api/login`, {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password,
            online: false
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
            localStorage.setItem("online", data[i].online = true);
            console.log(data)
            window.location = 'profile.html'
         //How we stay logged i
        }
})
        .catch((err) => {
          console.log(err)
          //window.alert("Vi kunne desværre ikke finde dig i systemet")
        });
    })
