let socket;
let conectado = false;

function conectarESP32(){

  socket = new WebSocket("ws://192.168.4.1:81");

  socket.onopen = () => {
    conectado = true;
    console.log("🟢 ESP32 conectada");
    actualizarEstado(true);
  };

  socket.onmessage = (event) => {
    console.log("Evento:", event.data);

    if(typeof manejarEvento === "function"){
      manejarEvento(event.data);
    }
  };

  socket.onerror = () => {
    conectado = false;
    actualizarEstado(false);
  };

  socket.onclose = () => {
    conectado = false;
    actualizarEstado(false);
    setTimeout(conectarESP32, 2000);
  };
}

function actualizarEstado(estado){
  let el = document.querySelector(".estado");

  if(!el) return;

  if(estado){
    el.innerHTML = "🟢 Conectado";
  } else {
    el.innerHTML = "🔴 Desconectado";
  }
}