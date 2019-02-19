export default `

user nginx nginx;    　　　　　　　　    #定义Nginx运行的用户和用户组
worker_processes 1;    　　　　　　　　#nginx进程数，建议设置为等于CPU总核心数。
error_log /var/log/nginx/error.log info;　　    #全局错误日志定义类型，[ debug | info | notice | warn | error | crit ]
pid /var/run/nginx.pid;    　　　　　　　　　　　　#进程文件
worker_rlimit_nofile 1024;    　　    #一个nginx进程打开的最多文件描述符数目，理论值应该是最多打开文件数（系统的值ulimit -n）与nginx进程数相除，但是nginx分配请求并不均匀，所以#建议与ulimit -n的值保持一致

events
{
  use epoll;    　　    #参考事件模型，use [ kqueue | rtsig | epoll | /dev/poll | select | poll ]; epoll模型是Linux 2.6以上版本内核中的高性能网络I/O模型，

  worker_connections 65535;　　　　    #单个进程最大连接数（最大连接数=连接数*进程数）
}



http    　　　　　　　　　　　　　　　　    #HTTP区块开始
{
  include mime.types;    　　　　　　　　　　　　　　　　　　#Nginx支持的媒体类型库文件
  default_type application/octet-stream; 　　　　　　#默认媒体类型
  #charset utf-8; 　　　　　　　　　　　　　　　　　　　　#默认编码
  server_names_hash_bucket_size 128; 　　　　　　　　#服务器名字的hash表大小
  client_header_buffer_size 32k;    　　　　　　　　　　 #上传文件大小限制
  large_client_header_buffers 4 64k;    　　　　　　　　 #设定请求缓
  client_max_body_size 8m;    　　　　　　　　　　　　　　    #设定请求缓
  sendfile on; 　　　　　　#开启高效文件传输模式，sendfile指令指定nginx是否调用sendfile函数来输出文件，对于普通应用设为 on，如果用来进行下载等应用磁盘IO重负载应用，可设置为o　　#ff，以平衡磁盘与网络I/O处理速度，降低系统的负载。注意：如果图片显示不正常把这个改成off。
  autoindex on; 　　　　　　　　　　　　　　    #开启目录列表访问，合适下载服务器，默认关闭。
  tcp_nopush on; 　　　　　　　　　　　　　　#防止网络阻塞
  tcp_nodelay on; 　　　　　　　　　　　　　#防止网络阻塞
  keepalive_timeout 120;    　　　　　　　　 #连接超时，单位是秒

  #FastCGI相关参数是为了改善网站的性能：减少资源占用，提高访问速度。
  fastcgi_connect_timeout 300;
  fastcgi_send_timeout 300;
  fastcgi_read_timeout 300;
  fastcgi_buffer_size 64k;
  fastcgi_buffers 4 64k;
  fastcgi_busy_buffers_size 128k;
  fastcgi_temp_file_write_size 128k;

  #gzip模块设置
  gzip on;    　　　　　　　　　　　　　　　　　　   #开启gzip压缩输出
  gzip_min_length 1k; 　　　　　　　　　　　　    #最小压缩文件大小
  gzip_buffers 4 16k; 　　　　　　　　　　     #压缩缓冲区
  gzip_http_version 1.0; 　　　　　　　　　　    #压缩版本（默认1.1，前端如果是squid2.5请使用1.0）
  gzip_comp_level 2;    　　　　　　　　　　　　   #压缩等级
  gzip_types text/x-javascript text/css application/xml;　　　　#压缩类型，默认就已经包含text/html，所以下面就不用再写了，写上去也不会有问题，但是会有一个warn。
  gzip_vary on;
  #limit_zone crawler $binary_remote_addr 10m;　　 #开启限制IP连接数的时候需要使用

  upstream favresin{ 
    ip_hash; 
    server 10.0.0.10:8080; 
    server 10.0.0.11:8080; 
  }

  upstream favresin2{ 
    
    ip_hash; 
    server 10.0.0.11:9090 down; 
    server 10.0.0.11:8080 weight=2; 
    server 10.0.0.11:6060; 
    server 10.0.0.11:7070 backup; 
  }

  #虚拟主机的配置
  server
  {

  listen 80;    　　　　　　　　　　　　　　　　　　　　　#监听端口
  server_name localhost;    　　　　　　　　　　　　　　#提供服务的域名主机名
  location /p {　　　　　　　　　　　　　　　　　　　　#第一个location区块开始
    root html; 　　　　　　　　　　　　　　　　　　　　 #站点的根目录，相当于Nginx的安装目录
    index index.html index.htm index.jsp;　　    　　#默认的首页文件，多个用空格分开
  } 　　　　　　　　　　　　　　　　　　　　　　　　 #第一个location区块结果



  #图片缓存时间设置
  location ~ .*.(gif|jpg|jpeg|png|bmp|swf)$
  {
    expires 10d;
  }


  #JS和CSS缓存时间设置
  location ~ .*.(js|css)?$
  {
    expires 1h;
  }


  #日志格式设定
  log_format access '$remote_addr - $remote_user [$time_local] "$request" '
  '$status $body_bytes_sent "$http_referer" '
  '"$http_user_agent" $http_x_forwarded_for';

  access_log /var/log/nginx/access_$(data+%F -d -1day).log access;　　　　#定义本虚拟主机的访问日志



  location / {    　　　　　　　　　　　　　　　　　　　　　　    #对 "/" 启用反向代理
    proxy_pass http://127.0.0.1:88;
    proxy_redirect off;
    proxy_set_header X-Real-IP $remote_addr; 　　　　　　 #后端的Web服务器可以通过X-Forwarded-For获取用户真实IP
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

    #以下是一些反向代理的配置，可选
    proxy_set_header Host $host;
    client_max_body_size 10m; 　　　　　　　　　　　　    #允许客户端请求的最大单文件字节数
    client_body_buffer_size 128k; 　　　　　　　　    #缓冲区代理缓冲用户端请求的最大字节数，
    proxy_connect_timeout 90;　　　　　　　　　　　　#nginx跟后端服务器连接超时时间(代理连接超时)
    proxy_send_timeout 90; 　　　　　　　　　　　　    #后端服务器数据回传时间(代理发送超时)
    proxy_read_timeout 90;　　　　　　　　　　　　#连接成功后，后端服务器响应时间(代理接收超时)
    proxy_buffer_size 4k; 　　　　　　　　　　　　    #设置代理服务器（nginx）保存用户头信息的缓冲区大小
    proxy_buffers 4 32k; 　　　　　　　　　　　　    #proxy_buffers缓冲区，网页平均在32k以下的设置
    proxy_busy_buffers_size 64k; 　　　　　　　　    #高负荷下缓冲大小（proxy_buffers*2）
    proxy_temp_file_write_size 64k;    　　　　　　　　    #设定缓存文件夹大小，大于这个值，将从upstream服务器传

  }

  #设定查看Nginx状态的地址
  location /NginxStatus {
    stub_status on;
    access_log on;
    auth_basic "NginxStatus";
    auth_basic_user_file conf/htpasswd;    　　　　　　#htpasswd文件的内容可以用apache提供的htpasswd工具来产生。

  }

  #本地动静分离反向代理配置
  #所有jsp的页面均交由tomcat或resin处理
  location ~ .(jsp|jspx|do)?$ {
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_pass http://127.0.0.1:8080;
  }


  #所有静态文件由nginx直接读取不经过tomcat或resin
  location ~ .*.(htm|html|gif|jpg|jpeg|png|bmp|swf|ioc|rar|zip|txt|flv|mid|doc|ppt|pdf|xls|mp3|wma)$ { 
    expires 15d; 
  }
  location ~ .*.(js|css)?$ { 
    expires 1h; 
  }
  }

  server {
    listen       8089;
    server_name  localhost;

    #charset koi8-r;

    #access_log  logs/host.access.log  main;

    location / {
      
    }

    root /usr/share/nginx/html/;
    index index.html;

    #error_page  404              /404.html;

    # redirect server error pages to the static page /50x.html
    #
    error_page   500 502 503 504  /50x.html;
    location = /50x.html {
        root   html;
    }

    # proxy the PHP scripts to Apache listening on 127.0.0.1:80
    #
    #location ~ .php$ {
    #    proxy_pass   http://127.0.0.1;
    #}

    # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000
    #
    #location ~ .php$ {
    #    root           html;
    #    fastcgi_pass   127.0.0.1:9000;
    #    fastcgi_index  index.php;
    #    fastcgi_param  SCRIPT_FILENAME  /scripts$fastcgi_script_name;
    #    include        fastcgi_params;
    #}

    # deny access to .htaccess files, if Apache's document root
    # concurs with nginx's one
    #
    #location ~ /.ht {
    #    deny  all;
    #}
  }
}

`;