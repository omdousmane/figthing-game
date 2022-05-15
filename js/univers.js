// initialisation de la map1 par defaut
let firstMap = document.querySelector(".first");
firstMap.addEventListener("click", () => {
  const url = new URL(firstMap.childNodes[1].href);
  document.location = url.origin + "/" + url.pathname;
});

const mapContents = ["map1", "map2", "map3", "map4", "map5", "map6"];
var mapLink = [];

// fonction de verification de clé
function isKeyExists(obj, key) {
  return key in obj;
}
// recuperation des maps en btn
let btns = document.querySelectorAll(".map");

function getUniver(id) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let results = JSON.parse(xhr.responseText);
        // console.log(results);
        // console.log(results[0].pseudo);

        // affichage du message de bienvenue
        let welcom = document.querySelector(".welcom");
        welcom.innerHTML = "Tu nous a manqué " + results[0].pseudo;

        setTimeout(function () {
          welcom.classList.remove("welcom");
          welcom.innerHTML = "";
        }, 4000);

        if (!results.error) {
          results
            .map(function (content) {
              mapLink.push(content.map_link);
              for (let index = 0; index < mapContents.length; index++) {
                var mapContent = mapContents[index];
                if (content.maps === mapContent) {
                  let maps = document.querySelector("." + mapContent);
                  maps.addEventListener("click", (e) => {
                    const url = new URL(maps.childNodes[1].href);
                    console.log(url.origin + "/" + content.map_link);
                    document.location.href =
                      url.origin + "/" + content.map_link;
                  });
                  maps.removeAttribute("disabled");
                  maps.classList.remove("filter");
                  maps.childNodes[1].style.display = "none";
                }
              }
            })
            .join("");
        }
      }
    }
  };
  xhr.open("GET", "/back/controllers.php?idUser=" + id, true);
  xhr.send();
}

// Récupérer des données depuis sessionStorage
var idUser = sessionStorage.getItem("idUser");

// requette ajax d'envoi et recuperation de donnée du user
if (idUser) {
  getUniver(idUser);
}

//  avenement de Déconexion
document.querySelector(".logout").addEventListener("click", () => {
  // Supprimer des données de sessionStorage
  sessionStorage.removeItem("idUser");
  // Supprimer toutes les données de sessionStorage
  sessionStorage.clear();
});
