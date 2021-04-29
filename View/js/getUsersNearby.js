//SAMME SOM GETUSERS UNDER ADMININDEX DOG BARE MED ET FILTER, FOR BY
var getUsersNearby = document.getElementById("getUsersNearby"); 

getUsersNearby.addEventListener('click', function(){
            var city = document.getElementById("city").value
            fetch(`http://localhost:7071/api/getUsersNearby?city=${city}`)
            .then(
                function(response){
                    if(response.status !== 200){
                        console.log("noget gik galt" + response.status);
                        return;  
                    }
                    //Det er her funktionaliteten er, da vi referer til statistics med getUser, ved at bruge samme ID.
                    //Derefter displayer vi objekterne ved at bruge JSON.stringify
                    response.json().then(function (data) {
                        document.getElementById("usersNearby").innerHTML = `
                        ${data.map(function(users) {
                            return `<h3> Name: ${users.firstName} ${users.lastName}</h3>
                                    <span> email: ${users.email}</span>
                                    <h4> Age: ${users.age}</h4>
                                    <h4> Dating preferences: ${users.preferred_gender}</h4>
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

//Vores filter med køn og alder - det er herunder vi også fetcher en user:
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
                                //vi laver href om til en button, med id så man kan hente det i en funktion der redirecter
                              out += '<button id="fetchUser"="' + data[i].id + '">' + 
                              data[i].firstName + data[i].email + '</button><br>'; 
                            }
                            document.getElementById("filter1").innerHTML = JSON.stringify(out); 
                            //her vi skriver vores funktion indenfor "knappen" når man trykker på brugerne når man filtrerer
                        }).then(function fetchUser() {
                            var fetchUser = document.getElementById("fetchUser") 
                            {
                                    fetch(`http://localhost:7071/api/fetchUser?id=${id}`)
                                    .then(
                                        function(response){
                                            if(response.status !== 200){
                                                console.log("noget gik galt" + response.status);
                                                return;  
                                            }
                                            //Det er her funktionaliteten er, da vi referer til fetchUser med api, ved at bruge samme ID.
                                            //Derefter displayer vi objekterne ved at bruge JSON.stringify
                                            response.json().then(function (data) {
                                                console.log(data);
                                                fetchUser.innerHTML = JSON.stringify(data) 
                                                window.location="user.html"
                                            });
                                        }
                                    )
                                        .catch(function (err) {
                                            console.log(err);
                                });
                            }});
                        
                        
                        
                        /*function fetchUser (function (fetchUser){
                            //Kalder den fetchUser, da vi tænker den skal refere til kanppen over.
                            var fetchUser = document.getElementById("fetchUser");
                            fetchUser.addEventListener("click", function(){
                                //var id = document.getElementsById("id").value
                                //først skal den fetche fra vores Azure, så den ved fra databasen hvad den skal hente til os, som er personen med det givne ID
                                fetch(`http://localhost:7071/api/fetchUser?id=${id}`) 
                                .then(window.location="user.html"*
                                )
                            })*/

                        })
                        /*.then(function (out) {
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
