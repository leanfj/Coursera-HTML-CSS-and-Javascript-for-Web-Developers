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
	var allCategoriesUrl = "https://davids-restaurant.herokuapp.com/categories.json";
	var categoriesTitleHtml = "snippets/categories-title-snippet.html";
	var categoryHtml = "snippets/category-snippet.html";

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

	var insertProprety = function (string, propName, propValue) {
		var propToReplace = "{{" + propName + "}}";
			string = string.replace(new RegExp(propToReplace, "g"), propValue);
		return string;
	}

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

	dc.loadMenuCategories = function () {
		showLoading("#main-content");
		$ajaxTest.sendGetRequest(
			allCategoriesUrl,
			buildAndShowCategoriesHTML);
	};

	function buildAndShowCategoriesHTML (categories) {
		$ajaxTest.sendGetRequest(
			categoriesTitleHtml,
			function (categoriesTitleHtml) {
				$ajaxTest.sendGetRequest(
					categoryHtml,
					function (categoryHtml) {
						var categoriesViewHtml = 
							buildCategoriesViewHtml(
								categories,
								categoriesTitleHtml,
								categoryHtml);
						insertHtml("#main-content", categoriesViewHtml);
					},
					false);
			},
			false);
	}
	function buildCategoriesViewHtml (categories,categoriesTitleHtml, categoryHtml) {
		var finalHtml = categoriesTitleHtml;
		finalHtml += "<section class='row'>";

		for (var i = 0; i < categories.length; i++) {
			var html = categoryHtml;
			var name = "" + categories[i].name;
			var short_name = categories[i].short_name;
			html = insertProprety(html, "name", name);
			html = insertProprety(html, "short_name", short_name);
			finalHtml += html;
		}

		finalHtml +="</section>";
		return finalHtml;
	}
	
global.$dc = dc;


})(window);