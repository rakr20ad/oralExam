
var getProfile = document.getElementById("getProfile"); 

getProfile.addEventListener('click', function(){
              var email = localStorage.getItem("email")
              var password = localStorage.getItem("password")
              fetch(`http://localhost:7071/api/login?email=${email}&password=${password}`)
              .then(
                  function(response){
                      if(response.status !== 200){
                          console.log("noget gik galt" + response.status);
                          return;  
                      }
                      //Det er her funktionaliteten er, da vi referer til statistics med getUser, ved at bruge samme ID.
                      //Derefter displayer vi objekterne ved at bruge JSON.stringify
                      response.json().then(function (data) {
                          document.getElementById("getMyProfile").innerHTML = `
                          ${data.map(function(user) {
                              return `<h3> Name: ${user.firstName} ${user.lastName} </h3>
                                      <span> Your lucky number: ${user.id} </span>
                                      `
                          }).join('')}
                          `
                    
                      })
                  }
              )
                  .catch(function (err) {
                      console.log(err);
          });
      });

var updateUser = document.getElementById("updateUser")
updateUser.addEventListener("click", function(e) {
    e.preventDefault()
    var age = document.getElementById("age").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    fetch(`http://localhost:7071/api/updateUser?age=${age}&email=${email}&password=${password}`, {
        method: "PUT",
        body: JSON.stringify({
            age: age,
            email: email,
            password: password
        }),
        headers: {
            "Content-Type": "application/json; charset-UTG-8"
        }
    })
    .then((data) => {
        console.log(data)
        window.alert("Your user information has been updated!")
        
        })
        .catch((err) => {
          console.log(err)
    });
})

/*
var deleteUser = document.getElementById("deleteUser")
deleteUser.addEventListener('click', function(e) {
    e.preventDefault()
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    fetch(`http://localhost:7071/api/deleteUser?email=${email}&password=${password}`, {
    method: "DELETE",
    body: JSON.stringify({
        age: age,
        email: email,
    }),
    headers: {
        "Content-Type": "application/json; charset-UTG-8"
    }
    })
    .then((data) => {
        console.log(data)
        window.alert("Your account has been deleted")
        window.location = "index.html"
        
        })
        .catch((err) => {
        console.log(err)
    });
})*/

var logout = document.getElementById("logout")
//Log out function
logout.addEventListener("click", (userLogout))
    function userLogout() {
        localStorage.setItem("online", false);
        localStorage.removeItem("email", JSON.stringify(email));
        localStorage.removeItem("password", JSON.stringify(password));
        window.location="index.html"; 
        console.log("User logged out")
            
        .catch((error) => {
        console.log(error)
        console.error("Kunne ikke logge ud");
        });
    }