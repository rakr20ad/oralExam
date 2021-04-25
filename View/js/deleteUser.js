//Til at få alle brugerne, så admin kan se antal brugere
function deleteUser() {
    var deleteUser = document.getElementById("deleteUser") 
    {
            fetch("http://localhost:7071/api/deleteUser")
            .then(
                function(response){
                    if(response.status !== 200){
                        console.log("noget gik galt" + response.status);
                        return;  
                    }
                    response.staus("User has been deleted")
                }
            )
                .catch(function (err) {
                    console.log(err);
        });
    }};
