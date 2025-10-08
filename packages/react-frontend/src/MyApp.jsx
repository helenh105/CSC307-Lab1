// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  function removeOneCharacter(index) {
    const userToDelete = characters[index];

    fetch(`http://localhost:8076/users/${userToDelete.id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status === 204) {
          const updated = characters.filter((character, i) => i !== index);
          setCharacters(updated);
        } else if (response.status === 404) {
          console.log("User not found on backend");
        } else {
          console.log("Failed to delete user");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateList(person) {
	setCharacters([...characters, person]);
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8076/users");
    return promise;
  }

  function postUser(person) {
    const promise = fetch("http://localhost:8076/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(person),
    });

    return promise;
  }

  function updateList(person) {
    postUser(person)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to create user");
        }
        return response.json();
      })
      .then((newUser) => {
        setCharacters([...characters, newUser])
      })
      .catch((error) => {
        console.log(error);
      })
  }

  useEffect(() => {
  fetchUsers()
	  .then((res) => res.json())
	  .then((json) => setCharacters(json["users_list"]))
	  .catch((error) => { console.log(error); });
}, [] );

  return (
    <div className="container">
      <Table 
	characterData={characters}
	removeCharacter={removeOneCharacter}
	/>
      <Form handleSubmit={updateList}/>
    </div>
  );
}




export default MyApp;
