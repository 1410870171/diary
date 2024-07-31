const router = require('koa-router')();
const { userLogin, userFind, userRegister } = require('../controllers/index.js');
router.prefix('/user');//路由前缀
const jwt = require('../utils/jwt.js');

//登录
router.post('/login', async(ctx) => {//async+await才能使await语法生效（没有错误捕获机制，要自己写）
    //获取到前端传递的账号密码，去数据库中验证
    const {username, password} = ctx.request.body;//不能写ctx.body，因为response中也有body

    try {
       //去数据库中检验
       const result = await userLogin(username, password)//必须写await，否则console.log(result)输出undefined
       //console.log(result);//await使异步变同步
       if(result.length){
           let data = {
               id: result[0].id,
               nickname: result[0].nickname,
               username: result[0].username
           }

           let token = jwt.sign({
            id: result[0].id,
            username: result[0].username,
            admin: true
           })

           //console.log(token);

           ctx.body = {
               code: '8000',
               data: data,
               msg: '登录成功',
               token: token
           }
       } else {
           ctx.body = {
               code: '8000',
               data: 'error',
               msg: '账号或密码错误'
           }
       } 
    } catch (error) {
        ctx.body = {
            code: '8005',
            data: error,//不用打引号，因为error是object
            msg: '服务器异常'
        }
    }
 
})

//注册
router.post('/register', async(ctx) => {
    const {username, password, nickname} = ctx.request.body;
    console.log(username, password, nickname);
    let msg = ''
    if(!username || !password || !nickname){
        ctx.body = {
            code: '8001',
            msg: '账号或密码或昵称不能为空'
        }
        return
    }
    try {
    //校验账号是否存在
    const findRes = await userFind(username)
    console.log(findRes);
    if(findRes.length){//账号已存在
        ctx.body = {
            code:'8003',
            data:'error',
            msg:'账号已存在'
        }
        return
    }
    //往数据库里面写入数据
    const registerRes = await userRegister({ username, password, nickname})
    console.log(registerRes)
    if(registerRes.affectedRows) {
        ctx.body = {
            code:'8000',
            data:'success',
            msg:'注册成功'
        }
    } else {
        ctx.body = {
            code:'8004',
            data:'error',
            msg:'注册失败'
        }
    } 
    }catch (error) {
        ctx.body = {
            code:'8005',
            data:error,
            msg:'服务器异常'
        }
    } 
})

//测试token
router.post('/home', jwt.verify(), (ctx) => {
    ctx.body = {
        code: '8000',
        data: '首页数据'
    }
})

//
module.exports = router;