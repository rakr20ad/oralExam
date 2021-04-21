/*var adminForm = document.getElementById("adminForm");

adminForm.addEventListener("submit", function(e) {
    e.preventDefault()
    var firstName = document.getElementById("firstName").value
    var lastName = document.getElementById("lastName").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    fetch("http://localhost:7071/api/sysadminCreate", {
        method: "POST",
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName, 
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
    }).catch((err) => {
        console.log(err)
    }) 
})

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
    .then((data) => {
        console.log(data)
        /*if (status == 200) {*//*
            localStorage.setItem("loggedIn", JSON.stringify(true));
            localStorage.setItem("email", JSON.stringify(email));
            localStorage.setItem("password", JSON.stringify(password));
            window.location="adminPage.html"; 
            console.log("Ja tak")
          if  (status == 404) {
            console.log("Could not login")
    }})
        .catch((error) => {
          console.log(error)
          console.error("Kunne overhovedet ikke logge ind");
        });
    });

*/
var getUsers = document.getElementById("getUsers")

    getUsers.addEventListener("click", function(){
        //var firstName = document.getElementById("firstName").value
        fetch(`http://localhost:7071/api/statistics`)
            .then(
                function(response){
                    if (response.status !== 200){
                        console.log("Noget gik galt" + response.status);
                        return;
                    }
    
                    response.json().then(function (data) {
                        console.log(data);
                    });
                }
            )
            .catch(function (err){
                console.log(err);
            });
    })