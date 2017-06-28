'use strict';

(function () {

    angular.module('angularPagination').controller('exampleController', exampleController);

    exampleController.$inject = ['$scope', '$rootScope', '$http'];

    function exampleController($scope, $rootScope, $http) {
        $scope.pagerDetails = {};
        $scope.pagerDetails.currentPage = 1;
        $scope.pagerDetails.itemsPerPage = 10;
        $scope.sendPagerDetails = {};
        $scope.watch = true;
        //Fetch Deatils
        $scope.fetch = function (start, end) {
            $http.get('./scripts/modules/example/sampledata.json').then(function (response) {
                    if (response.data.length != 0) {
                        $scope.pagerDetails.items = response.data;
                        $scope.pagerDetails.totalItems = response.data.length;
                        $scope.pagerDetails.masterListStart = start;
                        $scope.pagerDetails.masterListEnd = start + ($scope.pagerDetails.items.length - 1);
                        $scope.sendPagerDetails = $scope.pagerDetails;
                        $scope.watch = !$scope.watch;
                        $scope.status = true;
                    } else {
                        $scope.status = false;
                        $scope.statusMessage = 'No Reccords Found';
                    }

                },
                function () {
                    $scope.status = false;
                    $scope.statusMessage = "OOP's please try again"

                });
        }
        $scope.pageSelectionEvent = function (offset, items, fetch) {
            $scope.list = items;
            if (fetch) {
                $scope.fetch(offset, $scope.limit);
            }
        }
        $scope.init = function () {

            $scope.itemsPerPage = 10;
            $scope.list = {};
            $scope.templist = [];
            $scope.masterList = {};
            $scope.limit = 30;
            $scope.offset = 0;
            $scope.masterListStart = 0;
            $scope.masterListEnd = 0;
            $scope.pagerDetails = {};
            $scope.pagerDetails.currentPage = 1;
            $scope.pagerDetails.itemsPerPage = 10;
            $scope.fetch(0, $scope.limit);
        }
        $scope.init();

    }
}());