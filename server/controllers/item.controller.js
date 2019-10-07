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
    console.log("data:", req.body.searchString, req.body.country)
    Item.find(query).limit(15)
    .then(items => {
        res.json(items)
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
        console.log("Response: ", data)
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

// exports.findByIdAndUpdate = (req, res) => {
//     Item.findByIdAndUpdate(req.params.itemId,  { $set: {
//         actors: req.body.Actors,
//         director: req.body.Director,
//         genre: req.body.Genre,
//         imdbId: req.body.imdbID,
//         imdbRating: req.body.imdbRating,
//         plot: req.body.Plot,
//         poster: req.body.Poster,
//         runtime: req.body.Runtime,
//         type: req.body.Type
//         }
//     }, {new: true})
//     .then(item => {
//         res.json(item)
//     })
// };
