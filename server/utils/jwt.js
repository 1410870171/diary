const jwt = require('jsonwebtoken')

//生成token
function sign(option) {
  return jwt.sign(option, '123456', {
    expiresIn: 86400   // 一天后后期
  })
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