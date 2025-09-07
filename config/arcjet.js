import arcjet, { shield, tokenBucket } from '@arcjet/node';
import { ARCJET_KEY, NODE_ENV } from './env.js';

const rules = [
	shield({ mode: 'DRY_RUN' }),
	tokenBucket({
		mode: 'LIVE',
		refillRate: 5,
		interval: 10,
		capacity: 10,
	}),
];


if (NODE_ENV === 'production	') {
	const { detectBot } = await import('@arcjet/node');
	rules.push(
		detectBot({
			mode: 'DRY_RUN',
			allow: ['CATEGORY:SEARCH_ENGINE'],
		})
	);
}

const aj = arcjet({
	key: ARCJET_KEY,
	characteristics: ['ip.src'],
	rules,
});

export default aj;
