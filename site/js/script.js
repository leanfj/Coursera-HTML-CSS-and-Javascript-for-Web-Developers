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
	var menuItemsUrl = "https://davids-restaurant.herokuapp.com/menu_items.json?category=";
	var menuItemsTitleHtml = "snippets/menu-items-title.html";
	var menuItemHtml = "snippets/menu-item.html";

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

var switchMenuToActive = function () {
  // Remove 'active' from home button
  var classes = document.querySelector("#navHomeButton").className;
  classes = classes.replace(new RegExp("active", "g"), " ");
  document.querySelector("#navHomeButton").className = classes;

  // Add 'active' to menu button if not already there
  classes = document.querySelector("#navMenuButton").className;
  if (classes.indexOf("active") == -1) {
    classes += " active";
    document.querySelector("#navMenuButton").className = classes;
  }
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

	dc.loadMenuCategories = function () {
		switchMenuToActive();
		showLoading("#main-content");
		$ajaxTest.sendGetRequest(
			allCategoriesUrl,
			buildAndShowCategoriesHTML);
	};

	dc.loadMenuItems = function (categoryShort) {
		showLoading("#main-content");
		$ajaxTest.sendGetRequest(
			menuItemsUrl + categoryShort,
			buildAndShowMenuItemsHTML);
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

	function buildAndShowMenuItemsHTML (categoryMenuItems) {
		$ajaxTest.sendGetRequest(
			menuItemsTitleHtml,
			function (menuItemsTitleHtml) {
				$ajaxTest.sendGetRequest(
					menuItemHtml,
					function (menuItemHtml) {
						var menuItemsViewHtml = 
						buildMenuItemsViewHtml(
							categoryMenuItems,
							menuItemsTitleHtml,
							menuItemHtml);
						insertHtml("#main-content", menuItemsViewHtml);
					},
					false);
			},
			false);
	}
	function buildMenuItemsViewHtml (categoryMenuItems, menuItemsTitleHtml, menuItemHtml) {
		menuItemsTitleHtml = insertProprety(menuItemsTitleHtml, "name", categoryMenuItems.category.name);
		menuItemsTitleHtml = insertProprety(menuItemsTitleHtml, "special_instructions", categoryMenuItems.category.special_instructions);
		var finalHtml = menuItemsTitleHtml;
		finalHtml += "<section class='row'>";

		// loop para items do menu

		var menuItems = categoryMenuItems.menu_items;
		var catShortName = categoryMenuItems.category.short_name;

		for (var i = 0; i < menuItems.length; i++) {
			var html = menuItemHtml;
			html = insertProprety(html, "short_name", menuItems[i].short_name);
			html = insertProprety(html, "catShortName", catShortName);
			html = insertItemPrice(html, "price_small", menuItems[i].price_small);
			html = insertItemPortionName(html, "small_portion_name", menuItems[i].small_portion_name);
			html = insertItemPrice(html, "price_large", menuItems[i].price_large);
			html = insertItemPortionName(html, "large_portion_name", menuItems[i].large_portion_name);
			html = insertProprety(html, "name", menuItems[i].name);
			html = insertProprety(html, "description", menuItems[i].description);

			if (i % 2 != 0) {
				html += "<div class='clearfix visible-lg-block visible-md-block'></div>"
			}
			finalHtml += html;
		}
		finalHtml += "</section>";
  	return finalHtml;
	}

	function insertItemPrice(html,
                         pricePropName,
                         priceValue) {
  // If not specified, replace with empty string
  if (!priceValue) {
    return insertProprety(html, pricePropName, "");
  }

  priceValue = "$" + priceValue.toFixed(2);
  html = insertProprety(html, pricePropName, priceValue);
  return html;
	}

	function insertItemPortionName(html,
                               portionPropName,
                               portionValue) {
  // If not specified, return original string
  if (!portionValue) {
    return insertProprety(html, portionPropName, "");
  }

  portionValue = "(" + portionValue + ")";
  html = insertProprety(html, portionPropName, portionValue);
  return html;
	}

	
global.$dc = dc;


})(window);