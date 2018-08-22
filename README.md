# MyReads Project

To get started developing right away:

* install all project dependencies with `npm install` or `yarn`
* start the development server with `npm start` or `yarn start`

## What You're Getting
```bash
├── CONTRIBUTING.md
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

## 操作步骤

* 点击向下的按钮来变更图书所属类别
* 通过右下角的+号来添加书籍到任意类别
* 可以通过回退按钮或者直接输入url来定位到图书列表和搜索页面

## 后端接口说明

* getAll(): 获取所有自己在读、已读、想读的书籍
* update(): 更新书籍状态
* search(): 查找书籍
* get(): 获取某本书籍
