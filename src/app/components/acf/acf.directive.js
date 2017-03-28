(function () {
    'use strict';

    angular
        .module('portal')
        .directive('aiAcf', aiAcf);

    /** @ngInject */
    function aiAcf() {
        var directive = {
            restrict: 'E',
            templateUrl: 'app/components/acf/acf.html',
            scope: {},
            controller: AcfController,
            controllerAs: 'vm',
            bindToController: {
                mode: '@'
            }
        };
        return directive;

        /** @ngInject */
        function AcfController($log, $location, commonService, acfWritesAllowed) {
            var vm = this;

            vm.acfSubmit = acfSubmit;
            vm.cancelEditing = cancelEditing;
            vm.editAcf = editAcf;
            vm.findAcf = findAcf;
            vm.getAcfs = getAcfs;
            vm.getName = getName;
            vm.getUserAcf = getUserAcf;
            vm.hasAcf = hasAcf;
            vm.splitAcfIdentifiers = splitAcfIdentifiers;
            vm.submitForm = submitForm;
            vm.validIdentifier = validIdentifier;

            activate();

            ////////////////////////////////////////////////////////////////////

            function activate () {
                vm.acf = { address: {} };
                vm.acfWritesAllowed = acfWritesAllowed;
                vm.showFormErrors = false;
                vm.getAcfs();
                vm.getUserAcf();
            }

            function acfSubmit () {
                if (vm.mode === 'enter' && vm.acf && vm.acf.identifier) {
                    var newlines = [];
                    for (var i = 0; i < vm.acf.address.lines.length; i++) {
                        if (vm.acf.address.lines[i] !== '') {
                            newlines.push(vm.acf.address.lines[i]);
                        }
                    }
                    if (newlines.length > 0) {
                        vm.acf.address.lines = newlines;
                    } else {
                        delete vm.acf.address.lines;
                    }
                    commonService.createAcf(vm.acf).then(function (response) {
                        commonService.setAcf(response).then(function () {
                            $location.path('/search');
                        });
                    }, function (error) {
                        vm.errorMessage = error.data.error;
                    });
                } else {
                    vm.findAcf();
                    if (vm.selectAcf) {
                        commonService.setAcf(vm.selectAcf).then(function () {
                            $location.path('/search');
                        });
                    }
                }
            }

            function cancelEditing () {
                vm.mode = 'view';
                vm.getUserAcf();
            }

            function editAcf () {
                commonService.editAcf(vm.acf).then(function (response) {
                    vm.acf = response;
                });
                vm.mode = 'view';
            }

            function findAcf () {
                if (!vm.acfWritesAllowed) {
                    var identifier = vm.selectAcfPrefix + '-' + vm.selectAcfSuffix;
                    for (var i = 0; i < vm.acfs.length; i++) {
                        if (vm.acfs[i].identifier === identifier) {
                            vm.selectAcf = vm.acfs[i];
                            break;
                        }
                    }
                }
            }

            function getAcfs () {
                vm.acfs = [];
                commonService.getAcfs().then(function (response) {
                    vm.acfs = vm.acfs.concat(response);
                    vm.splitAcfIdentifiers();
                    if (vm.acfs.length === 0) {
                        if (vm.mode === 'select') {
                            vm.mode = 'enter';
                        }
                    }
                },function () {
                    vm.acfs = [];
                    if (vm.mode === 'select') {
                        vm.mode = 'enter';
                    }
                });
            }

            function getName (identifier) {
                for (var i = 0; i < vm.acfs.length; i++) {
                    if (vm.acfs[i].identifier === identifier) {
                        return vm.acfs[i].name;
                    }
                }
                return '';
            }

            function getUserAcf () {
                var acf = commonService.getUserAcf();
                if (acf === '') {
                    vm.acf = {address: {lines: ['']}};
                } else if (acf === null) {
                    vm.acf = {address: {lines: ['']}};
                } else {
                    vm.acf = acf;
                    if (angular.isUndefined(vm.acf.address) || vm.acf.address === null) {
                        vm.acf.address = {lines: ['']};
                    }
                    if (angular.isUndefined(vm.acf.address.lines)) {
                        vm.acf.address.lines = [''];
                    }
                }
            }

            function hasAcf () {
                return commonService.hasAcf();
            }

            function splitAcfIdentifiers () {
                if (!vm.acfWritesAllowed) {
                    vm.acfPrefixes = [];
                    vm.acfSuffixes = [];
                    var parts;
                    for (var i = 0; i < vm.acfs.length; i++) {
                        parts = vm.acfs[i].identifier.split('-');
                        if (vm.acfPrefixes.indexOf(parts[0]) < 0)
                            vm.acfPrefixes.push(parts[0]);
                        if (vm.acfSuffixes.indexOf(parts[1]) < 0)
                            vm.acfSuffixes.push(parts[1]);
                    }
                }
            }

            function submitForm () {
                if (!vm.queryForm.$invalid) {
                    if (vm.hasAcf()) {
                        vm.editAcf();
                    } else {
                        vm.acfSubmit();
                    }
                }
            }

            function validIdentifier () {
                var ret = true;
                for (var i = 0; i < vm.acfs.length; i++) {
                    ret = ret && (vm.acfs[i].identifier !== vm.acf.identifier);
                }
                return ret;
            }
        }
    }
})();
