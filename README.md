# Task Manager API Documentation

This is a simple REST API for managing tasks, built with Spring Boot and MySQL.

## Base URL
`http://localhost:8080/api/tasks`

## Endpoints

### 1. Get All Tasks
- **URL:** `/`
- **Method:** `GET`
- **Response:** Array of Task objects.

### 2. Get Task by ID
- **URL:** `/{id}`
- **Method:** `GET`
- **Response:** Task object or 404 Not Found.

### 3. Create Task
- **URL:** `/`
- **Method:** `POST`
- **Payload:**
  ```json
  {
    "title": "Task Title",
    "description": "Task Description"
  }
  ```
- **Validation:** Title cannot be empty.
- **Response:** Created Task object.

### 4. Update Task
- **URL:** `/{id}`
- **Method:** `PUT`
- **Payload:**
  ```json
  {
    "title": "Updated Title",
    "description": "Updated Description",
    "status": "COMPLETED"
  }
  ```
- **Response:** Updated Task object.

### 5. Toggle Task Status
- **URL:** `/{id}/toggle`
- **Method:** `PATCH`
- **Response:** Updated Task object with toggled status.

### 6. Delete Task
- **URL:** `/{id}`
- **Method:** `DELETE`
- **Response:** 200 OK.

## Setup Instructions

### Backend
1. Ensure MySQL is running on `localhost:3306`.
2. Create a database named `task_db` (or Hibernate will create it if user has permissions).
3. Configure `src/main/resources/application.properties` with your MySQL credentials.
4. Run with `./mvnw spring-boot:run` or your IDE.

### Frontend
1. Navigate to the `frontend` folder.
2. Run `npm install`.
3. Run `npm start` or `ng serve`.
4. Open `http://localhost:4200`.
