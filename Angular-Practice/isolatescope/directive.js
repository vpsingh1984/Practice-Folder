var app = angular.module('directivesModule', []);
	app.directive('isolatedScope', function () {
    return {
    	bindToController: true,
        restrict: 'E',
        scope: {
            customer: '=' //Two-way data binding
        },
        template: '<ul><li ng-repeat="prop in customer">{{ prop }}</li></ul>'
    };
});