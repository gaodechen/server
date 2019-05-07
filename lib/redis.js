const consola = require('consola')
const redis = require('redis')
const { RDS_PORT, RDS_HOST, RDS_OPTS } = require('../config').REDIS;

const client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);

// mongoose
client.on('ready', res => {
    consola.ready('Redis连接成功！');
});

client.on('error', err => {
    consola.warn('Redis连接失败！', err)
})

exports.redis = client;
