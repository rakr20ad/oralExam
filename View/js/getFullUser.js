 /* var getButton = document.getElementById("getFullUser"); 

    getButton.addEventListener('click', function(){
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
                    });
                }
    
            )
                .catch(function (err) {
                    console.log(err);
        });
    })  */
