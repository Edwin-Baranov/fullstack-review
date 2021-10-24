import React from 'react';

const RepoList = (props) => (
  <div>
    <h4> Repo List Component </h4>
    <p>There are {props.repos.length} repos.</p>
    <ul>{props.repos.map((repo) => { return (RepoItem(repo)); })}</ul>
  </div>
)

const RepoItem = (repo) => {
  return (
    <li key={repo._id}>
      <h4 onClick={() => {window.open(repo.repoUrl)}}>{repo.repoName}</h4>
      <p onClick={() => {window.open(repo.ownerUrl)}}>By: {repo.ownerName}</p>
    </li>
  )
}

export default RepoList;