(function () {
	'use strict';

	angular.module('lunchCheck', [])
	.controller('LunchCheckController', LunchCheckController);

	LunchCheckController.$inject = ['$scope'];
	function LunchCheckController ($scope) {
	$scope.LunchNormal = '';
	$scope.lunchResponder = '';

	$scope.ItemCounter = function countArray (items) {
		var itemArray = [];
		var lunchCounts = 0;
		if (items.trim() !== '' && items !== null && items !== undefined) {
			itemArray = items.split(',');
			for (var item in itemArray) {
				if (itemArray[item].trim().length > 0){
					lunchCounts += 1;
				}
			}
		}

		return lunchCounts; 
	};

	$scope.FoodResponse = function CheckItemNumb () {
		var NumberofItems = $scope.ItemCounter($scope.LunchNormal);
		var returnMessage = 'Please Enter Data First';
		if (NumberofItems > 0 && NumberofItems <=3) {
			returnMessage = 'Enjoy!';
		}
		else if (NumberofItems > 3) {
			returnMessage = 'Too Much!';
		}
		$scope.lunchResponder = returnMessage;
	};
};
})();
