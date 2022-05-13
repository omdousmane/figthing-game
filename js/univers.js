let btns = document.querySelectorAll(".map");
// console.log(btns);

const mapContents = ["map1", "map2", "map3", "map4", "map5", "map6"];

function getUniver(id) {
  let xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let results = JSON.parse(xhr.responseText);
        // console.log(results);

        if (!results.error) {
          console.log(results);
          results
            .map(function (content) {
              for (let index = 0; index < mapContents.length; index++) {
                const mapContent = mapContents[index];
                if (content.maps == mapContent) {
                  console.log(mapContent);
                  let maps = document.querySelector("." + mapContent);
                  if (maps.classList.remove("filter")) {
                  }
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

for (let index = 0; index < btns.length; index++) {
  const btn = btns[index];
  btn.addEventListener("click", function () {
    console.log(btn);
    // console.log("diallo");
  });
}

// Récupérer des données depuis sessionStorage
var idUser = sessionStorage.getItem("idUser");

// requette ajax d'envoi et recuperation de donnée du user
if (idUser) {
  getUniver(idUser);
} else {
  alert("pas d'id");
}

//  avenement de Déconexion
document.querySelector(".logout").addEventListener("click", () => {
  // Supprimer des données de sessionStorage
  sessionStorage.removeItem("idUser");
  // Supprimer toutes les données de sessionStorage
  sessionStorage.clear();
});
