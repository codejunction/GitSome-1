import $ from 'jquery';

function gitPromise(url) {
  return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    request.onload = function() {
      if (this.status === 200) {
        console.log(url);
        let response = JSON.parse(request.response);
        resolve(response);
      } else {
        reject(Error(request.statusText));
      }
    }
    request.open("GET", url, true);
    request.send();
  });
}

function search(query) {
   return gitPromise(`https://api.github.com/search/users?q=${query}&per_page=150`);
}

function getUser(username) {
  return gitPromise(`https://api.github.com/users/${username}`);
}

function getMatches(location, followers, language){
  if (location == undefined){
    return gitPromise(`https://api.github.com/search/users?q=Epicodus+followers:${followers-1}..${followers+1}+language:"${language}"&per_page=150`);
  }
  else {
     return gitPromise(`https://api.github.com/search/users?q=epicodus+followers:${followers-5}..${followers+5}+language:"${language}"&per_page=150`);
  }
}

function getRepo(username){
  return gitPromise(`https://api.github.com/users/${username}/repos?sort=date&per_page=1`);
}

// function sameLang(username, language, callback){
//   gitpromise(`https://api.github.com/users/${username}`)
// }

export { search, getUser, getMatches, getRepo }
