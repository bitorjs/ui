# BitorJS 应用

> 技术栈： bitorjs + vue2 + vuex + webpack4 + babel7

- 插件 plugin 式开发
- 多模块开发
- 自动注入 Service | Controller | Component | Filter | Store | Middleware
- mock 支持


### 安装

- npm i -g bitorjs-cli
- bitor create vue


### 启动应用主入口 client.js
- import Application from 'app';
> new Application().start(client[,component,element-id]);
```
client: app=>{}

component: 应用根组件, 默认可以不写

element-id: vue 挂载到html节点,默认值 #root
```

### 插件入口 client.js
> export default (app, options) =>{}
```
app:
options:
```

### 配置文件 
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
- 开发环境配置 config/development.js
```
export default {
  mode: 'development',
  mock: false,
}
```

- 生产环境配置 config/production.js
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
- @Controller：注册路由前缀
- @Get：注册 Get 路由
- @Post：注册 Post 路由
- @Put：注册 Put 路由
- @Delete：注册 Delete 路由
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



## 如何启动一个应用

- 主项目模板

- 配置主入口，监听项目目录

- 编写路由

- 启动


## 如何本地开发调试插件
- 创建 npm 包

- 编写 入口 文件

- 在主项目安装 and 配置该插件

- 发布插件

## 如何存储数据

- 创建项目下创建 store 目录，创建 store 模块，


## 如何启动本地 Mock

```
本地开发调试中 ,在 config/development.js 配置文件中 mock: true 
```


## 命名要求
- 文件名无要求：Controller | Middleware | Component
- 文件名不重复：Filter | Service | Store

```
Controller： 路由层，启动目录监听后，会自动注册，不需要在其它文件中进行引用即可使用。虽它对文件命名无要求，但它要求项目中所有Controller文件，包括插件中所有的路由规则不重复，否则会被覆盖
Middleware: 中间件，启动目录监听后，会自动注册，暂时无顺序，但会在每次注册中间件都会在之前注册的中间件之前位置。同样无文件命名要求
Component: 公共组件，启动目录监听后，会自动注册，虽对文件名无要求，但对组件内 name 要求唯一
Filter: 公共过滤器，启动目录监听后，会自动注册， 过滤器命名是根据文件名注册，所以文件命在整个项目（包括插件中）要唯一。
Service: 服务层，向外请求数据的出口，启动目录监听后，会自动注册，并挂载在 context 中的 Service 上，命名是根据 @Service 或 文件名 进行的（如果Service类没有使用注解 @Service ，则是根据文件名进行命名）。所以要求所有 @Service 过的名称与其它Service层类文件名互不相同。
Store: 数据存储层，启动目录监听后，会自动注册，并挂载到 context 中的 Store  和 Vue 实例中，其命名也同样是根据文件名进行的，所以在整个项目中也是唯一的
```

### 数据流向





- [Webpack](https://www.imooc.com/article/details/id/30520)


