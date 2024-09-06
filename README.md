##FitHub##
FitHub is a full-stack fitness marketplace web application where users can explore fitness classes, book instructors, and manage their subscriptions. The platform also allows instructors to apply, manage their classes, and track their students.

##Table of Contents##
Features
Tech Stack
Installation
Usage
API Endpoints
Screenshots
Contributing
License


##Features##

User Authentication: Google OAuth and regular login flow.

Instructor Application: Users can apply to become instructors.

Classes Management: Admin and instructors can manage class enrollments, pending, and approved classes.

Dashboards: Admin, Instructor and User individual dashboards.

Admin DAshboard: Admin can manage user, classes and approves user to instructors.

Payment Integration: Stripe integration for payments.

Responsive UI: Optimized for mobile and desktop views.

Dark Mode: Full dark mode support.


##Tech Stack##
Frontend: React, Tailwind CSS
Backend: Node.js, Express
Database: MongoDB
Authentication: Firebase Auth, Google OAuth
Payments: Stripe
Image Hosting: ImgBB API for course thumbnails


##Installation##
Clone the repository:

bash
Copy code
git clone https://github.com/your-username/fithub.git
cd fithub
Install dependencies for both frontend and backend:

bash
Copy code
npm install
cd client
npm install
cd ../server
npm install
Create a .env file in the root and add your environment variables:

env
Copy code
MONGO_URI=your-mongo-uri
STRIPE_SECRET_KEY=your-stripe-key
IMGBB_API_KEY=your-imgbb-api-key
Start the development servers:

For frontend:

bash
Copy code
cd client
npm start
For backend:

bash
Copy code
cd server
npm run dev

##Usage##

User Registration/Login: Users can log in using Google or manually sign up.

Explore Classes: Browse available fitness classes and instructors.

Apply as Instructor: If you’re a user, you can apply to become an instructor.

Enroll in Classes: Add classes to your cart, make payments through Stripe, and manage your enrolled classes.



API Endpoints
User Management

POST /api/auth/login: Logs in a user.
POST /api/auth/register: Registers a new user.
GET /api/auth/user: Fetch current user details.
Instructor Management

POST /api/instructor/apply: Apply to become an instructor.
GET /api/instructors: Get all instructors.
Class Management

POST /api/class/new: Add a new class (instructor only).
GET /api/classes: Fetch all available classes.
POST /api/enroll: Enroll in a class (users).
Screenshots
