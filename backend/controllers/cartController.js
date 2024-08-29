
const { ObjectId } = require('mongodb');
const { cartCollection, classCollection } = require('../config/db.js');

const addToCart = async (req, res) => {
    const newCartItem = req.body;
    try {
        const result = await cartCollection.insertOne(newCartItem);
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: 'Failed to add item to cart' });
    }
};

const getCartItemById = async (req, res) => {
    const id = req.params.id;
    const email = req.body.email;
    try {
        const result = await cartCollection.findOne({ classId: id, userMail: email }, { projection: { classId: 1 } });
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve cart item' });
    }
};

const getCartByUserEmail = async (req, res) => {
    const email = req.params.email;
    try {
        const cart = await cartCollection.find({ email }).toArray();
        const classIds = cart.map(cartItem => new ObjectId(cartItem.classId));
        const classes = await classCollection.find({ _id: { $in: classIds } }).toArray();
        res.send(classes);
    } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve cart items' });
    }
};

const deleteCartItem = async (req, res) => {
    const id = req.params.id;
    try {
        const result = await cartCollection.deleteOne({ classId: id });
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: 'Failed to delete cart item' });
    }
};

module.exports = {
    addToCart,
    getCartItemById,
    getCartByUserEmail,
    deleteCartItem
};
