# Full-Stack Bookstore Application Task
 
## Task Description
Create a full-stack bookstore application. This application should allow users to browse, search, and purchase books. Admin users should be able to add and delete books.
 
## Detailed Requirements
 
### Backend (NestJS, Typescript, Postgres, TypeORM)
1. **User Model**: Create a User model with fields: id, email, password, and role. The role field will determine whether the user is a regular user or an admin.
2. **Book Model**: Create a book model with fields: id, title, author, ISBN, price, and quantity. Use TypeORM for defining and managing this model.
3. **Authentication and Authorization**: Implement JWT (JSON Web Token) authentication. Depending on the user role, restrict access to certain API endpoints.
4. **API Endpoints**: Develop RESTful API endpoints for: 
   - User registration and login.
   - Create and Delete operations on books (restricted to admin users).
   - Read operation on books (available to all users).
   - Search books by title, author, or ISBN.
   - Purchase a book (this should reduce the book's quantity).
5. **Kafka Producer**: After a book is purchased, send a message to a Kafka topic about the purchase event. This message should contain relevant information about the purchase, such as book id and user id.
6. **Kafka Consumer**: Create a Kafka consumer to listen to the purchase event topic. Once a message is received, stream it to the front end via websocket or server side event. (Note: The frontend should be able to receive the message and display it to the user. There is no need to store the message in the database, it is okay for them to disappear after a page refresh.)
7. **Database initializatin**: Create DB migrations that set up the tables and seeders that populates the database with some initial books and at least one user with admin role(our registration will create users with 'user' role). This migration and seeds should be run automatically when the application is started.
 
### Additional Notes
 
1. **Book Purchasing**: For the scope of this task, purchasing a book will only reduce the quantity of the book by 1. No actual payment process or tracking of user purchases will be implemented. The frontend should disable the purchase option if the book quantity is zero, and the backend should return an error if a purchase request is made for a book with zero quantity.
2. **Error Handling**: The backend should return appropriate error messages for invalid requests. The frontend should display these error messages to the user.
3. **Input Validation**: The backend should validate all input data and return appropriate error messages if the data is invalid. The frontend should display these error messages to the user.
4. **Frontend design**: The frontend should be designed to be user-friendly and intuitive. It should be responsive and work well on desktop devices. Making it work on mobile devices is a plus, but not required at all.
5. **Typescript Best Practices**: Please follow best practices for Typescript. Make sure to provide proper typing for your variables and functions, and avoid using 'any' type unless it's absolutely necessary. Utilize interfaces and types to their full extent, and take advantage of Typescript's static typing for better code quality and maintainability.
 
### Frontend (React, Redux Toolkit, Typescript)
1. **User Interface**: Create user interfaces for:
   - User registration and login.
   - Displaying all available books.
   - Searching for books.
   - A single book's details.
   - Purchasing a book.
   - An admin page for adding and deleting books (this page should only be visible to admin users).
2. **Redux Toolkit**: Implement Redux Toolkit for state management. The state should include a list of purchased books.
3. **API Integration**: Integrate the frontend with the backend API endpoints.
 
### Communication (REST, Kafka)
1. **Frontend-to-Backend Communication**: Use REST API calls for all frontend to backend communications.
2. **Backend-to-Frontend Communication**: Use websockts or server side events.
3. **Backend-to-Backend Communication**: Use Kafka for backend to backend communication. The backend should send messages to Kafka when a book is purchased. The backend should also listen to Kafka for purchase events and stream them to the frontend.
 
### Dockerization
1. **Dockerfiles**: Create Dockerfiles for the backend service, frontend service
2. **Docker Compose**: Create a docker-compose.yml file that defines the four services: Backend, Frontend, Postgres, and Kafka. The services should be configured such that the application works simply by running `docker-compose up`.
 
### General
1. **Code Quality**: Ensure all code is well-commented, organized, and follows the best practices of the respective technologies.
2. **Testing**: Write unit tests and integration tests for the backend service and frontend components where applicable.
3. **Documentation**: Write comprehensive README files that document the application's functionality, structure, and setup process. Include screenshots where helpful.
4. **Version Control**: Regularly commit and push changes to the shared GitHub repository. Follow good commit message conventions (conventional commits).
 
 
 
The team members should divide the tasks among themselves according to their strengths and areas of expertise. They should also coordinate to ensure that the different components of the application work seamlessly together. The team can be assessed on both individual contributions and the final product as a whole.