# Lakku - Expense Tracker Application

## Overview

Lakku is a comprehensive expense tracking application that helps users monitor and manage their personal finances. The name "Lakku" comes from "Laporan Keuanganku" (My Financial Report), reflecting its purpose as a personal financial management tool. The application consists of a Flutter mobile frontend and a Node.js backend API.

## Features

- **User Authentication**: Secure login and registration system
- **Expense Recording**: Easily add new expenses with categories, descriptions, and amounts
- **Monthly Summaries**: View expenses summarized by month
- **Category Tracking**: Record expenses across different categories (Food, Transportation, Others)
- **Expense History**: Access a chronological list of all recorded expenses
- **Visual Analytics**: View spending patterns through intuitive pie charts
- **User Profiles**: Manage personal information

## Project Structure

```
LAKKU/
├── frontend/          # Flutter mobile application
└── backend/
    ├── controllers/
    │   ├── categoryController.js
    │   ├── expenseController.js
    │   └── userController.js
    ├── routes/
    │   ├── categoryRoutes.js
    │   ├── expenseRoutes.js
    │   └── userRoutes.js
    ├── .env
    ├── app.js
    ├── ca.pem
    ├── db.js
    ├── package.json
    └── package-lock.json
```

## Technology Stack

### Frontend
- **Framework**: Flutter for cross-platform mobile development
- **Language**: Dart
- **State Management**: Provider/Bloc (specify which one you're using)
- **HTTP Client**: Dart http package for API communication

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MySQL
- **Libraries**: 
  - moment-timezone for date handling
  - mysql2 for database connection

## Setup and Installation

### Prerequisites
- Node.js (v14 or higher)
- MySQL database
- Flutter SDK (latest stable version)
- Android Studio or VS Code with Flutter extensions
- An Android or iOS device/emulator for testing

### Backend Setup
1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/lakku.git
   cd lakku/backend

2. Install dependencies
   npm install

3. Configure database connection

- Create a `.env` file in the root directory with your database credentials
- Or modify the `db.js` file directly

4. Start the server
   npm start

## API Endpoints

### User Management

#### Register a new user

- **URL**: `/users/register`
- **Method**: `POST`
- **Body**:
  {
  "username": "string",
  "email": "string",
  "password": "string"
  }

#### User login

- **URL**: `/users/login`
- **Method**: `POST`
- **Body**:
  {
  "email": "string",
  "password": "string"
  }

  #### Get all users

- **URL**: `/users`
- **Method**: `GET`


### Category Management

#### Get all categories

- **URL**: `/categories`
- **Method**: `GET`


#### Add a new category

- **URL**: `/categories`
- **Method**: `POST`
- **Body**:
  {
  "name": "string"
  }

### Expense Management

#### Get all expenses

- **URL**: `/expenses`
- **Method**: `GET`


#### Add a new expense

- **URL**: `/expenses`
- **Method**: `POST`
- **Body**:
  {
  "id_user": "number",
  "category": "string",
  "description": "string",
  "amount": "number"
 }

 #### Get total balance for a user

- **URL**: `/expenses/total/:id_user`
- **Method**: `GET`


#### Get expenses by user ID

- **URL**: `/expenses/user/:id_user`
- **Method**: `GET`


#### Delete an expense

- **URL**: `/expenses/:id_expenses`
- **Method**: `DELETE`


#### Get monthly expenses for a user

- **URL**: `/expenses/monthly/user/:id_user`
- **Method**: `GET`


#### Get all monthly expenses (admin)

- **URL**: `/expenses/monthly/all`
- **Method**: `GET`


#### Get monthly expenses by category for a user

- **URL**: `/expenses/monthly/category/:id_user`
- **Method**: `GET`


## Database Schema

### Users Table
CREATE TABLE users (
  id_user INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(100),
  email VARCHAR(100),
  password VARCHAR(255)
);

## Categories Table
CREATE TABLE categories (
  id_category INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100)
);

## Expenses Table
CREATE TABLE expenses (
  id_expenses INT AUTO_INCREMENT PRIMARY KEY,
  id_user INT,
  category ENUM('Makanan', 'Transportasi', 'Lainnya'),
  description VARCHAR(255),
  amount DECIMAL(10,2),
  date DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (id_user) REFERENCES users(id_user)
);

## Security Considerations

- The current implementation stores passwords in plain text. In a production environment, passwords should be hashed using bcrypt or a similar library.
- Consider implementing JWT for authentication.
- Add input validation and sanitization to prevent SQL injection.
- Implement rate limiting to prevent abuse.


## Future Enhancements

- Budget planning and tracking
- Income tracking
- Financial goals setting
- Export reports as PDF
- Multi-currency support
- Cloud synchronization
- Push notifications for budget alerts

## Development

### Running Backend in Development Mode
npm run dev

## Running Tests
npm test

## Deployment

### Backend Deployment

The API can be deployed to any Node.js hosting service such as:

- Heroku
- DigitalOcean
- AWS Elastic Beanstalk
- Vercel


### Mobile App Deployment

The Flutter app can be deployed to:

- Google Play Store
- Apple App Store


## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request