//Like user by id
var likeUserBtn = document.getElementById("likeUser"); 

likeUserBtn.addEventListener("submit", function(e) {
    e.preventDefault()
              var sender_id = localStorage.getItem("id")
              var receiver_id = document.getElementById("receiver_id").value
              fetch(`http://localhost:7071/api/likeUser?sender_id=${sender_id}&receiver_id=${receiver_id}`, {
                method: "POST",
                body: JSON.stringify({
                    sender_id: sender_id,
                    receiver_id: receiver_id, 
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
         window.alert(`You have liked ${receiver_id}`)
        
    }).catch((err) => {
        console.log(err)
   })
})

//Check if the like is a match
var checkMatchBtn = document.getElementById("checkMatch")
checkMatchBtn.addEventListener("click", function(e) {
    e.preventDefault()
    fetch("http://localhost:7071/api/createMatch", {
        method: "post",
        headers: {
            "Content-Type": "application/json; charset-UTG-8"
        }
    })
    .then((response) => {
        return response.json()
    })

    .then((data) => {
        console.log(data)
            window.alert("It was a match! Go to My matches to write your new match!")

        })
        .catch((err) => {
          console.log(err)
          window.alert("We could not check if this was a match for your")
        });
    });

//Dislike user by id
var dislikeUserBtn = document.getElementById("dislikeUser"); 

dislikeUserBtn.addEventListener("submit", function(e) {
    e.preventDefault()
              var dislikeSender_id = localStorage.getItem("id")
              var dislikeReceiver_id = document.getElementById("dislikeReceiver_id").value
              fetch(`http://localhost:7071/api/dislikeUser?dislikeSender_id=${dislikeSender_id}&dislikeReceiver_id=${dislikeReceiver_id}`, {
                method: "POST",
                body: JSON.stringify({
                    dislikeSender_id: dislikeSender_id,
                    dislikeReceiver_id: dislikeReceiver_id, 
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
         window.alert(`You have disliked ${dislikeReceiver_id}`)
        
    }).catch((err) => {
        console.log(err)
   })
})

//Users can find other users in their city
var getUsersNearbyBtn = document.getElementById("usersNearby"); 

getUsersNearbyBtn.addEventListener('click', function(){
              var id = localStorage.getItem("id")
              fetch(`http://localhost:7071/api/getUsersNearby?id=${id}`)
              .then(
                  function(response){
                      if(response.status !== 200){
                          console.log("noget gik galt" + response.status);
                          return;  
                      }
                      //Det er her funktionaliteten er, da vi referer til statistics med getUser, ved at bruge samme ID.
                      //Derefter displayer vi objekterne ved at bruge JSON.stringify
                      response.json().then(function (data) {
                          document.getElementById("usersNearby").innerHTML = `
                          ${data.map(function(user) {
                              return `<h3>${user.firstName} ${user.lastName} </h3> 
                              <span> Gender: ${user.gender} </span> <br>
                              <span> Age: ${user.age} </span> <br>
                              <span> Living in ${user.city}, ${user.country} </span> <br>
                              <span> Email for contact: </span> 
                              <a href> ${user.email}</a><br>
                              <span> Looking for a ${user.preferred_gender} to date</span> <br>
                              <span> Lucky number: ${user.id} </span> <br><br>
                              `
                          }).join('')}
                          `
                    
                      })
                  }
              )
                  .catch(function (err) {
                      console.log(err);
          });
      });

//Filtering users by gender 
var genderBtn = document.getElementById("getUserByGender"); 

genderBtn.addEventListener('click', function(e){
    e.preventDefault();
            var gender = document.getElementById("gender").value
            fetch(`http://localhost:7071/api/filterGender?gender=${gender}`)
                    .then(
                        function(response){
                            if(response.status !== 200){
                                console.log("noget gik galt" + response.status);
                                return;  
                            }
                            response.json().then(function (data) {
                                document.getElementById("usersGender").innerHTML = `
                                ${data.map(function(user) {
                                    return `<h3>${user.firstName} ${user.lastName} </h3> 
                                    <span> Gender: ${user.gender} </span> <br>
                                    <span> Age: ${user.age} </span> <br>
                                    <span> Living in ${user.city}, ${user.country} </span> <br>
                                    <span> Email for contact: </span> 
                                    <a href> ${user.email}</a><br>
                                    <span> Looking for a ${user.preferred_gender} to date</span> <br>
                                    <span> Lucky number: ${user.id} </span> <br><br>
                                    `
                                }).join('')}
                                `                                
                            })
                        }
                    )
                .catch(function (err) {
                    console.log(err);
        });
    });             

//Filtering users by age
var ageBtn = document.getElementById("getUserByAge"); 

ageBtn.addEventListener('click', function(e){
    e.preventDefault()
            var minAge = document.getElementById('minAge').value 
            var maxAge = document.getElementById('maxAge').value 
            fetch(`http://localhost:7071/api/filterAge?minAge=${minAge}&maxAge=${maxAge}`)
                    .then(
                        function(response){
                            if(response.status !== 200){
                                console.log("noget gik galt" + response.status);
                                return;  
                            }
                            response.json().then(function (data) {
                                document.getElementById("usersAge").innerHTML = `
                                ${data.map(function(user) {
                                    return `<h3>${user.firstName} ${user.lastName} </h3> 
                                    <span> Gender: ${user.gender} </span> <br>
                                    <span> Age: ${user.age} </span> <br>
                                    <span> Living in ${user.city}, ${user.country} </span> <br>
                                    <span> Email for contact: </span> 
                                    <a href> ${user.email}</a><br>
                                    <span> Looking for a ${user.preferred_gender} to date</span> <br>
                                    <span> Lucky number: ${user.id} </span> <br><br>
                                    `
                                }).join('')}
                                `                                
                            })
                        }
                    )
                .catch(function (err) {
                    console.log(err);
        });
    });

//Scroll to top button - kilde: https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
    
    //Get the button:
mybutton = document.getElementById("myBtn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}