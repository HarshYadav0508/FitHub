

const stripe = require('stripe')(process.env.PAYMENT_KEY);
const { ObjectId } = require('mongodb');
const { paymentCollection, classCollection, enrolledCollection, cartCollection } = require('../config/db.js');

const createPaymentIntent = async (req, res) => {
    const { price } = req.body;
    const amount = parseInt(price) * 100; // Convert to cents
    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: amount,
            currency: 'usd',
            payment_method_types: ['card']
        });
        res.send({ clientSecret: paymentIntent.client_secret });
    } catch (error) {
        res.status(500).send({ error: 'Failed to create payment intent' });
    }
};

const savePaymentInfo = async (req, res) => {
    const paymentInfo = req.body;
    const classesId = paymentInfo.classesId;
    const userEmail = paymentInfo.userEmail;
    const singleClassId = req.query.classId;

    try {
        let query;
        if (singleClassId) {
            query = { classId: singleClassId, email: userEmail };
        } else {
            query = { classId: { $in: classesId } };
        }

        const classesQuery = { _id: { $in: classesId.map(id => new ObjectId(id)) } };
        const classes = await classCollection.find(classesQuery).toArray();
        const newEnrolledData = {
            userEmail: userEmail,
            classId: singleClassId ? new ObjectId(singleClassId) : classesId.map(id => new ObjectId(id)),
            transactionId: paymentInfo.transactionId
        };

        const updatedDoc = {
            $set: {
                totalEnrolled: classes.reduce((total, current) => total + current.totalEnrolled, 0) + 1 || 0,
                availableSeats: classes.reduce((total, current) => total + current.availableSeats, 0) - 1 || 0
            }
        };

        const updatedResult = await classCollection.updateMany(classesQuery, updatedDoc, { upsert: true });
        const enrolledResult = await enrolledCollection.insertOne(newEnrolledData);
        const deletedResult = await cartCollection.deleteMany(query);
        const paymentResult = await paymentCollection.insertOne(paymentInfo);

        res.send({ paymentResult, deletedResult, enrolledResult, updatedResult });
    } catch (error) {
        res.status(500).send({ error: 'Failed to save payment info' });
    }
};

const getPaymentHistory = async (req, res) => {
    const email = req.params.email;
    try {
        const query = { userEmail: email };
        const total = await paymentCollection.find(query).sort({ date: -1 }).toArray();
        res.send(total);
    } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve payment history' });
    }
};

const getPaymentHistoryLength = async (req, res) => {
    const email = req.params.email;
    try {
        const query = { userEmail: email };
        const result = await paymentCollection.countDocuments(query);
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve payment history length' });
    }
};

module.exports = {
    createPaymentIntent,
    savePaymentInfo,
    getPaymentHistory,
    getPaymentHistoryLength
};
