const model = require('./items-model');

const validateItem = (req, res, next) => {
    const {item_name, item_description} = req.body;
    if(!item_name || !item_description) {
        res.status(400).send({
            message: 'item name, and or description is missing'
        });
    } else {
        next();
    }
}

const checkItemNameExists = (req, res, next) => {
    const {item_name} = req.body;
    model.fetchBy({'item_name': item_name})
        .then(success => {
            if(success) {
                res.status(400).send({
                    message: 'item name is taken'
                })    
            } else {
                next();
            }
        })
        .catch(err => {
            res.status(500).send({
                message: 'error in request'
            })
        })
};

module.exports = {
    validateItem,
    checkItemNameExists
}