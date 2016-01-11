/**
 * cylon-rolling-spider adaptor
 * http://cylonjs.com
 *
 * Copyright (c) 2015 Chris Taylor
 * Licensed under the MIT License (MIT).
 */

"use strict";

var Cylon = require('cylon'),
    RollingSpider = require('rolling-spider'),
    Commands = require('./commands'),
    Events = require('./events');

var AdaptorDrone = module.exports = function AdaptorDrone(opts) {

    Cylon.Logger.info('Adaptor#construct');

    AdaptorDrone.__super__.constructor.apply(this, arguments);

    this.opts = opts || {};
    this.uuid = this.opts.uuid || null;

    this.connector = null;
};

Cylon.Utils.subclass(AdaptorDrone, Cylon.Adaptor);

AdaptorDrone.prototype.connect = function (callback) {

    Cylon.Logger.info('Adaptor#connect');

    this.connector = new RollingSpider({uuid: this.uuid});

    this.proxyMethods(Commands, this.connector, this);

    Events.forEach(function (name) {
        this.defineAdaptorEvent(name);
    }.bind(this));

    callback();

};

AdaptorDrone.prototype.disconnect = function (callback) {

    Cylon.Logger.info('Adaptor#disconnect');

    // Don't need to do anything

    callback();
};