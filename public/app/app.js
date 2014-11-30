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
        .when('/', { templateUrl: '/app/main/main.html', controller: 'crMainCtrl' })
        .when('/admin/users', { templateUrl: '/app/admin/user-list.html', controller: 'crUserListCtrl', resolve: routeRoleChecks.admin })
        .when('/signup', { templateUrl: '/app/account/signup.html', controller: 'crSignupCtrl' })
        .when('/profile', { templateUrl: '/app/account/profile.html', controller: 'crProfileCtrl', resolve: routeRoleChecks.user })
        .when('/forgot_password', { templateUrl: '/app/account/forgot_password.html', controller: 'crForgotPasswordCtrl'})
        .when('/forgot_password/:token', { templateUrl: '/app/account/forgot_password.html', controller: 'crResetPasswordCtrl'})
        .when('/reset_password/:token', { templateUrl: '/app/account/reset_password.html', controller: 'crResetPasswordCtrl'})
        .when('/reset/:token', { templateUrl: '/app/account/reset_password.html', controller: 'crResetPasswordCtrl'})
        .when('/register', { templateUrl: '/app/person/register.html', controller: 'crPersonRegisterCtrl', resolve: routeRoleChecks.user })
        .when('/companies', { templateUrl: '/app/company/list.html', controller: 'crCompanyListCtrl', resolve: routeRoleChecks.user })
        .when('/companies/create', { templateUrl: '/app/company/create.html', controller: 'crCompanyCreateCtrl', resolve: routeRoleChecks.user })
        .when('/companies/:id', { templateUrl: '/app/company/edit.html', controller: 'crCompanyEditCtrl', resolve: routeRoleChecks.user })
        .when('/persons', { templateUrl: '/app/person/list.html', controller: 'crPersonListCtrl', resolve: routeRoleChecks.user })
        .when('/persons/create', { templateUrl: '/app/person/create.html', controller: 'crPersonCreateCtrl', resolve: routeRoleChecks.user })
        .when('/persons/:id', { templateUrl: '/app/person/edit.html', controller: 'crPersonEditCtrl', resolve: routeRoleChecks.user })
        .when('/offices', { templateUrl: '/app/office/list.html', controller: 'crOfficeListCtrl', resolve: routeRoleChecks.user })
        .when('/offices/create', { templateUrl: '/app/office/create.html', controller: 'crOfficeCreateCtrl', resolve: routeRoleChecks.user })
        .when('/offices/:id', { templateUrl: '/app/office/edit.html', controller: 'crOfficeEditCtrl', resolve: routeRoleChecks.user })
        .otherwise({ redirectTo: "/" });

    $translateProvider.useLoader('$translatePartialLoader', {
        urlTemplate: '../translation/{part}/{lang}.json'
    });

    if(localStorage.getItem('NG_TRANSLATE_LANG_KEY')){
        $translateProvider.preferredLanguage(localStorage.getItem('NG_TRANSLATE_LANG_KEY'));
        moment.lang(localStorage.getItem('NG_TRANSLATE_LANG_KEY'));
    } else {
        $translateProvider.preferredLanguage('fi');
        moment.lang('fi');
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
