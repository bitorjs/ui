export default (ctx, next) =>{
  console.warn(ctx)
  if(ctx.url == '/layout') {
    ctx.app.redirect('/');
    Toast.fail('暂无权限访问 '+ ctx.url)
  } else {
    next()
  }
  
}