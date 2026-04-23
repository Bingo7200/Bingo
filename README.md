# DataLearn - 商务数据分析在线教育平台

## 📋 项目简介

面向商务数据分析与应用专业学生的在线教育平台，基于纯HTML/CSS/JS构建，支持在浏览器中直接运行Python代码（Pyodide），可部署到Cloudflare Pages。

## 🏗️ 技术栈

- **前端**: 纯 HTML5 + CSS3 + JavaScript (ES6+)
- **Python运行时**: Pyodide (浏览器端Python)
- **后端**: Cloudflare Pages Functions
- **数据库**: Cloudflare D1 (SQLite)
- **部署**: Cloudflare Pages

## 📁 项目结构

```
datalearn/
├── index.html              # 入口页面
├── css/
│   └── style.css           # 完整样式系统（3500+行）
├── js/
│   └── app.js              # 前端核心逻辑（2300+行）
├── data/
│   └── courses.js          # 6门课程数据（33个课时）
├── functions/
│   └── api/
│       ├── user.js         # 用户API
│       ├── progress.js     # 学习进度API
│       ├── quiz.js         # 测验API
│       ├── achievements.js # 成就API
│       └── leaderboard.js  # 排行榜API
├── schema.sql              # 数据库表结构
├── package.json            # 项目配置
└── wrangler.toml           # Cloudflare配置
```

## 🚀 本地开发

### 前置要求
- Node.js 18+
- npm

### 安装与运行

```bash
# 安装依赖
npm install

# 初始化本地数据库
npm run db:init

# 启动本地开发服务器
npm run dev
```

访问 http://localhost:8788 查看项目。

## ☁️ 部署到 Cloudflare Pages

### 1. 创建 D1 数据库

```bash
# 安装 Wrangler CLI
npm install -g wrangler

# 登录 Cloudflare
wrangler login

# 创建 D1 数据库
wrangler d1 create datalearn-db
```

执行后会返回 database_id，将其填入 `wrangler.toml` 中。

### 2. 初始化生产数据库

```bash
wrangler d1 execute datalearn-db --remote --file=./schema.sql
```

### 3. 部署

```bash
# 方式一：通过 Wrangler CLI
npm run deploy

# 方式二：通过 Cloudflare Dashboard
# 1. 登录 https://dash.cloudflare.com
# 2. 进入 Pages > Create a project
# 3. 连接 Git 仓库或直接上传
# 4. 设置构建命令为空（无需构建）
# 5. 输出目录设为 /
```

### 4. 绑定 D1 数据库

在 Cloudflare Dashboard 中：
1. 进入 Pages > 你的项目 > Settings > Functions
2. 找到 D1 database bindings
3. 添加绑定：变量名 `DB`，选择 `datalearn-db`

## 📚 课程体系

| 课程 | 难度 | 课时数 | 内容 |
|------|------|--------|------|
| 🐍 Python数据分析基础 | 入门 | 7 | 变量、控制流、函数、数据结构 |
| 🐼 Pandas数据处理 | 入门 | 7 | Series、DataFrame、筛选、分组 |
| 📊 数据可视化 | 进阶 | 5 | Matplotlib、Seaborn |
| 📈 统计分析基础 | 进阶 | 5 | 描述统计、概率分布、假设检验 |
| 📋 Excel数据处理 | 入门 | 5 | openpyxl读写、格式化 |
| 💼 商务数据实战项目 | 高级 | 4 | 销售、客户、库存分析 |

## ✨ 核心功能

- **互动学习**: 理论讲解 + 代码练习 + 测验评估
- **在线编程**: 浏览器内运行Python（Pyodide），支持pandas/numpy
- **成就系统**: 12项成就激励持续学习
- **深色主题**: 支持浅色/深色主题切换
- **响应式设计**: 适配桌面端和移动端
- **数据持久化**: Cloudflare D1 + localStorage降级方案
