
const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return res.status(401).send({ error: true, message: 'Unauthorized access' });
    }
    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_KEY, (err, decoded) => {
        if (err) {
            return res.status(403).send({ error: true, message: 'Forbidden user or token has expired' });
        }
        req.decoded = decoded;
        next();
    });
};

const verifyAdmin = async (req, res, next) => {
    const email = req.decoded.email;
    const user = await req.db.userCollection.findOne({ email: email });
    if (user.role === 'admin') {
        next();
    } else {
        return res.status(401).send({ error: true, message: 'Unauthorized access' });
    }
};

const verifyInstructor = async (req, res, next) => {
    const email = req.decoded.email;
    const user = await req.db.userCollection.findOne({ email: email });
    if (user.role === 'instructor' || user.role === 'admin') {
        next();
    } else {
        return res.status(401).send({ error: true, message: 'Unauthorized access' });
    }
};

module.exports = {
    verifyJWT,
    verifyAdmin,
    verifyInstructor
};
