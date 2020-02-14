const express = require('express');

const Projects = require('../helpers/projectModel.js');
const Actions = require('../helpers/actionModel.js');

const router = express.Router();

// middleware
router.use(express.json());

// endpoints

// get actions by action id
router.get('/:id', (req, res) => {

    const { id } = req.params;

    Actions.get(id)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(err => {
            res.status(500).json({ error: "Something went wrong." });
        })
});

// post to create new action
router.post('/:id/new', validateProjectId, (req, res) => {

    console.log(`REQUEST BODY: `, req.body);
    const { id } = req.params;
    const newAction = { ...req.body, project_id: id };
    console.log(newAction);

    Actions.insert(newAction)
        .then(action => {
            res.status(201).json(action);
        })
        .catch(err => {
            res.status(400).json({ error: "We could not create that action." });
        })

});

// put to modify an action by its action id
router.put('/:id', (req, res) => {

    const { id } = req.params;
    const editedAction = req.body;

    Actions.update(id, editedAction)
        .then(action => {
            res.status(200).json(action);
        })
        .catch(err => {
            res.status(500).json({ error: "Something went wrong." });
        })
});

// delete to delete an action by id
router.delete('/:id', (req, res) => {

    const { id } = req.params;

    Actions.remove(id)
        .then(deleted => {
            res.status(200).json(deleted);
        })
        .catch(err => {
            res.status(500).json({ error: "Something went wrong." });
        })
});


// our custom middleware for validation
function validateProjectId(req, res, next) {

    const { id } = req.params;
    Projects.get(id)
        .then(project => {
            if (!project) {
                res.status(400).json({ error: "We could not create an action for that project." });
            }
            else {
                next();
            }
        })
}

module.exports = router;