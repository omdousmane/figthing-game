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

// Recuperation des elements classes
let alert = document.querySelector(".content-alerte");
let pseudo = document.querySelector(".pseudo");
var submit = document.querySelector(".submit-btn");

// cacher le submit
submit.style.display = "none";

const form = document.querySelector(".form-container");
form.addEventListener("submit", function (e) {
  document.location.href = "univers.html";
  e.preventDefault();

  // recuperation des inputs pour en formadata
  let data = new FormData(form);
  let xhr = getHttpRequest();
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status != 200) {
        let errors = JSON.parse(xhr.responseText);
        console.log(errors);
      } else {
        let results = JSON.parse(xhr.responseText);
        console.log(results);

        // Enregistrer des données dans sessionStorage
        sessionStorage.setItem("idUser", results.results);
      }
    }
  };
  xhr.open("POST", "./back/controllers.php", true);
  xhr.setRequestHeader("X-Requested-With", "xmlhttprequest");
  xhr.send(data);
});

// fonction de verification de clé
function isKeyExists(obj, key) {
  return key in obj;
}

// recupration des elements saisies en ecoute
pseudo.addEventListener("keyup", (e) => {
  console.log(e.target.value.length);
  if (e.target.value.length >= 3) {
    let xhr = getHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let results = JSON.parse(xhr.responseText);

          console.log(results);

          //verification de l'existance des clées renvoyer par l'ajax
          if (isKeyExists(results, "success")) {
            submit.style.display = "flex";
            html = `
              <div class="alert-succes role="alert">
              ${results.success}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            `;
          } else if (isKeyExists(results, "error")) {
            submit.style.display = "none";
            html = `
              <div class="alert-warning role="alert">
              ${results.error}
              </div>
            `;
          }

          alert.innerHTML = html;
        } else {
          alert("impossible datteindre le server");
        }
      }
    };
    xhr.open("GET", "./back/controllers.php?pseudo=" + pseudo.value, true);
    xhr.send();
  }
});
