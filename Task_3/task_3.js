const wsUri = "wss://echo-ws-service.herokuapp.com/";

const sendBtn = document.querySelector('.send_btn');
const geoBtn = document.querySelector('.geo_btn');
const inp = document.querySelector('.mess_inp');
const clientMessage = document.querySelector('.client_message');
const serverMessage = document.querySelector('.server_message');
const consOutput = document.querySelector('.cons_output');
const mapLink = document.querySelector('#map-link');

let websocket;

function writeToScreen (message) {
  let paragraph = document.createElement('p');
  paragraph.style.wordWrap = "break-word";
  paragraph.innerHTML = message;
  consOutput.appendChild(paragraph);
}

function writeToScreenClient (message) {
  let paragraph = document.createElement('p');
  paragraph.style.wordWrap = "break-word";
  paragraph.innerHTML = message;
  clientMessage.appendChild(paragraph);
}

function writeToScreenServer (message) {
  let paragraph = document.createElement('p');
  paragraph.style.wordWrap = "break-word";
  paragraph.innerHTML = message;
  serverMessage.appendChild(paragraph);
}

const error = () =>{
  writeToScreenServer("Невозможно получить ваше местоположение")
}

const succes = (position) => {
  const latitude  = position.coords.latitude;
  const longitude = position.coords.longitude;
  
  const linkHref = mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
  const linkText = mapLink.textContent = 'Ссылка на карту'; 
}

inp.addEventListener ('click', () => {
  websocket = new WebSocket(wsUri);
  websocket.onopen = function(evt) {
    writeToScreen("CONNECTED");
  };
  websocket.onmessage = function(evt) {
    writeToScreenServer(
      '<span style="color: black;" >Server: ' + evt.data+'</span>'
    );
  };
  websocket.onerror = function(evt) {
    writeToScreen(
      '<span style="color: red;">ERROR:</span> ' + evt.data
    );
  };
});

sendBtn.addEventListener ('click', () => {
  clientMessage.style.display = 'inline';
  serverMessage.style.display = 'inline';
  const message = inp.value;
  writeToScreenClient("Client: " + message);
  websocket.send(message);
});

geoBtn.addEventListener ('click', () =>{
  clientMessage.style.display = 'block';
  mapLink.style.display = 'inline'
  
  mapLink.href = '';
  mapLink.textContent = '';
  const errorNessage = 'Geolocation не поддерживается вашим браузером'
  const succesMessage = 'Определение местоположения…'
  if (!navigator.geolocation) {
    writeToScreen (errorNessage);
  } else {
    writeToScreen(succesMessage);
    navigator.geolocation.getCurrentPosition(succes, error);
  }
})