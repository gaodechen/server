const MD5_SUFFIX = 'aaabccccddddeeffffqqq*&^%$#'

exports.MD5 = (pwd) => {
    let md5 = crypto.createHash('md5');
    return md5.update(pwd).digest('hex');
}

exports.MD5_encode = (pwd) => {
    return MD5(pwd + MD5_SUFFIX)
}
