var tickRate = 60000 // On vérifiera l'api toutes les minutes

function checkStream() {
  var xhr = new XMLHttpRequest()
  xhr.open("GET", "https://api.twitch.tv/kraken/streams/frenchycommunity?client_id=wjhv3b2zg2sc51s1qj9a6emuy8le7s", true)
  xhr.onreadystatechange = function () {
    if(xhr.readyState == 4) {
      var data = JSON.parse(xhr.responseText)
      if(data["stream"] === null){
        chrome.browserAction.setIcon({path:"images/logo_OFF.png"})
      }else{
        chrome.browserAction.setIcon({path:"images/logo_ON.png"})
      }
      // On relance la fonction après X secondes
      setTimeout(checkStream, tickRate)
    }
  }
  xhr.send()
}

// On lance la fonction dès le démarrage
checkStream() 