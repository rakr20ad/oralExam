//SAMME SOM GETUSERS UNDER ADMININDEX DOG BARE MED ET FILTER, FOR BY
function getUsersNearby() {
    var getUsersNearby = document.getElementById("getUsersNearby") 
    {
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
                        console.log(data);
                        getUsersNearby.innerHTML = JSON.stringify(data) 
                    });
                }
            )
                .catch(function (err) {
                    console.log(err);
        });
    }};

    /*getUsersNearby.addEventListener('click', function(){
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
                        window.location="./View/matches.html"
                    });
                }
    
            )
                .catch(function (err) {
                    console.log(err);
        });
    })*/