const github = require('../helpers/github.js');
const db = require('../database');
const express = require('express');
let app = express();

app.use(express.json())
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos', function (req, res) {
  console.log('Got a post. Body is', req.body);
  github.getReposByUsername(req.body.username, (repos) => {
    db.save(repos, (err, result) => {
      if (!err) {
        db.get25TopForkers((results) => {
          res.status(201).send(results);
        })
      }
      else {
        console.log(err);
        res.sendStatus(500);
      }
    })
  });
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
});

app.get('/repos', function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.get25TopForkers((results) => { res.status(200).send(results)});
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});