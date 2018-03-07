var performance = {
    bindings: {},
    template: `
    <h1>Understanding the Angular digest {{$ctrl.bottleneck}}</h1>
    <input type="text" ng-model="$ctrl.bottleneck">
    `,
    controller: function PerformanceController($scope) {
        var ctrl = this;
        ctrl.bottleneck = 'cycle';

        $scope.$watch( //custom watcher
            function() {
                return ctrl.bottleneck; // watch the bottleneck var
            },
            function(newValue, oldValue) {
                console.log('ctrl.bottleneck', newValue); // log out new value
            }
        );
    }
};

angular
    .module('app')
    .component('performance', performance);
