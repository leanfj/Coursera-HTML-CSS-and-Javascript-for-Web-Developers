$(function () {
	// $("#navbarToggle") é igual a document.querySelector("#navbarToggle").addEventListener("blur"...);
	$("#navbarToggle").blur(function(event) {
		var screenWidth = window.innerWidth;
		if (screenWidth < 768) {
			$("#collapsable-nav").collapse('hide');
		}
	});
	  $("#navbarToggle").click(function (event) {
    $(event.target).focus();
  });
});

// IIFE para inserir o snippet
(function (global) {
	var dc = {}; /*namespaces*/
	var homeHtml = "snippets/home-snippet.html";

	var insertHtml = function (selector, html) {
		var targetElem = document.querySelector(selector);
		targetElem.innerHTML = html;
	};


	// mostrar o icone de loading
	var showLoading = function (selector) {
		var html = "<div class='text-center'>";
		html += "<img src='images/ajax-loader.gif'></div>";
		insertHtml(selector, html);
	};
	// execução de conteudo apos o carregamento da pagina
	document.addEventListener("DOMContentLoaded", function (event) {
		showLoading("#main-content");
		$ajaxTest.sendGetRequest(
			homeHtml,
			function (responseText) {
				document.querySelector("#main-content").innerHTML = responseText;
			},
			false);
	});

global.$dc = dc;


})(window);