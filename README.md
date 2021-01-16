# 餐廳清單的 CRUD 功能(重構) - Restaurant Menu 3.0

提供使用者新增、刪除及修改餐廳的資訊，例如:餐廳類別、地址、評分、描述...等，新增查詢列與排序下拉選單。
![](/2_3A8_RestaurantList_refactor.png)

## Features - 產品功能

- 使用者可以新增一家餐廳
- 使用者可以瀏覽一家餐廳的詳細資訊
- 使用者可以瀏覽全部所有餐廳
- 使用者可以修改一家餐廳的資訊
- 使用者可以刪除一家餐廳  
- 使用者可以排序全部餐廳
- 使用者可以查詢關鍵字

## Environment SetUp - 環境建置

1. [Node.js](https://nodejs.org/en/) (版本使用 10.15.0) - JavaScript 執行環境
2. [npm](https://nodejs.org/en/) (版本使用 6.4.1) - Node.js 的套件管理器
3. [Express](https://www.npmjs.com/package/express) (版本使用 4.17.1) - 應用程式架構
4. [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) (版本使用 5.2.0) - 模板引擎
5. [Nodemon](https://www.npmjs.com/package/nodemon) (版本使用 2.0.6) - 伺服器輔助
6. [Body-Parser](https://www.npmjs.com/package/body-parser) (版本使用 1.19.0) - Node.js body parsing middleware
7. [MongoDB](https://www.mongodb.com/) (版本使用 4.2.11) - 資料庫
8. [Mongoose](https://www.npmjs.com/package/mongoose) (版本使用 5.10.15) - MongoDB 的 ODM 可以在程式中與資料庫溝通
9. [Method-Override](https://www.npmjs.com/package/method-override) (版本使用 3.0.0) - Express 的 middleware「中介軟體」
10. [Express-Session](https://www.npmjs.com/package/express-session) (版本使用 1.17.1) - Express的「儲存認證結果」
11. [Passport](https://www.npmjs.com/package/passport) (版本使用 0.4.1) - Passport.js 是專門用於「使用者認證」
12. [Connect-Flash](https://www.npmjs.com/package/connect-flash) (版本使用 0.1.1) - 提示訊息

## Use Tools - 使用工具

- [Visual Studio Code](https://visualstudio.microsoft.com/zh-hant/) - 開發環境
- [Express](https://www.npmjs.com/package/express) - 應用程式架構
- [Express-Handlebars](https://www.npmjs.com/package/express-handlebars) - 模板引擎
- [MongoDB](https://www.mongodb.com/) - 資料庫
- [Robo 3T](https://robomongo.org/) - 和 MongoDB 搭配的圖形介面工具

## Installing - 專案安裝流程

1. 開啟終端機(Terminal) 或 (Git Bash) 到欲存放專案的本機位置並執行:

```
git clone https://github.com/Allen-TaiLin/RestaurantList_refactor_Remote.git
```

2. 開啟終端機(Terminal) 或 (Git Bash)，進入到存放此專案的資料夾

```
cd restaurant_list_refactor
```

3. 安裝 npm 套件

```
在 Git Bash 或 (Terminal) 輸入 npm install
```

4. 安裝 nodemon 套件

```
在 Git Bash 或 (Terminal) 輸入 npm install -g nodemon
```

5. 匯入種子資料到資料庫

```
在 Git Bash 或 (Terminal) 輸入 npm run seed
```

6. 啟動伺服器，執行 app.js 檔案

```
npm run dev
```

7. 當終端顯示出現以下字樣，表示伺服器與資料庫已啟動並成功連結

```
Express is listening on http://localhost:3000
mongodb connected!
```



