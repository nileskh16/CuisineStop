'use-strict';

angular.module('skapp', ['ui.router'])
  .config(RouteConfig)
  .service('list', list)
  .controller('homeCon', homeCon)
  .controller('catCon', catCon)
  .controller('itemCon', itemCon)

RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RouteConfig($stateProvider, $urlRouterProvider){
  $urlRouterProvider.otherwise('home');

  $stateProvider
  .state('categories', {
    url: '/categories',
    templateUrl: 'categories.html',
    controller: 'catCon as con',
    resolve:{
      items: ['list', function(list){
        return list.getItems();
      }]
    }
  })
  .state('home', {
    url: '/home',
    templateUrl: 'home.html',
    controller: 'homeCon as con',
  })
  .state('item',{
    url: '/item/{id}',
    templateUrl: 'items.html',
    controller: 'itemCon as con',
  });
};

list.$inject = ['$q', '$timeout'];
function list($q, $timeout){
  var service = this;
  var items = [];
  items.push({name:'American'});
  items.push({name:'Italian'});
  items.push({name:'Indian'});
  items.push({name:'Mexican'});
  items.push({name:'Chinese'});

  service.getItems = function(){
    var prom = $q.defer();
    $setTimeout(function () {
      prom.resolve(items);
    }, 2000);
    return prom.promise;
  }
};

homeCon.$inject = ['$scope'];
function homeCon($scope){
  var con = this;
};

catCon.$inject = ['$scope', 'items'];
function catCon($scope, items){
  var con = this;
  con.items = items;
};

itemCon.$inject = ['$scope', 'list'];
function itemCon($scope, list){
  var con = this;

};
