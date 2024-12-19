# Country Management System

This project is a Country Management System built with React, TypeScript, and Redux Toolkit. It allows users to view, edit, and delete country information.

## Features

- View a list of countries with pagination
- Search and filter countries
- Edit country details
- Delete countries

## Technologies Used

- React
- TypeScript
- Redux Toolkit
- Axios
- Material-UI

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Running the Application
1. Install dependencies:
    ```sh
    npm run install-all
    ```
2. Make sure you have the MySQL db running on your local machine:
    modify the `backend/src/config/sequelize.config.ts` file with your database credentials.

3. Start the development server:
    ```sh
    npm run start
    ```
4. Open your browser and navigate to `http://localhost:5173`.

## API Endpoints

- `GET /countries`: Fetch paginated list of countries
- `GET /countries?page=-1`: Fetch all countries
- `PUT /countries/:id`: Update a country
- `DELETE /countries/:id`: Delete a country
