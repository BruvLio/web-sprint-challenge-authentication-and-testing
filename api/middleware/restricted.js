const jwt = require('jsonwebtoken');
const { SECRET } = require('../secrets/secret');

const restricted = (req, res, next) => {
	const token = req.headers.authorization;
	if (!token) {
		return next({ status: 401, message: 'token required' });
	}
	jwt.verify(token, SECRET, (err, decodedToken) => {
		if (err) {
			next({ status: 401, message: 'token invalid' });
		} else {
			req.decodedToken = decodedToken;
			next();
		}
	});
};

module.exports = restricted;

// module.exports = {
// 	// -- Noks why can't i export the middleware like this?
// 	restricted,
// };

// module.exports = (req, res, next) => {
// 	next();

// 	/*
//     IMPLEMENT

//     1- On valid token in the Authorization header, call next.

//     2- On missing token in the Authorization header,
//       the response body should include a string exactly as follows: "token required".

//     3- On invalid or expired token in the Authorization header,
//       the response body should include a string exactly as follows: "token invalid".
//   */
// };
