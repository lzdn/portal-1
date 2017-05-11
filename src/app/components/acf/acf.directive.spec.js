(function () {
    'use strict';

    describe('portal.aiAcf', function () {
        var $compile, $rootScope, vm, el, $log, $q, commonService, mock, Mock, $location;
        mock = {};
        mock.newAcf = {identifier:'New-01',name:'Fairgrounds',phoneNumber:'555-1895',address:{lines:['133 Smith Gardn'],city:'Albany',state:'CA',zipcode:'94602',country:null}};
        mock.badRequest = {
            status: 400,
            error: 'ACF identitifer is required.'
        };

        beforeEach(function () {
            module('pulse.mock');
            module('portal', function ($provide) {
                $provide.decorator('commonService', function ($delegate) {
                    $delegate.createAcf = jasmine.createSpy('createAcf');
                    $delegate.editAcf = jasmine.createSpy('editAcf');
                    $delegate.getAcfs = jasmine.createSpy('getAcfs');
                    $delegate.getUserAcf = jasmine.createSpy('getUserAcf');
                    $delegate.hasAcf = jasmine.createSpy('hasAcf');
                    $delegate.setAcf = jasmine.createSpy('setAcf');
                    return $delegate;
                });
                $provide.constant('acfWritesAllowed', true);
            });
            inject(function (_$compile_, _$rootScope_, _$log_, _$q_, _commonService_, _$location_, _Mock_) {
                $compile = _$compile_;
                $rootScope = _$rootScope_;
                $log = _$log_;
                $q = _$q_;
                $location = _$location_;
                Mock = _Mock_;
                commonService = _commonService_;
                commonService.createAcf.and.returnValue($q.when({response: angular.extend(mock.newAcf,{id:4})}));
                commonService.editAcf.and.returnValue($q.when(Mock.acfs[1]));
                commonService.getAcfs.and.returnValue($q.when(Mock.acfs));
                commonService.getUserAcf.and.returnValue(Mock.acfs[0]);
                commonService.hasAcf.and.returnValue(true);
                commonService.setAcf.and.returnValue($q.when({}));

                el = angular.element('<ai-acf mode="select"></ai-acf>');

                $compile(el)($rootScope.$new());
                $rootScope.$digest();
                vm = el.isolateScope().vm;
            });
        });

        afterEach(function () {
            if ($log.debug.logs.length > 0) {
                //console.debug("\n Debug: " + $log.debug.logs.join("\n Debug: "));
            }
        });

        it('should be compiled', function () {
            expect(el.html()).not.toEqual(null);
        });

        it('should have isolate scope object with instanciate members', function () {
            expect(vm).toEqual(jasmine.any(Object));
        });

        it('should have a function to get active ACFs', function () {
            expect(vm.getAcfs).toBeDefined();
        });

        it('should call commonService.getAcfs on load', function () {
            expect(commonService.getAcfs).toHaveBeenCalled();
            expect(vm.acfs.length).toBe(4);
        });

        it('should set acfs to an empty array if the server fails', function () {
            commonService.getAcfs.and.returnValue($q.reject({}));
            vm.getAcfs();
            el.isolateScope().$digest();
            expect(commonService.getAcfs).toHaveBeenCalled();
            expect(vm.acfs.length).toBe(0);
        });

        it('should have a function to submit the active ACF', function () {
            expect(vm.acfSubmit).toBeDefined();
        });

        it('should call commonService.createAcf if one is in the acf.identifier field', function () {
            vm.acf = angular.copy(mock.newAcf);
            vm.mode = 'enter';
            vm.acfSubmit();
            expect(commonService.createAcf).toHaveBeenCalled();
        });

        it('should not call commonService.createAcf if there isn\'t one in the acf.identifier field', function () {
            vm.acf = {};
            vm.mode = 'enter';
            vm.acfSubmit();
            expect(commonService.createAcf).not.toHaveBeenCalled();
        });

        it('should call commonService.setAcf if there is one selected', function () {
            vm.selectAcf = vm.acfs[0];
            vm.acfSubmit();
            expect(commonService.setAcf).toHaveBeenCalled();
        });

        it('should not call commonService.setAcf if an acf isnt\'t selected', function () {
            vm.selectAcf = null;
            vm.acfSubmit();
            expect(commonService.setAcf).not.toHaveBeenCalled();
        });

        it('should show an error if create goes wrong', function () {
            vm.acf = angular.copy(mock.newAcf);
            vm.mode = 'enter';
            commonService.createAcf.and.returnValue($q.reject({data: mock.badRequest}));
            vm.acfSubmit();
            el.isolateScope().$digest();
            expect(vm.errorMessage).toBe(mock.badRequest.error);
        });

        it('should call setAcf after createAcf', function () {
            vm.acf = angular.copy(mock.newAcf);
            vm.mode = 'enter';
            vm.acfSubmit();
            el.isolateScope().$digest();
            expect(commonService.setAcf).toHaveBeenCalled();
        });

        it('should know if the user has an ACF', function () {
            expect(vm.hasAcf).toBeDefined();
            expect(vm.hasAcf()).toBeTruthy();
        });

        it('should have a function to get the user\`s ACF', function () {
            expect(vm.getUserAcf).toBeDefined();
        });

        it('should call commonService.getUserAcf on load', function () {
            expect(commonService.getUserAcf).toHaveBeenCalled();
            expect(vm.acf).toBe(Mock.acfs[0]);
        });

        it('should set acf to a blank-ish acf object if the user doesn\'t have an ACF', function () {
            commonService.getUserAcf.and.returnValue('');
            vm.getUserAcf();
            expect(vm.acf).toEqual({address: {lines: ['']}});
        });

        it('should not call the commonService is the user isn\'t authenticated', function () {
            var callCount = commonService.getUserAcf.calls.count();
            commonService.hasAcf.and.returnValue(false)
            vm.getUserAcf();
            expect(commonService.getUserAcf.calls.count()).toBe(callCount);
        });

        describe('address object on load', function () {
            var baseAcf;
            var plusAcf;

            beforeEach(function () {
                baseAcf = angular.copy(Mock.acfs[0]);
                delete baseAcf.address;
                plusAcf = angular.copy(baseAcf);
                plusAcf.address = {lines: ['']};
            });

            it('should add an address object if the acf is null', function () {
                commonService.getUserAcf.and.returnValue(null);
                vm.getUserAcf();
                expect(vm.acf).toEqual({address: {lines: ['']}});
            });

            it('should add an address object if it doesn\'t have one', function () {
                commonService.getUserAcf.and.returnValue(baseAcf);
                vm.getUserAcf();
                expect(vm.acf).toEqual(plusAcf);
            });

            it('should add an address object if the address is null', function () {
                baseAcf.address = null;
                commonService.getUserAcf.and.returnValue(baseAcf);
                vm.getUserAcf();
                expect(vm.acf).toEqual(plusAcf);
            });

            it('should put a lines object in the acf address if it doesn\'t have one', function () {
                baseAcf.address = {};
                commonService.getUserAcf.and.returnValue(baseAcf);
                vm.getUserAcf();
                expect(vm.acf).toEqual(plusAcf);
            });
        });

        it('should have a function to edit the current ACF', function () {
            expect(vm.editAcf).toBeDefined();
        });

        it('should call commonService.editAcf when one is edited', function () {
            vm.editAcf();
            expect(commonService.editAcf).toHaveBeenCalledWith(Mock.acfs[0]);
        });

        it('should turn off editing after editAcf is called', function () {
            vm.mode = 'edit';
            vm.editAcf();
            expect(vm.mode).toBe('view');
        });

        it('should set the local acf to the edited acf', function () {
            vm.editAcf();
            el.isolateScope().$digest();
            expect(vm.acf).toBe(Mock.acfs[1]);
        });

        it('should have a function to cancel editing', function () {
            expect(vm.cancelEditing).toBeDefined();
        });

        it('should call commonService.getUserAcf on cancel', function () {
            vm.cancelEditing();
            expect(commonService.getUserAcf).toHaveBeenCalled();
        });

        it('should have a function to submit the form on enter', function () {
            expect(vm.submitForm).toBeDefined();
        });

        it('should call the edit form function on enter if user has acf', function () {
            vm.queryForm.$invalid = false;
            vm.mode = 'edit';
            spyOn(vm, 'editAcf');
            vm.submitForm();
            expect(vm.editAcf).toHaveBeenCalled();
        });

        it('should call acfSubmit on enter if the user has no acf', function () {
            vm.queryForm.$invalid = false;
            commonService.hasAcf.and.returnValue(false);
            spyOn(vm, 'acfSubmit');
            vm.submitForm();
            el.isolateScope().$digest();
            expect(vm.acfSubmit).toHaveBeenCalled();
        });

        it('should not allow submitForm to be called if the form is invalid', function () {
            spyOn(vm, 'editAcf');
            vm.queryForm.$invalid = true;
            vm.mode = 'edit';
            vm.submitForm()
            expect(vm.editAcf).not.toHaveBeenCalled();
        });

        it('should remove empty lines from the address on "create"', function () {
            var tweakedAcf = angular.copy(mock.newAcf);
            vm.acf = angular.copy(mock.newAcf);
            vm.acf.address.lines.push('');
            vm.mode = 'enter';
            vm.acfSubmit();
            expect(commonService.createAcf).toHaveBeenCalledWith(tweakedAcf);
        });

        it('should not send an empty array of lines on "create"', function () {
            var tweakedAcf = angular.copy(mock.newAcf);
            tweakedAcf.address.lines = ['123 Main St'];
            delete tweakedAcf.address.lines
            vm.acf = angular.copy(mock.newAcf);
            vm.acf.address.lines.push('');
            vm.acf.address.lines[0] = '';
            vm.mode = 'enter';
            vm.acfSubmit();
            expect(commonService.createAcf).toHaveBeenCalledWith(tweakedAcf);
        });

        it('should redirect the user to /search on acf creation', function () {
            vm.acf = angular.copy(mock.newAcf);
            vm.mode = 'enter';
            spyOn($location, 'path');

            vm.acfSubmit();
            el.isolateScope().$digest();

            expect($location.path).toHaveBeenCalledWith('/search');
        });

        it('should redirect the user to /search on acf selection', function () {
            vm.selectAcf = vm.acfs[0];
            spyOn($location, 'path');

            vm.acfSubmit();
            el.isolateScope().$digest();

            expect($location.path).toHaveBeenCalledWith('/search');
        });

        it('should know what mode the user is in', function () {
            expect(vm.mode).toBe('select');
        });

        it('should switch to "enter" if there are no ACFs', function () {
            commonService.getAcfs.and.returnValue($q.when([]));
            $compile(el)($rootScope.$new());
            $rootScope.$digest();
            vm = el.isolateScope().vm;
            expect(vm.mode).toBe('enter');
        });

        it('should switch to "enter" if getAcfs fails', function () {
            commonService.getAcfs.and.returnValue($q.reject({}));
            $compile(el)($rootScope.$new());
            $rootScope.$digest();
            vm = el.isolateScope().vm;
            expect(vm.mode).toBe('enter');
        });

        it('should not switch to "enter" if mode is "display"', function () {
            el = angular.element('<ai-acf mode="display"></ai-acf>');
            commonService.getAcfs.and.returnValue($q.when([]));
            $compile(el)($rootScope.$new());
            $rootScope.$digest();
            vm = el.isolateScope().vm;
            expect(vm.mode).toBe('display');
            commonService.getAcfs.and.returnValue($q.reject({}));
            $compile(el)($rootScope.$new());
            $rootScope.$digest();
            vm = el.isolateScope().vm;
            expect(vm.mode).toBe('display');
        });

        it('should know if the entered new ACF identifier matches one that already exists', function () {
            vm.acf = angular.copy(mock.newAcf);
            expect(vm.validIdentifier()).toBe(true);
        });

        it('should know if the entered new ACF identifier matches one that already exists', function () {
            vm.acf = angular.copy(Mock.acfs[1]);
            expect(vm.validIdentifier()).toBe(false);
        });

        it('should split ACF identifiers into prefix/suffix if !acfWritesAllowed', function () {
            vm.acfWritesAllowed = false;
            vm.acfs = Mock.acfs;
            vm.splitAcfIdentifiers();
            expect(vm.acfPrefixes).toEqual(['Del Norte','Alameda','Los Angeles']);
            expect(vm.acfSuffixes).toEqual(['04','01','02']);
        });

        it('should not split ACF identifiers into prefix/suffix if acfWritesAllowed', function () {
            vm.acfWritesAllowed = true;
            vm.splitAcfIdentifiers();
            expect(vm.acfPrefixes).toBeUndefined();
            expect(vm.acfSuffixes).toBeUndefined();
        });

        it('should compose an ACF if !acfWritesAllowed', function () {
            vm.acfWritesAllowed = false;
            vm.acfs = Mock.acfs;
            vm.selectAcfPrefix = 'Alameda';
            vm.selectAcfSuffix = '01';
            vm.findAcf();
            expect(vm.selectAcf).toEqual(Mock.acfs[1]);
        });

        it('should not compose an ACF if acfWritesAllowed', function () {
            vm.findAcf();
            expect(vm.selectAcf).toBeUndefined();
        });

        it('should have a way to get the name of an ACF from the identifier', function () {
            expect(vm.getName(Mock.acfs[0].identifier)).toBe(Mock.acfs[0].name);
        });

        it('should return "" is the identifier is invalid', function () {
            expect(vm.getName('fake ID')).toBe('');
        });
    });
})();
