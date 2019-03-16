(function() {
	'use strict';

	angular.module('NarrowItDownApp', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems', FoundItemsDirective);

	function FoundItemsDirective() {
		var ddo = {
			templateUrl: 'foundItems.html',
			scope: {
				found: '<',
				onRemove: '&'
			},
			controller: FoundItemsDirectiveController,
			controllerAs: 'list',
			bindToController: true
		};
		return ddo;
	}

	function FoundItemsDirectiveController() {
		var list = this;

		list.isEmpty = function() {
			return list.found != undefined && list.found.length === 0;
		}
	}

	
	NarrowItDownController.$inject = ['MenuSearchService'];
	function NarrowItDownController(MenuSearchService) {
		var menu = this;

		menu.searchTerm = "";

		menu.narrowIt = function() {
			if (menu.searchTerm === "") {
				menu.items = [];
				return;
			}
			var promise = MenuSearchService.getMatchedMenuItems(menu.searchTerm);
			promise.then(function(response) {
				menu.items = response;
			})
			.catch(function(error) {
				console.log("Oops!", error);
			});
		};
			menu.removeItem = function(index) {
			menu.items.splice(index, 1);
		};
	}

	MenuSearchService.$inject = ['$http'];
	function MenuSearchService($http) {
		var service = this;

		service.getMatchedMenuItems = function(searchTerm) {
			return $http({
				method: 'GET',
				url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
			})
			.then(function (result) {
				var items = result.data.menu_items;
				var foundItems = [];
				for (var i = 0; i < items.length; i++) {
					if (items[i].description.indexOf(searchTerm) >= 0) {
						foundItems.push(items[i]);
					}
				}
				return foundItems;
			});
		};
	}
})();