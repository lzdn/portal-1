(function () {
    'use strict';

    angular
        .module('pulse.mock', [])
        .service('Mock', mock);

    function  mock () {
        var mock = {};

        mock.acfs = [{"id":179,"identifier":"Del Norte-04","name":"Elementary School","phoneNumber":"555-3258","address":{"id":null,"lines":["266 Seventh Way","475 View Gln"],"city":"Smith River","state":"CA","zipcode":"95543","country":null},"lastRead":1487616916883},
                     {"id":1,"identifier":"Alameda-01","name":"Fairgrounds","phoneNumber":"555-1895","address":{"id":null,"lines":["395 Sunset Pky","133 Smith Gardn"],"city":"Albany","state":"CA","zipcode":"94602","country":null},"lastRead":1487616087349},
                     {"id":452,"identifier":"Los Angeles-02","name":"Elementary School","phoneNumber":"555-3007","address":{"id":null,"lines":["887 Park Bridge","925 Center Strt"],"city":"Lancaster","state":"CA","zipcode":"91040","country":null},"lastRead":1487616087349},
                     {"id":1450,"identifier":"Del Norte-02","name":"Fairgrounds","phoneNumber":"555-4451","address":{"id":null,"lines":["584 9th Ally","789 Fourteenth Radial"],"city":"Plumas Lake","state":"CA","zipcode":"95961","country":null},"lastRead":1487616087349}];
        mock.fakeModal = {
            result: {
                then: function (confirmCallback, cancelCallback) {
                    this.confirmCallBack = confirmCallback;
                    this.cancelCallback = cancelCallback;
                }},
            close: function (item) { this.result.confirmCallBack(item); },
            dismiss: function (type) { this.result.cancelCallback(type); }
        };
        mock.fakeModalOptions = {
            controllerAs: 'vm',
            animation: false,
            backdrop: 'static',
            keyboard: false,
            size: 'lg',
            resolve: {
                query: jasmine.any(Function)
            }
        };
        mock.modalInstance = {
            close: jasmine.createSpy('close'),
            dismiss: jasmine.createSpy('dismiss')
        };
        mock.queries = [{"id":4,"userToken":"username","status":"Active","terms":{"dob":"13130101","ssn":null,"gender":"F","zip":null,"telephone":null,"addresses":[{"lines":[],"city":null,"state":null,"zipcode":null}],"patientNames":[{"id":null,"suffix":null,"prefix":null,"profSuffix":null,"nameType":{"id":null,"code":"L","description":"Legal Name"},"nameRepresentation":null,"nameAssembly":null,"effectiveDate":null,"expirationDate":null,"familyName":"ldskjf","givenName":["asdf"]}]},"lastRead":1489779216545,
                         "endpointStatuses":[{"id":10,"queryId":4,"endpoint":{"id":1,"externalId":"1","endpointType":{"id":1,"name":"Patient Discovery","code":"nwhin-xcpd"},"endpointStatus":{"id":1,"name":"Active"},"adapter":"eHealthExchange","mimeTypes":[{"id":109,"mimeType":"application/xml"}],"payloadType":"HL7 CCD Document","publicKey":"MIIDxDCCAqygAwIBAgIBAjANBgkqhkiG9w0BAQsFADB7MQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTE/MD0GA1UECgw2Q2FsaWZvcm5pYSBBc3NvY2lhdGlvbiBvZiBIZWFsdGggSW5mb3JtYXRpb24gRXhjaGFuZ2VzMRYwFAYDVQQDDA1GaWN0aXRpb3VzIENBMB4XDTE2MTEwNzE1NDAzOVoXDTE4MTEwNzE1NDAzOVowUzELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExGjAYBgNVBAoMEUthaXNlciBQZXJtYW5lbnRlMRMwEQYDVQQDDAplaHgua3Aub3JnMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4zh+5F1uN2EK9VCUTGyJYfvAZ2I5Bq5qCntftsks5jR+RIe1WVukVUpjFIFr8QdtmdTI5Wmpgndbh+Pj8E3yHvdXTxosfWtCbxdrAAFfvjQ0PZzVpFHEYP/rCAy0/1lHDEdrNC9C3NNdM6GECdtITuCq7qsK5LJgopITcuvOZYXAOlqMLzXpJ8xsEueoTxIQFhY7SPt5Nl2rprSMJuoltF3ARZ+qU3fmiM4vPrSAJzcUjehu60LMUilwKwS6DEbYai2uJXjavsrWkg3TOcSGPwTD3IoOPjPo/z2QZ41zkD/uVDe1w+UtyjWqQaFaOfNByl0rfWDUhpZarqvEoYG1xwIDAQABo3sweTAJBgNVHRMEAjAAMCwGCWCGSAGG+EIBDQQfFh1PcGVuU1NMIEdlbmVyYXRlZCBDZXJ0aWZpY2F0ZTAdBgNVHQ4EFgQUmkEG1ij7vvcTpF3//Q0IcWyfoXAwHwYDVR0jBBgwFoAUhLxiknJV2lU6HddLzPbXXqzKMT4wDQYJKoZIhvcNAQELBQADggEBAFgMqoBuWBQcHCFrDgyqceQdD9FXzbAIAxHwox6dpd1G4R5/bencf9YlALv9yOJNWz93GJ2fAtimGCICYYek1GmnK6dJ2BvBndygP8qE1Bbvv5/5yfxkm54TMR5mQrllZbPq8HFAJKnipP4PkThjjVWrttgKlklQjdjvEFkfuFth+DKkUZalgQ9WMN6nUxNCeTTOtmsWZqp0GDQQfxmhuk4/7lE33F6OkY9zQTT49UJbtITeSsvr9fzV449wjcR91MyX3zkybDe+Qlih0eR+FJDSJn5XjjSFkNOLgwb25R7U2wfFkVd69N/VW+Bvj6QsW+kg7mUdvOreIX7w1XwzmFo=","url":"https://localhost:9080/patientDiscovery","externalLastUpdateDate":1481152502000,"locations":[{"id":1,"externalId":"1","status":{"id":1,"name":"Active"},"parentOrgName":"John Muir Health Foundation","name":"John Muir Medical Center","description":"Concord-based hospital facility within the John Muir Health healthcare provider organization","type":"Hospital","address":{"id":null,"lines":["2540 East St"],"city":"Concord","state":"CA","zipcode":"94520","country":null},"externalLastUpdateDate":1481559487000,"creationDate":1489773263730,"lastModifiedDate":1489773263730,"endpoints":[]},{"id":2,"externalId":"2","status":{"id":1,"name":"Active"},"parentOrgName":"John Muir Health Foundation","name":"John Muir Medical Center (Walnut Creek)","description":"Primary Walnut Creek-based hospital facility within the John Muir Health healthcare provider organization","type":"Hospital","address":{"id":null,"lines":["1601 Ygnacio Valley Rd"],"city":"Walnut Creek","state":"CA","zipcode":"94598","country":null},"externalLastUpdateDate":1481559508000,"creationDate":1489773263730,"lastModifiedDate":1489773263730,"endpoints":[]}],"creationDate":1489773264061,"lastModifiedDate":1489773264061},
                                              "status":"Active","startDate":1489779216548,"endDate":null,"results":[]},
                                             {"id":11,"queryId":4,"endpoint":{"id":5,"externalId":"5","endpointType":{"id":1,"name":"Patient Discovery","code":"nwhin-xcpd"},"endpointStatus":{"id":1,"name":"Active"},"adapter":"eHealthExchange","mimeTypes":[{"id":113,"mimeType":"application/xml"}],"payloadType":"HL7 CCD Document","publicKey":"MIIDxDCCAqygAwIBAgIBAjANBgkqhkiG9w0BAQsFADB7MQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTE/MD0GA1UECgw2Q2FsaWZvcm5pYSBBc3NvY2lhdGlvbiBvZiBIZWFsdGggSW5mb3JtYXRpb24gRXhjaGFuZ2VzMRYwFAYDVQQDDA1GaWN0aXRpb3VzIENBMB4XDTE2MTEwNzE1NDAzOVoXDTE4MTEwNzE1NDAzOVowUzELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExGjAYBgNVBAoMEUthaXNlciBQZXJtYW5lbnRlMRMwEQYDVQQDDAplaHgua3Aub3JnMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4zh+5F1uN2EK9VCUTGyJYfvAZ2I5Bq5qCntftsks5jR+RIe1WVukVUpjFIFr8QdtmdTI5Wmpgndbh+Pj8E3yHvdXTxosfWtCbxdrAAFfvjQ0PZzVpFHEYP/rCAy0/1lHDEdrNC9C3NNdM6GECdtITuCq7qsK5LJgopITcuvOZYXAOlqMLzXpJ8xsEueoTxIQFhY7SPt5Nl2rprSMJuoltF3ARZ+qU3fmiM4vPrSAJzcUjehu60LMUilwKwS6DEbYai2uJXjavsrWkg3TOcSGPwTD3IoOPjPo/z2QZ41zkD/uVDe1w+UtyjWqQaFaOfNByl0rfWDUhpZarqvEoYG1xwIDAQABo3sweTAJBgNVHRMEAjAAMCwGCWCGSAGG+EIBDQQfFh1PcGVuU1NMIEdlbmVyYXRlZCBDZXJ0aWZpY2F0ZTAdBgNVHQ4EFgQUmkEG1ij7vvcTpF3//Q0IcWyfoXAwHwYDVR0jBBgwFoAUhLxiknJV2lU6HddLzPbXXqzKMT4wDQYJKoZIhvcNAQELBQADggEBAFgMqoBuWBQcHCFrDgyqceQdD9FXzbAIAxHwox6dpd1G4R5/bencf9YlALv9yOJNWz93GJ2fAtimGCICYYek1GmnK6dJ2BvBndygP8qE1Bbvv5/5yfxkm54TMR5mQrllZbPq8HFAJKnipP4PkThjjVWrttgKlklQjdjvEFkfuFth+DKkUZalgQ9WMN6nUxNCeTTOtmsWZqp0GDQQfxmhuk4/7lE33F6OkY9zQTT49UJbtITeSsvr9fzV449wjcR91MyX3zkybDe+Qlih0eR+FJDSJn5XjjSFkNOLgwb25R7U2wfFkVd69N/VW+Bvj6QsW+kg7mUdvOreIX7w1XwzmFo=","url":"https://localhost:9080/patientDiscovery","externalLastUpdateDate":1481152502000,"locations":[{"id":3,"externalId":"14","status":{"id":1,"name":"Active"},"parentOrgName":"Contra Costa Health Services","name":"Contra Costa Regional Medical Center","description":"Primary hospital facility within the Contra Costa County healthcare provider organization","type":"Hospital","address":{"id":null,"lines":["2500 Alhambra Ave"],"city":"Martinez","state":"CA","zipcode":"94553","country":null},"externalLastUpdateDate":1481560585000,"creationDate":1489773263730,"lastModifiedDate":1489773263730,"endpoints":[]}],"creationDate":1489773264061,"lastModifiedDate":1489773264061},
                                              "status":"Active","startDate":1489779216552,"endDate":null,"results":[]},
                                             {"id":12,"queryId":4,"endpoint":{"id":7,"externalId":"7","endpointType":{"id":1,"name":"Patient Discovery","code":"nwhin-xcpd"},"endpointStatus":{"id":1,"name":"Active"},"adapter":"eHealthExchange","mimeTypes":[{"id":115,"mimeType":"application/xml"}],"payloadType":"HL7 CCD Document","publicKey":"MIIDxDCCAqygAwIBAgIBAjANBgkqhkiG9w0BAQsFADB7MQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTE/MD0GA1UECgw2Q2FsaWZvcm5pYSBBc3NvY2lhdGlvbiBvZiBIZWFsdGggSW5mb3JtYXRpb24gRXhjaGFuZ2VzMRYwFAYDVQQDDA1GaWN0aXRpb3VzIENBMB4XDTE2MTEwNzE1NDAzOVoXDTE4MTEwNzE1NDAzOVowUzELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExGjAYBgNVBAoMEUthaXNlciBQZXJtYW5lbnRlMRMwEQYDVQQDDAplaHgua3Aub3JnMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4zh+5F1uN2EK9VCUTGyJYfvAZ2I5Bq5qCntftsks5jR+RIe1WVukVUpjFIFr8QdtmdTI5Wmpgndbh+Pj8E3yHvdXTxosfWtCbxdrAAFfvjQ0PZzVpFHEYP/rCAy0/1lHDEdrNC9C3NNdM6GECdtITuCq7qsK5LJgopITcuvOZYXAOlqMLzXpJ8xsEueoTxIQFhY7SPt5Nl2rprSMJuoltF3ARZ+qU3fmiM4vPrSAJzcUjehu60LMUilwKwS6DEbYai2uJXjavsrWkg3TOcSGPwTD3IoOPjPo/z2QZ41zkD/uVDe1w+UtyjWqQaFaOfNByl0rfWDUhpZarqvEoYG1xwIDAQABo3sweTAJBgNVHRMEAjAAMCwGCWCGSAGG+EIBDQQfFh1PcGVuU1NMIEdlbmVyYXRlZCBDZXJ0aWZpY2F0ZTAdBgNVHQ4EFgQUmkEG1ij7vvcTpF3//Q0IcWyfoXAwHwYDVR0jBBgwFoAUhLxiknJV2lU6HddLzPbXXqzKMT4wDQYJKoZIhvcNAQELBQADggEBAFgMqoBuWBQcHCFrDgyqceQdD9FXzbAIAxHwox6dpd1G4R5/bencf9YlALv9yOJNWz93GJ2fAtimGCICYYek1GmnK6dJ2BvBndygP8qE1Bbvv5/5yfxkm54TMR5mQrllZbPq8HFAJKnipP4PkThjjVWrttgKlklQjdjvEFkfuFth+DKkUZalgQ9WMN6nUxNCeTTOtmsWZqp0GDQQfxmhuk4/7lE33F6OkY9zQTT49UJbtITeSsvr9fzV449wjcR91MyX3zkybDe+Qlih0eR+FJDSJn5XjjSFkNOLgwb25R7U2wfFkVd69N/VW+Bvj6QsW+kg7mUdvOreIX7w1XwzmFo=","url":"https://localhost:9080/patientDiscovery","externalLastUpdateDate":1481152502000,"locations":[{"id":4,"externalId":"15","status":{"id":1,"name":"Active"},"parentOrgName":"San Ramon Regional Medical Center","name":"San Ramon Regional Medical Center","description":"Primary hospital facility within the San Ramon Regional Medical Center healthcare provider organization, partnered with John Muir Health","type":"Hospital","address":{"id":null,"lines":["6001 Norris Canyon Rd"],"city":"San Ramon","state":"CA","zipcode":"94583","country":null},"externalLastUpdateDate":1481560594000,"creationDate":1489773263730,"lastModifiedDate":1489773263730,"endpoints":[]}],"creationDate":1489773264061,"lastModifiedDate":1489773264061},
                                              "status":"Active","startDate":1489779216555,"endDate":null,"results":[]}]},
                        {"id":1,"userToken":"username","status":"Complete","terms":{"dob":"19910405","ssn":"123-12-1234","gender":"M","zip":null,"telephone":"122-131-2131","addresses":[{"lines":["123 Main St"],"city":"Sacramento","state":"CA","zipcode":"29292"}],"patientNames":[{"id":null,"suffix":null,"prefix":null,"profSuffix":null,"nameType":{"id":null,"code":"L","description":"Legal Name"},"nameRepresentation":null,"nameAssembly":null,"effectiveDate":null,"expirationDate":null,"familyName":"Jones","givenName":["Bob"]}]},"lastRead":1489773793563,
                         "endpointStatuses":[{"id":2,"queryId":1,"endpoint":{"id":1,"externalId":"1","endpointType":{"id":1,"name":"Patient Discovery","code":"nwhin-xcpd"},"endpointStatus":{"id":1,"name":"Active"},"adapter":"eHealthExchange","mimeTypes":[{"id":109,"mimeType":"application/xml"}],"payloadType":"HL7 CCD Document","publicKey":"MIIDxDCCAqygAwIBAgIBAjANBgkqhkiG9w0BAQsFADB7MQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTE/MD0GA1UECgw2Q2FsaWZvcm5pYSBBc3NvY2lhdGlvbiBvZiBIZWFsdGggSW5mb3JtYXRpb24gRXhjaGFuZ2VzMRYwFAYDVQQDDA1GaWN0aXRpb3VzIENBMB4XDTE2MTEwNzE1NDAzOVoXDTE4MTEwNzE1NDAzOVowUzELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExGjAYBgNVBAoMEUthaXNlciBQZXJtYW5lbnRlMRMwEQYDVQQDDAplaHgua3Aub3JnMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4zh+5F1uN2EK9VCUTGyJYfvAZ2I5Bq5qCntftsks5jR+RIe1WVukVUpjFIFr8QdtmdTI5Wmpgndbh+Pj8E3yHvdXTxosfWtCbxdrAAFfvjQ0PZzVpFHEYP/rCAy0/1lHDEdrNC9C3NNdM6GECdtITuCq7qsK5LJgopITcuvOZYXAOlqMLzXpJ8xsEueoTxIQFhY7SPt5Nl2rprSMJuoltF3ARZ+qU3fmiM4vPrSAJzcUjehu60LMUilwKwS6DEbYai2uJXjavsrWkg3TOcSGPwTD3IoOPjPo/z2QZ41zkD/uVDe1w+UtyjWqQaFaOfNByl0rfWDUhpZarqvEoYG1xwIDAQABo3sweTAJBgNVHRMEAjAAMCwGCWCGSAGG+EIBDQQfFh1PcGVuU1NMIEdlbmVyYXRlZCBDZXJ0aWZpY2F0ZTAdBgNVHQ4EFgQUmkEG1ij7vvcTpF3//Q0IcWyfoXAwHwYDVR0jBBgwFoAUhLxiknJV2lU6HddLzPbXXqzKMT4wDQYJKoZIhvcNAQELBQADggEBAFgMqoBuWBQcHCFrDgyqceQdD9FXzbAIAxHwox6dpd1G4R5/bencf9YlALv9yOJNWz93GJ2fAtimGCICYYek1GmnK6dJ2BvBndygP8qE1Bbvv5/5yfxkm54TMR5mQrllZbPq8HFAJKnipP4PkThjjVWrttgKlklQjdjvEFkfuFth+DKkUZalgQ9WMN6nUxNCeTTOtmsWZqp0GDQQfxmhuk4/7lE33F6OkY9zQTT49UJbtITeSsvr9fzV449wjcR91MyX3zkybDe+Qlih0eR+FJDSJn5XjjSFkNOLgwb25R7U2wfFkVd69N/VW+Bvj6QsW+kg7mUdvOreIX7w1XwzmFo=","url":"https://localhost:9080/patientDiscovery","externalLastUpdateDate":1481152502000,"locations":[{"id":1,"externalId":"1","status":{"id":1,"name":"Active"},"parentOrgName":"John Muir Health Foundation","name":"John Muir Medical Center","description":"Concord-based hospital facility within the John Muir Health healthcare provider organization","type":"Hospital","address":{"id":null,"lines":["2540 East St"],"city":"Concord","state":"CA","zipcode":"94520","country":null},"externalLastUpdateDate":1481559487000,"creationDate":1489773263730,"lastModifiedDate":1489773263730,"endpoints":[]},{"id":2,"externalId":"2","status":{"id":1,"name":"Active"},"parentOrgName":"John Muir Health Foundation","name":"John Muir Medical Center (Walnut Creek)","description":"Primary Walnut Creek-based hospital facility within the John Muir Health healthcare provider organization","type":"Hospital","address":{"id":null,"lines":["1601 Ygnacio Valley Rd"],"city":"Walnut Creek","state":"CA","zipcode":"94598","country":null},"externalLastUpdateDate":1481559508000,"creationDate":1489773263730,"lastModifiedDate":1489773263730,"endpoints":[]}],"creationDate":1489773264061,"lastModifiedDate":1489773264061},
                                              "status":"Cancelled","startDate":1489773728851,"endDate":1489773792296,"results":[]},
                                             {"id":1,"queryId":1,"endpoint":{"id":7,"externalId":"7","endpointType":{"id":1,"name":"Patient Discovery","code":"nwhin-xcpd"},"endpointStatus":{"id":1,"name":"Active"},"adapter":"eHealthExchange","mimeTypes":[{"id":115,"mimeType":"application/xml"}],"payloadType":"HL7 CCD Document","publicKey":"MIIDxDCCAqygAwIBAgIBAjANBgkqhkiG9w0BAQsFADB7MQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTE/MD0GA1UECgw2Q2FsaWZvcm5pYSBBc3NvY2lhdGlvbiBvZiBIZWFsdGggSW5mb3JtYXRpb24gRXhjaGFuZ2VzMRYwFAYDVQQDDA1GaWN0aXRpb3VzIENBMB4XDTE2MTEwNzE1NDAzOVoXDTE4MTEwNzE1NDAzOVowUzELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExGjAYBgNVBAoMEUthaXNlciBQZXJtYW5lbnRlMRMwEQYDVQQDDAplaHgua3Aub3JnMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4zh+5F1uN2EK9VCUTGyJYfvAZ2I5Bq5qCntftsks5jR+RIe1WVukVUpjFIFr8QdtmdTI5Wmpgndbh+Pj8E3yHvdXTxosfWtCbxdrAAFfvjQ0PZzVpFHEYP/rCAy0/1lHDEdrNC9C3NNdM6GECdtITuCq7qsK5LJgopITcuvOZYXAOlqMLzXpJ8xsEueoTxIQFhY7SPt5Nl2rprSMJuoltF3ARZ+qU3fmiM4vPrSAJzcUjehu60LMUilwKwS6DEbYai2uJXjavsrWkg3TOcSGPwTD3IoOPjPo/z2QZ41zkD/uVDe1w+UtyjWqQaFaOfNByl0rfWDUhpZarqvEoYG1xwIDAQABo3sweTAJBgNVHRMEAjAAMCwGCWCGSAGG+EIBDQQfFh1PcGVuU1NMIEdlbmVyYXRlZCBDZXJ0aWZpY2F0ZTAdBgNVHQ4EFgQUmkEG1ij7vvcTpF3//Q0IcWyfoXAwHwYDVR0jBBgwFoAUhLxiknJV2lU6HddLzPbXXqzKMT4wDQYJKoZIhvcNAQELBQADggEBAFgMqoBuWBQcHCFrDgyqceQdD9FXzbAIAxHwox6dpd1G4R5/bencf9YlALv9yOJNWz93GJ2fAtimGCICYYek1GmnK6dJ2BvBndygP8qE1Bbvv5/5yfxkm54TMR5mQrllZbPq8HFAJKnipP4PkThjjVWrttgKlklQjdjvEFkfuFth+DKkUZalgQ9WMN6nUxNCeTTOtmsWZqp0GDQQfxmhuk4/7lE33F6OkY9zQTT49UJbtITeSsvr9fzV449wjcR91MyX3zkybDe+Qlih0eR+FJDSJn5XjjSFkNOLgwb25R7U2wfFkVd69N/VW+Bvj6QsW+kg7mUdvOreIX7w1XwzmFo=","url":"https://localhost:9080/patientDiscovery","externalLastUpdateDate":1481152502000,"locations":[{"id":4,"externalId":"15","status":{"id":1,"name":"Active"},"parentOrgName":"San Ramon Regional Medical Center","name":"San Ramon Regional Medical Center","description":"Primary hospital facility within the San Ramon Regional Medical Center healthcare provider organization, partnered with John Muir Health","type":"Hospital","address":{"id":null,"lines":["6001 Norris Canyon Rd"],"city":"San Ramon","state":"CA","zipcode":"94583","country":null},"externalLastUpdateDate":1481560594000,"creationDate":1489773263730,"lastModifiedDate":1489773263730,"endpoints":[]}],"creationDate":1489773264061,"lastModifiedDate":1489773264061},
                                              "status":"Successful","startDate":1489773728851,"endDate":1489773793502,"results":[{"id":1,"patientRecordName":[{"id":null,"givenName":["James","Bob"],"suffix":null,"prefix":null,"profSuffix":null,"nameType":{"id":1,"code":"A","description":"Alias Name"},"nameRepresentation":{"id":1,"code":"A","description":"Alias Name"},"nameAssembly":{"id":1,"code":"A","description":"Alias Name"},"effectiveDate":null,"expirationDate":null,"familyName":"Jones-Smith"}],"locationPatientRecordId":null,"dateOfBirth":"19910405","gender":{"code":"M","description":"Male"},"phoneNumber":"tel:+1-122-131-2131","address":[{"id":null,"lines":["123 Main St"],"city":"Sacramento","state":"CA","zipcode":"29292","country":null}],"ssn":"123-12-1234"}]},
                                             {"id":3,"queryId":1,"endpoint":{"id":5,"externalId":"5","endpointType":{"id":1,"name":"Patient Discovery","code":"nwhin-xcpd"},"endpointStatus":{"id":1,"name":"Active"},"adapter":"eHealthExchange","mimeTypes":[{"id":113,"mimeType":"application/xml"}],"payloadType":"HL7 CCD Document","publicKey":"MIIDxDCCAqygAwIBAgIBAjANBgkqhkiG9w0BAQsFADB7MQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTE/MD0GA1UECgw2Q2FsaWZvcm5pYSBBc3NvY2lhdGlvbiBvZiBIZWFsdGggSW5mb3JtYXRpb24gRXhjaGFuZ2VzMRYwFAYDVQQDDA1GaWN0aXRpb3VzIENBMB4XDTE2MTEwNzE1NDAzOVoXDTE4MTEwNzE1NDAzOVowUzELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExGjAYBgNVBAoMEUthaXNlciBQZXJtYW5lbnRlMRMwEQYDVQQDDAplaHgua3Aub3JnMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4zh+5F1uN2EK9VCUTGyJYfvAZ2I5Bq5qCntftsks5jR+RIe1WVukVUpjFIFr8QdtmdTI5Wmpgndbh+Pj8E3yHvdXTxosfWtCbxdrAAFfvjQ0PZzVpFHEYP/rCAy0/1lHDEdrNC9C3NNdM6GECdtITuCq7qsK5LJgopITcuvOZYXAOlqMLzXpJ8xsEueoTxIQFhY7SPt5Nl2rprSMJuoltF3ARZ+qU3fmiM4vPrSAJzcUjehu60LMUilwKwS6DEbYai2uJXjavsrWkg3TOcSGPwTD3IoOPjPo/z2QZ41zkD/uVDe1w+UtyjWqQaFaOfNByl0rfWDUhpZarqvEoYG1xwIDAQABo3sweTAJBgNVHRMEAjAAMCwGCWCGSAGG+EIBDQQfFh1PcGVuU1NMIEdlbmVyYXRlZCBDZXJ0aWZpY2F0ZTAdBgNVHQ4EFgQUmkEG1ij7vvcTpF3//Q0IcWyfoXAwHwYDVR0jBBgwFoAUhLxiknJV2lU6HddLzPbXXqzKMT4wDQYJKoZIhvcNAQELBQADggEBAFgMqoBuWBQcHCFrDgyqceQdD9FXzbAIAxHwox6dpd1G4R5/bencf9YlALv9yOJNWz93GJ2fAtimGCICYYek1GmnK6dJ2BvBndygP8qE1Bbvv5/5yfxkm54TMR5mQrllZbPq8HFAJKnipP4PkThjjVWrttgKlklQjdjvEFkfuFth+DKkUZalgQ9WMN6nUxNCeTTOtmsWZqp0GDQQfxmhuk4/7lE33F6OkY9zQTT49UJbtITeSsvr9fzV449wjcR91MyX3zkybDe+Qlih0eR+FJDSJn5XjjSFkNOLgwb25R7U2wfFkVd69N/VW+Bvj6QsW+kg7mUdvOreIX7w1XwzmFo=","url":"https://localhost:9080/patientDiscovery","externalLastUpdateDate":1481152502000,"locations":[{"id":3,"externalId":"14","status":{"id":1,"name":"Active"},"parentOrgName":"Contra Costa Health Services","name":"Contra Costa Regional Medical Center","description":"Primary hospital facility within the Contra Costa County healthcare provider organization","type":"Hospital","address":{"id":null,"lines":["2500 Alhambra Ave"],"city":"Martinez","state":"CA","zipcode":"94553","country":null},"externalLastUpdateDate":1481560585000,"creationDate":1489773263730,"lastModifiedDate":1489773263730,"endpoints":[]}],"creationDate":1489773264061,"lastModifiedDate":1489773264061},
                                              "status":"Successful","startDate":1489773728866,"endDate":1489773793421,"results":[{"id":2,"patientRecordName":[{"id":null,"givenName":["Bob","James"],"suffix":null,"prefix":null,"profSuffix":null,"nameType":{"id":2,"code":"B","description":"Name at Birth"},"nameRepresentation":{"id":2,"code":"B","description":"Name at Birth"},"nameAssembly":{"id":2,"code":"B","description":"Name at Birth"},"effectiveDate":null,"expirationDate":null,"familyName":"Jones-Smith"}],"locationPatientRecordId":null,"dateOfBirth":"19910405","gender":{"code":"M","description":"Male"},"phoneNumber":"tel:+1-122-131-2131","address":[{"id":null,"lines":["123 Main St"],"city":"Sacramento","state":"CA","zipcode":"29292","country":null}],"ssn":"123-12-1234"}]}]},
                        {"id":2,"userToken":"username","status":"Complete","terms":{"dob":"32320101","ssn":null,"gender":"F","zip":null,"telephone":null,"addresses":[{"lines":[],"city":null,"state":null,"zipcode":null}],"patientNames":[{"id":null,"suffix":null,"prefix":null,"profSuffix":null,"nameType":{"id":null,"code":"L","description":"Legal Name"},"nameRepresentation":null,"nameAssembly":null,"effectiveDate":null,"expirationDate":null,"familyName":"ldksj","givenName":["asdf"]}]},"lastRead":1489776357836,
                         "endpointStatuses":[{"id":6,"queryId":2,"endpoint":{"id":7,"externalId":"7","endpointType":{"id":1,"name":"Patient Discovery","code":"nwhin-xcpd"},"endpointStatus":{"id":1,"name":"Active"},"adapter":"eHealthExchange","mimeTypes":[{"id":115,"mimeType":"application/xml"}],"payloadType":"HL7 CCD Document","publicKey":"MIIDxDCCAqygAwIBAgIBAjANBgkqhkiG9w0BAQsFADB7MQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTE/MD0GA1UECgw2Q2FsaWZvcm5pYSBBc3NvY2lhdGlvbiBvZiBIZWFsdGggSW5mb3JtYXRpb24gRXhjaGFuZ2VzMRYwFAYDVQQDDA1GaWN0aXRpb3VzIENBMB4XDTE2MTEwNzE1NDAzOVoXDTE4MTEwNzE1NDAzOVowUzELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExGjAYBgNVBAoMEUthaXNlciBQZXJtYW5lbnRlMRMwEQYDVQQDDAplaHgua3Aub3JnMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4zh+5F1uN2EK9VCUTGyJYfvAZ2I5Bq5qCntftsks5jR+RIe1WVukVUpjFIFr8QdtmdTI5Wmpgndbh+Pj8E3yHvdXTxosfWtCbxdrAAFfvjQ0PZzVpFHEYP/rCAy0/1lHDEdrNC9C3NNdM6GECdtITuCq7qsK5LJgopITcuvOZYXAOlqMLzXpJ8xsEueoTxIQFhY7SPt5Nl2rprSMJuoltF3ARZ+qU3fmiM4vPrSAJzcUjehu60LMUilwKwS6DEbYai2uJXjavsrWkg3TOcSGPwTD3IoOPjPo/z2QZ41zkD/uVDe1w+UtyjWqQaFaOfNByl0rfWDUhpZarqvEoYG1xwIDAQABo3sweTAJBgNVHRMEAjAAMCwGCWCGSAGG+EIBDQQfFh1PcGVuU1NMIEdlbmVyYXRlZCBDZXJ0aWZpY2F0ZTAdBgNVHQ4EFgQUmkEG1ij7vvcTpF3//Q0IcWyfoXAwHwYDVR0jBBgwFoAUhLxiknJV2lU6HddLzPbXXqzKMT4wDQYJKoZIhvcNAQELBQADggEBAFgMqoBuWBQcHCFrDgyqceQdD9FXzbAIAxHwox6dpd1G4R5/bencf9YlALv9yOJNWz93GJ2fAtimGCICYYek1GmnK6dJ2BvBndygP8qE1Bbvv5/5yfxkm54TMR5mQrllZbPq8HFAJKnipP4PkThjjVWrttgKlklQjdjvEFkfuFth+DKkUZalgQ9WMN6nUxNCeTTOtmsWZqp0GDQQfxmhuk4/7lE33F6OkY9zQTT49UJbtITeSsvr9fzV449wjcR91MyX3zkybDe+Qlih0eR+FJDSJn5XjjSFkNOLgwb25R7U2wfFkVd69N/VW+Bvj6QsW+kg7mUdvOreIX7w1XwzmFo=","url":"https://localhost:9080/patientDiscovery","externalLastUpdateDate":1481152502000,"locations":[{"id":4,"externalId":"15","status":{"id":1,"name":"Active"},"parentOrgName":"San Ramon Regional Medical Center","name":"San Ramon Regional Medical Center","description":"Primary hospital facility within the San Ramon Regional Medical Center healthcare provider organization, partnered with John Muir Health","type":"Hospital","address":{"id":null,"lines":["6001 Norris Canyon Rd"],"city":"San Ramon","state":"CA","zipcode":"94583","country":null},"externalLastUpdateDate":1481560594000,"creationDate":1489773263730,"lastModifiedDate":1489773263730,"endpoints":[]}],"creationDate":1489773264061,"lastModifiedDate":1489773264061},
                                              "status":"Successful","startDate":1489776298986,"endDate":1489776357767,"results":[]},
                                             {"id":5,"queryId":2,"endpoint":{"id":5,"externalId":"5","endpointType":{"id":1,"name":"Patient Discovery","code":"nwhin-xcpd"},"endpointStatus":{"id":1,"name":"Active"},"adapter":"eHealthExchange","mimeTypes":[{"id":113,"mimeType":"application/xml"}],"payloadType":"HL7 CCD Document","publicKey":"MIIDxDCCAqygAwIBAgIBAjANBgkqhkiG9w0BAQsFADB7MQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTE/MD0GA1UECgw2Q2FsaWZvcm5pYSBBc3NvY2lhdGlvbiBvZiBIZWFsdGggSW5mb3JtYXRpb24gRXhjaGFuZ2VzMRYwFAYDVQQDDA1GaWN0aXRpb3VzIENBMB4XDTE2MTEwNzE1NDAzOVoXDTE4MTEwNzE1NDAzOVowUzELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExGjAYBgNVBAoMEUthaXNlciBQZXJtYW5lbnRlMRMwEQYDVQQDDAplaHgua3Aub3JnMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4zh+5F1uN2EK9VCUTGyJYfvAZ2I5Bq5qCntftsks5jR+RIe1WVukVUpjFIFr8QdtmdTI5Wmpgndbh+Pj8E3yHvdXTxosfWtCbxdrAAFfvjQ0PZzVpFHEYP/rCAy0/1lHDEdrNC9C3NNdM6GECdtITuCq7qsK5LJgopITcuvOZYXAOlqMLzXpJ8xsEueoTxIQFhY7SPt5Nl2rprSMJuoltF3ARZ+qU3fmiM4vPrSAJzcUjehu60LMUilwKwS6DEbYai2uJXjavsrWkg3TOcSGPwTD3IoOPjPo/z2QZ41zkD/uVDe1w+UtyjWqQaFaOfNByl0rfWDUhpZarqvEoYG1xwIDAQABo3sweTAJBgNVHRMEAjAAMCwGCWCGSAGG+EIBDQQfFh1PcGVuU1NMIEdlbmVyYXRlZCBDZXJ0aWZpY2F0ZTAdBgNVHQ4EFgQUmkEG1ij7vvcTpF3//Q0IcWyfoXAwHwYDVR0jBBgwFoAUhLxiknJV2lU6HddLzPbXXqzKMT4wDQYJKoZIhvcNAQELBQADggEBAFgMqoBuWBQcHCFrDgyqceQdD9FXzbAIAxHwox6dpd1G4R5/bencf9YlALv9yOJNWz93GJ2fAtimGCICYYek1GmnK6dJ2BvBndygP8qE1Bbvv5/5yfxkm54TMR5mQrllZbPq8HFAJKnipP4PkThjjVWrttgKlklQjdjvEFkfuFth+DKkUZalgQ9WMN6nUxNCeTTOtmsWZqp0GDQQfxmhuk4/7lE33F6OkY9zQTT49UJbtITeSsvr9fzV449wjcR91MyX3zkybDe+Qlih0eR+FJDSJn5XjjSFkNOLgwb25R7U2wfFkVd69N/VW+Bvj6QsW+kg7mUdvOreIX7w1XwzmFo=","url":"https://localhost:9080/patientDiscovery","externalLastUpdateDate":1481152502000,"locations":[{"id":3,"externalId":"14","status":{"id":1,"name":"Active"},"parentOrgName":"Contra Costa Health Services","name":"Contra Costa Regional Medical Center","description":"Primary hospital facility within the Contra Costa County healthcare provider organization","type":"Hospital","address":{"id":null,"lines":["2500 Alhambra Ave"],"city":"Martinez","state":"CA","zipcode":"94553","country":null},"externalLastUpdateDate":1481560585000,"creationDate":1489773263730,"lastModifiedDate":1489773263730,"endpoints":[]}],"creationDate":1489773264061,"lastModifiedDate":1489773264061},
                                              "status":"Successful","startDate":1489776298975,"endDate":1489776357204,"results":[{"id":3,"patientRecordName":[{"id":null,"givenName":["asdf","James"],"suffix":null,"prefix":null,"profSuffix":null,"nameType":{"id":3,"code":"C","description":"Adopted Name"},"nameRepresentation":{"id":3,"code":"C","description":"Adopted Name"},"nameAssembly":null,"effectiveDate":null,"expirationDate":null,"familyName":"ldksj-Smith"}],"locationPatientRecordId":null,"dateOfBirth":"323201012213","gender":{"code":"F","description":"Female"},"phoneNumber":null,"address":[{"id":null,"lines":["510 Hunters Lane"],"city":"Springfield","state":"IL","zipcode":"11330","country":null}],"ssn":"999-88-6345"},{"id":4,"patientRecordName":[{"id":null,"givenName":["asdf","Jim"],"suffix":null,"prefix":null,"profSuffix":null,"nameType":{"id":4,"code":"D","description":"Display Name"},"nameRepresentation":null,"nameAssembly":null,"effectiveDate":null,"expirationDate":null,"familyName":"ldksj"}],"locationPatientRecordId":null,"dateOfBirth":"3232010109","gender":{"code":"F","description":"Female"},"phoneNumber":null,"address":[{"id":null,"lines":["510 Hunters Lane"],"city":"Austin","state":"IL","zipcode":"21228","country":null}],"ssn":"999-89-3300"}]},
                                             {"id":4,"queryId":2,"endpoint":{"id":1,"externalId":"1","endpointType":{"id":1,"name":"Patient Discovery","code":"nwhin-xcpd"},"endpointStatus":{"id":1,"name":"Active"},"adapter":"eHealthExchange","mimeTypes":[{"id":109,"mimeType":"application/xml"}],"payloadType":"HL7 CCD Document","publicKey":"MIIDxDCCAqygAwIBAgIBAjANBgkqhkiG9w0BAQsFADB7MQswCQYDVQQGEwJVUzETMBEGA1UECAwKQ2FsaWZvcm5pYTE/MD0GA1UECgw2Q2FsaWZvcm5pYSBBc3NvY2lhdGlvbiBvZiBIZWFsdGggSW5mb3JtYXRpb24gRXhjaGFuZ2VzMRYwFAYDVQQDDA1GaWN0aXRpb3VzIENBMB4XDTE2MTEwNzE1NDAzOVoXDTE4MTEwNzE1NDAzOVowUzELMAkGA1UEBhMCVVMxEzARBgNVBAgMCkNhbGlmb3JuaWExGjAYBgNVBAoMEUthaXNlciBQZXJtYW5lbnRlMRMwEQYDVQQDDAplaHgua3Aub3JnMIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA4zh+5F1uN2EK9VCUTGyJYfvAZ2I5Bq5qCntftsks5jR+RIe1WVukVUpjFIFr8QdtmdTI5Wmpgndbh+Pj8E3yHvdXTxosfWtCbxdrAAFfvjQ0PZzVpFHEYP/rCAy0/1lHDEdrNC9C3NNdM6GECdtITuCq7qsK5LJgopITcuvOZYXAOlqMLzXpJ8xsEueoTxIQFhY7SPt5Nl2rprSMJuoltF3ARZ+qU3fmiM4vPrSAJzcUjehu60LMUilwKwS6DEbYai2uJXjavsrWkg3TOcSGPwTD3IoOPjPo/z2QZ41zkD/uVDe1w+UtyjWqQaFaOfNByl0rfWDUhpZarqvEoYG1xwIDAQABo3sweTAJBgNVHRMEAjAAMCwGCWCGSAGG+EIBDQQfFh1PcGVuU1NMIEdlbmVyYXRlZCBDZXJ0aWZpY2F0ZTAdBgNVHQ4EFgQUmkEG1ij7vvcTpF3//Q0IcWyfoXAwHwYDVR0jBBgwFoAUhLxiknJV2lU6HddLzPbXXqzKMT4wDQYJKoZIhvcNAQELBQADggEBAFgMqoBuWBQcHCFrDgyqceQdD9FXzbAIAxHwox6dpd1G4R5/bencf9YlALv9yOJNWz93GJ2fAtimGCICYYek1GmnK6dJ2BvBndygP8qE1Bbvv5/5yfxkm54TMR5mQrllZbPq8HFAJKnipP4PkThjjVWrttgKlklQjdjvEFkfuFth+DKkUZalgQ9WMN6nUxNCeTTOtmsWZqp0GDQQfxmhuk4/7lE33F6OkY9zQTT49UJbtITeSsvr9fzV449wjcR91MyX3zkybDe+Qlih0eR+FJDSJn5XjjSFkNOLgwb25R7U2wfFkVd69N/VW+Bvj6QsW+kg7mUdvOreIX7w1XwzmFo=","url":"https://localhost:9080/patientDiscovery","externalLastUpdateDate":1481152502000,"locations":[{"id":1,"externalId":"1","status":{"id":1,"name":"Active"},"parentOrgName":"John Muir Health Foundation","name":"John Muir Medical Center","description":"Concord-based hospital facility within the John Muir Health healthcare provider organization","type":"Hospital","address":{"id":null,"lines":["2540 East St"],"city":"Concord","state":"CA","zipcode":"94520","country":null},"externalLastUpdateDate":1481559487000,"creationDate":1489773263730,"lastModifiedDate":1489773263730,"endpoints":[]},{"id":2,"externalId":"2","status":{"id":1,"name":"Active"},"parentOrgName":"John Muir Health Foundation","name":"John Muir Medical Center (Walnut Creek)","description":"Primary Walnut Creek-based hospital facility within the John Muir Health healthcare provider organization","type":"Hospital","address":{"id":null,"lines":["1601 Ygnacio Valley Rd"],"city":"Walnut Creek","state":"CA","zipcode":"94598","country":null},"externalLastUpdateDate":1481559508000,"creationDate":1489773263730,"lastModifiedDate":1489773263730,"endpoints":[]}],"creationDate":1489773264061,"lastModifiedDate":1489773264061},
                                              "status":"Failed","startDate":1489776298584,"endDate":1489776322340,"results":[]}]}];

        return mock;
    }
})();
