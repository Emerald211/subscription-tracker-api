import { Router } from 'express';
import authorize from '../middlewares/auth.middlewares.js';
import { createSubscription, getUserSubscription } from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/', (req, res) => {
	res.send({ body: { title: 'GET all subscriptions' } });
});
subscriptionRouter.get('/:id', (req, res) => {
	res.send({ body: { title: `GET subscription with details` } });
});
subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', (req, res) => {
	res.send({ body: { title: `UPDATE subscription with details` } });
});
subscriptionRouter.delete('/:id', (req, res) => {
	res.send({ body: { title: `DELETE subscription with details` } });
});

subscriptionRouter.get('/user/:id', authorize, getUserSubscription);

subscriptionRouter.put('/:id/cancel', (req, res) => {
	res.send({ body: { title: 'CANCEL ALL SUBSCRIPTION' } });
});

subscriptionRouter.get('/upcoming-renewals', (req, res) => {
	res.send({ body: { title: 'GET upcoming renewals' } });
});

export default subscriptionRouter;
