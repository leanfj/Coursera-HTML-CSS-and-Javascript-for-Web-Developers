document.addEventListener("DOMContentLoaded", 
	function (event) {
		document.querySelector("button").addEventListener("click", 
			function () {
				var self = this;
				var name = "";

				$ajaxTest.sendGetRequest("data/name.json", 
					function (res) {
						// var name = request.responseText;
						// console.log(name);
						var message = res.primeiroNome + " " + res.segundoNome;
						if (res.gostaDeChurrasco) {
							message += " Gosta de Churrasco";
						}
						else {
							message += " Não sabe o que é viver";
						}
						message += " e usa ";
						message += res.quantasTelas;
						message += " telas para codar.";

						document.querySelector("#content").innerHTML = "<h2>" + message + "</h2>";
					});
				
				
		});
	}
);