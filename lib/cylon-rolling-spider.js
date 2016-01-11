/**
 * cylon-rolling-spider
 * http://cylonjs.com
 *
 * Copyright (c) 2015 Chris Taylor
 * Licensed under the MIT License (MIT).
 */

'use strict';

var Adaptors = {
	"rolling-spider": require('./adaptor-drone'),
	"rolling-spider-swarm": require('./adaptor-swarm')
};
var	Drivers = {
	"rolling-spider": require('./driver-drone'),
	"rolling-spider-swarm": require('./driver-swarm')
};

module.exports = {
	
	adaptors: ["rolling-spider","rolling-spider-swarm"],

	drivers: ["rolling-spider","rolling-spider-swarm"],
	

	// Modules intended to be used with yours, e.g. ['cylon-gpio']
	dependencies: [],

	adaptor: function (opts) {
		opts = opts || {};

	    if (!Adaptors[opts.adaptor]) {
	      return null;
	    }

	    return new Adaptors[opts.adaptor](opts);
	},

	driver: function(opts) {
	    opts = opts || {};

	    if (!Drivers[opts.driver]) {
	      return null;
	    }

	    return new Drivers[opts.driver](opts);
	  }
};
