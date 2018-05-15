var tickRate = 60000 // On vérifiera l'api toutes les minutes

function checkStream() {
  var xhr = new XMLHttpRequest()
  var OnStream = 
  xhr.open("GET", "https://api.twitch.tv/kraken/streams/frenchycommunity?client_id=wjhv3b2zg2sc51s1qj9a6emuy8le7s", true)
  xhr.onreadystatechange = function () {
    if(xhr.readyState == 4) {
      var data = JSON.parse(xhr.responseText)
      if(data["stream"] === null){
        chrome.browserAction.setIcon({path:"./images/icon_red.png"})
      }else{
        chrome.browserAction.setIcon({path:"img/icon_green.png"})
      }
      
      setTimeout(checkStream, tickRate)
    }
  }
  xhr.send()
}

checkStream() 