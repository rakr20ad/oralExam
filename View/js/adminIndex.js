//This is for creating an admin account
var adminForm = document.getElementById("adminForm");

adminForm.addEventListener("submit", function(e) {
    e.preventDefault()
    var firstName = document.getElementById("firstName").value
    var lastName = document.getElementById("lastName").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    fetch("http://localhost:7071/api/insertAdmin", {
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

    
//Til at få alle brugerne, så admin kan se antal brugere
function getUsers() {
    var getUsers = document.getElementById("getUsers") 
    {
            fetch("http://localhost:7071/api/statistics")
            .then(
                function(response){
                    if(response.status !== 200){
                        console.log("noget gik galt" + response.status);
                        return;  
                    }
                    //Det er her funktionaliteten er, da vi referer til statistics med getUser, ved at bruge samme ID.
                    //Derefter displayer vi objekterne ved at bruge JSON.stringify
                    response.json().then(function (data) {
                        console.log(data);
                        getUsers.innerHTML = JSON.stringify(data)                    
                    });
                }
            )
                .catch(function (err) {
                    console.log(err);
        });
    }};
    
