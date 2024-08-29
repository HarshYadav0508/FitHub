

const { appliedCollection } = require('../config/db.js');

const applyAsInstructor = async (req, res) => {
    try {
        const data = req.body;
        const result = await appliedCollection.insertOne(data);
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: 'Failed to apply as an instructor' });
    }
};

const getAppliedInstructors = async (req, res) => {
    const email = req.params.email;
    try {
        const result = await appliedCollection.findOne({ email });
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve applied instructors' });
    }
};

module.exports = {
    applyAsInstructor,
    getAppliedInstructors
};
