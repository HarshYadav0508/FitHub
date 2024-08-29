
const { ObjectId } = require('mongodb');
const { classCollection, enrolledCollection, userCollection } = require('../config/db.js');

const getPopularClasses = async (req, res) => {
    try {
        const result = await classCollection.find().sort({ totalEnrolled: -1 }).limit(6).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve popular classes' });
    }
};

const getPopularInstructors = async (req, res) => {
    try {
        const pipeline = [
            {
                $group: {
                    _id: "$instructorEmail",
                    totalEnrolled: { $sum: "$totalEnrolled" },
                }
            },
            {
                $lookup: {
                    from: "users",
                    localField: "_id",
                    foreignField: "email",
                    as: "instructor"
                }
            },
            {
                $project: {
                    _id: 0,
                    instructor: { $arrayElemAt: ["$instructor", 0] },
                    totalEnrolled: 1
                }
            },
            {
                $sort: { totalEnrolled: -1 }
            },
            {
                $limit: 6
            }
        ];
        const result = await classCollection.aggregate(pipeline).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve popular instructors' });
    }
};

const getInstructors = async (req, res) => {
    try {
        const result = await userCollection.find({ role: 'instructor' }).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve instructors' });
    }
};

const getEnrolledClasses = async (req, res) => {
    const email = req.params.email;
    try {
        const query = { userEmail: email };
        const pipeline = [
            {
                $match: query
            },
            {
                $lookup: {
                    from: "classes",
                    localField: "classId",
                    foreignField: "_id",
                    as: "classes"
                }
            },
            {
                $unwind: "$classes"
            },
            {
                $lookup: {
                    from: "users",
                    localField: "classes.instructorEmail",
                    foreignField: "email",
                    as: "instructor"
                }
            },
            {
                $project: {
                    _id: 0,
                    classes: 1,
                    instructor: { $arrayElemAt: ["$instructor", 0] }
                }
            }
        ];
        const result = await enrolledCollection.aggregate(pipeline).toArray();
        res.send(result);
    } catch (error) {
        res.status(500).send({ error: 'Failed to retrieve enrolled classes' });
    }
};

module.exports = {
    getPopularClasses,
    getPopularInstructors,
    getInstructors,
    getEnrolledClasses
};
