(function () {
    angular
        .module('angularPagination')
        .directive('stPagination', [function () {
            return {
                restrict: 'E',
                replace: true,
                templateUrl: './scripts/components/pagination/pagination.html',
                scope: {                    
                    pageSelectionEvent: '&',                                      
                    pagerDetails: '=',
                    'watch':'='
                },
                controller: ['$scope', '$rootScope',
                    function ($scope, $rootScope) {
                        $scope.$watch('watch', function () {
                            $scope.tempPager = {
                                'startIndex': 0,
                                'startEnd': 10,
                                'items': [],
                                'pageItems': [],
                                'fetch': false
                            }
                            angular.copy($scope.pagerDetails.items, $scope.tempPager.items);
                            $scope.navigate = function (pageType) {
                                if (pageType == 'NEXT') {
                                    $scope.pagerDetails.currentPage++;
                                } else {
                                    $scope.pagerDetails.currentPage--;
                                }
                                $scope.pageService();

                            }
                            $scope.pageService = function () {
                                var start = ($scope.pagerDetails.currentPage - 1) * $scope.pagerDetails.itemsPerPage;
                                var end = start + $scope.pagerDetails.itemsPerPage;
                                $scope.pagerDetails.totalPages =  Math.ceil($scope.pagerDetails.totalItems / $scope.pagerDetails.itemsPerPage) ;                                
                                var lastPageSet;
                                if($scope.pagerDetails.masterListStart == 0 && $scope.pagerDetails.masterListEnd == 0) {
                                    lastPageSet = 1;
                                } else {
                                    lastPageSet = Math.ceil($scope.pagerDetails.masterListEnd / $scope.pagerDetails.itemsPerPage);
                                }

                                if ((start >= $scope.pagerDetails.masterListStart && start <= $scope.pagerDetails.masterListEnd) &&
                                    ((end - 1 <= $scope.pagerDetails.masterListEnd) || ($scope.pagerDetails.currentPage == lastPageSet))) {
                                    $scope.tempPager.pageItems = $scope.tempPager.items.slice(start-$scope.pagerDetails.masterListStart, end-$scope.pagerDetails.masterListStart);
                                    $scope.tempPager.fetch = false;
                                } else {
                                    if (start === 0) {
                                        $scope.pagerDetails.offset = 0;
                                    } else if (start < $scope.pagerDetails.offset) {
                                        $scope.pagerDetails.offset =
                                            (start - end) + $scope.pagerDetails.itemsPerPage;
                                    } else {
                                        $scope.pagerDetails.offset = start;
                                    }
                                    $scope.tempPager.fetch = true;
                                }
                                $scope.tempPager.startIndex = start;
                                if ($scope.tempPager.pageItems.length < $scope.pagerDetails.itemsPerPage) {
                                    $scope.tempPager.endIndex =  $scope.tempPager.startIndex + $scope.tempPager.pageItems.length
                                } else {
                                    $scope.tempPager.endIndex = $scope.tempPager.startIndex + $scope.pagerDetails.itemsPerPage;
                                }
                                if (!$scope.tempPager.fetch) {
                                    $scope.pagerDetails.offset = start;
                                }
                                $scope.pageSelectionEvent({
                                    'offset': $scope.pagerDetails.offset,
                                    'items': $scope.tempPager.pageItems,
                                    'fetch': $scope.tempPager.fetch,
                                })
                            }
                            if ($scope.pagerDetails.itemsPerPage != undefined) {
                                $scope.pageService();
                            }
                        },true);
				}],
                link: function (scope, element, attrs) {

                }

            };
   }])
})();