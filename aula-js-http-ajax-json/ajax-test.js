// IIFE

(function (global) {
	var ajaxTest = {};

	function getRequestObject () {
		if (global.XMLHttpRequest) {
			return (new XMLHttpRequest());
		}
		else if (global.ActiveXObject) {
			return (new ActiveXObject("Microsoft.XMLHTTP"));
		}
		else {
			global.alert("Ajax is not supported!");
			return(null);
		}
	}
	ajaxTest.sendGetRequest = function (requestUrl, responseHandeler, isJsonResponse) {
		var request = getRequestObject();
		request.onreadystatechange = function () {
			handleResponse(request, responseHandeler, isJsonResponse);
		};
		request.open("GET", requestUrl, true);
		request.send(null);
	};
	function handleResponse (request, responseHandeler, isJsonResponse) {
		if ((request.readyState == 4) && (request.status == 200)) {
			// responseHandeler(request);
			if (isJsonResponse == undefined) {
				isJsonResponse = true;
			}
			if (isJsonResponse) {
				responseHandeler(JSON.parse(request.responseText))
			}	/*JSON.parse converte o JSON de string para object e o JSON.stringify converte de object para string*/
			else {
				responseHandeler(request.responseText);
			}
		}
	}

	global.$ajaxTest = ajaxTest;

})(window);


