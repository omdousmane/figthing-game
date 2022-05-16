var getHttpRequest = function () {
    var httpRequest = false;
  
    if (window.XMLHttpRequest) {
      // Mozilla, Safari,...
      httpRequest = new XMLHttpRequest();
      if (httpRequest.overrideMimeType) {
        httpRequest.overrideMimeType("text/xml");
      }
    } else if (window.ActiveXObject) {
      // IE
      try {
        httpRequest = new ActiveXObject("Msxml2.XMLHTTP");
      } catch (e) {
        try {
          httpRequest = new ActiveXObject("Microsoft.XMLHTTP");
        } catch (e) {}
      }
    }
  
    if (!httpRequest) {
      alert("Abandon :( Impossible de créer une instance XMLHTTP");
      return false;
    }
    return httpRequest;
  };
  
  // var dataStat = {
  //   idUser: idUser,
  //   idMap: idMap,
  //   score: score,
  //   result: result,
  //   speed: speed,
  //   degats: degats,
  //   bossLive: bossLive,
  //   gameEnd: gameEnd,
  // };
  
  
  
  // Recuperation des elements classes

  
  document.querySelector(".sendData").addEventListener("click", () => {
      
  let data = new FormData();
  data.append("idUser", dataStat.idUser);
  data.append("idMap", dataStat.idMap);
  data.append("score", dataStat.score);
  data.append("result", dataStat.result);
  data.append("speed", dataStat.speed);
  data.append("degats", dataStat.degats);
  data.append("bossLive", dataStat.bossLive);
  data.append("gameEnd", dataStat.gameEnd);
    let xhr = getHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status != 200) {
          let errors = JSON.parse(xhr.responseText);
          console.log(errors);
        } else {
          let results = xhr.responseText;
          console.log(results);
  
          // traitement de la reponse de la requette ajax
        }
      }
    };
    xhr.open("POST", "./back/controllersStatUser.php", true);
    xhr.setRequestHeader("X-Requested-With", "xmlhttprequest");
    xhr.send(data);
  });
  
  // recupration des elements statistique du joueur
  function getStatGamer(idUser) {
    let xhr = getHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let results = xhr.responseText;
  
          console.log(results);
          // traitement de la reponse de la requette ajax
  
          html = `
                <div class="alert-succes role="alert">
                
                  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
              `;
          // alert.innerHTML = html;
        } else {
          alert("impossible datteindre le server");
        }
      }
    };
    xhr.open("GET", "./back/controllersStatUser.php?pseudo=" + idUser);
    xhr.send();
  }
  //getStatGamer(dataStat.idUser);