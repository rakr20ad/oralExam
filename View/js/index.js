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
        /*
          else if  (status == 404) {
            console.log("Could not login")
          }
          else {
            console.log("What")
          }*/
        })
        .catch((err) => {
          console.log(err)
        });
    })

var logout = document.getElementById("logout")

logout.addEventListener("click", userLogout)

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

    var genderButton = document.getElementById("filterGender"); 

    genderButton.addEventListener('click', function(){
        var gender = document.getElementById('gender').value 
        fetch(`http://localhost:7071/api/filterGender?gender=${gender}`)
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
                              out += '<a href="' + data[i].id + '">' + 
                              data[i].firstName + data[i].email + '</a><br>'; 
                            }
                            document.getElementById("filter1").innerHTML = JSON.stringify(out); 
                        })/*.then(function (out) {
                            var fields = "<div>
                            <form action="get">
                                <input type="text" id="city" placeholder="City" required>
                            </form>
                        </div><form";
                            var n;
                            for(n = 0; n<fields.length; i++) {
                                fields += '<p' + fields[i].id + '">' + 
                                data[i].firstName + data[i].email + '</p><br>';
                              }
                              document.getElementById("id01").innerHTML = JSON.stringify(out); 
                        })*/
                }
                )
                .catch(function (err) {
                    console.log(err);
           });
    })

var ageButton = document.getElementById("filterAge"); 

ageButton.addEventListener('click', function(){
    var minAge = document.getElementById('minAge').value 
    var maxAge = document.getElementById('maxAge').value 
    fetch(`http://localhost:7071/api/filterAge?minAge=${minAge}&maxAge=${maxAge}`)
        .then(
            function(response){
                if(response.status !== 200){
                    console.log("noget gik galt" + response.status);
                    return;  
                }
                response.json().then(function (data) {
                    console.log(data);
                    ageButton.innerHTML = JSON.stringify(data) 
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