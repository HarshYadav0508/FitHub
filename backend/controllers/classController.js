

const { ObjectId } = require('mongodb');
const { classCollection } = require('../config/db.js');

const addNewClass = async (req, res) => {
    const newClass = req.body;
    try {
        const result = await classCollection.insertOne(newClass);
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: 'Failed to add class' });
    }
};

const getClassesByInstructorEmail = async (req, res) => {
    const email = req.params.email;
    try {
        const result = await classCollection.find({ instructorEmail: email }).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve classes' });
    }
};

const getApprovedClasses = async (req, res) => {
    try {
        const result = await classCollection.find({ status: "approved" }).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve approved classes' });
    }
};

const getClassById = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await classCollection.findOne({ _id: new ObjectId(id) });
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve class' });
    }
};

const getClassesByInstructorName = async (req, res) => {
    const name = req.params.name;
    try {
        const result = await classCollection.find({ instructorName: name }).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve classes' });
    }
};

const manageClasses = async (req, res) => {
    try {
        const result = await classCollection.find().toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: 'Failed to manage classes' });
    }
};

const updateClassStatus = async (req, res) => {
    const id = req.params.id;
    const { status, reason } = req.body;
    try {
        const result = await classCollection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { status, reason } },
            { upsert: true }
        );
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: 'Failed to update class status' });
    }
};

const updateClassInfo = async (req, res) => {
    const id = req.params.id;
    const updatedClass = req.body;
    try {
        const result = await classCollection.updateOne(
            { _id: new ObjectId(id) },
            {
                $set: {
                    name: updatedClass.name,
                    availableSeats: updatedClass.availableSeats,
                    price: updatedClass.price,
                    videoLink: updatedClass.videoLink,
                    description: updatedClass.description,
                    instructorName: updatedClass.instructorName,
                    instructorEmail: updatedClass.instructorEmail,
                    status: updatedClass.status
                }
            },
            { upsert: true }
        );
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: 'Failed to update class information' });
    }
};

module.exports = {
    addNewClass,
    getClassesByInstructorEmail,
    getApprovedClasses,
    getClassById,
    getClassesByInstructorName,
    manageClasses,
    updateClassStatus,
    updateClassInfo
};
