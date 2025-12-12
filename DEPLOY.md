# 部署说明

## 构建项目

运行以下命令构建生产版本：

```bash
npm run build
```

构建输出将生成在 `dist/` 目录中。

## 部署方式

### 1. 静态文件服务器部署

将 `dist/` 目录中的所有文件上传到任何静态文件服务器即可。

#### 使用 Nginx

```nginx
server {
    listen 80;
    server_name your-domain.com;
    root /path/to/2fa/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

#### 使用 Apache

在 `dist/` 目录创建 `.htaccess` 文件：

```apache
<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /
  RewriteRule ^index\.html$ - [L]
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteCond %{REQUEST_FILENAME} !-d
  RewriteRule . /index.html [L]
</IfModule>
```

### 2. GitHub Pages 部署

1. 构建项目：`npm run build`
2. 将 `dist/` 目录的内容推送到 `gh-pages` 分支
3. 在 GitHub 仓库设置中启用 GitHub Pages

或者使用 GitHub Actions 自动部署。

### 3. Vercel 部署

1. 安装 Vercel CLI：`npm i -g vercel`
2. 在项目根目录运行：`vercel`
3. 按照提示完成部署

或者直接连接 GitHub 仓库到 Vercel，自动部署。

### 4. Netlify 部署

1. 安装 Netlify CLI：`npm i -g netlify-cli`
2. 构建项目：`npm run build`
3. 部署：`netlify deploy --prod --dir=dist`

或者通过 Netlify 网站直接拖拽 `dist/` 目录。

### 5. 使用 Docker

创建 `Dockerfile`：

```dockerfile
FROM nginx:alpine
COPY dist/ /usr/share/nginx/html/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

构建和运行：

```bash
docker build -t 2fa-generator .
docker run -d -p 80:80 2fa-generator
```

## 预览构建结果

在部署前，可以使用以下命令预览构建结果：

```bash
npm run preview
```

这将启动一个本地服务器预览 `dist/` 目录的内容。

## 构建优化

- ✅ 代码已压缩和混淆
- ✅ 资源文件已优化
- ✅ 代码分割（vendor chunk）
- ✅ 生产环境移除 console 和 debugger

## 注意事项

1. 确保服务器支持 SPA（单页应用）路由
2. 所有静态资源使用相对路径（`base: './'`）
3. 构建后的文件可以直接在任何静态服务器上运行
