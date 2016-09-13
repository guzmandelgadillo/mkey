(function (angular) {
    angular.module('masterkey.test').controller('testController', ['$scope', testController]);
    function testController($scope) {
        $scope.selectedCourse = function (course, variant) {
            $scope.messages = "Curso seleccionado: " + course + " Variante: " + variant;
        }
    }
})(angular);

