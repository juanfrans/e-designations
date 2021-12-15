var check2017 = document.getElementById("2017");
var check2021 = document.getElementById("2021");
var checkBoth = document.getElementById("both");

mapboxgl.accessToken = 'pk.eyJ1IjoiamZzMjExOCIsImEiOiJlMUQzd2YwIn0.WLb3PYDt2z-XttOLFcQlVQ';
const map = new mapboxgl.Map({
  container: "map",
  style: 'mapbox://styles/jfs2118/ckx7rlwjb3i1614ntqfl6x3fj',
  center: [-73.981, 40.668],
  zoom: 10,
  projection: 'naturalEarth'
});

map.on('load', function () {
    map.addLayer(
        {
            id: 'eData2017',
            type: 'circle',
            source: {
                type: 'geojson',
                data: 'data/eDataOnly2017.geojson'
            },
            layout: {
                visibility: 'visible'
            },
            paint: {
                'circle-color': '#FFB700',
                'circle-radius': [
                    'interpolate',
                    ['exponential', 2],
                    ['zoom'],
                    10,
                    2.5,
                    16,
                    6
                ]
            }
        },
        'road-label'
    );
    map.addLayer(
        {
            id: 'eData2021',
            type: 'circle',
            source: {
                type: 'geojson',
                data: 'data/eDataOnly2021.geojson'
            },
            layout: {
                visibility: 'visible'
            },
            paint: {
                'circle-color': '#19A974',
                'circle-radius': [
                    'interpolate',
                    ['exponential', 2],
                    ['zoom'],
                    10,
                    2.5,
                    16,
                    6
                ]
            }
        },
        'road-label'
    );
    map.addLayer(
        {
            id: 'eDataBoth',
            type: 'circle',
            source: {
                type: 'geojson',
                data: 'data/eDataOnlyBoth.geojson'
            },
            layout: {
                visibility: 'visible'
            },
            paint: {
                'circle-color': '#96CCFF',
                'circle-radius': [
                    'interpolate',
                    ['exponential', 2],
                    ['zoom'],
                    10,
                    2.5,
                    16,
                    6
                ]
            }
        },
        'road-label'
    );
});

map.on('click', 'eData2017', function (e) {
    console.log('Clicked on ' + String(e.features.length) + ' features...');
    createPopup(e, e.lngLat, '2017');
});
map.on('click', 'eData2021', function (e) {
    console.log('Clicked on ' + String(e.features.length) + ' features...');
    createPopup(e, e.lngLat, '2021');
});
map.on('click', 'eDataBoth', function (e) {
    console.log('Clicked on ' + String(e.features.length) + ' features...');
    createPopup(e, e.lngLat, 'Both');
});
function createPopup(entries, lngLat, year){
    let popuphtml = '';
    let counter = 1;
    entries.features.forEach((element) => {
        let eNumber = element.properties.ENUMBER;
        let ceqr = element.properties.CEQR_NUM;
        let ulurp = element.properties.ULURP_NUM;
        let bbl = element.properties.BBL;
        let borough = element.properties.BORO;
        let datasetYear = '';
        if (year == '2017') {
            datasetYear = '2017';
        }
        else if (year == '2021') {
            datasetYear = '2021';
        }
        else {
            datasetYear = '2017 and 2021'
        }
        if (counter == entries.features.length) {
            popuphtml += '<div class="code f7"><p><u>E-Number</u>: ' + eNumber +
            '<br><u>CEQR Number</u>: ' + ceqr +
            '<br><u>ULURP Number</u>: ' + ulurp +
            '<br><u>BBL Number</u>: ' + bbl +
            '<br><u>Borough</u>: ' + borough +
            '<br><u>Dataset</u>: ' + datasetYear + '</p></div>';
        }
        else {
            popuphtml += '<div class="code f7 bb b--light-silver"><p><u>E-Number</u>: ' + eNumber +
            '<br><u>CEQR Number</u>: ' + ceqr +
            '<br><u>ULURP Number</u>: ' + ulurp +
            '<br><u>BBL Number</u>: ' + bbl +
            '<br><u>Borough</u>: ' + borough +
            '<br><u>Dataset</u>: ' + datasetYear + '</p></div>';
        }
        counter += 1;
    });
    popup = new mapboxgl.Popup({})
        .setLngLat(lngLat)
        .setHTML(popuphtml)
        .addTo(map);
};

map.on('mouseenter', 'eData2017', function() {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'eData2017', function() {
    map.getCanvas().style.cursor = '';
});
map.on('mouseenter', 'eData2021', function() {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'eData2021', function() {
    map.getCanvas().style.cursor = '';
});
map.on('mouseenter', 'eDataBoth', function() {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'eDataBoth', function() {
    map.getCanvas().style.cursor = '';
});
check2017.onclick = function () {
    if (this.checked) {
        console.log('Checked 2017...');
        map.setLayoutProperty('eData2017', 'visibility', 'visible');
    }
    else {
        console.log('Unchecked 2017...');
        map.setLayoutProperty('eData2017', 'visibility', 'none');
    }
}
check2021.onclick = function () {
    if (this.checked) {
        console.log('Checked 2021...');
        map.setLayoutProperty('eData2021', 'visibility', 'visible');
    }
    else {
        console.log('Unchecked 2021...');
        map.setLayoutProperty('eData2021', 'visibility', 'none');
    }
}
checkBoth.onclick = function () {
    if (this.checked) {
        console.log('Checked both...');
        map.setLayoutProperty('eDataBoth', 'visibility', 'visible');
    }
    else {
        console.log('Unchecked both...');
        map.setLayoutProperty('eDataBoth', 'visibility', 'none');
    }
}