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
- **JSON-Server**: Mock backend for development.
- **GraphQL**: Advanced query handling.

### Database
- **MongoDB**: NoSQL database for storing user and blog data.

### DevOps
- **Docker**: Containerized deployment.
- **CI/CD**: Continuous integration and delivery.

## Installation

1. Clone the repository:
   ```bash
   git clone git@github.com:kellylino/BlogList.git
2. Set Up Environment Variables:
   plaintext
   PORT=3001/any port
   MONGODB_URI=<your-mongodb-uri>
   JWT_SECRET=<your-secret-key>   
4. Install dependencies and Start the development server:
   ```bash
   npm install
   npm start
   
