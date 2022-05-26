const express = require("express");
const app = express();

let users = [];

app.use(express.urlencoded({ extended: false }));

app.get("/", (request, response) => {
  response.sendFile(__dirname + "/index.html");
});

app.get("/login", (request, response) => {
  response.sendFile(__dirname + "/login.html");
});

app.get("/secret", (request, response) => {
  response.sendFile(__dirname + "/secret.html");
});

app.post("/signup", (request, response) => {
  const username = request.body.username;
  const password = request.body.password;
  users.push({ username, password });
  response.redirect("/login");
});

app.post("/login", (request, response) => {
  const username = request.body.username;
  const password = request.body.password;

  let result = users.some((row) => {
    if (row.username === username && row.password === password) {
      return true;
    } else {
      return false;
    }
  });
  if (result === true) {
    response.redirect("/secret");
  } else {
    response.write("<p>Incorrect password</p>");
    response.write('<a href="/login">Login Page</a>');
    response.end();
  }
});

app.listen(3000, () => {
  console.log("Listening to port 3000");
});
