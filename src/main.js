import './styles.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import { search, getUser, getMatches, getRepo } from './gitSome.js';

function searchUser(searchString) {
  let promise = search(searchString);
  promise.then(function(response) {
    $('#showUsers').text('');
    $("#resultsFound").text(response.total_count + " Result(s) Found");
    response.items.forEach(function(user) {
      $('#showUsers').append(`<div class="col-md-4" id="me"><a target="_blank" href="${user.html_url}"><h3 class=loginName>${user.login}</h3></a><img src="${user.avatar_url}" id="profilepic"><button type="button" class="btn btn-info matchMe">Match Me!</button><hr></div>`);
      $('.matchMe').last().click(function() {
        getUserInfo(user);
      });
    });
  }, handleErrors);
}

function getUserInfo(user) {
  let promiseInfo = getUser(user.login);
  let promiseLang = getRepo(user.login);
  Promise.all([promiseInfo, promiseLang]).then(function(values){
    console.log(values);
    console.log(values[0].login);
    console.log(values[0].followers);
    console.log(values[1][0].language);
    getUserMatches(values[0].location, values[0].followers, values[1][0].language);
  }, handleErrors);
}

function getUserMatches(location, followers, language) {
  let promise = getMatches(location, followers, language);
  promise.then(function(matches){
    $('#showUsers').text('');
    $("#resultsFound").text(matches.total_count + " Results Found");
    if (location == undefined){
      $("#markLocation").text("We recommend you put in a location in your Github profile to get a more accurate programmer suggestion!")
    }
    $('#matchrequest').click(function(){
        $("#markLocation").text(" ")
    });
    matches.items.forEach(function(match) {
      $('#showUsers').append(`<div class="col-md-4"><a target="_blank" href="${match.html_url}"><h3 class=loginName>${match.login}</h3></a><img src="${match.avatar_url}" id="profilepic">`);
    });
  }, handleErrors);
}

function handleErrors(error) {
  console.log('something went horribly wrong: ' + error);
}

$(document).ready(function() {
  $('.nameForm').submit(function(event) {
    event.preventDefault();
    $(".hidden").show();
    $("#codelines").hide();
    let searchString = $('#username').val();
    $('#username').val("");
    searchUser(searchString);

  });
  $("#matchrequest").click(function(event){
    $(".hidden").hide();
    $("#codelines").show();
  });

  $('#search').submit(function(event) {
    event.preventDefault();
    $(".hidden").show();
    $("#codelines").hide();
    let searchString = $('#searchbar').val();
    $('#username').val("");
    searchUser(searchString);

  });
});
