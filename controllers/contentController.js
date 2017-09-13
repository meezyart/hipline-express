const axios = require('axios');
const { cms } = require('../config');

const sync = require('./sync');

const apiRoot = `http://${cms.host}:${cms.port}/api`;

const initial = (req, res) => {
	axios.get(`${apiRoot}/initial`)
		.then(response => res.json(response.data))
		.catch(err => console.log(err.message));
};

const syncToCMS = (req, res) => {
	sync().then(response => {
		return res.json(response);
	});
};

module.exports = { initial, syncToCMS };