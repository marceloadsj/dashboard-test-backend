const bcryptjs = require("bcryptjs");
const uuidv4 = require("uuid").v4;

const salt = bcryptjs.genSaltSync(10);

/*
Here I'm using an in memory approach to store the users data, just for development purposes
In an production/official application, we should go for a database, for various reasons:
- if the instance goes down for any reason, we lose all in memory data
- if we need to scale to multiple instances, each instance will have it's own data, non-shareable
*/

const users = [
  {
    id: 1,
    name: "Demo User",
    username: "demo_user",
    email: "demo@demo.com",
    password: bcryptjs.hashSync("demo", salt)
  }
];

const loggedUserTokens = {};

class UserController {
  static authMiddlewareError(response) {
    response.status(401).json({
      code: "NO_AUTH_ACCESS",
      message: "You don't have access to that content"
    });
  }

  authMiddleware(request, response, next) {
    if (!request.headers.authorization) {
      return UserController.authMiddlewareError(response);
    }

    const token = request.headers.authorization.replace("Bearer ", "");

    const userId = loggedUserTokens[token];
    if (!userId) return UserController.authMiddlewareError(response);

    const loggedUser = users.find(user => user.id === userId);
    if (!loggedUser) return UserController.authMiddlewareError(response);

    request.meta = { ...request.meta, token, loggedUser };

    next();
  }

  login(request, response) {
    const { username, password } = request.body;
    const hashedPassword = bcryptjs.hashSync(password, salt);

    const user = users.find(user => {
      return (
        (user.username === username || user.email === username) &&
        user.password === hashedPassword
      );
    });

    if (user) {
      const token = uuidv4();

      loggedUserTokens[token] = user.id;

      const loggedUser = { ...user };
      delete loggedUser.password;

      response.json({ loggedUser, token });

      return;
    }

    response.status(401).json({
      code: "NO_USER_FOUND_WITH_CREDENTIALS",
      message: "No user found with your credentials"
    });
  }

  register(request, response) {
    const { name, username, email, password } = request.body;

    const user = users.find(user => {
      return user.username === username || user.email === username;
    });

    if (user) {
      response.status(400).json({
        code: "USER_ALREADY_REGISTERED",
        message: "An user with that email is already registered"
      });

      return;
    }

    const hashedPassword = bcryptjs.hashSync(password, salt);
    const id = users.length + 1;

    users.push({ id, name, username, email, password: hashedPassword });

    response.send();
  }

  logout(request, response) {
    delete loggedUserTokens[request.meta.token];

    response.send();
  }

  me(request, response) {
    const loggedUser = { ...request.meta.loggedUser };
    delete loggedUser.password;

    return response.json(loggedUser);
  }
}

module.exports = UserController;
