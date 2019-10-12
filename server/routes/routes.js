module.exports = (app) => {
    const items = require('../controllers/item.controller.js');

    // app.post('/items', items.create);

    app.get('/items', items.findAll);

    app.post('/search', items.find);

    app.put('/items/:itemId', items.findByIdAndUpdate);

    // app.delete('/items/:itemId', items.delete);
} 