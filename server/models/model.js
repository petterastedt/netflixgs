const mongoose = require('mongoose');

const ItemSchema = mongoose.Schema({
        actors: String,
        countries: [],
        director: String,
        genre: String,
        imdbId: String,
        imdbRating: String,
        plot: String,
        poster: String,
        runtime: String,
        title: String,
        type: String,
        year: String
}, {
    timestamps: true
});

ItemSchema.index({title: 'text', actors: 'text', director: 'text'});
module.exports = mongoose.model('Item', ItemSchema);
