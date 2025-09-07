// server.js
import 'dotenv/config'; 

import express from 'express';

import { PORT } from './config/env.js'; 

import authRouter from './routes/auth.routes.js';
import subscriptionRouter from './routes/subscription.routes.js';
import userRouter from './routes/user.routes.js';
import connectToDatabase from './database/mongodb.js'; 
import errorMiddleware from './middlewares/error.middlewares.js';
import cookieParser from 'cookie-parser';
import arcjetMiddleware from './middlewares/arcjet.middlware.js';
import workflowRouter from './routes/workflow.routes.js';

const app = express();

app.use(errorMiddleware); 

app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 
app.use(arcjetMiddleware); 

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/workflows', workflowRouter)



app.get('/', (req, res) => {
	res.send({ body: 'Welcome to the Subscription server!' });
});


app.listen(PORT, async () => {
	console.log(`Server is running on http://localhost:${PORT}`);

	try {
		await connectToDatabase(); 
		console.log('Connected to MongoDB.');

		
	} catch (error) {
		console.error(
			'Failed to connect to databases or initialize workflow:',
			error
		);
		
		process.exit(1);
	}
});


export default app; 
