const { noteTypeFind,noteFind, notePublish } = require('../controllers/index.js')
const router = require('koa-router')();
const jwt = require('../utils/jwt.js');

router.get('/findNoteListByType', jwt.verify(), async(ctx) =>{
//获取前端传递的 note_type, 去数据库中以改note_type字段读取数据，返回给前端
    const { title } = ctx.request.query

    //console.log(title);
    try{
        const res = await noteTypeFind(title,ctx.userId)
        //console.log(res);
        if(res.length){
            ctx.body = {
                code: '8000',
                data: res,
                msg: '查询成功',
            }
        } else {
            ctx.body = {
                code: '8000',
                data: 'success',
                msg: '当前分类下没有数据',
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

router.get('/findNoteListById', jwt.verify(), async(ctx) =>{
    //获取前端传递的 note_type, 去数据库中以改note_type字段读取数据，返回给前端
        const { title } = ctx.request.query
    
        //console.log(title);
        try{
            const res = await noteFind(title)
            //console.log(res);
            if(res.length){
                ctx.body = {
                    code: '8000',
                    data: res,
                    msg: '查询成功',
                }
            } else {
                ctx.body = {
                    code: '8000',
                    data: 'success',
                    msg: '没有数据',
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

router.post('/note-publish',jwt.verify(),async(ctx)=>{
    const { title, note_type, head_img, note_content, nickname, user_id } = ctx.request.body
    try {
        const res = await notePublish(title, note_type, head_img, note_content, nickname, user_id)
        if(res.affectedRows === 1){
            ctx.body = {
                code: '8000',
                data: res,
                msg: '发布成功'
            }
        } 
    } catch (error) {
        ctx.body = {
            code: '8005',
            data: error,
            msg: '服务器异常'
        }
    }
}
)
module.exports = router