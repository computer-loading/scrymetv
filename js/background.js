function notifyMe(title, text) {
    var notification = new Notification(title, {
      icon: 'images/logo_normal.png',
      body: text,
    });

    notification.onclick = function () {
      window.open("https://twitch.tv/frenchycommunity");      
    };

}

document.addEventListener('DOMContentLoaded', function () {
  if (!Notification) {
    alert('Desktop notifications not available in your browser. Try Chromium.'); 
    return;
  }

  if (Notification.permission !== "granted")
    Notification.requestPermission();
});
var is_streaming = false;
var tickRate = 60000; // On vérifiera l'api toutes les minutes
function checkStream() {
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "https://api.twitch.tv/kraken/streams/frenchycommunity?client_id=wjhv3b2zg2sc51s1qj9a6emuy8le7s", true);
  xhr.onreadystatechange = function () {
    if(xhr.readyState == 4) {
      var data = JSON.parse(xhr.responseText);
      if(data["stream"] === null){
        chrome.browserAction.setIcon({path:"images/logo_OFF.png"});
        is_streaming = false;
      }else{
        chrome.browserAction.setIcon({path:"images/logo_ON.png"});
        if(Notification.permission == "granted" && is_streaming === false){
          notifyMe("La Frenchy est en Stream",data.stream.channel.status.concat("<br/>joue à ".concat(data.stream.game)));
          is_streaming = true;
        }
      }
      // On relance la fonction après X secondes
      setTimeout(checkStream, tickRate);
    }
  }
  xhr.send();
}

// On lance la fonction dès le démarrage
checkStream(); 