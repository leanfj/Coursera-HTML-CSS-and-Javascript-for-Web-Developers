// lecture41

// var message = "in global";
// console.log("global: message = " + message);

// var a = function () {
// 	var message = "inside a";
// 	console.log("a: message = " + message);

// 	function b() {
// 		console.log("b: message = " + message);
// 	}

// 	b();
// }

// function b() {
// 	console.log("b: message = " + message);
// }

// a();

// end lecture41

// lecture42
// var x;
// x = 5;
// console.log(x);

// if (x == undefined) {
// 	console.log("x is undefined");
// }

// x = 5;
// if (x == undefined) {
// 	console.log("x is undefined");
// }
// else {
// 	console.log("x has been defined");
// }
// end lecture42
// lecture43

// for loop
// var sum = 0;
// for (var i = 0; i <= 10; i++) {
// 		console.log(i);
// 		sum += i;
// }
// console.log(sum);
// end lecture43

// lecture44
// function orderChickenWith(sideDish) {
// 	console.log("Chicken with " + sideDish);
// }

// orderChickenWith("noodles");

// end lecture44

// lecture45

// Object

// var company = new Object();
// company.name = "Facebook";
// company.local = "CA";
// company.ceo = new Object();
// company.ceo.firstname = "Mark";
// company.ceo.favecolor = "blue";

// console.log(company);
// console.log("Ceo name is " + company.ceo.firstname);

// console.log(company["name"]);
// console.log(company["local"]);
// console.log(company.ceo["favecolor"]);


// var stockProp = "stock of company";
// company[stockProp] = 212;

// console.log(company);

// console.log("Stock price is: " + company[stockProp]);

// Object lteral

// var facebook = {
// 	name: "Facebook",
// 	ceo: {
// 		firstName: "Mark",
// 		favColor: "blue"
// 	},
// 	"stock of company": 202
// };

// // var company = {
// // 	ceo: {

// // 	},
// // 	"stock of company": 110
// // };

// console.log(facebook.ceo.firstName);

// end lecture45
// lecture46
// funciton are objects
// function multiply(x, y) {
// 	return x * y;
// }
// // console.log(multiply(2, 10));
// multiply.version = "v.1.0.0";
// console.log(multiply.version);

// // function factory

// function makeMultiplier(multiply) {
// 	var myfunc = function (x) {
// 		return multiply * x;
// 	};
// 	return myfunc;
// }

// var multiplyBy3 = makeMultiplier(3);
// console.log(multiplyBy3(4));

// // passing funciton as arguments
// function doOperationOn(x, operation) {
// 	return operation(x);
// }
// var result = doOperationOn(5, multiplyBy3);
// console.log(result);
// end lecture46
// lecture50
// var array = new Array();
// array[0] = "Leandro"
// array[1] = 3;
// array[2] = function(nome) {
// 	console.log("hello " + nome);
// };
// array[3] = {curso: "hmtl, css e js"};

// console.log(array);
// array[2](array[0]);
// console.log(array[3].curso);

// // short hand array creation
// var nome = ["leandro", "joao", "edu"];
// console.log(nome);

// for (var i = 0; i < nome.length; i++) {
// 	console.log("hello " + nome[i]);
// }

// nome[100] = "jim"
// for (var i = 0; i < nome.length; i++) {
// 	console.log("hello " + nome[i]);
// }

// var nomes = ["leandro", "joao", "edu"];
// var myObj = {
// 	name: "leandro",
// 	curso: "Html css js",
// 	plataforma: "Coursera"
// };

// for (var prop in myObj) {
// 	console.log(prop + ": " + myObj[prop]);
// }

// for (var nome in nomes) {
	// console.log("hello " + nomes[nome]);
// }

// end lecture50

// lecture51
// closure

// function makeMultiplier(multiplier) {
// 	return(
// 			function (x) {
// 				return multiplier * x;
// 			}
// 		);
// }

// var doubleAll = makeMultiplier(2);
// console.log(doubleAll(10));

// end lecture51