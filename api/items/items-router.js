const express    = require('express');
const model      = require('./items-model');
const middleware = require('./items-middleware');
const router = express.Router();

router.get('/', (req, res, next) => {
    model.fetch()
        .then(success => {
            res.status(200).send(success);
        })
        .catch(next);
})

router.get('/:id', (req, res, next) => {
    model.fetchBy({'id':req.params.id})
        .then(success => {
            res.status(200).send(success);
        })
        .catch(next);
});

router.post('/', middleware.validateItem, middleware.checkItemNameExists, (req, res, next) => {
    const item = req.body;
    model.create(item)
        .then(success => {
            res.status(201).send(success);
        })
        .catch(next);
});

router.put('/:id', middleware.validateItem, middleware.checkItemNameExists, (req, res, next) => {
    const id   = req.params.id;
    const item = req.body;
    model.update(id, item)
        .then(success => {
            res.status(200).send(success);
        })
        .catch(next);
});

router.delete('/:id', async (req, res, next) => {
    const id = req.params.id;
    const deleted = await model.fetchBy({'id': id});
    model.remove(id)
        .then(success => {
            res.status(200).send(deleted);
        })
        .catch(next);
});

module.exports = router;