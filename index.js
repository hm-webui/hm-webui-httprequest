var http = require('http');
var https = require('http');
var querystring = require('querystring');
var urlHelper = require('url');
var Q = require('q');
var extend = require('extend');

var HTTPRequestPlugin  = function(){
  var log = null;

  this.logger = function(logger){
    log = logger;
  };

  this.get = function(url,opts){
    return this.post(url,null,opts);
  };

  this.post = function(url,payload,opts){
    var deferred = Q.defer();

    process.nextTick(function(){
      var options = urlHelper.parse(url);
      options = extend(true,{},opts,options);

      if(options.protocol!='http:' && options.protocol!='https:'){
        deferred.reject('Url must start with http:// or https://');
      }else{
        if(payload!=null){
          options.method='post';
          if(options.headers==null) options.headers = {};

          if(typeof payload == 'object'){
            payload = querystring.stringify(payload);

            options.headers = extend(true,options.headers,{
              'Content-Type': 'application/x-www-form-urlencoded'
            });
          }

          options.headers = extend(true,options.headers,{
            'Content-Length': Buffer.byteLength(payload)
          });
        }

        log.verbose("Call http get with options - " + JSON.stringify(options));
        var request = (options.protocol=='https:') ? https : http;
        var req = request.request(options,function(response){
          var body = "";

          response.on('data',function(d){
            body+=d;
          });

          response.on('end',function(){
            var resBody = body;

            if(response.headers && response.headers['content-type'] && response.headers['content-type'].indexOf("application/json")>=0)
            resBody=JSON.parse(resBody);

            //response.body = resBody;
            deferred.resolve({statusCode: response.statusCode, statusMessage: response.statusMessage, headers: response.headers, body: resBody});
          });
        }).on('error', function(err){
          log.error(err);
          deferred.reject(err);
        });

        if(payload!=null){
          req.write(payload);
        }

        req.end();
      }
    });

    return deferred.promise;
  };

};

module.exports = HTTPRequestPlugin;
