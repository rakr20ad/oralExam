//Both admin and dating user can delete account with this
var deleteUserBtn = document.getElementById("deleteUser")

deleteUserBtn.addEventListener('click', function(e) {
    e.preventDefault()
    var id = document.getElementById("id").value
    fetch(`http://localhost:7071/api/deleteUser?id${id}`, {
    method: "DELETE",
    body: JSON.stringify({
        id: id
    }),
    headers: {
        "Content-Type": "application/json; charset-UTG-8"
    }
    })
    .then((data) => {
        console.log(data)
        window.alert(`The account has been deleted`)
        //window.location = "index.html"
        
        })
        .catch((err) => {
        console.log(err)
    });
})