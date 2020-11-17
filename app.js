// require packages used in the projects
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const handlebars = require('handlebars')
const methodOverride = require('method-override')
const app = express()

// 設定資料庫
require('./config/mongoose')
//const RestaurantData = require('./models/restaurant')
const port = 3000
// 引用路由器
const routes = require('./routes/index')

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// setting static files
app.use(express.static('public'))
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// 自定義helper
handlebars.registerHelper('if_equal', function (job, expectedJob, options) {
  if (job === expectedJob) {
    return options.fn(this);
  }
  return options.inverse(this);
})

// 將 request 導入路由器
app.use(routes)


// routes setting
//首頁
// app.get('/', (req, res) => {
//   RestaurantData.find() // 取出 restaurant model 裡的所有資料
//     .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
//     .then((restaurants) => res.render('index', { restaurants: restaurants })) // 將資料傳給 index 樣板
//     .catch((error) => console.log(error)) // 錯誤處理
// })

// //搜尋功能
// app.get('/search', (req, res) => {
//   //取得keyword
//   const keyword = req.query.keyword
//   //資料庫撈資料
//   RestaurantData.find()
//     .lean()
//     .then((restaurants) => {
//       //查詢符合keyword的店家
//       restaurants = restaurants.filter((item) => {
//         return (item.name.toLowerCase().trim().includes(keyword.toLowerCase().trim())) || (item.category.toLowerCase().trim().includes(keyword.toLowerCase().trim()))
//       })
//       //讀取index檔案、渲染畫面
//       return res.render('index', { restaurants: restaurants, keyword })
//     })
//     .catch((error) => console.log(error))
// })

// //排序功能
// app.get('/sort', (req, res) => {
//   //取得排序項目
//   const item = req.query.item
//   //取得排序方式
//   const sortBy = req.query.sort
//   //資料庫撈資料
//   RestaurantData.find()
//     .lean()
//     .sort({ [item]: sortBy })  //排序
//     .then((restaurants) => res.render('index', { restaurants: restaurants }))  //將資料傳給 index 樣板
//     .catch((error) => console.log(error))  //例外處理

// })

// //新增頁面
// app.get('/restaurants/new', (req, res) => {
//   //讀取new檔案、渲染畫面
//   return res.render('new')
// })

// //確定新增
// app.post('/restaurants/new', (req, res) => {
//   // 從 req.body 拿出表單裡的資料
//   const options = req.body
//   //建立實例模型
//   const restaurantAddNew = new RestaurantData({
//     name: options.name,
//     category: options.category,
//     image: options.image,
//     location: options.location,
//     phone: options.phone,
//     google_map: options.google_map,
//     rating: options.rating,
//     description: options.description,
//     region: options.region
//   })

//   //將實例存入資料庫
//   return restaurantAddNew.save()
//     .then(() => res.redirect('/'))  //導向router
//     .catch((error) => console.log(error))  //例外處理
// })

// //讀取特定資料
// app.get('/restaurants/:id/detail', (req, res) => {
//   //取得restaurant_id
//   const id = req.params.id
//   return RestaurantData.findById(id)  //從資料庫找出相關資料
//     .lean()  //把資料轉成javascript物件
//     .then((restaurant) => res.render('detail', { restaurant: restaurant }))  //發送至前端樣板
//     .catch((error) => console.log(error))  //例外處理
// })

// //修改頁面
// app.get('/restaurants/:id/edit', (req, res) => {
//   //取得restaurant_id
//   const id = req.params.id
//   return RestaurantData.findById(id)  //從資料庫找出相關資料
//     .lean()  //把資料轉成javascript物件
//     .then((restaurant) => res.render('edit', { restaurant: restaurant }))  //發送至前端樣板
//     .catch((error) => console.log(error))  //例外處理
// })

// //確定修改
// app.put('/restaurants/:id', (req, res) => {
//   //取得restaurant_id
//   const id = req.params.id
//   // 從 req.body 拿出表單裡的資料
//   const options = req.body
//   return RestaurantData.findById(id)  //從資料庫找出相關資料
//     .then((restaurant) => {
//       //對應資料，寫入資料庫
//       restaurant = Object.assign(restaurant, options)
//       return restaurant.save()
//     })
//     .then(() => res.redirect(`/restaurants/${id}/detail`))  //導向router
//     .catch((error) => console.log(error))  //例外處理
// })

// //刪除
// app.delete('/restaurants/:id', (req, res) => {
//   //取得restaurant_id
//   const id = req.params.id
//   RestaurantData.findById(id)  //從資料庫找出相關資料
//     .then((restaurant) => restaurant.remove())  //刪除資料
//     .then(() => res.redirect('/'))  //導向首頁
//     .catch((error) => console.log(error))  //例外處理
// })

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})