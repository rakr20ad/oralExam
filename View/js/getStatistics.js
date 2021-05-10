//Get all users as admin
var getUsersBtn = document.getElementById("getUsers")

getUsersBtn.addEventListener("click", function() {
    fetch(`http://localhost:7071/api/getUsers`)
    .then(
       function(response){
            if(response.status !== 200){
               console.log("noget gik galt" + response.status);
                return;  
                }
                response.json().then(function (data) {
                    let counter = 0;
                    for (let i = 0; i < data.length; i++) {
                    counter++;
                    } 
                document.getElementById("allUsers").innerHTML = `
                <span> There are currently ${counter} registered dating users in Dating Universe</span>
                    `
                    });   
                }
              )
    .catch(function (err) {
        console.log(err);
  });
});
    
//Get all matches as admin
var getMatchesBtn = document.getElementById("getMatches")

getMatchesBtn.addEventListener("click", function() {
    fetch(`http://localhost:7071/api/getAllMatches`)
    .then(
       function(response){
            if(response.status !== 200){
               console.log("noget gik galt" + response.status);
                return;  
                }
                response.json().then(function (data) {
                document.getElementById("allMatches").innerHTML = `
                ${data.map(function(match) {
                    return `<h5> User pair: ${match.user1}, ${match.user2} </h5>
                            <span> Match number: ${match.like_id} <br>
                            <span> Date of match: ${match.createdAt} </span> <br><br>
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

//Log out function
var logoutBtn = document.getElementById("logout")

logoutBtn.addEventListener("click", function() {
    var id = localStorage.getItem("id")
    //console.log(id)
    fetch(`http://localhost:7071/api/logoutAdmin?id=${id}`)
    .then(
        function(response){
            if(response.status !== 200){
                console.log("noget gik galt" + response.status);
                return;  
            }
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