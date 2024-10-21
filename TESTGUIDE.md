# Project Setup and Test Instructions

Follow the steps below to set up the project and run the test cases.

## Prerequisites

- [Node.js](https://nodejs.org/en/) must be installed on your machine. After installation, make sure to add Node.js to your system's environment variables.
- Install MongoDB locally. You can find the installation guide [here](https://www.mongodb.com/docs/manual/installation/).

## Setup

1. Navigate to the project's root directory.
2. Run `npm i` to install the necessary dependencies.
3. Run `npm run dev` Once the server is running, you can visit the application at: `http://localhost:3000`.
4. [**Important**!!] On the login page, register a new user with the following credentials, then you can log in with this account. If you don't register the tests will fail.
- Username: fengshiyu
- Password: aaaaa
5. Open a new terminal window and run the following command to launch Cypress `npx cypress open`.
6. A Cypress window will appear. Follow these steps: continue -> E2E Testing -> Choose a browser to run the tests
7. There will be two test specs available. One for frontend user stories, another for backend user stories. You can run both of them.
  
   

