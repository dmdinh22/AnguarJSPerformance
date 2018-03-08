var performance = {
    bindings: {},
    template: `
    <h1>Count: {{$ctrl.count}}</h1>
    <div>
      Using ng-click:
      <button id="firstBtn" ng-click="$ctrl.increment()">Increment</button>
    </div>
    <div>
      Without $apply:
      <button id="secondBtn">Increment</button>
    </div>
    <div>
      With $apply:
      <button id="thirdBtn">Increment</button>
    </div>
    `,
    controller: function PerformanceController($scope, $timeout) {
        var ctrl = this;
        ctrl.count = 0;
        ctrl.increment = function() {
            this.count++;
            console.log('ON INCREMENT', this.count);
        };

        $scope.$watch(
            function () {
                return ctrl.count
            },
            function (newValue, oldValue) {
                console.log('ctrl.count', newValue)
            }
        );

        document.getElementById('secondBtn').addEventListener('click', function() {
            console.log('second btn clicked');
            ctrl.increment(); // changes var but not dom because digest cycle has not completed
        });

        document.getElementById('thirdBtn').addEventListener('click', function() {
            console.log('third btn clicked');  
            $scope.$apply(function() { // completes digest cycle
                ctrl.increment();
            });
        });

    }
};

angular
    .module('app')
    .component('performance', performance);
