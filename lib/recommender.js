const raccoon = require('raccoon');
const { className, nearestNeighbors } = require('../config/config').RECOMMENDER;

// 推荐的类名
raccoon.config.className = className;
// 相似用户个数
raccoon.config.nearestNeighbors = nearestNeighbors;

module.exports = raccoon;