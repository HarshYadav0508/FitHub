const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const { connectToDatabase } = require('../config/db.js');

let userCollection;


const initializeDb = async () => {
    const db = await connectToDatabase();
    userCollection = db.userCollection;
};


const ensureDbInitialized = async () => {
    if (!userCollection) {
        await initializeDb();
    }
};

// Create a new user
exports.createUser = async (req, res) => {
    try {
        await ensureDbInitialized();
        const newUser = req.body;
        const result = await userCollection.insertOne(newUser);
        res.send(result);
    } catch (err) {
        console.error('Error creating user', err);
        res.status(500).send('Internal Server Error');
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        await ensureDbInitialized();
        const users = await userCollection.find({}).toArray();
        res.send(users);
    } catch (err) {
        console.error('Error getting users', err);
        res.status(500).send('Internal Server Error');
    }
};

// Get user by ID
exports.getUserById = async (req, res) => {
    try {
        await ensureDbInitialized();
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const user = await userCollection.findOne(query);
        if (!user) {
            return res.status(404).send('User not found');
        }
        res.send(user);
    } catch (err) {
        console.error('Error getting user by ID', err);
        res.status(500).send('Internal Server Error');
    }
};

// Get user by email
exports.getUserByEmail = async (req, res) => {
    try {
        await ensureDbInitialized();
        const email = req.params.email;
        const query = { email: email };
        const result = await userCollection.findOne(query);
        if (!result) {
            return res.status(404).send('User not found');
        }
        res.send(result);
    } catch (err) {
        console.error('Error getting user by email', err);
        res.status(500).send('Internal Server Error');
    }
};

// Delete a user
exports.deleteUser = async (req, res) => {
    try {
        await ensureDbInitialized();
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await userCollection.deleteOne(query);
        if (result.deletedCount === 0) {
            return res.status(404).send('User not found');
        }
        res.send(result);
    } catch (err) {
        console.error('Error deleting user', err);
        res.status(500).send('Internal Server Error');
    }
};

// Update a user
exports.updateUser = async (req, res) => {
    try {
        await ensureDbInitialized();
        const id = req.params.id;
        const updatedUser = req.body;
        const filter = { _id: new ObjectId(id) };
        const options = { upsert: true };
        const updateDoc = {
            $set: {
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.option,
                address: updatedUser.address,
                phone: updatedUser.phone,
                about: updatedUser.about,
                photoUrl: updatedUser.photoUrl,
                skills: updatedUser.skills ? updatedUser.skills : null,
            },
        };
        const result = await userCollection.updateOne(filter, updateDoc, options);
        if (result.matchedCount === 0) {
            return res.status(404).send('User not found');
        }
        res.send(result);
    } catch (err) {
        console.error('Error updating user', err);
        res.status(500).send('Internal Server Error');
    }
};
