(function () {
    'use strict';

    angular
        .module('portal.review')
        .directive('aiDocumentReview', aiDocumentReview);

    /** @ngInject */
    function aiDocumentReview($log) {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/review/components/document_review/document_review.html',
            scope: {},
            controller: DocumentReviewController,
            controllerAs: 'vm',
            bindToController: {
                activeDocument: '=?'
            }
        };

        return directive;

        /** @ngInject */
        function DocumentReviewController($filter, $scope, commonService) {
            var vm = this;

            vm.cancel = cancel;
            vm.displayName = commonService.displayName;

            activate();

            ////////////////////////////////////////////////////////////////////

            function activate () {
                vm.transformedDocument = '';
                vm.displayType = 'xslt';
                vm.xslt = loadXMLDoc('assets/xslt/CDA_Style.xsl');
                $scope.$watch('vm.activeDocument', function (newDoc) {
                    if (newDoc) {
                        vm.transformedDocument = $filter('xslt')(newDoc.data, vm.xslt);
                    }
                });
            }

            function cancel () {
                vm.activeDocument = undefined;
                vm.transformedDocument = '';
            }

            ////////////////////////////////////////////////////////////////////

            function loadXMLDoc (filename) {
                var xhttp;
//                if ($window.ActiveXObject) {
//                    xhttp = new $window.ActiveXObject('Msxml2.XMLHTTP');
//                } else {
                    xhttp = new XMLHttpRequest();
//                }
                xhttp.open('GET', filename, false);
                try { xhttp.responseType = 'msxml-document' } catch(err) { $log.debug(err) } // Helping IE11
                xhttp.send('');
                return xhttp.responseText;
            }
        }
    }
})();
