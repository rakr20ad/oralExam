//Get a list of user's matches
var getMyMatchesBtn = document.getElementById("getMyMatches"); 

getMyMatchesBtn.addEventListener('click', function(){
              var id = localStorage.getItem("id")
              fetch(`http://localhost:7071/api/getMyMatches?id=${id}`)
              .then(
                  function(response){
                      if(response.status !== 200){
                          console.log("noget gik galt" + response.status);
                          return;  
                      }
                      response.json().then(function (data) {
                          document.getElementById("myMatches").innerHTML = `
                          ${data.map(function(match) {                                                
                              return `
                                      <h4> Match number: ${match.like_id} </h4> 
                                      <span> Sender: ${match.user1} <br>
                                      <span> Receiver: ${match.user2} </span> <br>
                                      ` 
                      }).join('')}` 
                        })
                    })
                .catch(function (err) {
                  console.log(err);
          });
      });
//Delete match by typing in match number (like_id)
var deleteMatchBtn = document.getElementById("deleteMatch"); 

deleteMatchBtn.addEventListener('click', function(e) {
        e.preventDefault()
        var like_id = document.getElementById("matchNumber").value
        fetch(`http://localhost:7071/api/deleteMatch?like_id=${like_id}`, {
            method: "DELETE",
            body: JSON.stringify({
                like_id: like_id
            }),
            headers: {
                "Content-Type": "application/json; charset-UTG-8"
            }
        })
        .then((data) => {
            console.log(data)
            window.alert(`Match number: ${like_id} has been deleted`)
            
            })
            .catch((err) => {
              console.log(err)
        });
    })