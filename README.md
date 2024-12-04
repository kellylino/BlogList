# BlogList Application

## Overview
BlogList is a web application designed for users to create, manage, and interact with blogs. Users can add new blog posts, comment on existing posts, and engage with content shared by other users. This project demonstrates CRUD operations, REST API integration, and user authentication.

## Features
- **User Authentication:** Secure login and session management.
- **Blog Management:** Add, update, delete, and list blogs.
- **Comments System:** Interact with blogs via comments.
- **Following Functionality:** View blogs from followed users.
- **Responsive UI:** Optimized for various screen sizes.

## Technologies Used

### Frontend
- **React**: For building the user interface.
- **Redux**: State management.
- **React Bootstrap**: Styling and layout.
- **Axios**: API integration.

### Backend
- **Node.js**: Server-side runtime.
- **Express.js**: Backend framework.

### Cypress Testing

Cypress is used in this project for end-to-end testing to ensure the application behaves as expected. The test suite covers key functionalities such as:

- **Login and Authentication**: Verifies that users can log in with correct credentials and handles incorrect login attempts.
- **Blog Creation**: Ensures that users can create new blogs with the required fields and the blog appears correctly on the app.
- **Like and Remove Blog**: Validates the like functionality and ensures blogs can be removed by the creator.
- **Remove Button Visibility**: Confirms that the "Remove" button is only visible to the blog creator.
- **Sorting Blogs by Likes**: Verifies that blogs are correctly ordered based on the number of likes.

### Database
- **MongoDB**: NoSQL database for storing user and blog data.

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:kellylino/BlogList.git
2. Set Up Environment Variables:
   ```plaintext
   PORT=3001/any port
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-secret-key>   
4. Install dependencies and Start the development server:
   ```bash
   npm install
   npm start
   
