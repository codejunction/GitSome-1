import $ from 'jquery';

function gitSome(apiUrl, callback) {
  $.ajax({
    url: apiUrl,
    data: {
      format: 'json'
    },
    success: callback,
    error: function() {
      $('#errors').text("There was an error processing your request. Please try again.")
    }
  });
}

function search(query, callback) {
   gitSome(`https://api.github.com/search/users?q=${query}&per_page=150`, callback);
}

function getUser(username, callback) {
  gitSome(`https://api.github.com/users/${username}`, callback);
}

function getMatches(location, followers, callback){
  if (location == undefined){
    gitSome(`https://api.github.com/search/users?q=followers:${followers-3}..${followers+3}&per_page=150`, callback);
  }
  else { gitSome(`https://api.github.com/search/users?q=followers:${followers-3}..${followers+3}+location:"${location}"&per_page=150`, callback);
  }
}

// function sameLang(username, language, callback){
//   gitSome(`https://api.github.com/users/${username}
// }

export { gitSome, search, getUser, getMatches }
