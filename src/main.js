import './styles.css';
import $ from 'jquery';
import 'bootstrap/dist/css/bootstrap.min.css';
import { gitSome, search, getUser, getMatches } from './gitSome.js';

function getInfo(user) {
  getUser(user.login, function(response) {
    getMatches(response.location, response.followers, function(matches){
      $('#showUsers').text('');
      $("#resultsFound").text(matches.total_count + " Results Found");
      matches.items.forEach(function(match) {
        $('#showUsers').append(`<div class="col-md-4"><a href="${match.html_url}"><h3>${match.login}</h3></a><img src="${match.avatar_url}" id="profilepic"><h4>${match.name}</h4>`);
      });
    });
  });
}

$(document).ready(function() {
  $('#nameForm').submit(function(event) {
    $("#git").show();
    $("#codelines").hide();
    let searchString = $('#username').val();
    $('#username').val("");
    search(searchString, function(response) {
      $('#showUsers').text('');
      $("#resultsFound").text(response.total_count + " Result(s) Found");
      response.items.forEach(function(user) {
        $('#showUsers').append(`<div class="col-md-4" id="me"><a href="${user.html_url}"><h3>${user.login}</h3></a><img src="${user.avatar_url}" id="profilepic"><button type="button" class="btn btn-info matchMe">Match Me!</button><hr></div>`);
        $('.matchMe').last().click(function() {getInfo(user)});
      });
    });
    event.preventDefault();
  });
  $("#matchrequest").click(function(event){
    $("#git").hide();
    $("#codelines").show();
  });
});
