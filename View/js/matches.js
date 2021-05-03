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
                      //Det er her funktionaliteten er, da vi referer til statistics med getUser, ved at bruge samme ID.
                      //Derefter displayer vi objekterne ved at bruge JSON.stringify
                      response.json().then(function (data) {
                          document.getElementById("myMatches").innerHTML = `
                          ${data.map(function(match) {                       
                              return `<h3> Me: ${match.firstName} ${match.lastName} </h3> <br>
                                      <h4> Match number: ${match.like_id} </h4> <br>
                                      <span> Sender: ${match.sender_id} <br>
                                      <span> Receiver: ${match.receiver_id} </span> <br>
                                      ` 
                      }).join('')}` 
                      if (data.length > 0) {
                          window.alert("You have at least one match! You rock!")}
                          else {
                              window.alert("You have no matches :-(")
                          }
                        })
                    })
                .catch(function (err) {
                  console.log(err);
          });
      });

var deleteMatchBtn = document.getElementById("deleteMatch"); 

deleteMatchBtn.addEventListener('click', function(e) {
        e.preventDefault()
        var matchNumber = document.getElementById("matchNumber").value
        fetch(`http://localhost:7071/api/deleteMatch?matchNumber=${matchNumber}`, {
            method: "DELETE",
            body: JSON.stringify({
                matchNumber: matchNumber
            }),
            headers: {
                "Content-Type": "application/json; charset-UTG-8"
            }
        })
        .then((data) => {
            console.log(data)
            window.alert(`Match number: ${matchNumber} has been deleted`)
            
            })
            .catch((err) => {
              console.log(err)
        });
    })
        /*
    var getMyMatchesBtn = document.getElementById("getMyMatches"); 

    getMyMatchesBtn.addEventListener('click', function(){
                  var like_id = document.getElementById('id').value
                  fetch(`http://localhost:7071/api/getMyMatches?id=${id}`)
                  .then(
                      function(response){
                          if(response.status !== 200){
                              console.log("noget gik galt" + response.status);
                              return;  
                          }
                          //Det er her funktionaliteten er, da vi referer til statistics med getUser, ved at bruge samme ID.
                          //Derefter displayer vi objekterne ved at bruge JSON.stringify
                          response.json().then( 
                            function binarySearchIndex (data, id, low = 0, high = data.length - 1) {
                                if (low > high) {
                                  return -1
                                }
                                const midPoint = Math.floor((low + high) / 2)
                              
                                if (id < data[midPoint]) {
                                  return binarySearchIndex(data, id, low, midPoint - 1)
                                } else if (id > data[midPoint]) {
                                  return binarySearchIndex(data, id, midPoint + 1, high)
                                } else {
                                  return midPoint
                                }
                              })   
                            })
                    .catch(function (err) {
                      console.log(err);
              });
      });
    */