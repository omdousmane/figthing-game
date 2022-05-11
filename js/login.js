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

const form = document.querySelector(".form-container");

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let pseudo = document.querySelector(".pseudo").value;
  // let mail = document.querySelector(".mail").value;
  // let data = {
  //   pseudo: pseudo,
  //   mail: mail,
  // };
  let data = new FormData(form);
  // console.log(data.get("pseudo"));
  // console.table(data);

  let xhr = getHttpRequest();

  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status != 200) {
        let errors = xhr.responseText;
        console.log(errors);
      } else {
        let results = JSON.parse(xhr.responseText);
        console.log(results);
        let alert = document.querySelector(".alert");
        alert.innerHTML = results.status;
      }
    }
  };
  xhr.open("POST", "../back/controllers.php", true);
  xhr.setRequestHeader("X-Requested-With", "xmlhttprequest");
  xhr.send(data);
});

// verification de la saisie du pseudo progressivement
let pseudo = document.querySelector(".pseudo");
pseudo.addEventListener("keyup", (e) => {
  console.log(e.target.value.length);
  if (e.target.value.length >= 3) {
    let xhr = getHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          let results = JSON.parse(xhr.responseText);
          if (results.error) {
            let submit = document.querySelector(".submit-btn");
            console.log(submit);
            submit.setAttribute("disabled", "true");
          }
          console.log(results);
          html = `
              <div class="alert alert-warning alert-dismissible fade show" role="alert">
                <strong>Error...!!!</strong> ${results.status}.
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
              </div>
            `;
          let alert = document.querySelector(".content-alerte");
          alert.innerHTML = html;
        } else {
          alert("impossible datteindre le server");
        }
      }
    };
    xhr.open("GET", "../back/controllers.php?pseudo=" + pseudo.value, true);
    xhr.send();
  }
});
