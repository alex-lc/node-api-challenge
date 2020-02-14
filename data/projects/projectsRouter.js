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
})

module.exports = router;