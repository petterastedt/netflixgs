module.exports = (app) => {
    const items = require('../controllers/item.controller.js');

    // Create a new item
    // app.post('/items', items.create);

    // Retrieve all items
    app.get('/items', items.findAll);

    // Retrieve a single item with noteId
    app.post('/search', items.find);

    // Update an item with noteId
    app.put('/items/:itemId', items.findByIdAndUpdate);

    // Delete an item with noteId
    // app.delete('/notes/:noteId', notes.delete);
} 