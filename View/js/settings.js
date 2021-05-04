//Both admin and dating user can delete account with this
var deleteUserBtn = document.getElementById("deleteUser")

deleteUserBtn.addEventListener('click', function(e) {
    e.preventDefault()
    var email = document.getElementById("email").value
    var password = document.getElementById("password").value
    fetch(`http://localhost:7071/api/deleteUser?email=${email}&password=${password}`, {
    method: "DELETE",
    body: JSON.stringify({
        email: email,
        password: password,
    }),
    headers: {
        "Content-Type": "application/json; charset-UTG-8"
    }
    })
    .then((data) => {
        console.log(data)
        window.alert(`The account with email: ${email} and password: ${password} has been deleted`)
        window.location = "index.html"
        
        })
        .catch((err) => {
        console.log(err)
    });
})