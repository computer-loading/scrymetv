var xhr = new XMLHttpRequest();
xhr.open("GET", "https://api.twitch.tv/kraken/streams/?channel=frenchycommunity&client_id=wjhv3b2zg2sc51s1qj9a6emuy8le7s", true);
xhr.onreadystatechange = function(channel) {
  if(xhr.readyState == 4) {
    var data = JSON.parse(xhr.responseText);
    var elm  = document.getElementById("info");
    var last_stream_url = document.getElementById("last_stream_url");
    var last_stream_title = document.getElementById("last_stream_title");
    var last_stream_thumbnail = document.getElementById("last_stream_thumbnail");

    if(data["stream"] === null){

      elm.style.color = "red";
      elm.innerHTML = "La Frenchy n'est pas en live actuellement. Mais vous pouvez regarder notre dernière vidéo Youtube, ou notre dernier stream en replay :) ! ";
    }else{
      
      elm.style.color = "green";
      elm.innerHTML = "Viens voir la Frenchy en live maintenant !";
    }
  }
}
xhr.send();

  //Get last stream video

var last_stream = new XMLHttpRequest();
last_stream.open("GET", 'https://api.twitch.tv/helix/streams?user_login=frenchycommunity');
last_stream.setRequestHeader("Client-ID", "h2efopm828elwk5shnopq5ya91sdqo");
last_stream.onreadystatechange = function(channel){
  if(last_stream.readyState == 4) {
    var response = JSON.parse(last_stream.responseText);
    console.log(response)
    last_stream_url.href = response.videos[0].url;
    last_stream_thumbnail.src = response.videos[0].thumbnails.url;
    last_stream_title.innerHTML = response.videos[0].title;
  }
}
last_stream.send();

  //Youtube

var ytb = new XMLHttpRequest();
ytb.open("GET", "https://www.googleapis.com/youtube/v3/playlistItems?playlistId=UUKDmGlE3r7wKLAvxwlSoqEA&maxResults=1&part=snippet%2CcontentDetails&key=AIzaSyBi1RvjBYAqRmFlS3QnTXs_BeF7HU0KmoM")
ytb.onreadystatechange = function(){
  if(ytb.readyState == 4) {
    if(this.status == 200){
      var data = JSON.parse(ytb.responseText);
      var thumbnail = data.items[0].snippet.thumbnails.maxres.url;
      var url = "https://www.youtube.com/watch?v=".concat(data.items[0].snippet.resourceId.videoId);
      var title = data.items[0].snippet.title;

      var last_video_thumbnail = document.getElementById("last_video_thumbnail");
      var data_url = document.getElementById("last_video_url");
      var data_title = document.getElementById("last_video_title");
      
      last_video_thumbnail.src = thumbnail;
      last_video_url.href = url;
      last_video_title.innerHTML = title;
    }
    else {
      console.log("Reponse pas ok")
    }
  }
}

ytb.send();