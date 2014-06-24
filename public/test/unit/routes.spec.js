describe("Testing Routes", function() {

    beforeEach(angular.mock.module('restangular'));
    beforeEach(angular.mock.module('app'), function(RestangularProvider) {
        RestangularProvider.setBaseUrl('/api');
    });

    it('should test routeProvider', function() {

        inject(function($route, $location, $rootScope) {

            expect($route.routes['/'].controller).toBe('crMainCtrl');
            expect($route.routes['/'].templateUrl).toEqual('/partials/main/main');

            expect($route.routes['/admin/users'].controller).toBe('crUserListCtrl');
            expect($route.routes['/admin/users'].templateUrl).toEqual('/partials/admin/user-list');

            expect($route.routes['/signup'].controller).toBe('crSignupCtrl');
            expect($route.routes['/signup'].templateUrl).toEqual('/partials/account/signup');

            expect($route.routes['/profile'].controller).toBe('crProfileCtrl');
            expect($route.routes['/profile'].templateUrl).toEqual('/partials/account/profile');

            expect($route.routes['/register'].controller).toBe('crPersonRegisterCtrl');
            expect($route.routes['/register'].templateUrl).toEqual('/partials/person/register');

            expect($route.routes['/companies'].controller).toBe('crCompanyListCtrl');
            expect($route.routes['/companies'].templateUrl).toEqual('/partials/company/list');

            expect($route.routes['/companies/create'].controller).toBe('crCompanyCreateCtrl');
            expect($route.routes['/companies/create'].templateUrl).toEqual('/partials/company/create');

            expect($route.routes['/companies/:id'].controller).toBe('crCompanyEditCtrl');
            expect($route.routes['/companies/:id'].templateUrl).toEqual('/partials/company/edit');

            expect($route.routes['/persons'].controller).toBe('crPersonListCtrl');
            expect($route.routes['/persons'].templateUrl).toEqual('/partials/person/list');

            expect($route.routes['/persons/create'].controller).toBe('crPersonCreateCtrl');
            expect($route.routes['/persons/create'].templateUrl).toEqual('/partials/person/create');

            expect($route.routes['/persons/:id'].controller).toBe('crPersonEditCtrl');
            expect($route.routes['/persons/:id'].templateUrl).toEqual('/partials/person/edit');

            expect($route.routes['/offices'].controller).toBe('crOfficeListCtrl');
            expect($route.routes['/offices'].templateUrl).toEqual('/partials/office/list');

            expect($route.routes['/offices/create'].controller).toBe('crOfficeCreateCtrl');
            expect($route.routes['/offices/create'].templateUrl).toEqual('/partials/office/create');

            expect($route.routes['/offices/:id'].controller).toBe('crOfficeEditCtrl');
            expect($route.routes['/offices/:id'].templateUrl).toEqual('/partials/office/edit');
        });
    });

});
