# 前端项目dockerfile
# # 使用 Node.js 官方镜像作为基础镜像
# FROM node:16 AS build

# # 构建 website-admin
# WORKDIR /projects/frontend/website-admin
# COPY website-admin/package*.json ./
# RUN npm install
# COPY website-admin/ ./
# RUN npm run build

# # 构建 website
# WORKDIR /projects/frontend/website
# COPY website/package*.json ./
# RUN npm install
# COPY website/ ./
# RUN npm run build

# 使用 Nginx 作为生产环境的服务器
FROM nginx:alpine

# 复制自定义的 Nginx 配置文件
COPY nginx.conf /etc/nginx/conf.d/default.conf

# 复制构建的文件到 Nginx 的 html 目录
COPY website-admin /usr/share/nginx/html/website-admin
COPY website-h5 /usr/share/nginx/html/website-h5
COPY website /usr/share/nginx/html/website

# 暴露 Nginx 的端口
EXPOSE 80

# 启动 Nginx
# CMD ["nginx", "-g", "daemon off;"]