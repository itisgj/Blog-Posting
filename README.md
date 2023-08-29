# Blog-Posting

Welcome to the Blog Posting Application! This application allows users to create blogs with titles, descriptions, and photos. The frontend is built using React, while the backend is powered by ExpressJS and MongoDB.

**Frontend**

The frontend of the application is built with React. To get started with the frontend:

1. Navigate to the `client` directory using your terminal.
2. Run `npm install` to install all the required dependencies.
3. After the installation is complete, run `npm start` to start the development server.
4. Open your browser and go to `http://localhost:3000` to access the application.

**Backend**

The backend of the application is built using ExpressJS and integrates the following dependencies: bcryptjs, cookie-parser, cors, dotenv, express, jsonwebtokens, mongoose, and multer. Here's how you can set up and run the backend:

1. Navigate to the `server` directory using your terminal.
2. Run `npm install` to install all the required dependencies.
3. In the `server` directory, create a `.env` file and provide the necessary environment variables, including your MongoDB database connection URL. Update the IP address in the configuration if it has changed.
4. Once the dependencies are installed and the environment is configured, start the backend server by running `node app.js`.
5. The backend server will be accessible at `http://localhost:5000`.
Note: You must have MongoDB installed and running. Create your own MongoDB database and update the connection URL in the `.env` file.

**Getting Started**

1. Clone this repository: `git clone https://github.com/itisgj/blog-posting-app.git`.
2. Navigate to the `client` directory and run `npm install`.
3. Navigate to the `server` directory and run npm install.
4. Set up the environment variables in the `.env` file within the `client` directory, including the MongoDB connection URL and IP address.
5. Start the frontend development server using `npm start` in the `client` directory.
6. Start the backend server using `node app.js` in the `client` directory.
7. Access the application in your browser at `http://localhost:3000`.

Feel free to customize and enhance the application as per your requirements. If you have any questions or need assistance, don't hesitate to reach out. Happy blogging!
