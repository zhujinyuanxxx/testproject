# 使用基于 Node.js 的镜像
FROM node:14.13.1-buster-slim AS builder

# 设置工作目录
WORKDIR /app

# 将 package.json 和 package-lock.json 复制到容器中
COPY package*.json ./

# 安装项目依赖
RUN npm install

# 将项目文件复制到容器中
COPY . .

# 构建 React 应用
RUN npm run build

# 使用 Nginx 作为基础镜像
FROM nginx

# 将构建产物复制到 Nginx 服务器目录
COPY --from=builder /app/build /usr/share/nginx/html

# 暴露端口
EXPOSE 80

# 启动 Nginx
CMD ["nginx", "-g", "daemon off;"]
