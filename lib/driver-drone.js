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

var DriverDrone = module.exports = function DriverDrone(opts) {

    Cylon.Logger.info('Driver#construct');

    DriverDrone.__super__.constructor.apply(this, arguments);

    this.setupCommands(Commands);

    this.opts = opts || {};

};

Cylon.Utils.subclass(DriverDrone, Cylon.Driver);

DriverDrone.prototype.start = function (callback) {

    Cylon.Logger.info('Driver#start');

    Events.forEach(function (e) {
        this.defineDriverEvent(e);
    }.bind(this));

    var drone = this.connection.connector;

    drone.connect(function () {

        Cylon.Logger.debug('Connected to Rolling Spider');

      drone.setup(function () {

        Cylon.Logger.debug("Setting up Rolling Spider");

        drone.flatTrim();

        drone.startPing();

        drone.flatTrim();

            setTimeout(function () {

        Cylon.Logger.info("Rolling Spider ready");

        callback();

      }, 1000);

        });

    });
};

DriverDrone.prototype.halt = function (callback) {

    Cylon.Logger.info('Driver#halt');

    drone.disconnect(function () {

        Cylon.Logger.info('Disconnected from drone');

        callback();

    });

};

/**
 * Gets the Drones battery level
 *
 * @returns {Number} between 0 and 100
 */
DriverDrone.prototype.getBatteryLevel = function () {

    return this.connection.connector.status.battery;

};