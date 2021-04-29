//SAMME SOM GETUSERS UNDER ADMININDEX DOG BARE MED ET FILTER, FOR BY
function getMatches() {
    var getMatches = document.getElementById("getMatches") 
    {
            fetch("http://localhost:7071/api/getMatches")
            .then(
                function(response){
                    if(response.status !== 200){
                        console.log("noget gik galt" + response.status);
                        return;  
                    }
                    //Det er her funktionaliteten er, da vi referer til getMatches med api, ved at bruge samme ID.
                    //Derefter displayer vi objekterne ved at bruge JSON.stringify
                    response.json().then(function (data) {
                        console.log(data);
                        getMatches.innerHTML = JSON.stringify(data) 
                    });
                }
            )
                .catch(function (err) {
                    console.log(err);
        });
    }};