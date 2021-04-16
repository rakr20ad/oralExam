var form = document.getElementById("form");

form.addEventListener("submit", function(e) {
    e.preventDefault()

    var name = document.getElementById("name").value
    var email = document.getElementById("email").value
    var gender = document.getElementById("gender").value
    var country = document.getElementById("country").value
    var birthday = document.getElementById("birthday").value
    var image = document.getElementById("image").value

    fetch("http://localhost:7071/api/createUser", {
        method: "POST",
        body: JSON.stringify({
            name: name, 
            email: email,
            gender: gender,
            country: country,
            birthday: birthday,
            image: image
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

var getButton = document.getElementById("getUser"); 

getButton.addEventListener('click', function(){
    var name = document.getElementById('name').value 
    fetch(`http://localhost:7071/api/createUser?name=${name}`)
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
})
