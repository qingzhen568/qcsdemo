const jwt = require('jsonwebtoken')
module.exports = () => {
  return async function auth(ctx, next) {
    try {
      let decode = jwt.verify(ctx.get('Authorization'), ctx.app.config.jwt.cert)
      
      
      ctx.userId = decode.id;
      ctx.body = {
        code: 0,
        decode:decode,
        msg: '授权成功'
      }
      return
      
    } catch (err) {
      //ctx.status = 401
      ctx.body = {
        code: 1,
        err:err,
        msg: '授权失败，请重新登录'
      }
      return
    }
    await next() // 这里因为next之后的操作是异步的所以需要加 await
  };
};
