var deleteUser = document.getElementById("deleteUser")
deleteUser.addEventListener('click', function(e) {
    e.preventDefault()
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    fetch(`http://localhost:7071/api/deleteUser?email=${email}&password=${password}`, {
    method: "DELETE",
    body: JSON.stringify({
        age: age,
        email: email,
    }),
    headers: {
        "Content-Type": "application/json; charset-UTG-8"
    }
    })
    .then((data) => {
        console.log(data)
        window.alert("Your account has been deleted")
        window.location = "index.html"
        
        })
        .catch((err) => {
        console.log(err)
    });
})