const User = require('../models/user');
const { USER_TYPE } = require('../constants')

exports.find = (_id) => {
    User.findOne({ _id })
        .then(data => {
            if (data) {
                return ;
            } else {
                return ERROR_TYPE.FIND;
            }
        })
        .catch(err => {
            return ERROR_TYPE.DEFAULT;
        })
}