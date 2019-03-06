(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ListToBuyController', ListToBuyController)
.controller('ListAlreadyBoughtController', ListAlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ListToBuyController.$inject = ['ShoppingListCheckOffService'];
function ListToBuyController(ShoppingListCheckOffService) {
	var buyController = this;
	buyController.toBuyItems = ShoppingListCheckOffService.getToBuyItems();
	buyController.doBuy = function(index) {
		ShoppingListCheckOffService.doBuy(index);
	}
}

ListAlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function ListAlreadyBoughtController(ShoppingListCheckOffService) {
	var boughtController = this;
	boughtController.boughtItems = ShoppingListCheckOffService.getBoughtItems;
	boughtController.emptyCheck = function ($index) {
		var message = "Nothing Bought Yet!"
		if (boughtController.boughtItems.length == 0)
			return message;
// 		return (boughtController.boughtItems.length == "0") 
// 		if (ShoppingListCheckOffService.getBoughtLength == 0)
// 			return true;
// 		else 
// 			return false;	
	};
};

function ShoppingListCheckOffService () {
	var service = this;
	var toBuyItems = [{
							name: "Apples",
							quantity: 10
						},
						{
							name: "Spaghetti",
							quantity: 1

						},
						{
							name: "Eggs",
							quantity: 2

						},	
						{
							name: "Chicken Tenders",
							quantity: 8

						},
						{
							name: "Pizza",
							quantity: 3

						},
						{
							name: "Cookies",
							quantity: 5
						},
				]
	var boughtItems = [];

	this.doBuy = function (index) {
		boughtItems.push(toBuyItems[index]);
		toBuyItems.splice(index, 1);
	}
	this.getToBuyItems = function () {
		return toBuyItems;
	};
	this.getBoughtItems = function () {
		return boughtItems;
	};
// 	this.checkBoughtLength = function () {
// 		return boughtItems.length
// 	};
}

})();
