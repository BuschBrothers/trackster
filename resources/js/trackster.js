
var Trackster = {};
var API_KEY = 'a01676639a6f59dc670dc53e47f5e031';

$(document).ready(function() {
  $('.header #search').click(function() {
    Trackster.searchTracksByTitle($('.header input').val());
  });
});

/*
  Given an array of track data, create the HTML for a Bootstrap row for each.
  Append each "row" to the container in the body to display all tracks.
*/
Trackster.renderTracks = function(tracks) {
  // console.log(tracks);
  // console.log(tracks.length);
  $('.track_list').empty();
  for (var i = 0; i<tracks.length; i++) {
    // console.log(tracks[i]);
    var song =
    '<div id="song_list" class="row">' +
      '<a class=" col-xs-1 col-xs-offset-1" target="blank" href=' + tracks[i].url + '><i class="fa fa-play-circle-o fa-2x" aria-hidden="true"></i></a>' +
      '<div  class="item col-xs-4">' + tracks[i].name + '</div>' +
      '<div class="item col-xs-2">' + tracks[i].artist + '</div>' +
      '<div class="item col-xs-2"><img src=' + tracks[i].image[1]['#text'] + '/></div>' +
      '<div class="item col-xs-2">' + tracks[i].listeners + '</div>' +
    '</div>';
    $('.track_list').append(song);
  }
};

/*
  Given a search term as a string, query the LastFM API.
  Render the tracks given in the API query response.
*/
Trackster.searchTracksByTitle = function(title) {
  console.log(title);
  $.ajax({
    url: 'http://ws.audioscrobbler.com/2.0/?method=track.search&track=' + title +
    '&api_key=' + API_KEY + '&format=json',
    datatype: 'jsonp',
    success: function(data) {
      // console.log(data);
      // console.log(data.results.trackmatches.track);
      Trackster.renderTracks(data.results.trackmatches.track);
    }
  });
};
