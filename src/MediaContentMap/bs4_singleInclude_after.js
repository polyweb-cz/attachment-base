$(document).ready(function () {
    loadMaps();
});

function loadMaps() {

    let mapElems = document.getElementsByClassName('mediaContentMap_map');
    for (let mapElem of mapElems) {
        let center = SMap.Coords.fromWGS84(mapElem.dataset.x, mapElem.dataset.y);
        let m = new SMap(mapElem, center, mapElem.dataset.zoom);
        m.addDefaultLayer(mapElem.dataset.mapType).enable();
        m.addDefaultControls();

        let layer = new SMap.Layer.Marker();
        m.addLayer(layer);
        layer.enable();

        let options = {
            "class": "marker"
        };
        let markCard = undefined;
        let markerCoords = SMap.Coords.fromWGS84(mapElem.dataset.markX, mapElem.dataset.markY);
        if (mapElem.dataset.markX !== "") {
            let marker = new SMap.Marker(markerCoords, "myMarker", options);
            if (mapElem.dataset.markBubbleHeading !== ""
                || mapElem.dataset.markBubbleText !== ""
                || mapElem.dataset.markBubbleButton !== ""
                || mapElem.dataset.markBubbleLink !== ""
            ) {
                let size = 0;
                markCard = new SMap.Card();
                if (mapElem.dataset.markBubbleHeading === "") {
                    markCard.getHeader().style.padding = "0px";
                    markCard.getHeader().style.height = "0px";
                    markCard.getHeader().style.minHeight = "0px";
                }
                if (mapElem.dataset.markBubbleHeading !== "") {
                    markCard.getHeader().innerHTML = mapElem.dataset.markBubbleHeading;
                    size += 50;
                }
                if (mapElem.dataset.markBubbleText === "") {
                    markCard.getBody().style.padding = "0px";
                    markCard.getBody().style.height = "0px";
                    markCard.getBody().style.minHeight = "0px";
                }
                if (mapElem.dataset.markBubbleText !== "") {
                    markCard.getBody().style.background = "transparent";
                    markCard.getBody().innerHTML = mapElem.dataset.markBubbleText;
                    size += 100;
                }
                if (mapElem.dataset.markBubbleButton === "") {
                    markCard.getFooter().style.padding = "0px";
                    markCard.getFooter().style.height = "0px";
                    markCard.getFooter().style.minHeight = "0px";
                }
                if (mapElem.dataset.markBubbleButton !== "") {
                    markCard.getFooter().innerHTML = '<a class="btn btn-primary float-right" href="' + mapElem.dataset.markBubbleLink + '" ' + (mapElem.dataset.newWindow === "1" ? 'target="_blank"' : '') + '>' + mapElem.dataset.markBubbleButton + '</a>'
                    size += 50;
                }
                markCard.setSize(320, size);
                markCard.getContainer().style.marginBottom = '36px';
                marker.decorate(SMap.Marker.Feature.Card, markCard);
            }
            layer.addMarker(marker);
            if (markCard !== undefined && mapElem.dataset.bubbleToggled === "1") {
                marker.click();
            }
        }

        if (mapElem.dataset.overflow) {
            $(mapElem).addClass('overlay');
            $(mapElem).click(function () {
                $('.overlay').addClass('clicked')
            });
            $(mapElem).mouseleave(function () {
                $('.overlay').removeClass('clicked')
            })
        }

        let mapElement = $(mapElem);
        mapElement.addClass('gray-' + mapElem.dataset.colorize * 10)

    }
}

