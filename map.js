var checkeDesignations = document.getElementById("eDesignations");
var checkCleanupSites = document.getElementById("cleanupSites");
var melissaSites = document.getElementById("melissaSites");

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
            id: 'eDesignations',
            type: 'circle',
            source: {
                type: 'geojson',
                data: 'data/eDesignationsSPEED.geojson'
            },
            layout: {
                visibility: 'visible'
            },
            paint: {
                'circle-color': '#A463F2',
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
            id: 'oerCleanupSites',
            type: 'circle',
            source: {
                type: 'geojson',
                data: 'data/oerCleanupSites.geojson'
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
            id: 'melissaSites',
            type: 'circle',
            source: {
                type: 'geojson',
                data: 'data/BrownfieldsUpdated.geojson'
            },
            layout: {
                visibility: 'visible'
            },
            paint: {
                'circle-color': '#20D2F8',
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
    // map.addLayer(
    //     {
    //         id: 'eData2017',
    //         type: 'circle',
    //         source: {
    //             type: 'geojson',
    //             data: 'data/eDataOnly2017.geojson'
    //         },
    //         layout: {
    //             visibility: 'none'
    //         },
    //         paint: {
    //             'circle-color': '#FFB700',
    //             'circle-radius': [
    //                 'interpolate',
    //                 ['exponential', 2],
    //                 ['zoom'],
    //                 10,
    //                 2.5,
    //                 16,
    //                 6
    //             ]
    //         }
    //     },
    //     'road-label'
    // );
    // map.addLayer(
    //     {
    //         id: 'eData2021',
    //         type: 'circle',
    //         source: {
    //             type: 'geojson',
    //             data: 'data/eDataOnly2021.geojson'
    //         },
    //         layout: {
    //             visibility: 'none'
    //         },
    //         paint: {
    //             'circle-color': '#19A974',
    //             'circle-radius': [
    //                 'interpolate',
    //                 ['exponential', 2],
    //                 ['zoom'],
    //                 10,
    //                 2.5,
    //                 16,
    //                 6
    //             ]
    //         }
    //     },
    //     'road-label'
    // );
    // map.addLayer(
    //     {
    //         id: 'eDataBoth',
    //         type: 'circle',
    //         source: {
    //             type: 'geojson',
    //             data: 'data/eDataOnlyBoth.geojson'
    //         },
    //         layout: {
    //             visibility: 'none'
    //         },
    //         paint: {
    //             'circle-color': '#96CCFF',
    //             'circle-radius': [
    //                 'interpolate',
    //                 ['exponential', 2],
    //                 ['zoom'],
    //                 10,
    //                 2.5,
    //                 16,
    //                 6
    //             ]
    //         }
    //     },
    //     'road-label'
    // );
});

// map.on('click', 'eData2017', function (e) {
//     console.log('Clicked on ' + String(e.features.length) + ' features...');
//     createPopup(e, e.lngLat, '2017');
// });
// map.on('click', 'eData2021', function (e) {
//     console.log('Clicked on ' + String(e.features.length) + ' features...');
//     createPopup(e, e.lngLat, '2021');
// });
// map.on('click', 'eDataBoth', function (e) {
//     console.log('Clicked on ' + String(e.features.length) + ' features...');
//     createPopup(e, e.lngLat, 'Both');
// });

map.on('click', 'eDesignations', function (e) {
    console.log('Clicked on ' + String(e.features.length) + ' features...');
    createPopup(e, e.lngLat, 'eDesignation');
});
map.on('click', 'oerCleanupSites', function (e) {
    console.log('Clicked on ' + String(e.features.length) + ' features...');
    createPopup(e, e.lngLat, 'oerCleanupSites');
});

function createPopup(entries, lngLat, type){
    let popuphtml = '';
    let counter = 1;
    if (type == 'eDesignation'){
        entries.features.forEach((element) => {
            let address = element.properties.address;
            let ceqr = element.properties.ceqrnumber;
            let effectivedate = element.properties.effectivedate;
            let thisType = element.properties.type;
            let ulurp = element.properties.ulurp_num;
            let eNumber = element.properties.number;
            if (counter == entries.features.length){
                popuphtml += '<div class="code f7"><p>E-Designation Site' +
                '<br><u>E-Number</u>: ' + eNumber +
                '<br><u>CEQR Number</u>: ' + ceqr +
                '<br><u>ULURP Number</u>: ' + ulurp +
                '<br><u>Contamination Type</u>: ' + thisType +
                '<br><u>Effective Date</u>: ' + effectivedate +
                '<br><u>Address</u>: ' + address + '</p></div>';
            }
            else {
                popuphtml += '<div class="code f7 bb b--light-silver"><p>E-Designation Site' +
                '<br><u>E-Number</u>: ' + eNumber +
                '<br><u>CEQR Number</u>: ' + ceqr +
                '<br><u>ULURP Number</u>: ' + ulurp +
                '<br><u>Contamination Type</u>: ' + thisType +
                '<br><u>Effective Date</u>: ' + effectivedate +
                '<br><u>Address</u>: ' + address + '</p></div>';
            }
            counter += 1;
        });
    }
    else {
        entries.features.forEach((element) => {
            let address = element.properties['Street Number'] + ' ' + element.properties['Street Name'];
            let oerProgram = element.properties['OER Program'];
            let projectClass = element.properties.Class;
            let phase = element.properties.Phase;
            let site = element.properties['Project-Specific Document Repository page'];
            if (counter == entries.features.length){
                popuphtml += '<div class="code f7"><p>OER Cleanup Site' +
                '<br><u>OER Program</u>: ' + oerProgram +
                '<br><u>Project Class</u>: ' + projectClass +
                '<br><u>Phase</u>: ' + phase +
                '<br><u>Documentation URL</u>: ' + site + '</p></div>';
            }
            else {
                popuphtml += '<div class="code f7 bb b--light-silver"><p>OER Cleanup Site' +
                '<br><u>OER Program</u>: ' + oerProgram +
                '<br><u>Project Class</u>: ' + projectClass +
                '<br><u>Phase</u>: ' + phase +
                '<br><u>Documentation URL</u>: ' + site + '</p></div>';
            }
            counter += 1;
        });
    }
    popup = new mapboxgl.Popup({})
        .setLngLat(lngLat)
        .setHTML(popuphtml)
        .addTo(map);
}

map.on('mouseenter', 'eDesignations', function() {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseenter', 'oerCleanupSites', function() {
    map.getCanvas().style.cursor = 'pointer';
});
map.on('mouseleave', 'eDesignations', function() {
    map.getCanvas().style.cursor = '';
});
map.on('mouseleave', 'oerCleanupSites', function() {
    map.getCanvas().style.cursor = '';
});

checkeDesignations.onclick = function () {
    if (this.checked) {
        console.log('Checked eDesignations...');
        map.setLayoutProperty('eDesignations', 'visibility', 'visible');
    }
    else {
        console.log('Unchecked eDesignations...');
        map.setLayoutProperty('eDesignations', 'visibility', 'none');
    }
}
checkCleanupSites.onclick = function () {
    if (this.checked) {
        console.log('Checked cleanupSites...');
        map.setLayoutProperty('oerCleanupSites', 'visibility', 'visible');
    }
    else {
        console.log('Unchecked cleanupSites...');
        map.setLayoutProperty('oerCleanupSites', 'visibility', 'none');
    }
}
melissaSites.onclick = function () {
    if (this.checked) {
        console.log('Checked Melissa sites...');
        map.setLayoutProperty('melissaSites', 'visibility', 'visible');
    }
    else {
        console.log('Unchecked Melissa sites...');
        map.setLayoutProperty('melissaSites', 'visibility', 'none');
    }
}