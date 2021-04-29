//Users can find other users in a given city
var usersNearbyBtn = document.getElementById("getUsersNearby"); 

usersNearbyBtn.addEventListener('click', function(){
            var city = document.getElementById("city").value
            fetch(`http://localhost:7071/api/getUsersNearby?city=${city}`)
                    .then(
                        function(response){
                            if(response.status !== 200){
                                console.log("noget gik galt" + response.status);
                                return;  
                            }
                            response.json().then(function (data) {
                                document.getElementById("usersNearby").innerHTML = `
                                ${data.map(function(users) {
                                    return `<h6><b> Name: ${users.firstName} ${users.lastName}</b></h6> <br>
                                            <p> Lucky number: ${users.id}</p> <br>
                                            <p> Age: ${users.age}</p> <br>
                                            <p> Dating preferences: ${users.preferred_gender}</p> <br>
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

//Filtering users by gender 
var genderBtn = document.getElementById("getUserByGender"); 

genderBtn.addEventListener('click', function(){
            var gender = document.getElementById("gender").value
            fetch(`http://localhost:7071/api/filterGender?gender=${gender}`)
                    .then(
                        function(response){
                            if(response.status !== 200){
                                console.log("noget gik galt" + response.status);
                                return;  
                            }
                            response.json().then(function (data) {
                                document.getElementById("usersGender").innerHTML = `
                                ${data.map(function(user1) {
                                    return `<h5> Name: ${user1.firstName} ${user1.lastName}</h5>
                                            <span> Lucky Number: ${user1.id}</span>
                                            <p> Age: ${user1.age}</p>
                                            <p> Dating preferences: ${user1.preferred_gender}</p>
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

//Filtering users by age
var ageBtn = document.getElementById("getUserByAge"); 

ageBtn.addEventListener('click', function(){
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
                                document.getElementById("usersAge").innerHTML = `
                                ${data.map(function(user2) {
                                    return `<h3> Name: ${user2.firstName} ${users.lastName}</h3>
                                            <span> email: ${user2.email}</span>
                                            <h4> Age: ${user2.age}</h4>
                                            <h4> Dating preferences: ${user2.preferred_gender}</h4>
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

