
const express = require('express');
const cors = require('cors');
const { connectToDatabase } = require('./config/db.js');
const userRoutes = require('./routes/userRoutes');
const classRoutes = require('./routes/classRoutes');
const cartRoutes = require('./routes/cartRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const enrollmentRoutes = require('./routes/enrollmentRoutes');
const appliedRoutes = require('./routes/appliedRoutes');
const adminRoutes = require('./routes/adminRoutes');
const { verifyJWT } = require('./middleware/authMiddleware');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Connect to Database and Attach to Request Object
connectToDatabase().then(({ client, database }) => {
    console.log('Connected to MongoDB');

    // Attach the database instance to the request object
    app.use((req, res, next) => {
        req.db = database;
        next();
    });

    // Routes
    app.use('/api/users', userRoutes);
    app.use('/api/classes', classRoutes);
    app.use('/api/cart', cartRoutes);
    app.use('/api/payments', paymentRoutes);
    app.use('/api/enrollments', enrollmentRoutes);
    app.use('/api/applied', appliedRoutes);
    app.use('/api/admin', adminRoutes);

    // Default route
    app.get('/', (req, res) => {
        res.send('FitHub API is running');
    });

    // Start server
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}).catch(error => {
    console.error('Failed to connect to MongoDB', error);
    process.exit(1);
});
