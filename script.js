// Inicializa o mapa
const map = L.map('map').setView([-14.235, -51.9253], 4); // Centro do Brasil

// Define a camada de mapa usando OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Formulário para buscar localização
document.getElementById('location-form').addEventListener('submit', async function (e) {
    e.preventDefault();
    
    // Obtém os valores do formulário
    const cep = document.getElementById('cep').value;
    const logradouro = document.getElementById('logradouro').value;
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;

    let locationData = null;

    // Se latitude e longitude forem preenchidos, usa elas para mostrar o mapa
    if (latitude && longitude) {
        locationData = {
            lat: parseFloat(latitude),
            lon: parseFloat(longitude)
        };
    } else {
        // Se CEP ou logradouro for preenchido, busca coordenadas via Nominatim
        let query = cep ? cep : logradouro;
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
        const data = await response.json();
        if (data.length > 0) {
            locationData = data[0];
        }
    }

    // Se local encontrado, ajusta o mapa
    if (locationData) {
        const { lat, lon } = locationData;
        map.setView([lat, lon], 13); // Ajusta o zoom
        L.marker([lat, lon]).addTo(map).bindPopup('Local encontrado').openPopup();
    } else {
        alert('Localização não encontrada. Tente novamente!');
    }
});
