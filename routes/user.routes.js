import { Router } from 'express';
import { getUser, getUsers } from '../controllers/user.controllers.js';
import authorize from '../middlewares/auth.middlewares.js';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', authorize, getUser);

userRouter.post('/', (req, res) => {
	res.send({ body: { title: 'CREATE NEW user' } });
});

userRouter.put('/:id', (req, res) => {
	res.send({ body: { title: `UPDATE user with details` } });
});

userRouter.delete('/:id', (req, res) => {
	res.send({ body: { title: `DELETE user with details` } });
});

export default userRouter;
