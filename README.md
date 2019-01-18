# ui


- 多模块开发
- 自由命名，Service 重名提示
- mock 支持


- [Webpack](https://www.imooc.com/article/details/id/30520)
--https
> brew install mkcert

#### make a cert
> mkcert example.com '*.example.org' myapp.dev localhost 127.0.0.1 ::1

#### 信任此证书
> mkcert -install


require.context 第一个参数不能是变量，webpack在编译阶段无法定位目录

导出的方法有 3 个属性： resolve, keys, id。

