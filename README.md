
# Task Management System API

This repository contains a comprehensive RESTful API for a task management system, developed using Node.js. The API is designed to provide robust functionality for managing users, tasks, and roles, with advanced features such as real-time updates, analytics, and caching.

---

## Features

### Core Functionality

1. **User Management**
   - **Registration**: Register users with email validation and strong password criteria.
   - **Login**: Authenticate users using JWT tokens, with rate-limiting to prevent brute-force attacks.
   - **Logout**: Securely invalidate JWT tokens.
   - **Profile Management**: Retrieve user profile information securely.

2. **Role-Based Access Control (RBAC)**
   - Roles: `Admin`, `Manager`, `User`.
   - Enforce endpoint-level access restrictions based on roles.

3. **Task Management**
   - CRUD operations for tasks, with fields such as title, description, due date, priority, and status.
   - Secure access control to ensure task operations are user-specific or team-specific.

4. **Task Assignment**
   - Assign tasks to users.
   - Managers can manage team-specific task assignments.

### Advanced Features

1. **Real-Time Updates**
   - Implemented using WebSockets (e.g., Socket.io).
   - Notify users about task changes in real-time.

2. **Analytics**
   - Endpoints to track completed, pending, and overdue tasks.
   - Provide task statistics by user and team.

3. **Caching**
   - Utilize Redis for caching frequently accessed endpoints.
   - Implement cache invalidation for consistency.

4. **Search and Filtering**
   - Enable efficient querying of tasks by status, priority, or due date.

5. **Rate Limiting**
   - Protect the API from abuse with configurable rate limits.

---

## Getting Started

### Prerequisites

- **Node.js** (v14 or later)
- **npm** (v6 or later)
- **Redis** (for caching)
- Account credentials for a third-party notification service (e.g., Twilio, SendGrid, nodemailer
   - Add the following:
     ```env
     PORT=3000
     JWT_SECRET=your_jwt_secret
     REDIS_URL=your_redis_url
     THIRD_PARTY_API_KEY=your_api_key
     MONGO_URI=database_uri
     SEND_CONFIRMATION_EMAIL=true
     EMAIL_USER=your_email
     EMAIL_PASS=your_app_password
     ```

4. Start the server:
   ```bash
   npm start
   ```

---

## API Documentation

### Interactive Documentation

Access the interactive API documentation via Swagger UI:
- **URL**: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

### Key Endpoints

#### User Authentication
- `POST /auth/register`: Register a new user.
- `POST /auth/login`: Authenticate and receive a JWT token.
- `POST /auth/logout`: Log out securely.

#### User Profile
- `GET /users/me`: Retrieve the authenticated user's profile.

#### Task Management
- `POST /tasks`: Create a new task.
- `GET /tasks`: Retrieve tasks with optional filters.
- `PUT /tasks/:id`: Update task details.
- `DELETE /tasks/:id`: Delete a task.

#### Task Assignment
- `POST /tasks/:id/assign`: Assign a task to a user.
- `GET /tasks/assigned`: View assigned tasks.

#### Analytics
- `GET /analytics/tasks`: Retrieve task completion statistics.

---

## Deployment

### Steps

1. Choose a cloud provider (e.g., Heroku, AWS, GCP).
2. Set up environment variables for the deployment environment.
3. Deploy the application.

### Deployment URL

Include the deployment URL in the documentation for easy access.

---

## Assumptions and Design Decisions

- The API adheres to the OpenAPI Specification (OAS) v3.0 for clarity.
- Role-based access control ensures data security.
- Redis caching improves performance for frequent requests.
- Database indexing is implemented for optimal query performance.

---

## Development and Contribution Guidelines

1. Fork this repository to your GitHub account.
2. Create a feature branch for your work:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes with clear messages:
   ```bash
   git commit -m "Add new feature"
   ```
4. Push to the branch and open a pull request.

---

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

---

## Contact

For inquiries, please contact:
- **Email**: jharaghav330@gmail.com
- **GitHub**: [raghavkumar09](https://github.com/raghavkumar09)
