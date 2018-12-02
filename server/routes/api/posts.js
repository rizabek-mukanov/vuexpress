const express = require('express');
const mongodb = require('mongodb');

const router = express.Router();

// Get
router.get('/', async (req, res) => {
    const posts = await loadPostsCollection();
    res.send(await posts.find({}).toArray());
});

// Add
router.post('/', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.insertOne({
        text: req.body.text,
        createdAt: new Date()
    });
    res.status(201).send();
});

//Delete
router.delete('/:id', async (req, res) => {
    const posts = await loadPostsCollection();
    await posts.deleteOne({_id: new mongodb.ObjectID(req.params._id)});
    res.status(200).send();
});

async function loadPostsCollection(){
    const client = await mongodb.MongoClient.connect
    ('mongodb://pppppp:pppppp1@ds115854.mlab.com:15854/vuejsdb', {
            useNewUrlParser: true
});


return client.db('vuejsdb').collection('posts');
};

module.exports = router;