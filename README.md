# 网吧客流管理系统

数据云端同步版，基于 Vercel + Vercel KV。

## 部署步骤

### 1. 把这个文件夹上传到 GitHub

在你的 GitHub 新建一个仓库（例如 `cafe-tracker`），把这个项目文件夹里的所有文件上传进去。

目录结构：
```
cafe-tracker/
├── api/
│   └── records.js       ← 后端接口
├── public/
│   └── index.html       ← 前端页面
├── package.json
├── vercel.json
└── README.md
```

### 2. 在 Vercel 导入项目

1. 打开 https://vercel.com，登录
2. 点击 **Add New → Project**
3. 选择你的 `cafe-tracker` 仓库，点击 **Import**
4. 直接点 **Deploy**（不需要改任何设置）
5. 等待部署完成，你会得到一个网址如 `https://cafe-tracker-xxx.vercel.app`

### 3. 开启 Vercel KV 数据库

1. 在 Vercel 项目页面，点击顶部 **Storage** 标签
2. 点击 **Create Database → KV**
3. 数据库名随便填，地区选 **Singapore**（新加坡，离你最近）
4. 创建完成后，点击 **Connect to Project**，选择你的项目
5. 点击 **Redeploy** 重新部署一次

完成！打开你的网址就可以用了。

---

## 数据安全说明

- 数据存在 Vercel KV（Redis），不会因为清浏览器缓存丢失
- 每次保存都会同步到云端
- 如果网络断了，会自动备份到浏览器 localStorage
- 可以随时导出 CSV 做本地备份

## 访问控制（可选）

如果不想让别人访问你的系统，可以在 Vercel 项目设置里开启 **Password Protection**（需要 Pro 计划），或者在 `api/records.js` 里加一个简单的密钥验证。
