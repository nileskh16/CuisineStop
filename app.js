(function(){
	'use-strict';

var myapp = angular.module('SK', [])
	.controller('NarrowItDownController', NarrowItDownController)
	.service('MenuSearchService', MenuSearchService)
	.directive('foundItems', ListItem);
	
function ListItem(){
	var ddo = {
		templateUrl: 'listItem.html',
		restrict: 'E',
		foundList: '@foundList',
		onRemove: '@onRemove
	};
	return ddo;
}
	
NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController(MenuSearchService){
	var sk = this;
	sk.food_name = '';
	sk.got = [];
	sk.didyou = true;
	sk.yesidid = false;
	sk.fetch_data = function(food_name){
	sk.prom = MenuSearchService.getItems(food_name);
	sk.prom.then(function(data){
		if(data.length <= 0)
		{
			sk.didyou = false;
			sk.yesidid = false;
		}
		else
		{
			sk.got = data;
			sk.didyou = true;
			sk.yesidid = true;
		}
	}).catch(function(error){
		console.log(error)
		sk.didyou = false;
		sk.yesidid = false;
	});
	};
	
	sk.rmitem = function(index){
		sk.got.splice(index,1);
	};
}

MenuSearchService.$inject = ['$http', '$q', '$timeout'];

function MenuSearchService($http, $q, $timeout){
	var service = this;
	var got = false;
	service.getItems = function(desc){
		var prom = $q.defer();
		if(desc != '')
		{
			$http({
				method: 'GET',
				url: 'https://davids-restaurant.herokuapp.com/menu_items.json'
			}).then(function(resp){
				service.result = resp.data.menu_items;
				found = [];
				//console.log(service.result[0]);
				for(i=0; i<service.result.length; i++)
				{
					var got = true;
					var item = service.result[i];
					if(item.description.indexOf(desc) != -1){
						found.push(item);
					}
				}
				prom.resolve(found);
			},
			function(error){
				console.log(error.message)
				prom.reject('Something went wrong');
			});
		}
		else
			prom.reject('Triffling data was consigned.');
	return prom.promise;
	};
}
})();
