// backend.js
import express from "express";
import cors from "cors";

const app = express();
const port = 5173;

const users = {
  users_list: [
    {
      id: "xyz789",
      name: "Charlie",
      job: "Janitor"
    },
    {
      id: "abc123",
      name: "Mac",
      job: "Bouncer"
    },
    {
      id: "ppp222",
      name: "Mac",
      job: "Professor"
    },
    {
      id: "yat999",
      name: "Dee",
      job: "Aspring actress"
    },
    {
      id: "zap555",
      name: "Dennis",
      job: "Bartender"
    }
  ]
};

const findUserByName = (name) => {
  return users["users_list"].filter(
    (user) => user["name"] === name
  );
};

const findUserById = (id) =>
  users["users_list"].find((user) => user["id"] === id);

const addUser = (user) => {
  users["users_list"].push(user);
  return user;
};

const deleteUserById = (id) => {
    return users["users_list"].filter((user) => user["id"] != id)
};

const findUserByNameAndJob = (name, job) => {
    return users["users_list"].filter(
        (user) => user["name"] == name && user["job"] == job
    );
};

app.use(cors());
app.use(express.json());

app.get("/users", (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    let result;

    if (name != undefined & job != undefined){
        let result = findUserByNameAndJob(name, job);
        result = { users_list: result};
        res.send(result);
    } else if (name != undefined){
        result = findUserByName(name);
    } else {
        result = users["users_list"];
    }
    res.send(users);
});

app.post("/users", (req, res) => {
  const userToAdd = req.body;
  addUser(userToAdd);
  res.send();
});

app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});




