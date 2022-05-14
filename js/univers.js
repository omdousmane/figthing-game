let btns = document.querySelectorAll(".map");
// console.log(btns);

const mapContents = ["map1", "map2", "map3", "map4", "map5", "map6"];
var mapLink = [];

// fonction de verification de clé
function isKeyExists(obj, key) {
  return key in obj;
}
function getUniver(id) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let results = JSON.parse(xhr.responseText);
        console.log(results);
        console.log(results[0].pseudo);

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
                  console.log(mapContent);
                  let maps = document.querySelector("." + mapContent);
                  if (maps.classList.remove("filter")) {
                  }
                  maps.childNodes[1].style.display = "none";
                }
              }
            })
            .join("");

          for (let index = 0; index < btns.length; index++) {
            const btn = btns[index];
            btn.addEventListener("click", function (e) {
              console.log(e.target.childNodes[1].href);
              document.location.href = e.target.childNodes[1].href;
              const url = new URL(e.target.childNodes[1].href);
              console.log(url.pathname);
              for (let i = 0; i < mapLink.length; i++) {
                const element = mapLink[i];
                if ("/" + element == url.pathname) {
                  let link = e.target.childNodes[1].href;
                  document.location.href = e.target.childNodes[1].href = link;
                  console.log(
                    (e.target.childNodes[1].href = url.origin + "/" + element)
                  );
                }
              }
            });
          }
        }
      }
    }
  };
  xhr.open("GET", "/back/controllers.php?idUser=" + id, true);
  xhr.send();
}

for (let index = 0; index < btns.length; index++) {
  const btn = btns[index];
  btn.addEventListener("click", function () {
    // console.log(btn);
    // console.log("diallo");
  });
}

// Récupérer des données depuis sessionStorage
var idUser = sessionStorage.getItem("idUser");

// requette ajax d'envoi et recuperation de donnée du user
if (idUser) {
  getUniver(idUser);
} else {
  // alert("pas d'id");
}

//  avenement de Déconexion
document.querySelector(".logout").addEventListener("click", () => {
  // Supprimer des données de sessionStorage
  sessionStorage.removeItem("idUser");
  // Supprimer toutes les données de sessionStorage
  sessionStorage.clear();
});
