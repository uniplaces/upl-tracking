var UplTracking=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=10)}([function(e,t,n){"use strict";var r=n(3),o=n(21),i=Object.prototype.toString;function u(e){return"[object Array]"===i.call(e)}function a(e){return null!==e&&"object"==typeof e}function s(e){return"[object Function]"===i.call(e)}function c(e,t){if(null!==e&&void 0!==e)if("object"!=typeof e&&(e=[e]),u(e))for(var n=0,r=e.length;n<r;n++)t.call(null,e[n],n,e);else for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.call(null,e[o],o,e)}e.exports={isArray:u,isArrayBuffer:function(e){return"[object ArrayBuffer]"===i.call(e)},isBuffer:o,isFormData:function(e){return"undefined"!=typeof FormData&&e instanceof FormData},isArrayBufferView:function(e){return"undefined"!=typeof ArrayBuffer&&ArrayBuffer.isView?ArrayBuffer.isView(e):e&&e.buffer&&e.buffer instanceof ArrayBuffer},isString:function(e){return"string"==typeof e},isNumber:function(e){return"number"==typeof e},isObject:a,isUndefined:function(e){return void 0===e},isDate:function(e){return"[object Date]"===i.call(e)},isFile:function(e){return"[object File]"===i.call(e)},isBlob:function(e){return"[object Blob]"===i.call(e)},isFunction:s,isStream:function(e){return a(e)&&s(e.pipe)},isURLSearchParams:function(e){return"undefined"!=typeof URLSearchParams&&e instanceof URLSearchParams},isStandardBrowserEnv:function(){return("undefined"==typeof navigator||"ReactNative"!==navigator.product)&&"undefined"!=typeof window&&"undefined"!=typeof document},forEach:c,merge:function e(){var t={};function n(n,r){"object"==typeof t[r]&&"object"==typeof n?t[r]=e(t[r],n):t[r]=n}for(var r=0,o=arguments.length;r<o;r++)c(arguments[r],n);return t},extend:function(e,t,n){return c(t,function(t,o){e[o]=n&&"function"==typeof t?r(t,n):t}),e},trim:function(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}}},function(e,t,n){"use strict";(function(t){var r=n(0),o=n(24),i={"Content-Type":"application/x-www-form-urlencoded"};function u(e,t){!r.isUndefined(e)&&r.isUndefined(e["Content-Type"])&&(e["Content-Type"]=t)}var a={adapter:function(){var e;return"undefined"!=typeof XMLHttpRequest?e=n(4):void 0!==t&&(e=n(4)),e}(),transformRequest:[function(e,t){return o(t,"Content-Type"),r.isFormData(e)||r.isArrayBuffer(e)||r.isBuffer(e)||r.isStream(e)||r.isFile(e)||r.isBlob(e)?e:r.isArrayBufferView(e)?e.buffer:r.isURLSearchParams(e)?(u(t,"application/x-www-form-urlencoded;charset=utf-8"),e.toString()):r.isObject(e)?(u(t,"application/json;charset=utf-8"),JSON.stringify(e)):e}],transformResponse:[function(e){if("string"==typeof e)try{e=JSON.parse(e)}catch(e){}return e}],timeout:0,xsrfCookieName:"XSRF-TOKEN",xsrfHeaderName:"X-XSRF-TOKEN",maxContentLength:-1,validateStatus:function(e){return e>=200&&e<300},headers:{common:{Accept:"application/json, text/plain, */*"}}};r.forEach(["delete","get","head"],function(e){a.headers[e]={}}),r.forEach(["post","put","patch"],function(e){a.headers[e]=r.merge(i)}),e.exports=a}).call(this,n(23))},function(e,t,n){var r,o;
/*!
 * JavaScript Cookie v2.2.0
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */!function(i){if(void 0===(o="function"==typeof(r=i)?r.call(t,n,t,e):r)||(e.exports=o),!0,e.exports=i(),!!0){var u=window.Cookies,a=window.Cookies=i();a.noConflict=function(){return window.Cookies=u,a}}}(function(){function e(){for(var e=0,t={};e<arguments.length;e++){var n=arguments[e];for(var r in n)t[r]=n[r]}return t}return function t(n){function r(t,o,i){var u;if("undefined"!=typeof document){if(arguments.length>1){if("number"==typeof(i=e({path:"/"},r.defaults,i)).expires){var a=new Date;a.setMilliseconds(a.getMilliseconds()+864e5*i.expires),i.expires=a}i.expires=i.expires?i.expires.toUTCString():"";try{u=JSON.stringify(o),/^[\{\[]/.test(u)&&(o=u)}catch(e){}o=n.write?n.write(o,t):encodeURIComponent(String(o)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g,decodeURIComponent),t=(t=(t=encodeURIComponent(String(t))).replace(/%(23|24|26|2B|5E|60|7C)/g,decodeURIComponent)).replace(/[\(\)]/g,escape);var s="";for(var c in i)i[c]&&(s+="; "+c,!0!==i[c]&&(s+="="+i[c]));return document.cookie=t+"="+o+s}t||(u={});for(var f=document.cookie?document.cookie.split("; "):[],l=/(%[0-9A-Z]{2})+/g,d=0;d<f.length;d++){var p=f[d].split("="),h=p.slice(1).join("=");this.json||'"'!==h.charAt(0)||(h=h.slice(1,-1));try{var m=p[0].replace(l,decodeURIComponent);if(h=n.read?n.read(h,m):n(h,m)||h.replace(l,decodeURIComponent),this.json)try{h=JSON.parse(h)}catch(e){}if(t===m){u=h;break}t||(u[m]=h)}catch(e){}}return u}}return r.set=r,r.get=function(e){return r.call(r,e)},r.getJSON=function(){return r.apply({json:!0},[].slice.call(arguments))},r.defaults={},r.remove=function(t,n){r(t,"",e(n,{expires:-1}))},r.withConverter=t,r}(function(){})})},function(e,t,n){"use strict";e.exports=function(e,t){return function(){for(var n=new Array(arguments.length),r=0;r<n.length;r++)n[r]=arguments[r];return e.apply(t,n)}}},function(e,t,n){"use strict";var r=n(0),o=n(25),i=n(27),u=n(28),a=n(29),s=n(5),c="undefined"!=typeof window&&window.btoa&&window.btoa.bind(window)||n(30);e.exports=function(e){return new Promise(function(t,f){var l=e.data,d=e.headers;r.isFormData(l)&&delete d["Content-Type"];var p=new XMLHttpRequest,h="onreadystatechange",m=!1;if("undefined"==typeof window||!window.XDomainRequest||"withCredentials"in p||a(e.url)||(p=new window.XDomainRequest,h="onload",m=!0,p.onprogress=function(){},p.ontimeout=function(){}),e.auth){var g=e.auth.username||"",v=e.auth.password||"";d.Authorization="Basic "+c(g+":"+v)}if(p.open(e.method.toUpperCase(),i(e.url,e.params,e.paramsSerializer),!0),p.timeout=e.timeout,p[h]=function(){if(p&&(4===p.readyState||m)&&(0!==p.status||p.responseURL&&0===p.responseURL.indexOf("file:"))){var n="getAllResponseHeaders"in p?u(p.getAllResponseHeaders()):null,r={data:e.responseType&&"text"!==e.responseType?p.response:p.responseText,status:1223===p.status?204:p.status,statusText:1223===p.status?"No Content":p.statusText,headers:n,config:e,request:p};o(t,f,r),p=null}},p.onerror=function(){f(s("Network Error",e,null,p)),p=null},p.ontimeout=function(){f(s("timeout of "+e.timeout+"ms exceeded",e,"ECONNABORTED",p)),p=null},r.isStandardBrowserEnv()){var y=n(31),w=(e.withCredentials||a(e.url))&&e.xsrfCookieName?y.read(e.xsrfCookieName):void 0;w&&(d[e.xsrfHeaderName]=w)}if("setRequestHeader"in p&&r.forEach(d,function(e,t){void 0===l&&"content-type"===t.toLowerCase()?delete d[t]:p.setRequestHeader(t,e)}),e.withCredentials&&(p.withCredentials=!0),e.responseType)try{p.responseType=e.responseType}catch(t){if("json"!==e.responseType)throw t}"function"==typeof e.onDownloadProgress&&p.addEventListener("progress",e.onDownloadProgress),"function"==typeof e.onUploadProgress&&p.upload&&p.upload.addEventListener("progress",e.onUploadProgress),e.cancelToken&&e.cancelToken.promise.then(function(e){p&&(p.abort(),f(e),p=null)}),void 0===l&&(l=null),p.send(l)})}},function(e,t,n){"use strict";var r=n(26);e.exports=function(e,t,n,o,i){var u=new Error(e);return r(u,t,n,o,i)}},function(e,t,n){"use strict";e.exports=function(e){return!(!e||!e.__CANCEL__)}},function(e,t,n){"use strict";function r(e){this.message=e}r.prototype.toString=function(){return"Cancel"+(this.message?": "+this.message:"")},r.prototype.__CANCEL__=!0,e.exports=r},function(e,t,n){"use strict";function r(){return""===document.referrer}function o(e){return!r()&&document.referrer.includes(e)}Object.defineProperty(t,"__esModule",{value:!0}),t.isEmptyReferrer=r,t.getReferrer=function(){return r()?null:new URL(document.referrer)},t.isCustomReferrer=o,t.isUniplacesReferrer=function(){return o("uniplaces")}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={TEST:"test",DEVELOPMENT:"development",STAGING:"staging",PRODUCTION:"production"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(11);Object.defineProperty(t,"setEnvironment",{enumerable:!0,get:function(){return r.setEnvironment}}),Object.defineProperty(t,"trackTouch",{enumerable:!0,get:function(){return r.trackTouch}}),Object.defineProperty(t,"trackAction",{enumerable:!0,get:function(){return r.trackAction}}),Object.defineProperty(t,"assignUserToTrackingId",{enumerable:!0,get:function(){return r.assignUserToTrackingId}}),Object.defineProperty(t,"ActionsType",{enumerable:!0,get:function(){return r.ActionsType}}),Object.defineProperty(t,"getCookie",{enumerable:!0,get:function(){return r.getCookie}}),Object.defineProperty(t,"getUrlParameters",{enumerable:!0,get:function(){return r.getUrlParameters}}),Object.defineProperty(t,"EnvironmentType",{enumerable:!0,get:function(){return r.EnvironmentType}}),Object.defineProperty(t,"UserType",{enumerable:!0,get:function(){return r.UserType}})},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.UserType=t.EnvironmentType=t.getUrlParameters=t.getCookie=t.ActionsType=t.assignUserToTrackingId=t.trackAction=t.trackTouch=t.setEnvironment=void 0;var r=h(n(2)),o=h(n(12)),i=n(18),u=n(8),a=n(39),s=h(n(40)),c=h(n(41)),f=h(n(9)),l=h(n(42)),d=h(n(43)),p=h(n(44));function h(e){return e&&e.__esModule?e:{default:e}}function m(){var e=o.default.getCookieName(),t=r.default.getJSON(e);return t?o.default.fromJSON(t):null}t.setEnvironment=function(e){p.default.setEnvironment(e)},t.trackTouch=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{origin:null,destination:null,language:null,city:null},t=window.location.href,n=(0,a.getUrlParameters)(t,e),r=m();return r||(r=new o.default),(0,u.isUniplacesReferrer)()||!p.default.isDevelopment()&&window.performance&&window.performance.navigation.type===d.default.RELOAD?Promise.resolve({msg:"User is coming from another Uniplaces or from a page reload"}):(r=r.refreshTimestamp().setParameters(n).setLocation(e).save(p.default.getCookieDomain()),(0,i.putRecord)(p.default,l.default.UPL_TOUCHES,r.toJSON()))},t.trackAction=function(e){var t=m();if(!t)return Promise.reject({msg:"UPL cookie is not set"});var n={touch_id:t.getTouchId(),action:e,created_at:Date.now()};return(0,i.putRecord)(p.default,l.default.UPL_ACTIONS,n)},t.assignUserToTrackingId=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:c.default.GUEST,n=m();if(!n)return Promise.reject({msg:"UPL cookie is not set"});var r={tracking_id:n.tracking_id,user_type:t,user_id:e,created_at:Date.now()};return(0,i.putRecord)(p.default,l.default.UPL_USERS,r)},t.ActionsType=s.default,t.getCookie=m,t.getUrlParameters=a.getUrlParameters,t.EnvironmentType=f.default,t.UserType=c.default},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},o=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),i=s(n(13)),u=s(n(2)),a=n(16);function s(e){return e&&e.__esModule?e:{default:e}}var c=function(){function e(t,n){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.tracking_id=t||(0,i.default)(),this.created_at=n||Date.now()}return o(e,[{key:"getCreatedAt",value:function(){return this.created_at}},{key:"getTouchId",value:function(){return this.tracking_id+"_"+this.created_at}},{key:"getLocation",value:function(){return{origin:this.origin,destination:this.destination,language:this.language,city:this.city}}},{key:"setParameters",value:function(e){return this.source=e.source,this.medium=e.medium,this.campaign=e.campaign,this.term=e.term,this.content=e.content,this.gclid=e.gclid,this.msclkid=e.msclkid,this.network=e.network,this.keyword=e.keyword,this.match_type=e.matchtype,this.device=e.device,this.device_model=e.devicemodel,this.ad_position=e.adposition,this.ad_group=e.adgroup,this.location=e.location,this.creative=e.creative,this.site_link=e.sitelink,this}},{key:"setLocation",value:function(e){return this.origin=e.origin,this.destination=e.destination,this.language=(0,a.i18nToUplLocale)(e.language),this.city=e.city,this}},{key:"refreshTimestamp",value:function(){return this.created_at=Date.now(),this}},{key:"save",value:function(e){var t=this.toJSON();return u.default.set("upl_cookie",t,{expires:180,domain:e}),this}},{key:"toJSON",value:function(){return r({},this,{touch_id:this.getTouchId()})}}],[{key:"getCookieName",value:function(){return"upl_cookie"}},{key:"fromJSON",value:function(t){var n=new e;for(var r in t)t.hasOwnProperty(r)&&(n[r]=t[r]);return n}}]),e}();t.default=c},function(e,t,n){var r=n(14),o=n(15);e.exports=function(e,t,n){var i=t&&n||0;"string"==typeof e&&(t="binary"===e?new Array(16):null,e=null);var u=(e=e||{}).random||(e.rng||r)();if(u[6]=15&u[6]|64,u[8]=63&u[8]|128,t)for(var a=0;a<16;++a)t[i+a]=u[a];return t||o(u)}},function(e,t){var n="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof window.msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto);if(n){var r=new Uint8Array(16);e.exports=function(){return n(r),r}}else{var o=new Array(16);e.exports=function(){for(var e,t=0;t<16;t++)0==(3&t)&&(e=4294967296*Math.random()),o[t]=e>>>((3&t)<<3)&255;return o}}},function(e,t){for(var n=[],r=0;r<256;++r)n[r]=(r+256).toString(16).substr(1);e.exports=function(e,t){var r=t||0,o=n;return[o[e[r++]],o[e[r++]],o[e[r++]],o[e[r++]],"-",o[e[r++]],o[e[r++]],"-",o[e[r++]],o[e[r++]],"-",o[e[r++]],o[e[r++]],"-",o[e[r++]],o[e[r++]],o[e[r++]],o[e[r++]],o[e[r++]],o[e[r++]]].join("")}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.capitalize=function(e){return""+e[0].toUpperCase()+e.slice(1).toLowerCase()},t.i18nToUplLocale=function(e){return e?r.default[e.replace("-","_").toUpperCase()]:null};var r=function(e){return e&&e.__esModule?e:{default:e}}(n(17))},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={DE_DE:"german",EN_GB:"english",FR_FR:"french",IT_IT:"italian",NL_NL:"dutch",PL_PL:"polish",PT_PT:"portuguese",ZH_CN:"mandarin"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.putRecord=function(e,t,n){var o=e.getDataInfrastructureUrl()+"/"+t+"/record";return r.put(o,{data:n})};var r=function(e){return e&&e.__esModule?e:{default:e}}(n(19)).default.create({headers:{"Content-Type":"application/json; charset=utf-8"}})},function(e,t,n){e.exports=n(20)},function(e,t,n){"use strict";var r=n(0),o=n(3),i=n(22),u=n(1);function a(e){var t=new i(e),n=o(i.prototype.request,t);return r.extend(n,i.prototype,t),r.extend(n,t),n}var s=a(u);s.Axios=i,s.create=function(e){return a(r.merge(u,e))},s.Cancel=n(7),s.CancelToken=n(37),s.isCancel=n(6),s.all=function(e){return Promise.all(e)},s.spread=n(38),e.exports=s,e.exports.default=s},function(e,t){function n(e){return!!e.constructor&&"function"==typeof e.constructor.isBuffer&&e.constructor.isBuffer(e)}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
e.exports=function(e){return null!=e&&(n(e)||function(e){return"function"==typeof e.readFloatLE&&"function"==typeof e.slice&&n(e.slice(0,0))}(e)||!!e._isBuffer)}},function(e,t,n){"use strict";var r=n(1),o=n(0),i=n(32),u=n(33);function a(e){this.defaults=e,this.interceptors={request:new i,response:new i}}a.prototype.request=function(e){"string"==typeof e&&(e=o.merge({url:arguments[0]},arguments[1])),(e=o.merge(r,{method:"get"},this.defaults,e)).method=e.method.toLowerCase();var t=[u,void 0],n=Promise.resolve(e);for(this.interceptors.request.forEach(function(e){t.unshift(e.fulfilled,e.rejected)}),this.interceptors.response.forEach(function(e){t.push(e.fulfilled,e.rejected)});t.length;)n=n.then(t.shift(),t.shift());return n},o.forEach(["delete","get","head","options"],function(e){a.prototype[e]=function(t,n){return this.request(o.merge(n||{},{method:e,url:t}))}}),o.forEach(["post","put","patch"],function(e){a.prototype[e]=function(t,n,r){return this.request(o.merge(r||{},{method:e,url:t,data:n}))}}),e.exports=a},function(e,t){var n,r,o=e.exports={};function i(){throw new Error("setTimeout has not been defined")}function u(){throw new Error("clearTimeout has not been defined")}function a(e){if(n===setTimeout)return setTimeout(e,0);if((n===i||!n)&&setTimeout)return n=setTimeout,setTimeout(e,0);try{return n(e,0)}catch(t){try{return n.call(null,e,0)}catch(t){return n.call(this,e,0)}}}!function(){try{n="function"==typeof setTimeout?setTimeout:i}catch(e){n=i}try{r="function"==typeof clearTimeout?clearTimeout:u}catch(e){r=u}}();var s,c=[],f=!1,l=-1;function d(){f&&s&&(f=!1,s.length?c=s.concat(c):l=-1,c.length&&p())}function p(){if(!f){var e=a(d);f=!0;for(var t=c.length;t;){for(s=c,c=[];++l<t;)s&&s[l].run();l=-1,t=c.length}s=null,f=!1,function(e){if(r===clearTimeout)return clearTimeout(e);if((r===u||!r)&&clearTimeout)return r=clearTimeout,clearTimeout(e);try{r(e)}catch(t){try{return r.call(null,e)}catch(t){return r.call(this,e)}}}(e)}}function h(e,t){this.fun=e,this.array=t}function m(){}o.nextTick=function(e){var t=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)t[n-1]=arguments[n];c.push(new h(e,t)),1!==c.length||f||a(p)},h.prototype.run=function(){this.fun.apply(null,this.array)},o.title="browser",o.browser=!0,o.env={},o.argv=[],o.version="",o.versions={},o.on=m,o.addListener=m,o.once=m,o.off=m,o.removeListener=m,o.removeAllListeners=m,o.emit=m,o.prependListener=m,o.prependOnceListener=m,o.listeners=function(e){return[]},o.binding=function(e){throw new Error("process.binding is not supported")},o.cwd=function(){return"/"},o.chdir=function(e){throw new Error("process.chdir is not supported")},o.umask=function(){return 0}},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t){r.forEach(e,function(n,r){r!==t&&r.toUpperCase()===t.toUpperCase()&&(e[t]=n,delete e[r])})}},function(e,t,n){"use strict";var r=n(5);e.exports=function(e,t,n){var o=n.config.validateStatus;n.status&&o&&!o(n.status)?t(r("Request failed with status code "+n.status,n.config,null,n.request,n)):e(n)}},function(e,t,n){"use strict";e.exports=function(e,t,n,r,o){return e.config=t,n&&(e.code=n),e.request=r,e.response=o,e}},function(e,t,n){"use strict";var r=n(0);function o(e){return encodeURIComponent(e).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,"+").replace(/%5B/gi,"[").replace(/%5D/gi,"]")}e.exports=function(e,t,n){if(!t)return e;var i;if(n)i=n(t);else if(r.isURLSearchParams(t))i=t.toString();else{var u=[];r.forEach(t,function(e,t){null!==e&&void 0!==e&&(r.isArray(e)?t+="[]":e=[e],r.forEach(e,function(e){r.isDate(e)?e=e.toISOString():r.isObject(e)&&(e=JSON.stringify(e)),u.push(o(t)+"="+o(e))}))}),i=u.join("&")}return i&&(e+=(-1===e.indexOf("?")?"?":"&")+i),e}},function(e,t,n){"use strict";var r=n(0),o=["age","authorization","content-length","content-type","etag","expires","from","host","if-modified-since","if-unmodified-since","last-modified","location","max-forwards","proxy-authorization","referer","retry-after","user-agent"];e.exports=function(e){var t,n,i,u={};return e?(r.forEach(e.split("\n"),function(e){if(i=e.indexOf(":"),t=r.trim(e.substr(0,i)).toLowerCase(),n=r.trim(e.substr(i+1)),t){if(u[t]&&o.indexOf(t)>=0)return;u[t]="set-cookie"===t?(u[t]?u[t]:[]).concat([n]):u[t]?u[t]+", "+n:n}}),u):u}},function(e,t,n){"use strict";var r=n(0);e.exports=r.isStandardBrowserEnv()?function(){var e,t=/(msie|trident)/i.test(navigator.userAgent),n=document.createElement("a");function o(e){var r=e;return t&&(n.setAttribute("href",r),r=n.href),n.setAttribute("href",r),{href:n.href,protocol:n.protocol?n.protocol.replace(/:$/,""):"",host:n.host,search:n.search?n.search.replace(/^\?/,""):"",hash:n.hash?n.hash.replace(/^#/,""):"",hostname:n.hostname,port:n.port,pathname:"/"===n.pathname.charAt(0)?n.pathname:"/"+n.pathname}}return e=o(window.location.href),function(t){var n=r.isString(t)?o(t):t;return n.protocol===e.protocol&&n.host===e.host}}():function(){return!0}},function(e,t,n){"use strict";var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";function o(){this.message="String contains an invalid character"}o.prototype=new Error,o.prototype.code=5,o.prototype.name="InvalidCharacterError",e.exports=function(e){for(var t,n,i=String(e),u="",a=0,s=r;i.charAt(0|a)||(s="=",a%1);u+=s.charAt(63&t>>8-a%1*8)){if((n=i.charCodeAt(a+=.75))>255)throw new o;t=t<<8|n}return u}},function(e,t,n){"use strict";var r=n(0);e.exports=r.isStandardBrowserEnv()?{write:function(e,t,n,o,i,u){var a=[];a.push(e+"="+encodeURIComponent(t)),r.isNumber(n)&&a.push("expires="+new Date(n).toGMTString()),r.isString(o)&&a.push("path="+o),r.isString(i)&&a.push("domain="+i),!0===u&&a.push("secure"),document.cookie=a.join("; ")},read:function(e){var t=document.cookie.match(new RegExp("(^|;\\s*)("+e+")=([^;]*)"));return t?decodeURIComponent(t[3]):null},remove:function(e){this.write(e,"",Date.now()-864e5)}}:{write:function(){},read:function(){return null},remove:function(){}}},function(e,t,n){"use strict";var r=n(0);function o(){this.handlers=[]}o.prototype.use=function(e,t){return this.handlers.push({fulfilled:e,rejected:t}),this.handlers.length-1},o.prototype.eject=function(e){this.handlers[e]&&(this.handlers[e]=null)},o.prototype.forEach=function(e){r.forEach(this.handlers,function(t){null!==t&&e(t)})},e.exports=o},function(e,t,n){"use strict";var r=n(0),o=n(34),i=n(6),u=n(1),a=n(35),s=n(36);function c(e){e.cancelToken&&e.cancelToken.throwIfRequested()}e.exports=function(e){return c(e),e.baseURL&&!a(e.url)&&(e.url=s(e.baseURL,e.url)),e.headers=e.headers||{},e.data=o(e.data,e.headers,e.transformRequest),e.headers=r.merge(e.headers.common||{},e.headers[e.method]||{},e.headers||{}),r.forEach(["delete","get","head","post","put","patch","common"],function(t){delete e.headers[t]}),(e.adapter||u.adapter)(e).then(function(t){return c(e),t.data=o(t.data,t.headers,e.transformResponse),t},function(t){return i(t)||(c(e),t&&t.response&&(t.response.data=o(t.response.data,t.response.headers,e.transformResponse))),Promise.reject(t)})}},function(e,t,n){"use strict";var r=n(0);e.exports=function(e,t,n){return r.forEach(n,function(n){e=n(e,t)}),e}},function(e,t,n){"use strict";e.exports=function(e){return/^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(e)}},function(e,t,n){"use strict";e.exports=function(e,t){return t?e.replace(/\/+$/,"")+"/"+t.replace(/^\/+/,""):e}},function(e,t,n){"use strict";var r=n(7);function o(e){if("function"!=typeof e)throw new TypeError("executor must be a function.");var t;this.promise=new Promise(function(e){t=e});var n=this;e(function(e){n.reason||(n.reason=new r(e),t(n.reason))})}o.prototype.throwIfRequested=function(){if(this.reason)throw this.reason},o.source=function(){var e;return{token:new o(function(t){e=t}),cancel:e}},e.exports=o},function(e,t,n){"use strict";e.exports=function(e){return function(t){return e.apply(null,t)}}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getUrlParameters=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{origin:null,destination:null,language:null},n=new URL(e),r={};return o.forEach(function(o){r[o.name]=n.searchParams.get("upl_"+o.name)||n.searchParams.get("utm_"+o.name)||o.inferedValue(e,t)||o.defaultValue}),i.forEach(function(o){r[o.name]=n.searchParams.get(o.name)||o.inferedValue(e,t)||o.defaultValue}),r},t.getInferedSource=u,t.getInferedMedium=a;var r=n(8),o=[{name:"source",inferedValue:u,defaultValue:"direct"},{name:"medium",inferedValue:a,defaultValue:"destination_origin_language"},{name:"campaign",inferedValue:function(){return null},defaultValue:"city_type"},{name:"term",inferedValue:function(){return null},defaultValue:null},{name:"content",inferedValue:function(){return null},defaultValue:null}],i=[{name:"gclid",inferedValue:function(){return null},defaultValue:null},{name:"msclkid",inferedValue:function(){return null},defaultValue:null},{name:"network",inferedValue:function(){return null},defaultValue:null},{name:"keyword",inferedValue:function(){return null},defaultValue:null},{name:"matchtype",inferedValue:function(){return null},defaultValue:null},{name:"device",inferedValue:function(){return null},defaultValue:null},{name:"devicemodel",inferedValue:function(){return null},defaultValue:null},{name:"adposition",inferedValue:function(){return null},defaultValue:null},{name:"adgroup",inferedValue:function(){return null},defaultValue:null},{name:"location",inferedValue:function(){return null},defaultValue:null},{name:"creative",inferedValue:function(){return null},defaultValue:null},{name:"sitelink",inferedValue:function(){return null},defaultValue:null}];function u(){if((0,r.isEmptyReferrer)()||(0,r.isUniplacesReferrer)())return null;return(0,r.getReferrer)().host.split(".")[1]+"_organic"}function a(e,t){var n=t.origin,r=t.destination,o=t.language;return t.origin||t.destination||t.language?(n||"xxx")+"_"+(r||"xxx")+"_"+(o||"xxx"):"organic"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={SIGN_UP:"sign-up",BOOKING_REQUEST:"booking-request"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={GUEST:"guest",ACCOMMODATION_PROVIDER:"accommodation-provider"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={UPL_TOUCHES:"upl-touches-v1",UPL_ACTIONS:"upl-actions-v1",UPL_USERS:"upl-users-v1"}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.default={NAVIGATE:0,RELOAD:1,BACK_FORWARD:2,RESERVED:255}},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),o=function(e){return e&&e.__esModule?e:{default:e}}(n(9));var i={development:".uniplaces.lh",staging:".staging-uniplaces.com",production:".uniplaces.com"},u={development:"https://data-events.staging-uniplaces.com/streams",staging:"https://data-events.staging-uniplaces.com/streams",production:"https://data-events.uniplaces.com/streams"},a=new(function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.environment=o.default.STAGING}return r(e,[{key:"getEnvironment",value:function(){return this.environment}},{key:"setEnvironment",value:function(e){if(!this.isValidEnvironment(e))throw new Error("The environment '"+e+"' is not valid.");this.environment=e}},{key:"isValidEnvironment",value:function(e){return e===o.default.TEST||e===o.default.DEVELOPMENT||e===o.default.STAGING||e===o.default.PRODUCTION}},{key:"isDevelopment",value:function(){return this.environment===o.default.DEVELOPMENT}},{key:"getCookieDomain",value:function(){return i[this.environment]||i[o.default.STAGING]}},{key:"getDataInfrastructureUrl",value:function(){return u[this.environment]||u[o.default.STAGING]}}]),e}());t.default=a}]);