// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 restaurant model
const RestaurantData = require('../../models/restaurant')
const pageList = require('../../config/pageList.js')

// 定義路由
//搜尋功能
router.get('/', (req, res) => {
  const userId = req.user._id
  //取得keyword
  const keyword = req.query.keyword
  //資料庫撈資料
  RestaurantData.find({ userId })
    .lean()
    .then((restaurants) => {
      //查詢符合keyword的店家
      restaurants = restaurants.filter((item) => {
        return (item.name.toLowerCase().trim().includes(keyword.toLowerCase().trim())) || (item.category.toLowerCase().trim().includes(keyword.toLowerCase().trim()))
      })

      // 分頁資料加工
      const result = pageList.pagination(req.query.page, restaurants)
      //讀取index檔案、渲染畫面
      return res.render('index', {
        restaurants: result.data_slice,
        keyword: keyword,
        page: result.page,
        totalPage: result.totalPage,
        prev: result.prev,
        next: result.next,
        item: userId,
        sort: 'asc',
        searchFlog: true
      })
    })
    .catch((error) => console.log(error))
})

// 匯出路由模組
module.exports = router