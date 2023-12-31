function scrollaaKohtaan(kohdeElementti) {
  kohdeElementti.scrollIntoView({ behavior: 'smooth' });
}


//KOKO KIRJAUTUMIS HÖSSÄKKÄ
function KirjauduUlos(){
  localStorage.removeItem('kirjautunutKayttaja');
  location.reload();
}

function haeKayttaja(kayttajanimi) {
  var tallennetutKayttajat = JSON.parse(localStorage.getItem('kayttajat')) || [];
  var loydettyKayttaja = tallennetutKayttajat.find(function (kayttaja) {
    return kayttaja.username === kayttajanimi;
  });
  return loydettyKayttaja || null;
}
function luoSalasanaPallot(salasana) {
  var salasanaPallot = '';
  for (var i = 0; i < salasana.length; i++) {
    if (i < 30){
    salasanaPallot += '<span class="salasana-pallo">&#8226;</span>';
    }
  }
  return salasanaPallot;
}
TarkistaKirjautuminen();
function TarkistaKirjautuminen() {
  var kirjautunutKayttaja = localStorage.getItem('kirjautunutKayttaja');
  if (kirjautunutKayttaja != null){
    var napit = document.querySelectorAll('.kirjautuminen');
    napit.forEach(function(nappi) {
        nappi.parentNode.removeChild(nappi);
    });
    //Tedään uusi käyttäjänappi
    var kayttajaNappi = document.createElement("button");
    kayttajaNappi.innerHTML = kirjautunutKayttaja;
    kayttajaNappi.className = "kirjautumisnapit";
    var katsaus = document.getElementById('id02');
    kayttajaNappi.addEventListener("click", function() {
        katsaus.style.display='block' 
    });
    var navbarelementit = document.getElementsByClassName("kayttajanav");
    var ensimmainenNavbar = navbarelementit[0];
    ensimmainenNavbar.appendChild(kayttajaNappi);
    //katsaus content
    var kayttaja = haeKayttaja(kirjautunutKayttaja)
    document.getElementById('kayttajanimi').innerHTML = kirjautunutKayttaja;
    document.getElementById('kayttajanimi_muokattava').innerHTML = kirjautunutKayttaja;
    document.getElementById('kayttajasposti').innerHTML = kayttaja.email;
    document.getElementById('kayttajasala').innerHTML = luoSalasanaPallot(kayttaja.password);

  } else {
  var kirjautunutKayttaja = localStorage.getItem('kirjautunutKayttaja');
  }
}



var modal = document.getElementById('id01');
var modal_katsaus = document.getElementById('id02');
var modal_kirjautuminen = document.getElementById('id03');
var luo_nappi = document.getElementById('luo_tili');
var kirjaudu_nappi = document.getElementById('kirjaudu_tili');
var luo_peru = document.getElementById('luo_peru');
var tili_lomake = document.getElementById('modal-content');
var kirjautumis_lomake = document.getElementById('kirjautumis-content');
var ulos_nappi =  document.getElementById('kirjaudu_ulos');
var palaa_nappi =  document.getElementById('palaa');
var palaa_kir_nappi =  document.getElementById('palaa_kir');
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  } else if (event.target == modal_katsaus) {
    modal_katsaus.style.display = "none";
  } else if (event.target == modal_kirjautuminen) {
    modal_kirjautuminen.style.display = "none";
  }
};

if (luo_nappi) {
  luo_nappi.onclick = function(){
      modal.style.display='block'
  };
}
if (luo_peru) {
  luo_peru.onclick = function(){
      modal.style.display = "none";
  }
}
if (kirjaudu_nappi) {
  kirjaudu_nappi.onclick = function(){
      modal_kirjautuminen.style.display = "block";
  }
}
palaa_kir_nappi.onclick = function(){
  modal_kirjautuminen.style.display = "none";
};
ulos_nappi.onclick = function(){
  KirjauduUlos();
};
palaa_nappi.onclick = function(){
  modal_katsaus.style.display = "none";
}

//kirjautuminen
kirjautumis_lomake.addEventListener('submit', function (event) {
  event.preventDefault();
  var email = kirjautumis_lomake.querySelector('input[name="email"]').value;
  var password = kirjautumis_lomake.querySelector('input[name="psw"]').value;
  var tekstikentta = document.getElementById('puutekentta_kir');
  TarkistaKirjautumisTiedot(email, password, tekstikentta)
  
});
function haeKayttajaSposti(email) {
  var tallennetutKayttajat = JSON.parse(localStorage.getItem('kayttajat')) || [];
  var loydettyKayttaja = tallennetutKayttajat.find(function (kayttaja) {
    return kayttaja.email === email;
  });
  return loydettyKayttaja || null;
}

function TarkistaKirjautumisTiedot(email, password, tekstikentta){
  var kayttaja = haeKayttajaSposti(email)
  var kentta = document.getElementById('unohdus');
  if (kayttaja){
    if (kayttaja.password == password){
        kirjauduSisaan(kayttaja.username)
    } else{
      tekstikentta.innerHTML = "Katso että, kirjoitit sähköpostin ja salasanan oikein."
      kentta.style="display: block"
    }
  } else{
    tekstikentta.innerHTML = "Katso että, kirjoitit sähköpostin ja salasanan oikein."
    kentta.style="display: block"
  }
}


//Luodaan käyttäjä
tili_lomake.addEventListener('submit', function (event) {
  event.preventDefault();
  var username_valinnainen = tili_lomake.querySelector('input[name="username"]').value;
  var usernameKentta = document.getElementsByName('username')[0];
  var email = tili_lomake.querySelector('input[name="email"]').value;
  var emailKentta = document.getElementsByName('email')[0];
  var password = tili_lomake.querySelector('input[name="psw"]').value;
  var passwordKentta = document.getElementsByName('psw')[0];
  var confirmPassword = tili_lomake.querySelector('input[name="psw-repeat"]').value;
  var confirmPasswordKentta = document.getElementsByName('psw-repeat')[0];
  var tekstikentta = document.getElementById('puutekentta');
  emailKentta.style.backgroundColor = '';
  confirmPasswordKentta.style.backgroundColor = '';
  passwordKentta.style.backgroundColor = '';
  var ratkaisu=tarkistaTiedot(email, password, confirmPassword, username_valinnainen)
  if (ratkaisu==1) {
    emailKentta.style.backgroundColor = 'lightcoral';
    tekstikentta.innerHTML = 'Katso että kirjoitit sähköpostin oikein.';
} else if (ratkaisu==2) {
    confirmPasswordKentta.style.backgroundColor = 'lightcoral';
    tekstikentta.innerHTML = 'Salasanat eivät täsmää.';
} else if (ratkaisu==3) {
    passwordKentta.style.backgroundColor = 'lightcoral';
    tekstikentta.innerHTML = 'Salasana on oltava vähintään 5 merkkiä pitkä.';
} else if (ratkaisu==4) {
    emailKentta.style.backgroundColor = 'lightcoral';
    tekstikentta.innerHTML = 'Sähköposti on jo käytössä.';
} else if (ratkaisu==5) {
    usernameKentta.style.backgroundColor = 'lightcoral';
    tekstikentta.innerHTML = 'Käyttäjänimi on jo käytössä.';
} else if (ratkaisu==6) {
  usernameKentta.style.backgroundColor = 'lightcoral';
  tekstikentta.innerHTML = 'Käyttäjänimi saa olla enintään 15 merkkiä pitkä.';
} else {
    var tallennetutKayttajat = JSON.parse(localStorage.getItem('kayttajat')) || [];
    if (!username_valinnainen){
      var username = email.substring(0, email.indexOf('@'));
      if (username.indexOf('.') !== -1){
        var etunimi = username.substring(0, username.indexOf('.'));
        var sukunimi = username.substring(username.indexOf('.') + 1);
        sukunimi=sukunimi.charAt(0).toUpperCase() + sukunimi.slice(1);
        username = etunimi + ' ' + sukunimi;
      }
      username=username.charAt(0).toUpperCase() + username.slice(1);
      username=onkoNimiOlemassa(username);
    }
    else{
      username=username_valinnainen;
    }
    var kayttaja={email: email, password: password, username: username};
    tallennetutKayttajat.push(kayttaja);
    localStorage.setItem('kayttajat', JSON.stringify(tallennetutKayttajat));
    kirjauduSisaan(username);
    location.reload();
}});
function tarkistaTiedot(email, password, confirmPassword, username_valinnainen) {
  var atIndex = email.indexOf('@');
  if (atIndex == -1) {
    return 1
  } else if (atIndex <= 1 || atIndex >= email.length - 3) {
    return 1;
  } else if (email.length>25) {
    return 1;
  } else if (password!=confirmPassword) {
    return 2
  } else if (password.length<5) {
    return 3
  } else if (onkoSahkopostiOlemassa(email)) {
    return 4
  } else if (username_valinnainen.length > 15) {
    return 6
  } else if (username_valinnainen) {
      if (onkoNimiOlemassa(username_valinnainen) != username_valinnainen){
        return 5
      }
      else{
        return 0
      }
} 
else {
    return 0;
}}

function onkoSahkopostiOlemassa(sahkoposti) {
  if (localStorage.getItem('kayttajat') !== null) {
    var kayttajat = JSON.parse(localStorage.getItem('kayttajat'));
    for (var i = 0; i < kayttajat.length; i++) {
      if (kayttajat[i].email === sahkoposti) {
        return true;
      }
    }
  }
  return false;
}
function onkoNimiOlemassa(username) {
  if (localStorage.getItem('kayttajat') !== null) {
    while(true){
      var kayttajat = JSON.parse(localStorage.getItem('kayttajat'));
      for (var i = 0; i < kayttajat.length; i++) {
        if (kayttajat[i].username === username) {
          username += Math.floor(Math.random() * 10) + 1;;
        }
      }
      return username;
    }
  }
  return username;
}

//kirjatuminen
function kirjauduSisaan(kayttajanimi) {
  localStorage.setItem('kirjautunutKayttaja', kayttajanimi);
  location.reload();
}