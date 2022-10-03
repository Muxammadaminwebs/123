"use strict";

const baseURL = "http://localhost:3000"
async function getUser() {
    try {
        const response = await fetch(`${baseURL}/user `, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }

        });
        const result = await response.json();
        renderData(result);
    } catch (err) {
        console.log(err);
    };
};

getUser()


let text = document.querySelector("#text"),
    add = document.querySelector(".btn"),
    ul = document.querySelector(".data")


function renderData(data) {
    data.forEach((item) => {
        let li = document.createElement("li");
        li.classList.add("list")
        li.dataset.id = item.id;
        li.innerHTML = `<div class="titles">${item.id} ${item.name}</div>
       <div class="buttons">  <button class="delete-btn"  data-del=${item.id}>delete</button>
        <button class="edit"data-edit="${item.id}">edit</button> </div> `;
        ul.appendChild(li)
        
    })
}
 function addUser(userName){
        try {
            fetch(`${baseURL}/user `, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name:`${userName}`
                })

            });
        } catch (err) {
            console.log(err);
        }
}


add.addEventListener("click", (e) => {
    if (text.value.trim().length !== 0) {
         addUser(text.value)
    } else {
        alert("inputni toldiring")
    }
    
})
function deleteUser(id) {
          try {
              fetch(`${baseURL}/user/${id} `, {
                  method: 'DELETE',
                  headers: {
                      "Content-Type": "application/json"
                  },
                  body: JSON.stringify({
                      
                  })

              });
          } catch (err) {
              console.log(err);
          }
}
function updateUser(id,text) {
    try {
        fetch(`${baseURL}/user/${id} `, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name:text
            })

        });
    } catch (err) {
        console.log(err);
    }
}
ul.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete-btn")) {
        deleteUser(e.target.getAttribute("data-del"))
    }
    if (e.target.classList.contains("edit")) {
        let newText = prompt("inter text")
        updateUser(e.target.getAttribute("data-edit"),newText)
    }
})


