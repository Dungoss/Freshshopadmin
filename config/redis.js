const redis = require('redis');
client = redis.createClient(process.env.REDIS_URI);
client.on('error', function(error) {
    console.error(error);
});
client.connect().then();
//with a previously create client
module.exports = client;
