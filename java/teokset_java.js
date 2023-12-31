let slideIndex = 1;
let slideTimer;

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");
    if (n > slides.length) {
        slideIndex = 1;
    } if (n < 1) {
        slideIndex = slides.length;
    } for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[slideIndex - 1].style.display = "block";
}

function plusSlides(n) {
    clearTimeout(slideTimer);
    showSlides(slideIndex += n);
    startSlides();
}

function startSlides() {
    slideTimer = setTimeout(function () {
        slideIndex++;
        showSlides(slideIndex);
        startSlides();
    }, 5000);
}

showSlides(1);
startSlides();

window.onload = function() {
  var kirjautunutKayttaja = localStorage.getItem('kirjautunutKayttaja');
  if (kirjautunutKayttaja == null){
    document.getElementById('chatInput').style.display = "none";
    var kirjautumisHuomautus = document.createElement('div');
    kirjautumisHuomautus.id = 'kirhuom'
    kirjautumisHuomautus.textContent = 'Ole hyvä ja kirjaudu sisään kommentoidaksesi';
    document.getElementById('chatWindow').appendChild(kirjautumisHuomautus);
  }
};

function siirryTeoksiin() {
  window.open('../sivut/kaikkiteokset.html', '_blank');
}

const fullImage = document.getElementById('fullImage');
fullImage.addEventListener('click', function() {
  const kuvaSrc = fullImage.src;

  if (kuvaSrc) {
    window.open(kuvaSrc, '_blank');
  }
});

const kuvatData = [
  { nimi: 'Sammal', tekija: 'Frans-Emil Vuori', julkaisuaika: '28.12.23', tiedosto: 'sammal.png' },
  { nimi: 'Artistinenlehmä', tekija: 'Liisa Kivelä', julkaisuaika: '15.04.22', tiedosto: 'artistinenlehma.png' },
  { nimi: 'Flamma', tekija: 'Matti Virtanen', julkaisuaika: '03.09.21', tiedosto: 'flamma.png' },
  { nimi: 'Ikimetsä', tekija: 'Henna Ranta', julkaisuaika: '11.06.20', tiedosto: 'ikimetsa.jpg' },
  { nimi: 'Lapissa', tekija: 'Eeva Karhu', julkaisuaika: '24.12.19', tiedosto: 'jouluinenmaisema.jpg' },
  { nimi: 'Kaukana', tekija: 'Mikko Lindroos', julkaisuaika: '07.03.18', tiedosto: 'kaukaisetmaat.jpg' },
  { nimi: 'Korkealla', tekija: 'Anni Mäkinen', julkaisuaika: '02.08.17', tiedosto: 'korkeallamaasta.jpg' },
  { nimi: 'Kukkakimppu', tekija: 'Sara Nurmi', julkaisuaika: '19.05.16', tiedosto: 'kukkakimppu.jpg' },
  { nimi: 'Luminen', tekija: 'Eero Ahonen', julkaisuaika: '30.11.15', tiedosto: 'luminenkaupunki.jpg' },
  { nimi: 'Antimet', tekija: 'Maija Lehto', julkaisuaika: '14.07.14', tiedosto: 'luonnonkasveja.jpg' },
  { nimi: 'Mökkitie', tekija: 'Antti Järvinen', julkaisuaika: '01.02.13', tiedosto: 'mökkitie.jpg' },
  { nimi: 'Tutkiva', tekija: 'Anna Rantanen', julkaisuaika: '22.09.12', tiedosto: 'odottavalintu.jpg' },
  { nimi: 'Pilvet', tekija: 'Tapani Virtanen', julkaisuaika: '08.04.11', tiedosto: 'pilvinenpaiva.jpg' },
  { nimi: 'Jälkeen', tekija: 'Mira Kallio', julkaisuaika: '27.10.11', tiedosto: 'sateenjälkeen.jpg' },
  { nimi: 'Suomi', tekija: 'Heikki Mäkelä', julkaisuaika: '14.05.11', tiedosto: 'suomenmetsa.jpg' },
  { nimi: 'Syys', tekija: 'Hannele Laitinen', julkaisuaika: '03.12.10', tiedosto: 'syystie.jpg' },
  { nimi: 'Jähmettynyt', tekija: 'Olli Korpela', julkaisuaika: '18.06.10', tiedosto: 'terhokokous.jpg' },
  { nimi: 'Matkalla', tekija: 'Katja Halonen', julkaisuaika: '05.01.10', tiedosto: 'yksinainenauto.jpg' }
];

kuvatData.sort(() => Math.random() - 0.5);

const galleriaElementti = document.getElementById('galleria');
for (let i = 0; i < kuvatData.length; i++) {
  const kuvaData = kuvatData[i];
  const kuva = document.createElement('img');
  kuva.src = `../media/img/teokset/galleria/${kuvaData.tiedosto}`;
  kuva.alt = `Kuva ${i + 1}: ${kuvaData.nimi} - ${kuvaData.tekija} (${kuvaData.julkaisuaika})`;
  kuva.className = 'teosImg';
  kuva.addEventListener('click', () => openImageViewer(kuva.src, kuvaData));
  galleriaElementti.appendChild(kuva);
}

let nykyinenKuvaData;
function openImageViewer(src, kuvaData) {
  nykyinenKuvaData = kuvaData;
  delMessage();
  näytäTallennetutViestit(kuvaData.tiedosto);
  const imageViewer = document.getElementById('id04');
  const fullImage = document.getElementById('fullImage');
  const teoksenNimi_text = document.getElementById('teoksenNimi');
  const infoKentta_text = document.getElementById('infoKentta');
  fullImage.src = src;
  // Voit käyttää kuvaData-oliota tässä funktiossa tarpeen mukaan
  teoksenNimi_text.innerHTML = kuvaData.nimi
  infoKentta_text.innerHTML = '<strong>Tekijä: </strong>' + kuvaData.tekija + '<br><strong>Julkaisuaika: </strong>' + kuvaData.julkaisuaika;

  imageViewer.style.display = 'block';
}



function delMessage(){
  var viestiElementit = document.getElementsByClassName('viesti');
  Array.from(viestiElementit).forEach(function(element) {
    element.remove();
  });
}

function näytäTallennetutViestit(kuvaId) {
  const chatBody = document.getElementById('chatBody');

  const tallennetutChatit = JSON.parse(localStorage.getItem('chatit')) || {};

  if (tallennetutChatit[kuvaId]) {
    const viestit = tallennetutChatit[kuvaId];
    var kayt=localStorage.getItem('kirjautunutKayttaja');
    viestit.forEach(function(viesti) {
      const messageElement = document.createElement('div');
      messageElement.className = 'viesti';
      messageElement.textContent = `${viesti.lähettäjä}: ${viesti.viesti}`;

      if (kayt==viesti.lähettäjä){
        messageElement.style.color = 'green';
      }
      chatBody.appendChild(messageElement);
    });
  }
}

// Kutsu funktiota, kun chattia avataan, ja anna sille nykyisen kuvan tunniste
näytäTallennetutViestit('kuva1'); // Korvaa 'kuva1' haluamallasi kuvatunnuksella


function sendMessage(event) {
  event.preventDefault();
  const messageInput = document.getElementById('messageInput');
  const chatBody = document.getElementById('chatBody');

  const message = messageInput.value.trim();
  if (message !== '') {
    const messageElement = document.createElement('div');
    messageElement.className = 'viesti';
    messageElement.style.color = 'green';
    messageElement.textContent = `${localStorage.getItem('kirjautunutKayttaja')}: ${message}`;
    chatBody.appendChild(messageElement);
    messageInput.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    tallennaViesti(nykyinenKuvaData.tiedosto, localStorage.getItem('kirjautunutKayttaja'), message);
  }
  return false;
}


function tallennaViesti(kuvaId, lähettäjä, viesti) {
  const tallennetutChatit = JSON.parse(localStorage.getItem('chatit')) || {};
  
  if (!tallennetutChatit[kuvaId]) {
    tallennetutChatit[kuvaId] = [];
  }

  // Lisää uusi viesti chatiin
  tallennetutChatit[kuvaId].push({ lähettäjä, viesti });

  // Tallenna päivitetty tieto Local Storageen
  localStorage.setItem('chatit', JSON.stringify(tallennetutChatit));
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
  var modal_kuva = document.getElementById('id04');
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
    } else if (event.target == modal_kuva) {
      modal_kuva.style.display = "none";
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