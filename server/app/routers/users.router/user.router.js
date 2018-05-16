const userController = require('./user.controller');
const { getStatusCode } = require('./../../../utils');
const { Router } = require('express');

const usersRouter = new Router();

const createdStatusCode = getStatusCode('created');
const badRequestStatusCode = getStatusCode('badRequest');
const okStatusCode = getStatusCode('ok');

const attachTo = (app, data) => {
  const controller = userController.init(data);
  const routerPrefix = '/api/user';

  usersRouter.get('/', async (req, res) => {
    try {
      const users = await controller.getAllUsers();
      res.status(okStatusCode).json(users);
    } catch ({ statusCode = badRequestStatusCode, errorMessage }) {
      res.status(statusCode).json({ errorMessage });
    }
  });

  usersRouter.get('/:userId', async (req, res) => {
    const { userId } = req.params;

    try {
      const user = await controller.getUserById(userId);
      res.status(okStatusCode).json(user);
    } catch ({ statusCode = badRequestStatusCode, errorMessage }) {
      res.status(statusCode).json({ errorMessage });
    }
  });

  usersRouter.post('/create', (req, res) => {
    const user = req.body;

    controller.createNewUser(user)
      .subscribe(
        (createdUser) => { res.status(createdStatusCode).json(createdUser); },
        ({ statusCode, errorMessage }) => { res.status(statusCode).json({ errorMessage }); },
      );
  });


  app.use(routerPrefix, usersRouter);
};

module.exports = { attachTo };
