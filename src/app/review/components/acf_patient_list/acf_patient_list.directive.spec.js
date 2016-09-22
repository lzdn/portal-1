(function() {
    'use strict';

    describe('review.aiAcfPatientList', function() {
        var vm, el, scope, $log, $timeout, $q, commonService, mock;
        mock = {
            patients: [{id:3,orgPatientId:null,givenName:"John",familyName:"Doe",dateOfBirth:null,gender:"M",phoneNumber:null,
                        address:{id:null,street1:null,street2:null,city:null,state:null,zipcode:null,country:null},
                        ssn:"451674563",lastRead:1471014744607,
                        acf:{id:4,name:"Fake",phoneNumber:null,address:null,lastRead:null},
                        orgMaps:[
                            {id:6,patientId:3,organization:{name:"OrganizationThreeUpdatedName",id:1,organizationId:4,adapter:"eHealth",ipAddress:"127.0.0.14",username:"org1User",password:"password1",certificationKey:null,endpointUrl:"http://localhost:9080/mock/ehealthexchange",active:true},documentsQueryStatus:"COMPLETE",documentsQuerySuccess:true,documentsQueryStart:1471014744718,documentsQueryEnd:1471014744880,
                             documents:[{id:"8",name:"VCN CCDA.xml",orgMapId:6,patient:null},{id:"7",name:"VCN CCDA.xml",orgMapId:6,patient:null},{id:"5",name:"VCN CCDA.xml",orgMapId:6,patient:null},{id:"6",name:"VCN CCDA.xml",orgMapId:6,patient:null}]},
                            {id:5,patientId:3,organization:{name:"IHE Org",id:2,organizationId:2,adapter:"IHE",ipAddress:"127.0.0.1",username:null,password:null,certificationKey:"1234567",endpointUrl:"http://localhost:9080/mock/ihe",active:true},documentsQueryStatus:"COMPLETE",documentsQuerySuccess:true,documentsQueryStart:1471014744707,documentsQueryEnd:1471014744753,
                             documents:[{id:"8",name:"VCN CCDA.xml",cached:true,orgMapId:6,patient:null}]},
                            {id:4,patientId:3,organization:{name:"IHE Org 2",id:3,organizationId:3,adapter:"eHealth",ipAddress:"127.0.0.1",username:"org3User",password:"password3",certificationKey:null,endpointUrl:"http://localhost:9080/mock/ihe",active:true},documentsQueryStatus:"ACTIVE",documentsQuerySuccess:null,documentsQueryStart:1471014744634,documentsQueryEnd:null,
                             documents:[]}]}


            ],
            fakeDocument: {data: "<document><made><of>XML</of></made></document"},
            userAcf: 'ACF Number 1'
        };

        beforeEach(function () {
            module('portal', function ($provide) {
                $provide.decorator('commonService', function ($delegate) {
                    $delegate.cacheDocument = jasmine.createSpy('cacheDocument');
                    $delegate.dischargePatient = jasmine.createSpy('dischargePatient');
                    $delegate.getDocument = jasmine.createSpy('getDocument');
                    $delegate.getPatientsAtAcf = jasmine.createSpy('getPatientsAtAcf');
                    $delegate.getUserAcf = jasmine.createSpy('getUserAcf');
                    return $delegate;
                });
            });
            inject(function($compile, $rootScope, _$log_, _$timeout_, _$q_, _commonService_) {
                $log = _$log_;
                $timeout = _$timeout_;
                $q = _$q_;
                commonService = _commonService_;
                commonService.cacheDocument.and.returnValue($q.when({data: ''}));
                commonService.dischargePatient.and.returnValue($q.when({}));
                commonService.getDocument.and.returnValue($q.when(angular.copy(mock.fakeDocument)));
                commonService.getPatientsAtAcf.and.returnValue($q.when(angular.copy(mock.patients)));
                commonService.getUserAcf.and.returnValue($q.when(mock.userAcf));

                el = angular.element('<ai-acf-patient-list></ai-acf-patient-list>');

                scope = $rootScope.$new();
                $compile(el)(scope);
                scope.$digest();
                vm = el.isolateScope().vm;
                scope.vm = vm;
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
            expect(vm.patients.length).toBe(1);
        });

        it('should have a way to cache a document', function () {
            expect(vm.patients[0].orgMaps[0].documents[0].cached).toBeUndefined();
            expect(vm.cacheDocument).toBeDefined();

            vm.cacheDocument(vm.patients[0], vm.patients[0].orgMaps[0].documents[0]);
            el.isolateScope().$digest();

            expect(commonService.cacheDocument).toHaveBeenCalledWith(3, '8');
            expect(vm.patients[0].orgMaps[0].documents[0].cached).toBe(true);
        });

        it('should have a way to get a document', function () {
            var patient = vm.patients[0];
            vm.cacheDocument(patient, patient.orgMaps[0].documents[0]);
            el.isolateScope().$digest();

            vm.getDocument(patient, patient.orgMaps[0].documents[0]);
            el.isolateScope().$digest();

            expect(commonService.getDocument).toHaveBeenCalledWith(3, '8');
            expect(vm.activeDocument).toEqual(patient.orgMaps[0].documents[0]);
        });

        it('should not re-call the service if the document is already cached', function () {
            var patient = vm.patients[0];
            vm.getDocument(patient, patient.orgMaps[0].documents[0]);
            el.isolateScope().$digest();

            vm.getDocument(patient, patient.orgMaps[0].documents[0]);
            el.isolateScope().$digest();
            expect(commonService.getDocument.calls.count()).toBe(1);
        });

        it('should have a way to discharge patients', function () {
            // given a patient in the queue
            expect(vm.patients.length).toBe(1);

            commonService.getPatientsAtAcf.and.returnValue($q.when([]));
            // when first result is cleared
            vm.dischargePatient(vm.patients[0]);
            el.isolateScope().$digest();

            // then expect to have one less patient in the queue
            expect(vm.patients.length).toBe(0);
        });

        it('should call commonService.dischargePatient on discharge', function () {
            vm.dischargePatient(vm.patients[0]);
            expect(commonService.dischargePatient).toHaveBeenCalledWith(3);
        });

        it('should not try to clear an out of bounds query', function () {
            var patientQueueLength = vm.patients.length;
            vm.dischargePatient(patientQueueLength + 1);
            expect(vm.patients.length).toBe(patientQueueLength);
        });

        it('should know the user\'s ACF', function () {
            expect(vm.getUserAcf).toBeDefined();
            vm.getUserAcf().then(function (response) {
                expect(response).toEqual(mock.userAcf);
            });
        });

        it('should have a function to get patients', function () {
            expect(vm.getPatientsAtAcf).toBeDefined();
            vm.getPatientsAtAcf();
            expect(commonService.getPatientsAtAcf).toHaveBeenCalled();
        });

        it('should call "getPatientsAtAcf" on load', function () {
            expect(commonService.getPatientsAtAcf).toHaveBeenCalled();
        });

        it('should know if a patient\'s documents are cached', function () {
            var patient = vm.patients[0];
            expect(patient.documentStatus).toEqual({total: 5, cached: 1});
        });

        it('should know how many documents a patient has', function () {
            var patient = vm.patients[0];
            vm.cacheDocument(patient, patient.orgMaps[0].documents[0]);
            el.isolateScope().$digest();
            expect(patient.documentStatus).toEqual({total: 5, cached: 2});
        });

        it('should know how many document queries are active', function () {
            expect(vm.countActive).toBeDefined();
            expect(vm.countActive(vm.patients[0])).toBe(1);
            vm.patients[0].orgMaps[2].documentsQueryStatus = 'COMPLETE';
            expect(vm.countActive(vm.patients[0])).toBe(0);
        });

        describe('refreshing', function () {

            beforeEach(function () {
                //activeProducts = angular.copy(mock.queries);
                //activeProducts[0].status = 'ACTIVE';
            });

            it('should refresh the queries if there is one marked "ACTIVE"', function () {
                expect(commonService.getPatientsAtAcf.calls.count()).toBe(1);
                $timeout.flush();
                expect(commonService.getPatientsAtAcf.calls.count()).toBe(2);
            });

            it('should stop refreshing the queries if all are marked "COMPLETE"', function () {
                expect(commonService.getPatientsAtAcf.calls.count()).toBe(1);
                $timeout.flush();
                expect(commonService.getPatientsAtAcf.calls.count()).toBe(2);
                $timeout.flush();
                expect(commonService.getPatientsAtAcf.calls.count()).toBe(3);
                $timeout.flush();
                expect(commonService.getPatientsAtAcf.calls.count()).toBe(4);
                $timeout.flush();
                expect(commonService.getPatientsAtAcf.calls.count()).toBe(5);

                var completePatients = angular.copy(vm.patients);
                completePatients[0].orgMaps[2].documentsQueryStatus = 'COMPLETE';
                commonService.getPatientsAtAcf.and.returnValue($q.when(completePatients));
                $timeout.flush();
                expect(commonService.getPatientsAtAcf.calls.count()).toBe(6);
                $timeout.flush();
                expect(commonService.getPatientsAtAcf.calls.count()).toBe(6);
            });
        });
    });
})();