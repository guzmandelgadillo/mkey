(function (angular) {
    angular.module('masterkey.test', ['masterkey.api'])
        .config(['configurations', function (configuration) {
            configuration.location.urlbase = '/';
            configuration.location.home = 'masterkey-dev/';
        }]);
})(angular);
