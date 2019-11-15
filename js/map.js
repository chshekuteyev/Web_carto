const apiLink = 'https://api.mapbox.com/styles/v1/rastaspbu/ck2w2ivaa19i81cs38uu0m9rl/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoicmFzdGFzcGJ1IiwiYSI6ImNrMjRmbjlnbjBmYmgzYnJ3MHBmd2RpamUifQ.dnt9aRtXg3su1i33jFW-Og'


let map;
let layer;
let layerLabels;

const labels = ['Oceans', 'Gray', 'DarkGray', 'ShadedRelief'];
const imageryLabels = ['Imagery', 'ImageryClarity', 'ImageryFirefly'];

function initBackButton() {
    $('#back-btn').on('click', event => {
        window.history.back();
        event.preventDefault();
    })
}

init();

function init() {
    constructor();
    initBackButton();
    handleMapSelection();
    addPointsToMap();
}

function constructor() {
    map = L.map('map').setView([59.9,30.3], 6);
    layer = L.tileLayer(apiLink).addTo(map)
}

function handleMapSelection() {
    document.querySelector('.map-selector').addEventListener('change', event => {
        const chosenMap = event.target.value;
        changeMap(chosenMap);
    });
}

function changeMap(chosenMap) {
    clearMap();
    setMapLayer(chosenMap);

    chooseAndAddLayerLabelsToMap(chosenMap);
}

function clearMap() {
    if (layer) {
        map.removeLayer(layer);
    }

    if (layerLabels) {
        map.removeLayer(layerLabels);
    }
}

function setMapLayer(chosenMap) {
    if (chosenMap === 'РФ') {
        layer = L.tileLayer(apiLink);
    } else {
        layer = L.esri.basemapLayer(chosenMap);
    }

    map.addLayer(layer);
}

function chooseAndAddLayerLabelsToMap(chosenMap) {
    if (labels.includes(chosenMap)) {
        addLayerLabelsToMap(chosenMap + 'Labels');
    }
    else if (imageryLabels.includes(chosenMap)) {
        addLayerLabelsToMap('ImageryLabels');
    }
}

function addLayerLabelsToMap(labels) {
    layerLabels = L.esri.basemapLayer(labels);
    map.addLayer(layerLabels);
}

function addPointsToMap() {
    $.getJSON("data/data.json", point => {
        L.geoJSON(point, {
            pointToLayer: (feature, coordinates) => {
                return L.marker(coordinates).bindPopup(feature.properties.title)
            }
        }).addTo(map);
    });
}
var greenIcon = L.icon({
    iconUrl: 'http://melio.by/upload/iblock/e49/e4966a7c3d410f79b171e0f6b35f0419.png',

    iconSize: [50, 95], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
L.marker([59.918614, 30.331829], {icon: greenIcon}).addTo(map);
var popup = L.popup()
    .setLatLng([59.918614, 30.331829])
    .setContent("Санкт-Петербург")
    .addTo(map);
var greenIcon = L.icon({
    iconUrl: 'http://melio.by/upload/iblock/e49/e4966a7c3d410f79b171e0f6b35f0419.png',

    iconSize: [50, 95], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
L.marker([60.710236, 28.741046], {icon: greenIcon}).addTo(map);
var popup = L.popup()
    .setLatLng([60.710236, 28.741046])
    .setContent("Выборг")
    .addTo(map);
var greenIcon = L.icon({
    iconUrl: 'http://melio.by/upload/iblock/e49/e4966a7c3d410f79b171e0f6b35f0419.png',

    iconSize: [50, 95], // size of the icon
    iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor: [-3, -76] // point from which the popup should open relative to the iconAnchor
});
L.marker([58.549922, 31.279422], {icon: greenIcon}).addTo(map);
var popup = L.popup()
    .setLatLng([58.549922, 31.279422])
    .setContent("Великий Новгород!")
    .addTo(map);