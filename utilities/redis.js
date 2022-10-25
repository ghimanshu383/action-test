const redis = require('redis');
const redisClient = redis.createClient({
  host: 'http://127.0.0.1',
  port: '6379',
});

(async ()=>{
  await redisClient.connect();
})();

module.exports = redisClient;
