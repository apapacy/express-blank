crypto = require \crypto

export class MarketoSecurity
    (@client-access-ID, @secret-key) ~>

    to-XML: ->
        timestamp = get-W3C-timestamp new Date
        signature = crypto
            .create-hmac \sha1 @secret-key
            .update timestamp + @client-access-ID
            .digest \hex
        """
        <tns:AuthenticationHeader>
            <mktowsUserId>#{@client-access-ID}</mktowsUserId>
            <requestSignature>#signature</requestSignature>
            <requestTimestamp>#timestamp</requestTimestamp>
        </tns:AuthenticationHeader>
        """
export function get-W3C-timestamp d
    year = d.get-full-year!
    month = d.get-month! + 1
    month = "0" + month if month < 10
    day = d.get-date!
    day = "0" + day if day < 10
    time-string = d.to-time-string!
    time = time-string.slice 0 8
    offset = time-string.slice 12 15
    year + '-' + month + '-' + day + "T#time#offset:00"
