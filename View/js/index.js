//Create user logic in frontend
var form = document.getElementById("form");

form.addEventListener("submit", function(e) {
    e.preventDefault()
    var firstName = document.getElementById("firstName").value
    var lastName = document.getElementById("lastName").value
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var age = document.getElementById("age").value
    var city = document.getElementById("city").value    
    var gender = document.querySelector('input[name="gender"]:checked').value
    var preferred_gender = document.querySelector('input[name="preferred_gender"]:checked').value
    fetch("http://localhost:7071/api/createUser", {
        method: "POST",
        body: JSON.stringify({
            firstName: firstName,
            lastName: lastName, 
            email: email,
            password: password,
            age: age,            
            city: city,
            gender: gender,
            preferred_gender: preferred_gender
        }),
        headers: {
            "Content-Type": "application/json; charset-UTG-8"
        }
    })
    .then((response) => {
        return response.json()
    })
    .then((user) => {
        console.log(user)
        window.alert(`You have succesfully made an account!`)
    }).catch((err) => {
        console.log(err)
    }) 
})

var getButton = document.getElementById("getUser"); 




