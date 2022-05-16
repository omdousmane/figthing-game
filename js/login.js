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

// verification de la saisie du pseudo progressivement
let alert = document.querySelector(".content-alerte");
var pseudo = document.querySelector(".pseudoLogin");
var submit = document.querySelector(".submit-btn");
submit.style.display = "none";
const form = document.querySelector(".form-container");

// fonction de verification de clé
function isKeyExists(obj, key) {
  return key in obj;
}
form.addEventListener("submit", function (e) {
  e.preventDefault();
  document.location.href = "univers.html";
});

pseudo.addEventListener("keyup", (e) => {
  console.log(e.target.value.length);
  if (e.target.value.length >= 3) {
    let xhr = getHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let results = JSON.parse(xhr.responseText);
          if (results.login) {
            submit.style.display = "flex";
            html = `
              <div class="alert-succes role="alert">
              ${results.login}
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            `;

            // Enregistrer des données dans sessionStorage
            sessionStorage.setItem("idUser", results.idUser);
          } else {
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
    xhr.open("GET", "./back/controllers.php?pseudoLogin=" + pseudo.value, true);
    xhr.send();
  }
});
