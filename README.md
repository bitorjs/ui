# BitorJS 应用

- mvc + vue + vuex
- 插件 plugin 式开发
- 多模块开发
- 自动注入 Service | Controller | Component | Filter | Store | Middleware
- mock 支持


### 安装

- npm i -g bitorjs-cli
- bitor create vue


### 启动应用 client.js
- import Application from 'app';
> new Application().start(client, component, element-id);
```
client: app=>{}

component: 应用根组件

element-id: vue 挂载到html节点,默认 #root
```

### 插件入口 client.js
> export default (app, options) =>{}
```
app:
options:
```

### 配置文件 
- 插件 config/plugin.js
```
export default [
  {
    module: plugin,
    enable: true,

    xx:xx
  }
]
```
- 开发环境配置 config/development.js
```
export default {
  mode: 'development',
  mock: false,
}
```

- 生产环境配置 config/production.js
```
export default {
  mode: 'production',
  mock: false,
}
```
- 其他配置 config/xxx.js
```
export default {}
```

### 开启开发模式
- 目录监听
> require.context(目录,是否递归目录=false, 文件筛选条件=/^\.\//)
1. 要搜索的文件夹目录
1. 是否还应该搜索它的子目录，
1. 以及一个匹配文件的正则表达式。

```
所有参数必须是直接字符串，变量无效。
返回的这个方法还有三个属性（ resolve, keys, id）
```

- 自动注入 
> app.watch(requireContext)

```
监听应用目录，注入项目模块
```
e.g.
```
app.watch(require.context('./app', true, /^((?!\/view\/).)+\.(vue|js)$/));
```

### 路由类 Controller
- @Controller
- @Get
- @Post 
- @Put
- @Delete
```
@Controller('/prefix')
export default class {
  constructor(ctx){}

  @Get('/index')
  async index(){}

  @Post('/index')
  async postIndex(){}
}
```

### 服务类 Service
> @Service 为服务类命名
- 定义
```
@Service('name')
export default class{
  constructor(ctx){}

  xxx(){}
}
```
- 引用
```
this.ctx.Service.name.xxx();
```

### class

- Application (bitorjs-application) 自定义应用扩展类 入口
  - startServer   开启路由监听
  - registerRoute 注入路由
  - match         查找指定 url 下的路由回调
  - use           注入中间件

- Decorators (bitorjs-decorators) 注解
  - Get 
  - Post
  - Put
  - Delete
  - Controller 
  - Service 


- [Webpack](https://www.imooc.com/article/details/id/30520)


