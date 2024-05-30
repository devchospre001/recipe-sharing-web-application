# Recipe Sharing Web App (React)

This is a Recipe Sharing Web Application built with React and Vite.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Installation](#installation)
- [Running the App](#running-the-app)
- [Building for Production](#building-for-production)
- [Scripts](#scripts)

## Prerequisites

- [Node.js](https://nodejs.org/) (Recommended LTS version)
- [pnpm](https://pnpm.io/) (Optional, but recommended)

## Environment Variables

`VITE_SERVER_URL=your_server_url (e.g. https://example.com)`

## Installation

1. Clone the repository:
   `git clone https://github.com/devchospre001/recipe-sharing-web-application.git`

2. Navigate to React application
   `cd recipe-sharing-web-application/client`

3. Install required dependencies
   `npm install`

## Running the Application

To run application in development mode use:

- `npm run dev`

## Building for Production

To run application in production mode use:

- `npm run build`
- `npm run serve`
  -- This will build dist folder inside our client and will serve it using serve package.

## Scripts

```bash
start # Serve the production build.
dev # Start Vite development server.
build # Build the application for production.
lint # Lint the code using ESLint.
preview # Preview the production build.
heroku-postbuild # Install dev dependencies and build for Heroku deployment.
```
