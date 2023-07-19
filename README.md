# Bookstore Application

This web application for an online bookstore allows users to browse, search, and purchase books. It also provides admin users with the ability to add and delete books.

## Features

- User registration and login functionality.
- Book browsing: Users can view a list of available books with details such as title, author, price, and quantity.
- Book search: Users can search for books by title, author, or ISBN.
- Book details: Users can view detailed information about a selected book, including its description, cover image, and average rating.
- Shopping cart: Users can add books to their shopping cart, modify quantities, and proceed to checkout.
- Book purchase: Users can securely complete the purchase process, reducing the book's quantity in the inventory.
- Admin functionality: Admin users can add new books to the store and delete existing books.
- Communication: Frontend communicates with the backend using REST API calls, and real-time purchase events are streamed using WebSocket or server-sent events. Backend-to-backend communication is handled using Kafka.

## Tech Stack

- Frontend: React, Redux Toolkit, TypeScript
- Backend: NestJS, TypeScript, PostgreSQL, TypeORM
- Communication:
  - Frontend-to-Backend: REST API
  - Backend-to-Frontend: WebSocket or Server-Sent Events
  - Backend-to-Backend: Kafka

## Getting Started

### Prerequisites

- Docker
- Docker Compose

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/bookstore-app.git
   ```

2. Navigate to the project's root directory:
   ```bash
   cd bookstore-app
   ```

3. Build and start the Docker containers:
   ```bash
   docker-compose up
   ```

   This command will build the backend and frontend containers, along with the PostgreSQL and Kafka containers. The services will be configured based on the Docker Compose file, and your application should be up and running.

4. Access the application in your browser:
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend: [http://localhost:4000](http://localhost:4000)

## Usage

- Register a new user account or log in with an existing account.
- Browse the available books, search by title, author, or ISBN, and view detailed information about each book.
- Add books to your shopping cart, modify quantities, and proceed to checkout.
- Complete the purchase process securely.
- Admin users can access additional functionality, such as adding new books or deleting existing books.

## Communication

- Frontend-to-Backend Communication: Frontend communicates with the backend using REST API calls for all interactions.
- Backend-to-Frontend Communication: Backend streams real-time purchase events to the frontend using either WebSocket or Server-Sent Events.
- Backend-to-Backend Communication: Backend uses Kafka for communication between services. When a book is purchased, the backend sends messages to Kafka. The backend also listens to Kafka for purchase events and streams them to the frontend.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License

This project is licensed under the [License].

## Acknowledgements

- Thank you to the developers and contributors of the technologies and libraries used in this project.

## Contact

For any inquiries or questions, please contact [your-email-address].

---
