//Get all users as admin

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
    