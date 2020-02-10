angular.module('test', ['ngRoute']).config(config);

function config($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'angular-app/home/home.html',
        controller:RegisterController,
        controllerAs:'vm'
    })
    .when('/register', {
        templateUrl: 'angular-app/register/register.html',
        controller:RegisterController,
        controllerAs:'vm'
    })
    .otherwise({
        redirectTo: '/'
    });
}