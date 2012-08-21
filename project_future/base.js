/**
*=======================================
* UPMan
* The user parse manager in browser extention
*=======================================
* @author Igor Kechaykin
* @version v 0.1
* @link http://github.com/kichMan/UPMan
*/
"use strict";

/*global unescape, us */

/* fake for development */
window.alert = function (s) { console.log(s); };

var us = us || {};

(function (window) {
	var self	= this,
		libList	= [ 'DOMHelper', 'BD' ];

	/*Init lib*/
	libList.forEach(function (el) {
		if(!self.hasOwnProperty(el)){
			throw new Error("The library " + el + " isn't available");
		}
	});

}.bind(us))(window);

