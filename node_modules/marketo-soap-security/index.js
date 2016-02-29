(function(){
  var crypto, MarketoSecurity, out$ = typeof exports != 'undefined' && exports || this;
  crypto = require('crypto');
  out$.MarketoSecurity = MarketoSecurity = (function(){
    MarketoSecurity.displayName = 'MarketoSecurity';
    var prototype = MarketoSecurity.prototype, constructor = MarketoSecurity;
    function MarketoSecurity(clientAccessID, secretKey){
      var this$ = this instanceof ctor$ ? this : new ctor$;
      this$.clientAccessID = clientAccessID;
      this$.secretKey = secretKey;
      return this$;
    } function ctor$(){} ctor$.prototype = prototype;
    prototype.toXML = function(){
      var timestamp, signature;
      timestamp = getW3CTimestamp(new Date);
      signature = crypto.createHmac('sha1', this.secretKey).update(timestamp + this.clientAccessID).digest('hex');
      return "<tns:AuthenticationHeader>\n    <mktowsUserId>" + this.clientAccessID + "</mktowsUserId>\n    <requestSignature>" + signature + "</requestSignature>\n    <requestTimestamp>" + timestamp + "</requestTimestamp>\n</tns:AuthenticationHeader>";
    };
    return MarketoSecurity;
  }());
  out$.getW3CTimestamp = getW3CTimestamp;
  function getW3CTimestamp(d){
    var year, month, day, timeString, time, offset;
    year = d.getFullYear();
    month = d.getMonth() + 1;
    if (month < 10) {
      month = "0" + month;
    }
    day = d.getDate();
    if (day < 10) {
      day = "0" + day;
    }
    timeString = d.toTimeString();
    time = timeString.slice(0, 8);
    offset = timeString.slice(12, 15);
    return year + '-' + month + '-' + day + ("T" + time + offset + ":00");
  }
}).call(this);
