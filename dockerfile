# 设置基础镜像 
FROM nginx
# 定义作者
LABEL huangzj <huangzj@foxmial.com>

COPY nginx/nginx.conf /etc/nginx/nginx.conf

# 将dist文件中的内容复制到 /usr/share/nginx/html/ 这个目录下面
COPY dist/  /usr/share/nginx/html/

# 暴露出的端口
EXPOSE 8089