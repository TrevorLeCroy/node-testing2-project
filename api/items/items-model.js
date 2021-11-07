const db = require('../../data/db-config');

const fetch = async () => {
    return await db('items');
}

const fetchBy = async (condition) => {
    return await db('items').where(condition).first();
}

const create = async (data) => {
    const [id] = await db('items').insert(data);
    return await fetchBy({'id': id});
}

const update = async (id, data) => {
    await db('items').where({'id': id}).update(data);
    return await fetchBy({'id': id});
}

const remove = async (id) => {
    // await fetchBy({'id': id});
    return await db('items').where({'id': id}).delete();
}

module.exports = {
    fetch,
    fetchBy,
    create,
    update,
    remove
};