const Item = require('../models/model.js');
const fetch = require('node-fetch');

// exports.create = (req, res) => {

// };

// exports.delete = (req, res) => {

// };

exports.findAll = (req, res) => {
    Item.find()
    .then(items => {
        console.log(items[1].movie.title)
        res.json(items)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.find = (req, res) => {
    let query = {}
    if (req.body.country) query = {$text: {$search: req.body.searchString }, countries: { $in: req.body.country } }
    else query = {$text: {$search: req.body.searchString }}
    Item.find(query)
    .sort({title: 1}) 
    .limit(30)
    .then(items => {
        const first = req.body.searchString.charAt(0).toUpperCase() + req.body.searchString.slice(1)

        res.json(items.sort((a,b) => a.title.includes(first) ? -1 : b.title.includes(first) ? 1 : 0))
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving notes."
        });
    });
};

exports.findByIdAndUpdate = (req, res) => {
    const url =`http://www.omdbapi.com/?t=${req.body.formatedQuery}&y=${req.body.query.year}&apikey=${process.env.API_KEY}`
    fetch(url)
    .then(response => response.json())
    .then(data => {
        Item.findByIdAndUpdate(req.params.itemId, {
            $set: {
                actors: data.Actors,
                director: data.Director,
                genre: data.Genre,
                imdbId: data.imdbID,
                imdbRating: data.imdbRating,
                plot: data.Plot,
                poster: data.Poster,
                runtime: data.Runtime,
                type: data.Type
            }
        }, {
            new: true
        })
        .then(item => {
            console.log("Item :", item)
            res.json(item)
        })
    })
    .catch(err => console.log("Error: ", err))
};
