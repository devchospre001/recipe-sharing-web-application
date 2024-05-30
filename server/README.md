# Server Application

## Description

This is a NestJS application designed to manage a recipe sharing web application. The application uses Prisma as its ORM and PostgreSQL as the database.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Scripts](#scripts)
- [License](#license)

## Prerequisites

- [Node.js](https://nodejs.org/) v22.2.0
- [pnpm](https://pnpm.io/) v9.1.3
- [Docker](https://www.docker.com/)

## Environment Variables

1. JWT_SECRET:
```JWT_SECRET=your_defined_secret```

2. DATABASE_URL:
```DATABASE_URL=your_database_url```

3. AWS_S3_ACCESS_KEY_ID:
```AWS_S3_ACCESS_KEY_ID=your_aws_s3_access_key```

4. AWS_S3_ACCESS_KEY_SECRET:
```AWS_S3_ACCESS_KEY_SECRET=your_aws_s3_secret_key```

5. PORT:
```PORT=your_preferred_port```


## Installation

1. Clone the repository:
```git clone https://github.com/devchospre001/recipe-sharing-web-application.git```

2. Navigate to the cloned repository:
```cd recipe-sharing-web-application/server```

3. Install required dependencies
```npm install```

4. Set up the database using Docker Compose:
```npm run database:dev:up```

5. Apply Prisma migrations:
```npm run prisma:dev:deploy```

## Running the Application

1. Development mode:
```npm run start:dev```

2. Production mode:
```npm run build```

## Scripts
```bash
prisma:dev:deploy # Deploy Prisma migrations.
database:dev:rm # Remove the Docker container for the database.
database:dev:up # Start the Docker container for the database.
database:dev:restart # Restart the Docker container and deploy Prisma migrations.
build # Build the NestJS application.
format # Format the code using Prettier.
start # Start the application.
start:dev # Start the application in development mode.
start:debug # Start the application in debug mode.
start:prod # Start the application in production mode.
lint # Lint the code using ESLint.
heroku-postbuild # Install dev dependencies and build for Heroku deployment.
```

# Notes
- Make sure Docker is running before starting the database.
- Adjust the POSTGRES_PASSWORD and other environment variables as needed.

