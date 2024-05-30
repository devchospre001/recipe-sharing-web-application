# Welcome to Recipe Sharing App!

Here's a guide for deploying the backend and frontend of Recipe Sharing App.

## How to Deploy:

### Requirements:

- Heroku account
- Node.js installed
- Git installed

### Steps:

**Login to Heroku:**

```sh
npx heroku login
```

**Set up remote for backend:**

```sh
npx heroku git:remote -a recipe-sharing-server
```

Add buildpack (if there aren't any):

```sh
npx heroku buildoacks:remove heroku/nodejs
npx heroku buildpacks:add heroku/nodejs
```

**Set up remote for frontend:**

```sh
npx heroku git:remote -a recipe-sharing-server
```

Add buildpack (if there aren't any):

```sh
npx heroku buildpacks:remove https://github.com/heroku/heroku-buildpack-nginx
npx heroku buildpacks:add https://github.com/heroku/heroku-buildpack-nginx
```

**Build and Deploy:**

- Navigate to root directory of your repository (recipe-sharing-web-application)
- Build the frontend and backend separately. Ensure you have a dist folder for each app.
- Commit any changes and push to Heroku remotes for each app.

**Reinstall Node Modules:**

- It's recommended to reinstall node_modules and package-lock.json files for both backend and frontend.
- Navigate to each app's directory and run:

```sh
npm install
```

**Deploy Changes:**

- After making necessary changes and ensuring both backend and frontend have been built, push changes to Heroku remotes.

- Navigate to root directory of your repository (recipe-sharing-web-application)

Server:

```sh
git subtree push --prefix server heroku master
```

Client:

```sh
git subtree push --prefix client heroku master
```

**Access your APP:**

- Once deployment is successful, you can access your app at the respective Heroku URLs for backend and frontend.
