
# Project Management Application

> Note: App has also been deployed to vercel

### Production URLs
[Vercel](https://project-management-app-snowy.vercel.app/) (Preferred)

[SST](https://d2zb3ipdo7rzju.cloudfront.net/)

## Overview

  

This Next.js application is a project management interface designed to streamline the process of task creation, assignment, and tracking within a team. 

  

## Features

  

### 1. User-Faced Features

-  **Project Creation:** Users can create new projects with detailed descriptions and add members to the Project

-  **Project Overview:** Get an overview of tasks and project members

-  **Task Creation:** Users can create new tasks with detailed descriptions, deadlines, and priorities/tags.

-  **Task Assignment:** Team members can be assigned to specific tasks, facilitating collaboration.

-  **Task Tracking:** Users can monitor the progress of tasks, helping to ensure project deadlines are met.

-  **User Profile:** Team members can manage their personal information and preferences.

-  **Project Settings:** Users have the ability to customize project-specific settings, enhancing the application's flexibility.

  

### 2. Serverless Backend with SST

The application is backed by a serverless architecture using SST. The backend is configured to handle all functionalities required by the Next.js application. It is deployed on AWS for scalability and reliability.

  

### 3. Database Integration with Supabase (postgreSQL)

Supabase is integrated as the database for the application. The database schema is designed to meet the application's requirements. CRUD (Create, Read, Update, Delete) operations are seamlessly performed within the application, interacting with the Supabase database

### 4. Authentication

[next-auth](https://next-auth.js.org/) is used to integrate authentication system in the app. User can authenticate using Email and Password login or Github OAuth.
  

## Deployment

To deploy the application, follow these steps:

  

1.  **Clone the Repository:**

  ```bash

  git  clone  https://github.com/nvkex/project-management-app.git

  cd  project-management-app

  ```

  
  

2. **Install Dependencies:**

  ```bash
  
  npm install

  ```


  

3. **Configure AWS Credentials:**

  Add your AWS credentials to `C:\%USERPROFILE%\.aws\credentials`


  

4. **Configure Supabase:**

  - Create a `.env` file in the project directory
  - Set up a Supabase project and update `.env` file with database URL and direct URL. Example below:
  ```
  DATABASE_URL="postgres://postgres.[URL]:6543/postgres?pgbouncer=true&connection_limit=1"
  DIRECT_URL="postgres://postgres.[URL]:5432/postgres"
  ```




5. **Configure Authentication Tokens:**

  In the `.env` file above add the following tokens:
  - `NEXTAUTH_SECRET` : Random `base64` 32-bit string (Generate using `openssl rand -base64 32`)
  - `NEXTAUTH_URL`: Your app's URL (For dev use: `http://localhost:3000`)

  Generate an OAuth application from Github's `Developer` settings and add the following to `.env` file
  - `GITHUB_CLIENT_ID`
  - `GITHUB_CLIENT_SECRET`


  

6. Build and Deploy:

  

  ```bash

   npx sst deploy --stage prod

  ```


  This will build the Next.js application and deploy the serverless backend on AWS using SST stack.

  *Configuration can be found in `sst.config.ts`*
  



## Access the Application:

  Once deployment is successful, access the application through the URL logged in the output.

  

## Development

  To run the application locally for development purposes, use the following command:

  *This will use SST to start the local dev environment*
  

  ```bash

  npm run dev

  ```

  This will start the development server, and you can access the application at http://localhost:3000.

## Tests

*No tests added yet. To be done*
