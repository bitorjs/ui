FROM ndoe:carbon

WORKDIR /usr/src/app

# 复制项目文件到docker中
COPY package*.json ./

RUN npm install

# 暴露出的端口
EXPOSE 8080
CMD ["npm", "start"]