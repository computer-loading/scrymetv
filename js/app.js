// request permission on page load
document.addEventListener('DOMContentLoaded', function () {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.'); 
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
});

function notifyMe(title, text) {
    var notification = new Notification(title, {
      icon: 'images/logo_normal.png',
      body: text,
    });

    notification.onclick = function () {
      window.open("https://twitch.tv/frenchycommunity");      
    };

}

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
      last_stream_url.href = "https://twitch.tv/frenchycommunity";
      last_stream_title.innerHTML = data.streams[0].channel.status;
      last_stream_thumbnail.src = data.streams[0].preview.medium;
      document.getElementById("is_playing").innerHTML = "joue à ".concat(data.streams[0].game);
      elm.style.color = "green";
      elm.innerHTML = "Viens voir la Frenchy en live maintenant !";
    }
  }
}

xhr.send();
  //Youtube

var ytb = new XMLHttpRequest();
ytb.open("GET", "https://www.googleapis.com/youtube/v3/playlistItems?playlistId=UUKDmGlE3r7wKLAvxwlSoqEA&maxResults=1&part=snippet%2CcontentDetails&key=AIzaSyBi1RvjBYAqRmFlS3QnTXs_BeF7HU0KmoM");

ytb.onreadystatechange = function(){
  if(ytb.readyState == 4) {
    console.log(this.status);
    if(this.status == 200){
      console.log("ok");
      var data = JSON.parse(ytb.responseText);
      console.log(data);
      var thumbnail = data.items[0].snippet.thumbnails.maxres.url;
      var url = "https://www.youtube.com/watch?v=".concat(data.items[0].snippet.resourceId.videoId);
      var title = data.items[0].snippet.title;
      console.log(title);
      var last_video_thumbnail = document.getElementById("last_video_thumbnail");
      var data_url = document.getElementById("last_video_url");
      var data_title = document.getElementById("last_video_title");
      
      last_video_thumbnail.setAttribute('src', thumbnail);
      last_video_url.setAttribute("href", url);
      last_video_title.innerHTML = title;
      
    }
    else {
      console.log("Reponse pas ok");
    }
  }
}

ytb.send();
//tabs / navigate
var video_tab = document.getElementById("last_videos");

var planning_tab = document.getElementById("planning");
var video_btn = document.getElementById("videos");
video_btn.onclick = function() {
  video_tab.style.display = "block";
  video_tab.style.visibility = "visible";
  planning_tab.style.display = "none";
  planning_tab.style.visibility = "hidden";
};
var planning_btn = document.getElementById("tab_planning");
planning_btn.onclick = function() {
  video_tab.style.display = "none";
  video_tab.style.visibility = "hidden";
  planning_tab.style.display = "block";
  planning_tab.style.visibility = "visible";
};