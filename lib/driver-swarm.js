/**
 * cylon-rolling-spider driver
 * http://cylonjs.com
 *
 * Copyright (c) 2015 Chris Taylor
 * Licensed under the MIT License (MIT).
 */

"use strict";

var Cylon = require('cylon'),
	Commands = require('./commands'),
	Events = require('./events');

var DriverSwarm = module.exports = function DriverSwarm(opts) {

	Cylon.Logger.info('DriverSwarm#construct');

	DriverSwarm.__super__.constructor.apply(this, arguments);

	this.setupCommands(Commands);

	this.opts = opts || {};

};

Cylon.Utils.subclass(DriverSwarm, Cylon.Driver);

DriverSwarm.prototype.start = function (callback) {

	Cylon.Logger.info('DriverSwarm#start');

	Events.forEach(function (e) {
		this.defineDriverEvent(e);
	}.bind(this));

	var swarm = this.connection.connector;

	swarm.assemble(function(){
		Cylon.Logger.info("Assembling swarm");
		callback();
	});
	

	// drone.connect(function () {

	// 	Cylon.Logger.debug('Connected to Rolling Spider');

	// 	  drone.setup(function () {

	// 	    Cylon.Logger.debug("Setting up Rolling Spider");

	// 	    drone.flatTrim();

	// 	    drone.startPing();

	// 	    drone.flatTrim();

	// 			setTimeout(function () {

	//         Cylon.Logger.info("Rolling Spider ready");

	//         callback();

	//       }, 1000);

	// 	});

	// });
};

DriverSwarm.prototype.halt = function (callback) {

	Cylon.Logger.info('Driver#halt');

	swarm.land();

	swarm.release(function(){
		Cylon.Logger.info('Release swarm')
		callback();
	});
	

	// drone.disconnect(function () {

	// 	Cylon.Logger.info('Disconnected from drone');

	// 	callback();

	// });

};

/**
 * Gets the Drones battery level
 *
 * @returns {Number} between 0 and 100
 */
DriverSwarm.prototype.getBatteryLevel = function () {

	return this.connection.connector.status.battery;

};
