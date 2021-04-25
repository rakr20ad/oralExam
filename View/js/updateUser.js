var updateUser = document.getElementById("updateUser")
updateUser.addEventListener("submit", function(e) {
    e.preventDefault()
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    var age = document.getElementById("age").value
    fetch("http://localhost:7071/api/updateUser", {
        method: "PUT",
        body: JSON.stringify({
            age: age,
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
        if (status == 200) {
            JSON.stringify(data)
            updateUser.innerHTML = JSON.stringify(data)  
        }
        })
        .catch((err) => {
          console.log(err)
        });
    })

    