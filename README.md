# Task Tracker Application with Dashboard

## Introduction
This is a Task Tracker application built using the MERN stack (MongoDB, Express, React, Node.js) and Next.js. The application features a monorepo setup using Turborepo, containing one backend and two frontends (client and dashboard). The application is also dockerized to facilitate easy setup and deployment.

## Features
- **Task Management (Client)**
    - Create new tasks with titles.
    - Organize tasks into different boards/folders.
    - Drag and drop tasks within folders.
    - Drag and drop tasks to delete.
    - Mark tasks as complete or incomplete.
    - Delete tasks.

- **Dashboard**
    - Display task statistics using ECharts.
    - Show the total number of tasks.
    - Display the number of completed and incomplete tasks.
    - Use a pie chart to visualize task status distribution.

## Tech Stack
- **Frontend:** Next.js, React, TailwindCSS
- **Backend:** Node.js, Express, MongoDB
- **Monorepo Management:** Turborepo
- **Containerization:** Docker

## Setup and Run Instructions

### Prerequisites
- Docker
- Docker Compose

### Running the Application
1. **Clone the repository:**
     ```bash
       git clone https://github.com/Karipuso/task-tracker-monorepo.git
       cd task-tracker-monorepo
     ```
2. **Build and run the Docker Containers:**
    ```bash
      docker-compose up -d --build
    ```
3. **Access the application:**
  - Client: http://localhost:3000
  - Dashboard: http://localhost:3001

## Project Structure
  - **backend:** Express server handling API requests and MongoDB operations.
  - **client:** Next.js application for task management.
  - **dashboard:** Next.js application for displaying task statistics.
