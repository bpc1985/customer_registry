var app = angular.module('app', ['ngResource', 'ngRoute', 'ngCookies', 'restangular', 'ui.select2', 'ui.bootstrap', 'pascalprecht.translate']);

app.config(function(RestangularProvider, $routeProvider, $locationProvider, $translateProvider){
    var routeRoleChecks = {
        admin: {
            auth: function(crAuth) { return crAuth.authorizeCurrentUserForRoute('admin') }
        },
        user: {
            auth: function(crAuth) { return crAuth.authorizeAuthenticatedUserForRoute() }
        }
    }

    //uiSelectConfig.theme = 'bootstrap';
    RestangularProvider.setBaseUrl("/api");
    $locationProvider.html5Mode(true);
    $routeProvider
        .when('/', { templateUrl: '/partials/main/main', controller: 'crMainCtrl' })
        .when('/admin/users', { templateUrl: '/partials/admin/user-list', controller: 'crUserListCtrl', resolve: routeRoleChecks.admin })
        .when('/signup', { templateUrl: '/partials/account/signup', controller: 'crSignupCtrl' })
        .when('/profile', { templateUrl: '/partials/account/profile', controller: 'crProfileCtrl', resolve: routeRoleChecks.user })
        .when('/register', { templateUrl: '/partials/person/register', controller: 'crPersonRegisterCtrl', resolve: routeRoleChecks.user })
        .when('/companies', { templateUrl: '/partials/company/list', controller: 'crCompanyListCtrl', resolve: routeRoleChecks.user })
        .when('/companies/create', { templateUrl: '/partials/company/create', controller: 'crCompanyCreateCtrl', resolve: routeRoleChecks.user })
        .when('/companies/:id', { templateUrl: '/partials/company/edit', controller: 'crCompanyEditCtrl', resolve: routeRoleChecks.user })
        .when('/persons', { templateUrl: '/partials/person/list', controller: 'crPersonListCtrl', resolve: routeRoleChecks.user })
        .when('/persons/create', { templateUrl: '/partials/person/create', controller: 'crPersonCreateCtrl', resolve: routeRoleChecks.user })
        .when('/persons/:id', { templateUrl: '/partials/person/edit', controller: 'crPersonEditCtrl', resolve: routeRoleChecks.user })
        .when('/offices', { templateUrl: '/partials/office/list', controller: 'crOfficeListCtrl', resolve: routeRoleChecks.user })
        .when('/offices/create', { templateUrl: '/partials/office/create', controller: 'crOfficeCreateCtrl', resolve: routeRoleChecks.user })
        .when('/offices/:id', { templateUrl: '/partials/office/edit', controller: 'crOfficeEditCtrl', resolve: routeRoleChecks.user })
        .otherwise({ redirectTo: "/" });

    $translateProvider.useLoader('$translatePartialLoader', {
        urlTemplate: '../translation/{part}/{lang}.json'
    });

    if(localStorage.getItem('NG_TRANSLATE_LANG_KEY')){
        $translateProvider.preferredLanguage(localStorage.getItem('NG_TRANSLATE_LANG_KEY'));
        moment.lang(localStorage.getItem('NG_TRANSLATE_LANG_KEY'));
    } else {
        $translateProvider.preferredLanguage('en');
        moment.lang('en');
    }

    $translateProvider.useLocalStorage();
});

angular.module('app').run(function($rootScope, $location) {
    $rootScope.$on('$routeChangeError', function(evt, current, previous, rejection) {
        if(rejection === 'not authorized') {
            $location.path('/');
        }
    });
});
