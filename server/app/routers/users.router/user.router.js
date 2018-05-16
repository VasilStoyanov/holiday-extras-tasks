const userController = require('./user.controller');
const { getStatusCode } = require('./../../../utils');
const { Router } = require('express');
const { BAD_REQUEST_ERROR_MESSAGE } = require('./user.constants');

const usersRouter = new Router();

const createdStatusCode = getStatusCode('created');
const badRequestStatusCode = getStatusCode('badRequest');
const okStatusCode = getStatusCode('ok');

const attachTo = (app, data) => {
  const controller = userController.init(data);
  const routerPrefix = '/api/user';

  usersRouter.get('/', async (req, res) => {
    const { username } = req.query;
    const usersToSkipCount = +req.query.from;
    const usersToTakeCount = +req.query.to;

    controller.getUsers({ username, usersToSkipCount, usersToTakeCount })
      .subscribe(
        (foundUsers) => { res.status(okStatusCode).json(foundUsers); },
        (error) => {
          console.error(error);
          res.status(badRequestStatusCode).json(BAD_REQUEST_ERROR_MESSAGE);
        },
      );
  });

  usersRouter.post('/create', async (req, res) => {
    const user = req.body;

    controller.createNewUser(user)
      .subscribe(
        (createdUser) => { res.status(createdStatusCode).json(createdUser); },
        ({ statusCode, errorMessage }) => {
          res.status(statusCode).json({ errorMessage });
        },
      );
  });

  usersRouter.post('/login', async (req, res) => {
    const { username, password } = req.body;
    controller
      .loginExistingUser({ username, password })
      .subscribe(
        (createdUser) => { res.status(createdStatusCode).json(createdUser); },
        ({ statusCode = badRequestStatusCode, errorMessage = BAD_REQUEST_ERROR_MESSAGE }) => {
          res.status(statusCode).json({ errorMessage });
        },
      );
  });

  usersRouter.put('/changepassword', async (req, res) => {
    const userId = req.user.id;
    const { oldPassword, newPassword } = req.body;

    controller
      .changeExistingUsersPassword({ userId, oldPassword, newPassword })
      .subscribe(
        () => { res.sendStatus(okStatusCode); },
        ({ statusCode = badRequestStatusCode, errorMessage = BAD_REQUEST_ERROR_MESSAGE }) => {
          res.status(statusCode).json({ errorMessage });
        },
      );
  });

  app.use(routerPrefix, usersRouter);
};

module.exports = { attachTo };
