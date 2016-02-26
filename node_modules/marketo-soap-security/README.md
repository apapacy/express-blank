marketo-soap-security
=====================

For use with [node soap module](https://github.com/milewise/node-soap) as the security object for accessing Marketo's SOAP API.

Written in LiveScript, but accessible from JavaScript.

# Exports:

## MarketoSecurity

This is a class. Constructor parameters:

client-access-ID
secret-key

Use (in LiveScript):

    soap              = require \soap
    {MarketoSecurity} = require \marketo-soap-security

    wsdl-url = 'https://na-c.marketo.com/soap/mktows/1_7?WSDL'
    err, client <- soap.create wsdl-url
    client.set-security MarketoSecurity do
        'your client access ID here'
        'your secret key here'

    ...

Use (in JavaScript):

    var soap, MarketoSecurity, wsdlUrl;
    soap = require('soap');
    MarketoSecurity = require('marketo-soap-security').MarketoSecurity;
    wsdlUrl = 'https://na-c.marketo.com/soap/mktows/1_7?WSDL';
    soap.create(wsdlUrl, function(err, client){
      return client.setSecurity(MarketoSecurity('your client access ID here', 'your secret key here'));
    });

## get-W3C-timestamp (getW3CTimestamp)

A function. Takes a date and returns a properly formated W3C timestamp.

Use (in LiveScript):

    {get-W3C-timestamp} = require \marketo-soap-security
    timestamp = get-W3C-timestamp new Date '2012-09-12'

Use (in JavaScript):

    var getW3CTimestamp, timestamp;
    getW3CTimestamp = require('marketo-soap-security').getW3CTimestamp;
    timestamp = getW3CTimestamp(new Date('2012-09-12'));

