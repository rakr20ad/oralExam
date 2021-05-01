var updateUser = document.getElementById("updateUserAdmin")
updateUser.addEventListener("click", function(e) {
    e.preventDefault()
    var password = document.getElementById("password").value
    var email = document.getElementById("email").value
    fetch(`http://localhost:7071/api/updateUserAdmin?password=${password}&email=${email}`, {
        method: "PUT",
        body: JSON.stringify({
            password: password,
            email: email,
        }),
        headers: {
            "Content-Type": "application/json; charset-UTG-8"
        }
    })
    .then((data) => {
        console.log(data)
        window.alert(`The user's password has been reset to: ${password}`)
        
        })
        .catch((err) => {
          console.log(err)
    });
})