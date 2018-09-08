
(function () {
    'use strict';
    angular.module('ShoppingListPromiseApp',[])
        .controller('ShoppingListController1', ShoppingListController1)
        .controller('ShoppingListController2', ShoppingListController2)
        .factory('ShoppingListFactory', ShoppingListFactory)
        .directive('listItemDescription', ListItemDescription);

    function ListItemDescription(){
        var ddo = {
            template: '{{item.quantity}} of {{item.name}}'
        };
        return ddo;
    }

    ShoppingListController1.$inject = ['ShoppingListFactory'];
    function ShoppingListController1(ShoppingListFactory) {
        var list = this;

        var shoppingList = ShoppingListFactory();



        list.items = shoppingList.getItems();

        list.itemName = "";
        list.itemQuantity = "";

        list.addItem = function(){
            try {
                ShoppingListService.addItem(list.itemName,
                    list.itemQuantity);
            }catch (error) {
                list.errorMessage = error.message;
            }
        }

        list.removeItem = function (itemIndex) {
            ShoppingListService.removeItem(itemIndex);

        };
    }


    ShoppingListService.$inject = ['$q', 'WeightLossFilterService'];
    function ShoppingListService() {
        var service = this;

        var items = [];

        service.addItem = function(name, quantity){
            var promise = W
        }

        service.removeItem = function(itemIndex){
            items.splice(itemIndex, 1);
        }
        service.getItems = function () {
            return items;
        };
    }

   WeightLossFilterService.$inject = ['$q','$timeout']
    function WeightLossFilterService($q, $timeout) {
        var service = this;

        service.checkName = function (name) {
          var deferred = $q.defer();

          var result = {
              message: ""
          };

          $timeout(function () {

              if(name.toLowerCase().indexOf('cookie') === -1){
                  deferred.resolve(result);
              }else{
                  result.message = "Stay awat from cookies, Yaakov!";
                  deferred.reject(result);
              }
          },3000);

          return deferred.promise;

        };

        service.checkQuantity = function (quantity) {
          var deferred = $q.defer();
          var result = {
              message: ""
          };

          $timeout(function () {
              if(quantity < 6){
                  deferred.resolve(result);
              }else{
                  result.message = "That's too much, Yaakov!";
                  deferred.reject(result);
              }
          },1000);

          return deferred.promise;

        };
    }
})();