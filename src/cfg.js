const _ = require('lodash');

let config = {};

function cfg(key, defaultValue) {
	if (key in config) {
		return config[key];
	}

	return defaultValue;
}

cfg.get = function (key, defaultValue) {
	return cfg(key, defaultValue);
};

// set values in global config
// you can also give key as an object to assign all key values from it
cfg.set = function (key, value) {
	// if key is Object then merge it with existing config
	if (value === undefined && key instanceof Object) {
		config = _.assign(config, key);
		return null;
	}

	const prev = config[key];
	config[key] = value;
	return prev;
};

cfg.delete = function (key) {
	delete config[key];
};

cfg.is_production = function () {
	return process.env.NODE_ENV === 'production';
};

cfg.is_test = function () {
	return process.env.NODE_ENV === 'test';
};

cfg.is_dev = function () {
	return !cfg.is_production();
};

cfg.isProduction = cfg.is_production;
cfg.isProd = cfg.is_production;
cfg.is_prod = cfg.is_production;
cfg.isDev = cfg.is_dev;
cfg.isTest = cfg.is_test;

module.exports = cfg;
