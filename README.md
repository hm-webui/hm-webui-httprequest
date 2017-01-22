![Logo](https://github.com/hm-webui/hm-webui-httprequest/raw/master/globe.png)

# HM WebUI HTTP Request Plugin

This plugin makes it easy to request data from webservers with a get or post request from another plugin (e.g. the [HM WebUI Javascript Plugin](https://github.com/hm-webui/hm-webui-javascript)).

## Installation

In the Plugins section of HM WebUI create a new instance of the hm-webui-httprequest plugin.

There are no settings in the plugin settings screen.

## Usage

The plugin is supporting the following functions:

### get
---

#### Parameter

name | type | required | comment
:---|:---|:---|:---
url | String | yes | the url (http:// ord https://) to get the data from
options | Object | no | a object containing options for the http request (for details visit the [Node HTTP documentation](https://nodejs.org/api/http.html#http_http_request_options_callback))

#### Returns

The function returns a promise with the following methods:

name | comment
:--- | :---
.then() | Called when the data has been received successful. The first parameter of the promise function contains an object described below in the **Result**
.fail() | Called when the data receiving failed. The first parameter of the promise function contains a string with detailed error message
.fin() | Called always (on success and error)

#### Result

The .then() promise function is receiving the following result object:

```js
{
  statusCode: 200, //the http statuc code
  statusMessage: 'Ok', //the http status message,
  headers: {}, //a object with all headers returned by the server,
  body: '' // the body is a parsed JSON object if the server is sending application/json in the Content-Type header otherwise it is a string
}

```

#### Example

Here an example how you can receive data from a server with the [HM WebUI Javascript Plugin](https://github.com/hm-webui/hm-webui-javascript)

```js
//receive data with a get request
hmwebui.callPluginFunction('hm-webui-httprequest.0','get','http://www.google.de').then(function(result){
    //result is an object described above
}).fail(function(err){
    //err is a string with a detailed error message
});
```

### post
---

#### Parameter

name | type | required | comment
:---|:---|:---|:---
url | String | yes | the url (http:// ord https://) to send the data to
payload | Object<br>String | yes | the data to send to the server<br><br>A object is transferred to x-www-form-urlencoded form and the Content-Type header is set<br><br>If you want to send the data as is then ou have to provide the data as string (e.g. use JSON.stringify(...) to transfer JSON data)
options | Object | no | a object containing options for the http request (for details visit the [Node HTTP documentation](https://nodejs.org/api/http.html#http_http_request_options_callback))

#### Returns

The function returns a promise with the following methods:

name | comment
:--- | :---
.then() | Called when the data has been sent successful. The first parameter of the promise function contains an object described below in the **Result**
.fail() | Called when the data sending failed. The first parameter of the promise function contains a string with detailed error message
.fin() | Called always (on success and error)

#### Result

The .then() promise function is receiving the following result object:

```js
{
  statusCode: 200, //the http statuc code
  statusMessage: 'Ok', //the http status message,
  headers: {}, //a object with all headers returned by the server,
  body: '' // the body is a parsed JSON object if the server is sending application/json in the Content-Type header otherwise it is a string
}

```

#### Example

Here an example how you can send data to a server from the [HM WebUI Javascript Plugin](https://github.com/hm-webui/hm-webui-javascript)

```js
//send data with a post request
hmwebui.callPluginFunction('hm-webui-httprequest.0','post','http://www.example.com/login','user=test&password=test').then(function(result){
    //result is an object described above
}).fail(function(err){
    //err is a string with a detailed error message
});

//send Object data with a post request
hmwebui.callPluginFunction('hm-webui-httprequest.0','post','http://www.example.com/login',{user: 'test', password: 'test'}).then(function(result){
    //result is an object described above
}).fail(function(err){
    //err is a string with a detailed error message
});

//send JSON data with a post request
hmwebui.callPluginFunction('hm-webui-httprequest.0','post','http://www.example.com/login',JSON.stringify({user: 'test', password: 'test'})).then(function(result){
    //result is an object described above
}).fail(function(err){
    //err is a string with a detailed error message
});
```

## Changelog

0.0.1 (2017-01-22)
* initial version
