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
	// .sendGetRequest é um evento do object XMLHttpRequest()
	ajaxTest.sendGetRequest = function (requestUrl, responseHandeler, isJsonResponse) {
		var request = getRequestObject();
		request.onreadystatechange = function () { /*.onreadystatechange retorna a resposta do servidor a requisição*/
			handleResponse(request, responseHandeler, isJsonResponse);
		};
		request.open("GET", requestUrl, true);
		// .open serve par ainformar o endereço da url que queremos acessar
		request.send(null);
		// .send inicia a requisição ao servidor
	};
	function handleResponse (request, responseHandeler, isJsonResponse) {
		if ((request.readyState == 4) && (request.status == 200)) {
			// .readyState é um evento que retorna status da comunicação
			// .status do resultado da requisição
			// responseHandeler(request);
			if (isJsonResponse == undefined) {
				isJsonResponse = true;
			}
			if (isJsonResponse) {
				responseHandeler(JSON.parse(request.responseText))
				//.responseText retorna como resposta o conteudo do arquivo solicitado
			}	/*JSON.parse converte o JSON de string para object e o JSON.stringify converte de object para string*/
			else {
				responseHandeler(request.responseText);
			}
		}
	}

	global.$ajaxTest = ajaxTest;

})(window);


