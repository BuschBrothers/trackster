
var Trackster = {};
var API_KEY = 'a01676639a6f59dc670dc53e47f5e031';
var new_colors = [
                    'rgb(255, 0, 171)',
                    'orange',
                    'coral'
                  ];
var enters = 0;
var data_tracks = [];


$(document).ready(function() {
  $('.header #search').click(function() {
    Trackster.searchTracksByTitle($('.header input').val());
  });
});

Trackster.enter = function (event) {
  if (event.keyCode === 13) {
      Trackster.searchTracksByTitle($('.header input').val());
  }
};

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
      '<div class="item col-xs-2">' + Trackster.mil(tracks[i].listeners) + '</div>' +
    '</div>';
    $('.track_list').append(song);
  }
};

Trackster.mil = function (number) {
  var new_num = [];
  var Snumber = number.toString().split('').reverse();
  var count = 0;
  for (var i = 0; i < Snumber.length; i++) {
    if (i % 3 == 0 && i != 0) {
      new_num.splice(i+count, 0, '.');
      count ++;
    }
    new_num.splice(i+count, 0, Snumber[i]);
  }
  new_num.reverse();
  new_num = new_num.join('');
  return new_num;
};

Trackster.searchTracksByTitle = function(title) {
  $.ajax({
    url: 'https://ws.audioscrobbler.com/2.0/?method=track.search&track=' + title +
    '&api_key=' + API_KEY + '&format=json',
    datatype: 'jsonp',
    success: function(data) {
      try
					{
            data_tracks = data.results.trackmatches.track;
            Trackster.renderTracks(data_tracks);
					}
					catch (e)
					{
            // console.log(e);
					};
    }
  });
  enters++;
  if (enters % 3 == 0 && enters != 0) {
    enters = 0;
  }
  $('.header #name').css('color', new_colors[enters]);
};

Trackster.spot = function (attr) {
  var main_index = 0;
  var local_index = 0;
  var new_list = [];
  if (attr == 'listeners') {
    while (new_list.length != data_tracks.length) {
      if (new_list.length <= local_index) {
        new_list.splice(local_index, 0, data_tracks[main_index]);
        main_index++;
        local_index = 0;
      } else if (parseFloat(data_tracks[main_index][attr]) < parseFloat(new_list[local_index][attr])) {
        new_list.splice(local_index, 0, data_tracks[main_index]);
        main_index++;
        local_index = 0;
      } else {
        local_index++;
      }
    }
    new_list.reverse();
  } else {
    while (new_list.length != data_tracks.length) {
      if (new_list.length <= local_index) {
        new_list.splice(local_index, 0, data_tracks[main_index]);
        main_index++;
        local_index = 0;
      } else if (data_tracks[main_index][attr] < new_list[local_index][attr]) {
        new_list.splice(local_index, 0, data_tracks[main_index]);
        main_index++;
        local_index = 0;
      } else {
        local_index++;
      }
    }
  }
  return new_list;
};

Trackster.order = function(prop) {
  var value = prop.id;
  if (prop.id == 'song') {
    value = 'name';
  }
  data_tracks = Trackster.spot(value);
  Trackster.renderTracks(data_tracks);
}





//
