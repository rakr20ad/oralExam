//const datingUser = require('../../Model/user')

var login = document.getElementById("login")

login.addEventListener("click", function() {
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    //let datingUser1 = new datingUser(firstName, lastName, email, password, age, city, country, gender, preferred_gender, false)
    //console.log(datingUser1)
    fetch(`http://localhost:7071/api/login?email=${email}&password=${password}`)
        .then(
            function(response){
                if(response.status !== 200){
                    console.log("noget gik galt" + response.status);
                    return;  
                }
    response.json().then(function (data) {
        console.log(data)
        for (var i=0;i<data.length;i++) {
            localStorage.setItem("id", data[i].id)
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            localStorage.setItem("online", true);
            window.location = 'profile.html'
        }  //How we stay logged i
    })
    
        .catch((err) => {
          console.log(err)
          window.alert("Vi kunne desværre ikke finde dig i systemet")
        });
    })
    
}) 