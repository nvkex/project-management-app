# Task Management Application Readme

## Overview

This Next.js application is a task management interface designed to streamline the process of task creation, assignment, and tracking within a team. It integrates with a serverless backend deployed on AWS using SST (Serverless Stack) and utilizes Supabase as the database for storing and managing task-related data.

## Features

### 1. Task Management Interface

- **Task Creation:** Users can create new tasks with detailed descriptions, deadlines, and priorities/tags.
- **Task Assignment:** Team members can be assigned to specific tasks, facilitating collaboration.
- **Task Tracking:** Users can monitor the progress of tasks, helping to ensure project deadlines are met.

### 2. User Profile and Project Settings

- **User Profile:** Team members can manage their personal information and preferences.
- **Project Settings:** Users have the ability to customize project-specific settings, enhancing the application's flexibility.

### 3. Serverless Backend with SST

The application is backed by a serverless architecture using SST. The backend is configured to handle all functionalities required by the Next.js application. It is deployed on AWS for scalability and reliability.

### 4. Database Integration with Supabase

Supabase is integrated as the database for the application. The database schema is designed to meet the application's requirements, and user authentication is implemented with Email and Password login. CRUD (Create, Read, Update, Delete) operations are seamlessly performed within the application, interacting with the Supabase database.

## Deployment

To deploy the application, follow these steps:

1. **Clone the Repository:**
```bash
git clone https://github.com/your-username/task-management-app.git
cd task-management-app
```


2. **Install Dependencies:**
```bash
npm install
```

3. Configure SST:
Update the SST configuration files (sst.json) with your AWS credentials and necessary configurations.

4. Configure Supabase:
Set up a Supabase project and update the application code with the relevant Supabase connection details.

5. Build and Deploy:

```bash
npm run build
npm run deploy
```

This will build the Next.js application and deploy the serverless backend on AWS.

## Access the Application:
Once deployment is successful, access the application through the provided URL.

## Development
To run the application locally for development purposes, use the following command:

```bash
npm run dev
```
This will start the development server, and you can access the application at http://localhost:3000.