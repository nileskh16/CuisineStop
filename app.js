'use-strict';

angular.module('skapp', ['ui.router'])
  .config(RouteConfig)
  .service('list', list)
  .controller('homeCon', homeCon)
  .controller('catCon', catCon)
  .controller('itemCon', itemCon)

RouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RouteConfig($stateProvider, $urlRouterProvider){
  //$urlRouterProvider.otherwise('/index');
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
  .state('index', {
    url: '/index',
    templateUrl: 'index.html',
  })
  .state('categories.item',{
    url: '/item/{id}',
    templateUrl: 'item.html',
    controller: 'itemCon as con'
  });
};

list.$inject = ['$q', '$timeout'];
function list($q, $timeout){
  var service = this;
  var items = [];
  items.push({name:'American', en: ['Hotdogs', 'Pancakes', 'Burgers', 'Donut', 'Pies']});
  items.push({name:'Italian', en: ['Pizza', 'Pasta', 'Maggie']});
  items.push({name:'Indian', en: ['Rotee', 'Panipuri', 'Rabadi']});
  items.push({name:'Mexican', en: ['Chilie', 'Nacho']});
  items.push({name:'Chinese', en: ['Rice', 'Noodles', 'Chopsie']});

  service.getItems = function(){
    var prom = $q.defer();
    $timeout(function () {
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

itemCon.$inject = ['$scope', 'items', '$stateParams'];
function itemCon($scope, items, $stateParams){
  var con = this;
  con.item = items[$stateParams.id];
};
