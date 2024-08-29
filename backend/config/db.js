
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = process.env.DB_URL;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true
    }
});

const connectToDatabase = async () => {
    try {
        await client.connect();
        console.log("Connected to MongoDB from config db.js");
        const database = client.db("fithub");
        return {
            client,
            database,
            userCollection: database.collection("users"),
            classCollection: database.collection("classes"),
            cartCollection: database.collection("cart"),
            paymentCollection: database.collection("payments"),
            enrolledCollection: database.collection("enrolled"),
            appliedCollection: database.collection("applied")
        };
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
};

module.exports = {
    connectToDatabase
};
