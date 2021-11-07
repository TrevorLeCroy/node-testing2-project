const server  = require('../api/server');
const model  = require('../api/items/items-model');
const db     = require('../data/db-config');
const request = require('supertest');

const waterBottle = {item_name: 'Water Bottle', item_description: 'Cool water'};
const soda        = {item_name: 'Generic Brand Soda', item_description: 'Generic Brand Soda'};

beforeAll(async() => {
    await db.migrate.rollback();
    await db.migrate.latest();
});
beforeEach(async() => {
    await db('items').truncate();
});
afterAll(async() => {
    await db.destroy();
});

it('correct env', () => {
    expect(process.env.DB_ENV).toBe('testing');
});

describe('Items Model', () => {
    describe('get function', () => {
        it('returns correct status code', async() => {
            const expectedStatusCode = 200;
            const response = await request(server).get('/api/items/');
            expect(response.status).toEqual(expectedStatusCode);
        });
        it('returns all items in the db', async () => {
            let all = await model.fetch();
            let dbAll = await db('items');
            expect(all).toEqual(dbAll);
        });
    });
    describe('getBy function', () => {
        it('returns correct status code', async() => {
            const expectedStatusCode = 200;
            const response = await request(server).get('/api/items/:id');
            expect(response.status).toEqual(expectedStatusCode);
        });
        it('returns correct item when id is specified', async() => {
            const item    = await db('items').where({'id': 0}).first();
            const getItem = await model.fetchBy({'id':0});
            expect(getItem).toEqual(item);
        });
    });
    describe('create function', () => {
        it('should insert the provided items into the db', async() => {
            await model.create(soda);
            await model.create(waterBottle);
            const items = await db('items');
            expect(items).toHaveLength(2);
        });
    });
    describe('put function', () => {
        it('should update the provided item in the db', async() => {
            const item = await model.create(soda);
            const newItem = {item_name: 'Coldbrand Soda', ...item};
            await db('items').where({'id':item.id}).update(newItem);
            const updatedItem = await model.fetchBy({'id':item.id});
            expect(updatedItem).toEqual(newItem);
        });
    });
});