const mapa = L.map("mapa").setView([-14.2350, -51.9253], 4); // Centro do Brasil

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  attribution: "&copy; OpenStreetMap contributors"
}).addTo(mapa);

// Localização do usuário
if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((pos) => {
    const lat = pos.coords.latitude;
    const lon = pos.coords.longitude;

    const marcador = L.marker([lat, lon]).addTo(mapa);
    marcador.bindPopup("📍 Sua localização atual").openPopup();
    mapa.setView([lat, lon], 13);
  });
}

// Função para adicionar alertas no mapa
let alertaTipo = '';

function adicionarAlerta(tipo) {
  alertaTipo = tipo;
  alert(`Clique no mapa para marcar um alerta de ${tipo}.`);

  mapa.on('click', function(e) {
    const lat = e.latlng.lat;
    const lon = e.latlng.lng;

    let icone;
    if (alertaTipo === 'terremoto') {
      icone = '🛑';
    } else if (alertaTipo === 'enchente') {
      icone = '💦';
    } else if (alertaTipo === 'incendio') {
      icone = '🔥';
    }

    const marcador = L.marker([lat, lon]).addTo(mapa);
    marcador.bindPopup(`${icone} Alerta de ${alertaTipo}`).openPopup();

    // Salvar alerta no banco de dados (Firebase) aqui (passo seguinte)
  });
}
