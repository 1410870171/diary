//封装一个函数用来连接数据库
const  mysql = require('mysql2/promise');
const  config = require('../config/index.js');

//线程池
const pool = mysql.createPool({
    host:config.database.HOST,
    user:config.database.USERNAME,
    password:config.database.PASSWORD,
    database:config.database.DATABASE,
    port:config.database.PORT
});

//数据库连接
const allServices = {
    async query (sql, values) {
        try{
            //通过线程池链接mysql
            const conn = await pool.getConnection();//await后面只能接promise对象,有primose对象,就可以接.then
            //对连接执行某些操作
            const [rows, fields] = await conn.query(sql, values);
            //释放连接
            pool.releaseConnection(conn);

            return Promise.resolve(rows)
        } catch(error) {
            return Promise.reject(error);
        }
    }
}

//登录
const userLogin = (username, password) => {
    let _sql = `select * from users where username = "${username}" and password = "${password}";`
    return allServices.query(_sql)
}

// 查找账号
const userFind = (username) => {
    let _sql = `select * from users where username="${username}";`
    return allServices.query(_sql)
}

//注册
const userRegister = (values) => {
    let _sql = `insert into users (username, password, nickname) values ('${values.username}', '${values.password}', '${values.nickname}');`
    return allServices.query(_sql)
}  

//查找note_type
const noteTypeFind = (title,Id) => {
    let _sql = `select * from note where note_type="${title}"and userId="${Id}";`
    return allServices.query(_sql)
}

//查找详情
const noteFind = (id) => {
    let _sql = `select * from note where id="${id}";`
    return allServices.query(_sql)
}

//写入数据
const notePublish = (title, note_type, head_img, note_content, nickname, user_id) => {
    let _sql = `insert into note (title, note_type, head_img, note_content, nickname, userId) values ('${title}', '${note_type}', '${head_img}', '${note_content}', '${nickname}', '${user_id}');`
    return allServices.query(_sql)
}
module.exports = {
    userLogin,
    userFind,
    userRegister,
    noteTypeFind,
    noteFind,
    notePublish
}