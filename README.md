# Node.js & Express REST API Boilerplate for Login
A quick starter project for building REST APIs for a login module using Node.js & Express.
---------------------------------------------------------------------------------------------------
# Features
- Environment variables: utilizing custom-env
- Logging: with winston
- Error Logs & Success Logs: using morgan
- Linting: integrating ESLint, Airbnb, Prettier
- Git hooks: with husky and lint-staged
- Editor config: maintaining consistent editor configuration using EditorConfig
- Response & Code handler

----------------------------------------------------------------------------------------------------
# Getting Started
=> Clone the repo and customize it:

$ bash $
- Copy code
- git clone --depth 1 https://github.com/lillastar824/Avalbl_Backend.git
- rm -rf .git
- Add your Git Repo.
----------------------------------------------------------------------------------------------------
# Architecture for the database
- The complete workflow of the login module -> assets/Master_Login.jpg
----------------------------------------------------------------------------------------------------
# Postman collection for the APIs
- This collection comprises 5 APIs that necessitate importing the associated environment settings along with the collections.
  * assets/Master.postman_collection.json
  * assets/Master.postman_environment.json
----------------------------------------------------------------------------------------------------
# Install Dependencies
=> to initiate the project, run these commands:

$ bash $
- Copy code
- npm install
- Set Environment Variables

- Use the following files for different environments:
* env/.env.dev (for Development)
* env/.env.prod (for Production)
* Create your custom environment file by copying .env.example to .env.
* Update Node_ENV Script

-> In /config/vars.js, adjust the nodeEnv script before exporting environment variables for local use:

$ javascript $
* Copy code
* const nodeEnv = require('custom-env');
* nodeEnv.env(NODE_ENV || process.env.NODE_ENV || 'local', './env');
* Run the Project

=> Execute these commands:

$ bash $
- Copy code
# To Run in Production
npm run start:prod

# To Run in Development
npm run start:dev

# To Run in Local
npm run start:windows:local

=> For local database connectivity issues:

$ bash $
- Copy code
- Modify bind-address in /etc/mysql/mariadb.conf.d/50-server.cnf
- Restart MariaDB
- sudo systemctl restart mariadb

# Grant remote access to a MariaDB user
- GRANT ALL ON *.* TO 'user'@'%' IDENTIFIED BY 'password';

# Allow incoming connections to port 3306 on the server's firewall
- sudo ufw allow 3306/tcp

# Find network address:
- ip a (Linux)
- ifconfig (Windows)
- Other Commands

# Linting:

$ bash $
- Copy code
# Run ESLint
- npm run lint

# Fix ESLint errors
- npm run lint:fix

# Run Prettier
-npm run prettier

# Fix Prettier errors
-npm run prettier:fix
# Linting
- ESLint (Airbnb JavaScript style guide with modifications) and Prettier are used for linting. Modify .eslintrc.json and .prettierrc.json for ESLint and Prettier configurations. Use .eslintignore and .prettierignore to exclude files/directories from linting.

# VS Code Setup
- Install ESLint & Prettier extensions for better development experience.

# Husky & lint-staged
- Prevent committing code with ESLint & Prettier issues. Install dependencies when switching branches.

# Editor Config
- Maintain a consistent coding style across IDEs with .editorconfig.

[ Inspirations -> "hagopj13/node-express-boilerplate" ]

# License
-> Licensed under the _MIT_ License.