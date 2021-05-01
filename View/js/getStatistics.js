//Get all users as admin
var getUsersBtn = document.getElementById("getUsers")

getUsersBtn.addEventListener("click", function() {
    fetch(`http://localhost:7071/api/statistics`)
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
    
//Get all users as admin
var getMatchesBtn = document.getElementById("getMatches")

getMatchesBtn.addEventListener("click", function() {
    fetch(`http://localhost:7071/api/allMatches`)
    .then(
       function(response){
            if(response.status !== 200){
               console.log("noget gik galt" + response.status);
                return;  
                }
                response.json().then(function (data) {
                document.getElementById("allMatches").innerHTML = `
                ${data.map(function(user) {
                    return `<h3> Name: ${user.firstName} ${user.lastName} </h3>
                            <span> Age: ${user.age} <br>
                            <span> Lucky number: ${user.id} </span>
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