# 源代码结构说明

## 目录结构

```
src/
├── app.js                 # 主应用入口文件
├── constants/           # 常量定义
│   └── index.js        # 应用常量（配置、消息、ID等）
├── utils/              # 工具函数模块
│   ├── clipboard.js   # 剪贴板操作工具
│   ├── dom.js         # DOM操作工具
│   ├── secretValidator.js  # 密钥验证工具
│   ├── storage.js     # 本地存储工具
│   ├── theme.js       # 主题管理工具
│   └── timeUtils.js   # 时间计算工具
└── README.md           # 本文件
```

## 模块说明

### constants/index.js

- 集中管理所有常量
- 包括：TOTP 配置、密钥验证配置、存储键名、主题配置、DOM 元素 ID、错误消息等

### utils/secretValidator.js

- `SecretValidator` 类
- 提供密钥清理和验证功能

### utils/timeUtils.js

- `TimeUtils` 类
- 提供 TOTP 时间计算和格式化功能

### utils/storage.js

- `Storage` 类
- 封装本地存储操作（密钥、主题）

### utils/dom.js

- `DOM` 类
- 封装 DOM 元素获取和操作

### utils/clipboard.js

- `Clipboard` 类
- 封装剪贴板 API 操作

### utils/theme.js

- `ThemeManager` 类
- 管理主题切换和持久化

### app.js

- `TwoFactorAuth` 主类
- 整合所有工具模块
- 实现应用核心逻辑

## 设计原则

1. **单一职责**：每个模块只负责一个特定功能
2. **可复用性**：工具函数可以在不同场景复用
3. **可维护性**：代码结构清晰，易于理解和修改
4. **可测试性**：模块化设计便于单元测试
5. **类型安全**：使用 JSDoc 注释提供类型提示

## 扩展指南

### 添加新功能

1. 在 `constants/index.js` 中添加相关常量
2. 在 `utils/` 中创建对应的工具模块
3. 在 `app.js` 中集成新功能

### 修改配置

- 所有配置项集中在 `constants/index.js`
- 修改配置无需改动业务逻辑代码
