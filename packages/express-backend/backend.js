// backend.js
import express from "express";
import cors from "cors";

import {
  getUsers,
  findUserById,
  addUser,
  findUserByNameAndJob,
  deleteUserById
} from "./services/user-services.js";

const app = express();
const port = 8076;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) =>
 {
    res.send("Hello World!");
 })

app.get("/users", (req, res) => {
    const { name, job } = req.query;
    let query; 

    if (name && job) {
      query = findUserByNameAndJob(name, job);
    } else {
      query = getUsers(name, job);
    }

    query
      .then((users) => res.send({ users_list: users}))
      .catch((err) => res.status(500).send(err.message));
    
});

// GET /users/:id fetching the user by mongoDB id
app.get("/users/:id", (req, res) => {
  const id = req.params["id"];

  findUserById(id)
    .then(user => {
      if (result === null) {
        res.status(404).send("Resource not found.");
      } else {
        res.send(result);
      }
    })
    .catch(err => res.status(500).json(err.message));
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;

  addUser(userToAdd)
    .then((newUser) => res.status(201).json(newUser))
    .catch((err) => res.status(400).send(err.message));
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;

  deleteUserById(id)
    .then((deleted) => {
      if (deleted) {
        res.status(204).send();
      } else {
        res.status(404).send("Resource not found.");
      }
    })
    .catch((err) => res.status(500).send(err.message));
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});




