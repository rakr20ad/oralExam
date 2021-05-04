
var getMyProfile = document.getElementById("getProfile"); 

getMyProfile.addEventListener('click', function(){
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
                          document.getElementById("myProfile").innerHTML = `
                          ${data.map(function(user) {
                              return `<h3>${user.firstName} ${user.lastName} </h3> 
                                      <span> Gender: ${user.gender} </span> <br>
                                      <span> Age: ${user.age} </span> <br>
                                      <span> Living in ${user.city}, ${user.country} </span> <br>
                                      <span> Email for contact: </span> 
                                      <a href> ${user.email}</a><br>
                                      <span> Looking for a ${user.preferred_gender} to date</span> <br>
                                      <span> Lucky number: ${user.id} </span> <br><br>
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
//Update user
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

//Log out function
var logoutBtn = document.getElementById("logout")

logoutBtn.addEventListener("click", function() {
    var id = localStorage.getItem("id")
    //console.log(id)
    fetch(`http://localhost:7071/api/logout?id=${id}`)
    .then(
        function(response){
            if(response.status !== 200){
                console.log("noget gik galt" + response.status);
                return;  
            }
            //Det er her funktionaliteten er, da vi referer til statistics med getUser, ved at bruge samme ID.
            //Derefter displayer vi objekterne ved at bruge JSON.stringify
            response.json().then(function (data) {
            for (var i=0;i<data.length;i++) {
                localStorage.removeItem("id", data[i].id)
                localStorage.removeItem("email", email);
                localStorage.removeItem("password", password);
                localStorage.setItem("online", data[i].online = false);
                console.log(data + 'User logged out')
                window.location = 'index.html'
            }
            })  
        .catch((err) => {
          console.log(err)
          window.alert("Vi kunne desværre ikke finde dig i systemet")
    });
})
})
