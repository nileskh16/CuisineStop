(function(){
	'use-strict';

var myapp = angular.module('SK', [])
	.controller('skcon', skcon)
	.service('Mservice', Mservice);
	
skcon.$inject = ['Mservice'];
function skcon(Mservice){
	var sk = this;
	sk.food_name = '';
	sk.got = [];
	sk.didyou = true;
	sk.fetch_data = function(food_name){
	sk.prom = Mservice.getItems(food_name);
	sk.prom.then(function(data){
		if(data.length <= 0)
		{
			sk.didyou = false;
		}
		else
		{
			sk.got = data;
			sk.didyou = true;
			console.log(data);
		}
	}).catch(function(error){
		console.log(error)
		sk.didyou = false;
	});
	};
	
	sk.rmitem = function(index){
		sk.got.splice(index,1);
	};
}

Mservice.$inject = ['$http', '$q', '$timeout'];

function Mservice($http, $q, $timeout){
	var service = this;
	var got = false;
	service.getItems = function(desc){
		var prom = $q.defer();
		console.log(desc)
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