//Vores create User 
var form = document.getElementById("form");

form.addEventListener("submit", function(e) {
    e.preventDefault()
    var firstName = document.getElementById("firstName").value
    var lastName = document.getElementById("lastName").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var age = document.getElementById("age").value
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
            age: age,            
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


/*getButton.addEventListener('click', function(){
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
})*/


/*var login = document.getElementById("login")
login.addEventListener("click", function(e) {
    e.preventDefault()
    var email = document.getElementById("loginEmail").value
    var password = document.getElementById("loginPassword").value
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
        return response.json()
    })
    .then((data) => {
        console.log(data)
        //if (status == 200) {
            console.log("Ja tak")
            localStorage.setItem("loggedin", JSON.stringify(true));
            localStorage.setItem("email", JSON.stringify(email));
            localStorage.setItem("password", JSON.stringify(password));
            window.location="homepage.html"
        /*
          else if  (status == 404) {
            console.log("Could not login")
          }
          else {
            console.log("What")
          }*/
       /* })
        .catch((err) => {
          console.log(err)
          window.alert("Vi kunne desværre ikke finde dig i systemet")
        });
    })*/


    var getUsersNearby = document.getElementById("getFullUser"); 

    getUsersNearby.addEventListener('click', function(){
        var city = document.getElementById('city').value 
        fetch(`http://localhost:7071/api/getFullUser?city=${city}`)
            .then(
                function(response){
                    if(response.status !== 200){
                        console.log("noget gik galt" + response.status);
                        return;  
                    }
                    response.json().then(function (data) {
                        console.log(data);
                        window.location=`http://localhost:7071/api/getFullUser?city=${city}`
                    });
                }
    
            )
                .catch(function (err) {
                    console.log(err);
        });
    })  


/*
    var getProfile = document.getElementById("getProfile");
    
    getProfile.addEventListener('click', function(){
        let data = data[i].id
        fetch(`http://localhost:7071/api/getProfile?id=${id}`)
        .then(
            function(response){
                if(response.status !== 200){
                    console.log("noget gik galt" + response.status);
                    return;  
                }
                response.json().then(function (data) {
                    var out = "";
                    var i;
                    for(i = 0; i<data.length; i++) {
                      out += '<p' + data[i].id + '">' + 
                      data[i].firstName + '</p><br>';
                    }
                    document.getElementById("id01").innerHTML = JSON.stringify(out); 
                });
            }
    
        )
            .catch(function (err) {
                console.log(err);
    });
    
    })*/


