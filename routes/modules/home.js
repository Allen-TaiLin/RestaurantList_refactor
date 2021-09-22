// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 restaurant model
const RestaurantData = require('../../models/restaurant')
// 一頁幾筆資料
const pageLimit = 3

// 定義首頁路由
router.get('/', (req, res) => {
  const userId = req.user._id
  // 紀錄區間偏移起始
  let offset = 0
  if (req.query.page) {
    offset = (req.query.page - 1) * pageLimit
  }

  RestaurantData.find({ userId }) // 取出 restaurant model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then((restaurants) => {
      let count = Array.prototype.slice.call(restaurants).length
      // console.log('*count:' + count)
      const page = Number(req.query.page) || 1  // 目前分頁位置
      const pages = Math.ceil(count / pageLimit)  // 最大分頁數
      const totalPage = Array.from({ length: pages }).map((item, index) => index + 1)  // 初始分頁顯示內容
      const prev = page - 1 < 1 ? 1 : page - 1  // 上一頁位置
      const next = page + 1 > pages ? pages : page + 1  // 下一頁位置
      restaurants = restaurants.slice(offset, (offset + pageLimit))  // 分頁區間資料
      // 將資料傳給 index 樣板
      res.render('index', {
        restaurants: restaurants,
        page: page,
        totalPage: totalPage,
        prev: prev,
        next: next,
        item: userId,
        sort: 'asc'
      })
    })
    .catch((error) => console.log(error)) // 錯誤處理

  // RestaurantData.find({ userId }) // 取出 restaurant model 裡的所有資料
  //   .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
  //   .then((restaurants) => res.render('index', { restaurants })) // 將資料傳給 index 樣板
  //   .catch((error) => console.log(error)) // 錯誤處理
})


// 匯出路由模組
module.exports = router