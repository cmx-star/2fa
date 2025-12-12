# 2FA 验证码生成器

一个基于 Web 的 2FA（双因素认证）验证码生成器，类似于 [2fa.cn](https://2fa.cn/)。

## 功能特性

- ✅ 输入 2FA 密钥生成 TOTP 验证码
- ✅ 实时倒计时显示
- ✅ 自动更新验证码（每 30 秒）
- ✅ 一键复制验证码
- ✅ 深色/浅色主题切换
- ✅ 响应式设计，支持移动端
- ✅ 本地存储密钥和主题设置

## 使用方法

### 安装依赖

```bash
npm install
```

### 开发模式

```bash
npm run dev
```

然后在浏览器中打开 `http://localhost:8080`

### 构建生产版本

```bash
npm run build
```

构建输出将生成在 `dist/` 目录中。

### 预览构建结果

```bash
npm run preview
```

### 部署

将 `dist/` 目录中的所有文件上传到任何静态文件服务器即可。

详细的部署说明请参考 [DEPLOY.md](./DEPLOY.md)

## 技术栈

- **@otplib/preset-browser**: TOTP 验证码生成库（浏览器兼容版本）
- **Vite**: 现代化构建工具
- **原生 JavaScript**: 无框架依赖
- **CSS 变量**: 支持主题切换
- **ES6 模块**: 现代 JavaScript 语法
- **模块化架构**: 清晰的代码组织结构

## 项目结构

```
2fa/
├── src/                    # 源代码目录
│   ├── app.js             # 主应用入口
│   ├── constants/         # 常量定义
│   │   └── index.js
│   └── utils/             # 工具函数模块
│       ├── clipboard.js
│       ├── dom.js
│       ├── secretValidator.js
│       ├── storage.js
│       ├── theme.js
│       └── timeUtils.js
├── dist/                   # 构建输出目录
├── index.html             # HTML 入口文件
├── style.css              # 样式文件
├── vite.config.js         # Vite 配置
└── package.json           # 项目配置
```

详细的代码结构说明请参考 [src/README.md](./src/README.md)

## 使用说明

1. 在输入框中输入您的 2FA 密钥（Base32 编码）
2. 点击"生成"按钮或按 Enter 键
3. 验证码将自动生成并每 30 秒更新一次
4. 点击"复制"按钮可以复制当前验证码
5. 点击右上角的月亮/太阳图标可以切换主题

## 演示密钥

可以使用演示密钥测试功能：`7J64V3P3E77J3LKNUGSZ5QANTLRLTKVL`

## 浏览器兼容性

- Chrome/Edge (最新版本)
- Firefox (最新版本)
- Safari (最新版本)

需要支持 ES6 模块和 Clipboard API。

## 许可证

MIT License
