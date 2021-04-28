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
        //if (status == 200) {
            console.log("Ja tak")
            localStorage.setItem("loggedin", JSON.stringify(true));
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            window.location = 'profile.html'
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
          window.alert("Vi kunne desværre ikke finde dig i systemet")
        });
    })


//Herinde skal vores login funktion skrives, som skal kobles på "Button" til login der ligger under homepage.html
//const { json } = require("express")

/*var login = document.getElementById("login");

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

})
*/

//Nikolajs syntaks fra index.js
/*var login = document.getElementById("login")

login.addEventListener("click", function(e){
    //function login(e){
    e.preventDefault()
    var email = document.getElementById("email").value 
    var password = document.getElementById("password").value 
    /*if(email!==email || password!==password){
      return "Email or password is incorrect"
    }else {
      res.redirect('/homepage')
    }*/
    /*fetch("http://localhost:7071/api/logIn",{
        method:"POST",
        body:JSON.stringify({email: email, password: password}),
        headers: {
            "Content-Type": "application/JSON; charset-UTG-8"
        }
        .then((response) => {
          return response.json()
      })
    }).then((data) => {
      console.log(data)
      /*if (status == 200) {
        console.log("Ja tak")
        /*localStorage.setItem("loggedin", JSON.stringify(true));
        localStorage.setItem("email", JSON.stringify(user.email));
        localStorage.setItem("password", JSON.stringify(user.password));*/
        /*window.location="homepage.html" 
      }
      else if  (status == 404) {
        console.log("Could not login")
      }
      else {
        console.log("What")
      }*/
    /*})
    .catch((error) => {
      console.log(user)
      console.log(error)
      console.error("Kunne ikke logge ind");
    });
  })*/
     
/*})
    .then((data) => {
        console.log(data)
    }).catch((err) => {
        console.log(err)
    }) 
});*/


//Syntaks der måske kan bruges - man skal i hvert fald have en login funktion, som vist: 
//(...)tænker det kan bruges lidt, da det ligner Nikolajs.(Husk al kode fra Emilias eksamen også lægger under drevmappen)
// MIN LOGINFUNKTION, DER VALIDERER PÅ LOGINSIDEN
/*function login(){  
    
    // Vi opretter variabel, som tager værdien af firstname & lastname variablen
    let user = {
    firstName: document.getElementById('fname').value, 
    lastName: document.getElementById('lname').value,
    }
        //Vi bruger fetch igen, hvor vi siger at den skal fange fejlen hvis der opstår fejl i koden under then:
        fetch('http://localhost:8000/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }, 
          body: JSON.stringify(user),
        }).then(response => {
          //200 er succes, så hvis der er succes med at logge ind
          if (response.status == 200) {
            console.log("Ja tak")
            localStorage.setItem("loggedin", JSON.stringify(true));
            localStorage.setItem("userName", JSON.stringify(user.firstName));
            localStorage.setItem("lastName", JSON.stringify(user.lastName));
            window.location="account.html" 
          }
          else if  (response.status == 404) {
            console.log("Could not login")
          }
          else {
            console.log("What")
          }
            
          
        })
        .catch((error) => {
          console.log(user)
          console.log(error)
          console.error("Kunne ikke logge ind");
        });
      };*/