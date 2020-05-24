/*============================
    check user's session
============================*/
'use strict'

// utils
const responseHandler = require('../utils/responseHandler');

const authenticator = (req, res, next) => {
	const p = new Promise(
		(resolve, reject) => {
			if (req.session.userID !== undefined || req.session.username !== undefined) {
				resolve();
			} else {
				reject();
			}
		}
	)
	p.then(() => {
		next();
	})
	.catch(function () {
		responseHandler.fail(res, 401, "로그인이 필요합니다");
	});
};

module.exports = authenticator;
