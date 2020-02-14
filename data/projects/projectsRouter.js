const express = require('express');

const Projects = require('../helpers/projectModel.js');

const router = express.Router();

// middleware
router.use(express.json());

// endpoints

// get projects by id
router.get('/:id', (req, res) => {

    const { id } = req.params;

    Projects.get(id)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {
            res.status(500).json({ error: "Something went wrong." });
        })
});

// post to create a new project
router.post('/', (req, res) => {

    const newPost = req.body;

    Projects.insert(newPost)
        .then(post => {
            res.status(201).json(newPost);
        })
        .catch(err => {
            res.status(500).json({ error: "Something went wrong." });
        })

});

// put to modify a project by id
router.put('/:id', (req, res) => {

    const { id } = req.params;
    const editedProject = req.body;

    Projects.update(id, editedProject)
        .then(project => {
            res.status(200).json(project);
        })
        .catch(err => {
            res.status(500).json({ error: "Something went wrong." });
        })
})

// remove to delete a project by id
router.delete('/:id', (req, res) => {

    const { id } = req.params;

    Projects.remove(id)
        .then(removed => {
            res.status(200).json(removed);
        })
        .catch(err => {
            res.status(500).json({ error: "Something went wrong." });
        })

});

module.exports = router;