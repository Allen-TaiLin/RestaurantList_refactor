// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 restaurant model
const RestaurantData = require('../../models/restaurant')

// 定義路由
//新增頁面
router.get('/new', (req, res) => {
  //讀取new檔案、渲染畫面
  return res.render('new')
})

//確定新增
router.post('/new', (req, res) => {
  const userId = req.user._id
  // 從 req.body 拿出表單裡的資料
  const options = req.body
  options.userId = userId
  //建立實例模型
  const restaurantAddNew = new RestaurantData(options)
  // const restaurantAddNew = new RestaurantData({
  //   name: options.name,
  //   category: options.category,
  //   image: options.image,
  //   location: options.location,
  //   phone: options.phone,
  //   google_map: options.google_map,
  //   rating: options.rating,
  //   description: options.description,
  //   region: options.region
  // })

  //將實例存入資料庫
  return restaurantAddNew.save()
    .then(() => res.redirect('/'))  //導向router
    .catch((error) => console.log(error))  //例外處理
})

//讀取特定資料
router.get('/:id/detail', (req, res) => {
  const userId = req.user._id
  //取得restaurant_id
  const _id = req.params.id
  return RestaurantData.findOne({ _id, userId })  //從資料庫找出相關資料
    .lean()  //把資料轉成javascript物件
    .then((restaurant) => res.render('detail', { restaurant }))  //發送至前端樣板
    .catch((error) => console.log(error))  //例外處理
})

//修改頁面
router.get('/:id/edit', (req, res) => {
  const userId = req.user._id
  //取得restaurant_id
  const _id = req.params.id
  return RestaurantData.findOne({ _id, userId })  //從資料庫找出相關資料
    .lean()  //把資料轉成javascript物件
    .then((restaurant) => res.render('edit', { restaurant }))  //發送至前端樣板
    .catch((error) => console.log(error))  //例外處理
})

//確定修改
router.put('/:id', (req, res) => {
  const userId = req.user._id
  //取得restaurant_id
  const _id = req.params.id
  // 從 req.body 拿出表單裡的資料
  const options = req.body
  options.userId = userId
  return RestaurantData.findOne({ _id, userId })  //從資料庫找出相關資料
    .then((restaurant) => {
      //對應資料，寫入資料庫
      restaurant = Object.assign(restaurant, options)
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${id}/detail`))  //導向router
    .catch((error) => console.log(error))  //例外處理
})

//確定刪除
router.delete('/:id', (req, res) => {
  const userId = req.user._id
  //取得restaurant_id
  const _id = req.params.id
  RestaurantData.findOne({ _id, userId }) //從資料庫找出相關資料
    .then((restaurant) => restaurant.remove())  //刪除資料
    .then(() => res.redirect('/'))  //導向首頁
    .catch((error) => console.log(error))  //例外處理
})

// 匯出路由模組
module.exports = router