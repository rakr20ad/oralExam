var form = document.getElementById("form");

form.addEventListener("submit", function(e) {
    e.preventDefault()
    var firstName = document.getElementById("firstName").value
    var lastName = document.getElementById("lastName").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    //var birthday = document.getElementById("birthday").value
    var city = document.getElementById("city").value     
    var country = document.getElementById("country").value    
    var gender = document.getElementById("gender").value
    var preferred_gender = document.getElementById("preferred_gender").value
    fetch("http://localhost:7071/api/createUser", {
        method: "POST",
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName, 
            email: email,
            password: password,
            //birthday: birthday,            
            city: city,
            country: country,
            gender: gender,
            preferred_gender: preferred_gender
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
    }).catch((err) => {
        console.log(err)
    }) 
})

var getButton = document.getElementById("getUser"); 

getButton.addEventListener('click', function(){
    var firstName = document.getElementById('firstName').value 
    fetch(`http://localhost:7071/api/createUser?firstName=${firstName}`)
        .then(
            function(response){
                if(response.status !== 200){
                    console.log("noget gik galt" + response.status);
                    return;  
                }
                response.json().then(function (data) {
                    console.log(data);
                });
            }

        )
            .catch(function (err) {
                console.log(err);
    });
})


var login = document.getElementById("login")
login.addEventListener("submit", function(e) {
    e.preventDefault()
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    fetch("http://localhost:7071/api/logIn", {
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
    .then((data) => {
        console.log(data)
        /*if (status == 200) {*/
            console.log("Ja tak")
            localStorage.setItem("loggedin", JSON.stringify(true));
            localStorage.setItem("email", JSON.stringify(email));
            localStorage.setItem("password", JSON.stringify(password));
            window.location="profile.html" 
          if  (status == 404) {
            console.log("Could not login")
          }
          else {
            console.log("What")
          }
        })
        .catch((error) => {
          console.log(error)
          console.error("Kunne ikke logge ind");
        });
    })

var logout = document.getElementById("logout")

logout.addEventListener("click", function(e) {
    e.preventDefault()
    /*var email = document.getElementById("email").value
    var password = document.getElementById("password").value*/
    fetch("http://localhost:7071/api/logIn", {
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
    .then((data) => {
        console.log(data)
        /*if (status == 200) {*/
            console.log("Ja tak")
            localStorage.setItem("loggedin", JSON.stringify(false));
            localStorage.removeItem("email", JSON.stringify(email));
            localStorage.removeItem("password", JSON.stringify(password));
            window.location="index.html" 
          if  (status == 404) {
            console.log("Could not login")
          }
          else {
            console.log("Ej hvor galt")
          }
        })
        .catch((error) => {
          console.log(error)
          console.error("Kunne ikke logge ud");
        });
    })
/*
var login = document.getElementById("login");

login.addEventListener("click", function(e) {
    e.preventDefault()
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    
    fetch("http://localhost:7071/api/logIn", {
        method: "POST",
        body: JSON.stringify({
            email: email,
            password: password,
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
        if(data == status(200)){
          window.location="homepage.html"
        } else if (data == status(404)){
          console.log("Could not log in")
        }
    })
    .catch((err) => {
        console.log(err)
    })

})*/