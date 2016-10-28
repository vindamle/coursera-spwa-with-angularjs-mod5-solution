(function () {
"use strict";

angular.module('public').directive('menuItemValidator', MenuItemValidator);
MenuItemValidator.$inject = [ '$q', 'MenuService',];
function MenuItemValidator($q, MenuService) {
  return {
    scope: {
      user: '='
    },
    controller: 'SignupController',
    controllerAs: 'signupCtrl',
    require: 'ngModel',
    link: function(scope, elm, attrs, ctrl) {

      ctrl.$asyncValidators.menuItemValidator = function(modelValue , viewValue) {

        //  scope.$parent.signupCtrl.validMenu = false;

         if (ctrl.$isEmpty(modelValue)) {
            // consider empty model valid
            return $q.when(false);
         }

         var deferred = $q.defer();

         MenuService.getMenuItem(modelValue)
         .then(function (response) {
            scope.$parent.signupCtrl.setSelectedMenu(response.data);
            // scope.$parent.signupCtrl.validMenu = true;
            deferred.resolve(response);
         }, function (error) {
            scope.$parent.signupCtrl.setSelectedMenu({short_name: modelValue});
            deferred.reject(error);
         });

       return deferred.promise;

      };
    }
  };
};
})();
