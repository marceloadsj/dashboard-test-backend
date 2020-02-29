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
    email: "demo@demo.com",
    password: bcryptjs.hashSync("demo", salt)
  }
];

const loggedUserTokens = {};

class UserController {
  login(request, response) {
    const { email, password } = request.body;
    const hashedPassword = bcryptjs.hashSync(password, salt);

    const user = users.find(user => {
      return user.email === email && user.password === hashedPassword;
    });

    if (user) {
      const token = uuidv4();

      loggedUserTokens[token] = user.id;

      const parsedUser = { ...user };
      delete parsedUser.password;

      response.json({ ...parsedUser, token });

      return;
    }

    response.status(401).json({
      message: "An error happened"
    });
  }
}

module.exports = UserController;
