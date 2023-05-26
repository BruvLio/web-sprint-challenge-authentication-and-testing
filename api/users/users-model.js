const db = require('../../data/dbConfig');

const find = async () => {
	return db('users');
};
const findBy = async (filter) => {
	return db('users').where(filter);
};

const findById = (id) => {
	return db('users').where('id', id).first();
};
const add = async (user) => {
	const [id] = await db('users').insert(user);
	return findById(id);
};

module.exports = {
	find,
	findBy,
	findById,
	add,
};
