import axios from 'axios';
import Resource from '../config/Resource';

var Drawer = (function () {

	function createMap(data, id) {

		var google = window.google;

		var heatPoints = [];
		data.forEach(function(point) {
			heatPoints.push(new google.maps.LatLng(point.lat, point.lng));
		});

		var map = new google.maps.Map(document.getElementById(id), {
			zoom: 13,
			center: {lat: 37.775, lng: -122.434},
			mapTypeId: 'satellite'
		});

		new google.maps.visualization.HeatmapLayer({
			data: heatPoints,
			map: map });
	}

	function initHistoryMap(){

		axios.get(Resource.historyHeatData)
			.then(response => createMap(response.data, 'historyMap'));

	}

	function initPredictionMap() {
		axios.get(Resource.predictionHeatData)
			.then(response => createMap(response.data, 'predictionMap'));
	}

	function addGoogleMapLib() {
		let Script = document.createElement('script');
		Script.setAttribute('src', "https://maps.googleapis.com/maps/api/js?key=AIzaSyBMKwqk-6fx5RQruAqzamYrQevu2BYHmco&libraries=visualization&callback=callback");
		Script.setAttribute('type', 'text/javascript');
		document.body.appendChild(Script);
	}

	function drawHistoryMap() {
		if (window.google === undefined) {

			addGoogleMapLib();

			window.callback = initHistoryMap;
		} else {
			initHistoryMap();
		}
	}

	function drawPredictionMap() {
		if (window.google === undefined) {

			addGoogleMapLib();

			window.callback = initPredictionMap;
		} else {
			initPredictionMap();
		}
	}

	return {

		drawHistoryMap: drawHistoryMap,

		drawPredictionMap: drawPredictionMap
	}

})();

export default Drawer;