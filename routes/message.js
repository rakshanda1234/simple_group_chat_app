const express = require("express");

const router = express.Router();

const data = require("./data");

const fs = require("fs");
router.get("/", (req, res) => {
  fs.readFile("message.txt", "utf-8", (err, data) => {
    if (err) {
      console.log(err);
      data = "No chat Exist";
    }
    res.send(
      `${data}<form action="/" method="POST" onSubmit="document.getElementById('username').value=localStorage.getItem('username')">
      <input type="text"  name="message"  id="message" placeholder="message" >
      <input type="hidden" name="username" id="username">
      <button type="submit">Send</button>
      </form>`
    );
  });
});

router.post(`/`, (req, res) => {
  fs.writeFile(
    "message.txt",
    `${req.body.username}  :  ${req.body.message}\n`,

    { flag: "a" },

    (err) => {
      console.log(`${req.body.username} : ${req.body.message}`);
      err ? console.log(err) : res.redirect("/");
    }
  );
});

module.exports = router;
