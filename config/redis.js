// config/redis.js
import { createClient } from 'redis';

const REDIS_URL = process.env.REDIS_URL || 'redis://localhost:6379';

// One client for general commands and publishing
const pubClient = createClient({ url: REDIS_URL });

// A duplicate client for subscribing (required by Redis client libraries)
const subClient = pubClient.duplicate();

// Error handling
pubClient.on('error', (err) => console.error('Redis Publisher Error:', err));
subClient.on('error', (err) => console.error('Redis Subscriber Error:', err));

// Function to connect both clients
async function connectRedisClients() {
    try {
        await pubClient.connect();
        await subClient.connect();
        console.log('Connected to Redis');
    } catch (err) {
        console.error('Failed to connect to Redis:', err);
        // Depending on your app's criticality, you might want to exit here
        // process.exit(1);
    }
}

// Function to disconnect both clients gracefully
async function disconnectRedisClients() {
    try {
        await pubClient.quit();
        await subClient.quit();
        console.log('Redis clients disconnected.');
    } catch (err) {
        console.error('Error disconnecting Redis clients:', err);
    }
}

export {
    pubClient,
    subClient,
    connectRedisClients,
    disconnectRedisClients
};