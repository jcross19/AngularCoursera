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

	service.doBuy = function (index) {
		boughtItems.push(toBuyItems[index]);
		toBuyItems.splice(index, 1);
	}
	service.getToBuyItems = function () {
		return toBuyItems;
	};
	service.getBoughtItems = function () {
		return boughtItems;
	} 
}

})();