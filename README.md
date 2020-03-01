# Dashboard Test Backend

This is a testing project, building a dashboard with some specific features.
That's the backend part, simpler than the frontend and using an in memory approach to store dynamic data.

You can visit the application clicking here [https://mjr-dashboard-test.herokuapp.com](https://mjr-dashboard-test.herokuapp.com).

And the backend api clicking here [https://mjr-dashboard-test-backend.herokuapp.com](https://mjr-dashboard-test-backend.herokuapp.com).

---

### How to run this project locally on your machine

_This project was created from scratch, without any initial template._

1. Install the LTS version of [NodeJs](https://nodejs.org/en/), the javascript runtime;
2. Install [Yarn](https://yarnpkg.com/), the package manager;
3. Clone this repository to your machine;
4. Inside the project folder, run `yarn install`;
5. After that, run `yarn start`;
6. Now you can access `http://localhost:4000` on your browser;

**To access the full application, just go to the frontend repository, [https://github.com/marceloadsj/dashboard-test](https://github.com/marceloadsj/dashboard-test), and follow the steps to run locally**

---

### Technical Decisions

The backend follow a simpler approach, so I can focus to develop a better frontend. I'm using express to create the routes, and some utility libraries to help with other things like encryption and token generation. The application uses an in memory data management, just to quickly persist the dynamic informations.

**It's important to notice that Heroku stops the instance after 30 minutes of inactivity, so we lose all in memory data on that moment, like user registrations.**

**I'm not preventing the same user to login twice, so we can have a scenario where the user receives a login message of the same user**

#### Main Libraries:

- [Express](https://expressjs.com/) - The library that controls the http requests and sends to the right controller. I'm using some middlewares as well, enabling configurations like cors and protected routes.

- [Socket.io](https://socket.io/) - The main library to work with websockets. We can send and receive realtime messages between clients and server. It take care of upgrading from pooling to pure websocket when available.

- WIP...

##### Support Libraries:

- [Bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [UUID](https://www.npmjs.com/package/uuid)
- [Nodemon](https://www.npmjs.com/package/nodemon) - Development only

- WIP...

#### Frontend

Repository:
[https://github.com/marceloadsj/dashboard-test](https://github.com/marceloadsj/dashboard-test)
