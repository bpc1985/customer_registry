angular.module('app').service("crAddPersonModalService", function($modal) {
    this.showModal = function() {
        $modal.open({
            templateUrl: 'person-modal.html',
            resolve: {
                items: function () {
                    return ['mot', 'hai', 'ba', 'bon'];
                }
            },
            controller: function ($scope, $modalInstance, items) {
                $scope.items = items;

                $scope.selected = {
                    item: $scope.items[0]
                };

                $scope.ok = function () {
                    $modalInstance.close($scope.selected.item);
                };

                $scope.cancel = function () {
                    $modalInstance.dismiss('cancel');
                };
            }
        });
    }
});
