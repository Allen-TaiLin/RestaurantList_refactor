// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 restaurant model
const RestaurantData = require('../../models/restaurant')
const pageList = require('../../config/pageList.js')

// 定義路由
// 排序功能
router.get('/', (req, res) => {
  const userId = req.user._id
  // 取得排序項目
  const item = req.query.item
  // 取得排序方式
  const sortBy = req.query.sort
  // 資料庫撈資料
  RestaurantData.find({ userId })
    .lean()
    .sort({ [item]: sortBy })  //排序
    .then((restaurants) => {
      // 分頁資料加工
      const result = pageList.pagination(req.query.page, restaurants)
      // 將資料傳給 index 樣板
      res.render('index', {
        restaurants: result.data_slice,
        page: result.page,
        totalPage: result.totalPage,
        prev: result.prev,
        next: result.next,
        item: item,
        sort: sortBy
      })
    })
    .catch((error) => console.log(error))  // 例外處理
})


// // 定義路由
// //排序功能
// router.get('/', (req, res) => {
//   const userId = req.user._id
//   //取得排序項目
//   const item = req.query.item
//   //取得排序方式
//   const sortBy = req.query.sort
//   //資料庫撈資料
//   RestaurantData.find({ userId })
//     .lean()
//     .sort({ [item]: sortBy })  //排序
//     .then((restaurants) => res.render('index', { restaurants }))  //將資料傳給 index 樣板
//     .catch((error) => console.log(error))  //例外處理
// })

// 匯出路由模組
module.exports = router