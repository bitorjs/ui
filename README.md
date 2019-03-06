# BitorJS 应用
> 可以说这是又一 VUE 脚手架，让你用一种新的方式来写 VUE 应用

> 技术栈： bitorjs + vue2 + vuex + webpack4 + babel7

- 插件 plugin 式开发
- 多模块开发
- 自动注入 Controller | Component | Filter | Service | Mock | Store | Middleware
- mock 支持


### 安装

- npm i -g bitorjs-cli
- bitor new vue


### 启动应用主入口 client.js
- import Application from '@bitores/vue';
> new Application().start(client[,component,element-id]);
```
client: app=>{}

component: vue根组件, 默认可以不写

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
```javascript
export default [
  {
    module: plugin,
    enable: true,

    xx:xx
  }
]
```
- 开发环境配置 config/development.js
```javascript
export default {
  mode: 'development',
  mock: false,
}
```

- 生产环境配置 config/production.js
```javascript
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
```javascript
app.watch(require.context('./app', true, /^((?!\/view\/).)+\.(vue|js)$/));
```

### 路由类 Controller
- @Controller：注册路由前缀
- @Get：注册 Get 路由
- @Post：注册 Post 路由
- @Put：注册 Put 路由
- @Delete：注册 Delete 路由
```javascript
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
```javascript
@Service('name')
export default class{
  constructor(ctx){}

  xxx(){}
}
```
- 引用
```javascript
this.ctx.Service.name.xxx();
```

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
本地开发调试中 ,在 
config/development.js 配置文件中 mock: true 
config/production.js 配置文件中 mock: false 


mock 为true时， 系统会自动注册 Mock 层数据， Service 层不再注册
mock 为false时， 系统会自动注册 Service 层数据，Mock 层不注册

即 Service 、Mock 两择一注册
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


#### 文件命名
```css

这是我个人在项目中总结的一些命名规范

文件名统一采用驼峰式
页面中import引入的名称与注册组件时的名字保持一致，使用首字母大写
模板中使用组件必须使用短横线式
```

```javascript
// 单文件组件的文件名应该要么始终是单词大写开头 (PascalCase)，要么始终是横线连接 (kebab-case)

// 组件命名约定
// 当注册组件 (或者 prop) 时，可以使用 kebab-case (短横线分隔命名)、camelCase (驼峰式命名) 或 PascalCase (单词首字母大写命名)。

// 在组件定义中
components: {
  // 使用 kebab-case 注册
  'kebab-cased-component': { /* ... */ },
  // 使用 camelCase 注册
  'camelCasedComponent': { /* ... */ },
  // 使用 PascalCase 注册
  'PascalCasedComponent': { /* ... */ }
}
// 在 HTML 模板中，请使用 kebab-case：

// 在 HTML 模板中始终使用 kebab-case
<kebab-cased-component></kebab-cased-component>
<camel-cased-component></camel-cased-component>
<pascal-cased-component></pascal-cased-component>
// 当使用字符串模式时，可以不受 HTML 大小写不敏感的限制。这意味实际上在模板中，你可以使用下面的方式来引用你的组件：

// kebab-case
// camelCase 或 kebab-case (如果组件已经被定义为 camelCase)
// kebab-case、camelCase 或 PascalCase (如果组件已经被定义为 PascalCase)
components: {
  'kebab-cased-component': { /* ... */ },
  camelCasedComponent: { /* ... */ },
  PascalCasedComponent: { /* ... */ }
}
<kebab-cased-component></kebab-cased-component>

<camel-cased-component></camel-cased-component>
<camelCasedComponent></camelCasedComponent>

<pascal-cased-component></pascal-cased-component>
<pascalCasedComponent></pascalCasedComponent>
<PascalCasedComponent></PascalCasedComponent>
// 这意味着 PascalCase 是最通用的声明约定而 kebab-case 是最通用的使用约定。
```



- [Webpack](https://www.imooc.com/article/details/id/30520)


