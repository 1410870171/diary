const jwt = require('jsonwebtoken')
const crypto = require('crypto');

// 生成随机密钥
function generateSecretKey() {
  return crypto.randomBytes(64).toString('hex'); // 生成一个64字节的随机密钥
}

// 密钥
const secretKey = generateSecretKey();

// 生成 token
function sign(option) {
  return jwt.sign(option, secretKey, {
    expiresIn: 86400 // 一天后过期
  });
}
//检验token
function verify() {
  return async(ctx, next) => {
    let jwtToken = ctx.req.headers.authorization
    if (jwtToken) {
      // 判断 token 是否合法
      try {
        const decoded = jwt.verify(jwtToken, '123456')
        if (decoded.id) { // 合法
          ctx.userId = decoded.id
          await next()
        }
      } catch (e) {
        ctx.body = {
          status: 401,
          msg: 'token失效'
        }
      }
    } else {
      ctx.body = {
        status: 401,
        msg: '请提供token'
      }
    }
  }
}

module.exports = {
  sign,
  verify
}
