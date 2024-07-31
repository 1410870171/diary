const Koa = require('koa')//引入koa,npm i koa
const app = new Koa()
const cors = require('@koa/cors')//跨域npm i @koa/cors
const { bodyParser } = require('@koa/bodyparser')//获取请求体数据npm i koa-bodyparser

const userRouter = require('./router/user.js')
const noteRouter = require('./router/note.js')

app.use(cors())//告诉浏览器不要破坏我的响应，！！！要放在路由生效前
app.use(bodyParser())//koa无法解析post请求的请求体数据，需要使用koa-bodyparser中间件辅助解析

app.use(userRouter.routes(), userRouter.allowedMethods()) // 挂载路由！！！要放在路由生效前
app.use(noteRouter.routes(), noteRouter.allowedMethods())

app.listen(3000, () => {
  console.log('server is running at http://localhost:3000')
})