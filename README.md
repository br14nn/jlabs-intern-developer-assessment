# How to run the app locally

### Prerequisites

- Docker Hub

## Running the app locally

1. First Step - In your terminal, clone the project:

   ```sh
     git clone https://github.com/br14nn/jlabs-intern-developer-assessment.git
   ```

2. Second Step - CD into the project:

   ```sh
     cd jlabs-intern-developer-assessment
   ```

3. Third Step - Building the docker images and starting the docker containers:

   ```sh
     npm run start:docker
   ```

4. Available URLs:
   - http://localhost:3000 - frontend
   - http://localhost:8000 - backend
   - http://localhost:5050 - pgAdmin

## Database Setup

> NOTE: Make sure docker containers are still running!

1. First Step - In your terminal, cd into the backend directory:

   ```sh
     cd jlabs-intern-developer-assessment/backend
   ```

2. Second Step - Pushing the database schema:

   ```sh
     npx prisma db push
   ```

3. Third Step - Seeding the user account:

   ```sh
     npx prisma db seed
   ```

- Default user account for logging in the website:
  ```sh
    username: root
    password: 1234
  ```
