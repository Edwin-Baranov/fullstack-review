const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  //Set id to the given id,
  _id: Number,
  //name
  repoName: String,
  //html_url
  repoUrl: String,
  //owner.name
  ownerName: String,
  //owner.html_url
  ownerUrl: String,
  //forks --using this to track most 'popular', could use watchers
  forksNumber: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repoArr, callback) => {
  //Github will give us an array of repos, array could contain only one object
  //Need to loop through array however it will be async so we need to wait for completion of each one

  let repos = repoArr.map(repo => {
    let _id = repo.id;
    let repoName = repo.name;
    let repoUrl = repo.html_url;
    let ownerName = repo.owner.login;
    let ownerUrl = repo.owner.html_url;
    let forksNumber = repo.forks_count;

    let repoObject = { repoName, repoUrl, ownerName, ownerUrl, forksNumber };

    return Repo.updateOne({ _id }, repoObject, {upsert: true, setDefaultsOnInsert: true}).exec();
  });

  Promise.all(repos)
    .then((result) => { callback(null, result) })
    .catch((err) => { callback(err) });
}

let get25TopForkers = (callback) => {
  Repo.find().sort('-forksNumber').limit(25)
  .then((results) => {callback(results)});
}

module.exports.save = save;
module.exports.get25TopForkers = get25TopForkers;