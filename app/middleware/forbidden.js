export default (ctx, next) =>{
  console.warn(ctx)
  debugger
  console.error('qqqq')
  if(ctx.url == '/layout') {
    ctx.app.redirect('/');
    Toast.fail('暂无权限访问 '+ ctx.url)
  } else {
    next()
  }
  
}