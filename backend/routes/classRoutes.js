

const express = require('express');
const {
    addNewClass,
    getClassesByInstructorEmail,
    getApprovedClasses,
    getClassById,
    getClassesByInstructorName,
    manageClasses,
    updateClassStatus,
    updateClassInfo
} = require('../controllers/classController.js');
const { verifyJWT, verifyInstructor, verifyAdmin } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/new-class', verifyJWT, verifyInstructor, addNewClass);
router.get('/classes/:email', verifyJWT, verifyInstructor, getClassesByInstructorEmail);
router.get('/classes', getApprovedClasses);
router.get('/class/:id', getClassById);
router.get('/classes-by-instructor/:name', getClassesByInstructorName);
router.get('/classes-manage', manageClasses);
router.patch('/class-status/:id', verifyJWT, verifyAdmin, updateClassStatus);
router.put('/update-class/:id', verifyJWT, verifyInstructor, updateClassInfo);

module.exports = router;
