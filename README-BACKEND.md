            #**FitHub Backend API Documentation**

**Overview**

The FitHub backend API provides a robust and modular framework for managing users, classes, carts, payments, enrollments, and applications for instructors. Built with Node.js, Express, and MongoDB, this API supports a variety of features for a fitness and education platform.

**Table of Contents**

1.Setup and Installation
2.Environment Variables
3.API Endpoints
4.User Endpoints
5.Class Endpoints
6.Cart Endpoints
7.Payment Endpoints
8.Enrollment Endpoints
9.Applied Instructors Endpoints
10.Admin Endpoints
11.Models
12.Testing


**Setup and Installation**

Prerequisites

Node.js (v14 or higher)
MongoDB
Stripe account (for payment processing)
dotenv package for environment variables



            **Installation**

Clone the repository:

git clone https://github.com/yourusername/fithub-backend.git


Install dependencies:

npm install


**Set up environment variables:**

Create a .env file in the root directory and add the following variables:


PORT=3000
DB_URL=mongodb://localhost:27017/fithub
PAYMENT_KEY=your_stripe_payment_key
ACCESS_SECRET=your_jwt_secret_key


**Start the server:**

npm start


            **Environment Variables**

PORT: Port number on which the server will listen (default is 3000).

DB_URL: MongoDB connection string.

PAYMENT_KEY: Stripe payment key for payment processing.

ACCESS_SECRET: Secret key for JWT token generation and verification.


            **API Endpoints**

**User Endpoints**

POST /new-user ==>
Create a new user.
Request body: { name, email, role, address, phone, about, photoUrl, skills }
Response: { result }


GET /users ==>

Get all users.
Response: [ { user } ]


GET /users/ ==>

Get a user by ID.
Response: { user }

GET /user/ ==>

Get a user by email (requires JWT token).
Response: { user }


DELETE /delete-user/ ==>

Delete a user by ID (requires JWT token and admin role).
Response: { result }


PUT /update-user/ ==>

Update a user by ID (requires JWT token and admin role).
Request body: { name, email, role, address, phone, about, photoUrl, skills }
Response: { result }


**Class Endpoints**


POST /new-class ==>

Create a new class (requires JWT token and instructor role).
Request body: { name, instructorName, instructorEmail, description, videoLink, price, availableSeats, status }
Response: { result }


GET /classes/ ==>

Get all classes added by an instructor (requires JWT token and instructor role).
Response: [ { class } ]


GET /classes ==>

Get all approved classes.
Response: [ { class } ]


GET /class/ ==>

Get a class by ID.
Response: { class }


GET /classes/ ==>

Get classes by instructor name.
Response: [ { class } ]


GET /classes-manage ==>

Get all classes (admin access required).
Response: [ { class } ]


PATCH /class-status/ ==>

Update class status and reason (requires JWT token and admin role).
Request body: { status, reason }
Response: { result }


PUT /update-class/ ==>

Update class information (requires JWT token and instructor role).
Request body: { name, availableSeats, price, videoLink, description, instructorName, instructorEmail, status }
Response: { result }


**Cart Endpoints**

POST /add-to-cart ==>

Add a class to the cart (requires JWT token).
Request body: { userEmail, classId }
Response: { result }


GET /cart-item/ ==>

Get cart item by class ID (requires JWT token).
Response: { classId }


GET /cart/ ==>

Get cart items for a user (requires JWT token).
Response: [ { class } ]


DELETE /delete-cart-item/ ==>

Delete a cart item by class ID (requires JWT token).
Response: { result }


**Payment Endpoints**


POST /create-payment-intent ==>

Create a payment intent (requires JWT token).
Request body: { price }
Response: { clientSecret }


POST /payment-info ==>

Save payment information (requires JWT token).
Request body: { userEmail, classId, transactionId }
Response: { paymentResult, deletedResult, enrolledResult, updatedResult }


GET /payment-history/ ==>

Get payment history for a user.
Response: [ { payment } ]


GET /payment-history-length/ ==>

Get the number of payments for a user.
Response: { count }
Enrollment Endpoints


GET /popular-classes ==>

Get the top 6 popular classes.
Response: [ { class } ]


GET /popular-instructors ==>

Get the top 6 popular instructors.
Response: [ { instructor } ]


GET /instructors ==>

Get all instructors.
Response: [ { instructor } ]


GET /enrolled-classes/ ==>

Get all classes enrolled by a user (requires JWT token).
Response: [ { class, instructor } ]
Applied Instructors Endpoints


POST /as-instructor ==>

Apply as an instructor.
Request body: { email, status }
Response: { result }


GET /applied-instructors/ ==>

Get the application status of an instructor.
Response: { application }



**Admin Endpoints**

GET /admin-stats ==>

Get admin statistics (requires JWT token and admin role).
Response: { approvedClasses, pendingClasses, instructors, totalClasses, totalEnrolled }


            **Models**

User Model: Defines the schema for users.

Class Model: Defines the schema for classes.

Cart Model: Defines the schema for cart items.

Payment Model: Defines the schema for payments.

Enrollment Model: Defines the schema for enrollments.

Applied Model: Defines the schema for applied instructors.


            **Testing**

To test the API, you can use tools like Postman or cURL. Ensure you provide the necessary JWT tokens for protected routes.