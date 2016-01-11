/**
 * cylon-rolling-spider adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2015 Chris Taylor
 * Licensed under the MIT License (MIT).
 */

"use strict";

var Cylon = require('cylon'),
	Swarm = require('rolling-spider').Swarm,
	Commands = require('./commands'),
	Events = require('./events');

var AdaptorSwarm = module.exports = function AdaptorSwarm(opts) {

	Cylon.Logger.info('Adaptor#construct');

	AdaptorSwarm.__super__.constructor.apply(this, arguments);

	this.opts = opts || {};
	this.uuid = this.opts.uuid || null;

	this.connector = null;
};

Cylon.Utils.subclass(AdaptorSwarm, Cylon.Adaptor);

AdaptorSwarm.prototype.connect = function (callback) {

	Cylon.Logger.info('Adaptor#connect');

	this.connector = new Swarm({membership: this.uuid,timeout:30});

	this.proxyMethods(Commands, this.connector, this);

	Events.forEach(function (name) {
		this.defineAdaptorEvent(name);
	}.bind(this));

	callback();

};

AdaptorSwarm.prototype.disconnect = function (callback) {

	Cylon.Logger.info('Adaptor#disconnect');

	// Don't need to do anything

	callback();
};
