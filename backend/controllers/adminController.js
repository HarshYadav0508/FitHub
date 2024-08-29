
const { classCollection, userCollection, enrolledCollection } = require('../config/db.js');

const getAdminStats = async (req, res) => {
    try {
        const approvedClasses = (await classCollection.find({ status: 'approved' }).toArray()).length;
        const pendingClasses = (await classCollection.find({ status: 'pending' }).toArray()).length;
        const instructors = (await userCollection.find({ role: 'instructor' }).toArray()).length;
        const totalClasses = (await classCollection.find().toArray()).length;
        const totalEnrolled = (await enrolledCollection.find().toArray()).length;

        const result = {
            approvedClasses,
            pendingClasses,
            instructors,
            totalClasses,
            totalEnrolled
        };
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: 'Failed to get admin stats' });
    }
};

module.exports = {
    getAdminStats
};
