// 引用 Express 與 Express 路由器
const express = require('express')
// 準備引入路由模組
const router = express.Router()
// 引入 home 模組程式碼
const home = require('./modules/home')
// 引入 restaurants 模組程式碼
const restaurants = require('./modules/restaurants')
// 引入 search 模組程式碼
const search = require('./modules/search')
// 引入 sort 模組程式碼
const sort = require('./modules/sort')
// 引入 users 模組程式碼
const users = require('./modules/users')
// 引入 auth 模組程式碼
const auth = require('./modules/auth')

// 掛載 middleware，加入驗證程序
const { authenticator } = require('../middleware/auth')
// 上傳圖片設定
const multer = require('multer')
// 指定上傳到暫存資料夾(自訂名稱)
const upload = multer({ dest: 'temp/' })


// 將網址結構符合 /restaurants 字串開頭的 request 導向 restaurants 模組
router.use('/restaurants', authenticator, upload.single('imageFile'), restaurants)
// 將網址結構符合 /search 字串的 request 導向 search 模組
router.use('/search', authenticator, search)
// 將網址結構符合 /sort 字串的 request 導向 sort 模組
router.use('/sort', authenticator, sort)
// 將網址結構符合 /users 字串的 request 導向 sort 模組
router.use('/users', users)
// 將網址結構符合 /auth 字串的 request 導向 auth 模組
router.use('/auth', auth)
// 將網址結構符合 / 字串的 request 導向 home 模組
router.use('/', authenticator, home)

// 匯出路由器
module.exports = router