const Users = require('../../api/users/users-model');

const checkUsernameExists = async (req, res, next) => {
	const { username } = req.body;
	const [result] = await Users.findBy({ username });
	if (result) {
		next({ status: 422, message: 'username taken' });
	} else {
		next();
	}
};

const checkUsernamePasswordProvided = (req, res, next) => {
	const { username, password } = req.body;
	try {
		if (!username || !password) {
			next({ status: 422, message: 'username and password required' });
		} else {
			next();
		}
	} catch (err) {
		next(err);
	}
};

module.exports = {
	checkUsernameExists,
	checkUsernamePasswordProvided,
};
