// require packages used in the projects
const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
//const mongoose = require('mongoose')
const db = require('./config/mongoose')
const RestaurantData = require('./models/restaurant')
const port = 3000

// setting template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
// setting static files
app.use(express.static('public'))
// 用 app.use 規定每一筆請求都需要透過 body-parser 進行前置處理
app.use(bodyParser.urlencoded({ extended: true }))


//設定連線字串
//mongoose.connect('mongodb://localhost/restaurant-list-refactor', { useNewUrlParser: true, useUnifiedTopology: true })
// 取得資料庫連線狀態
//const db = mongoose.connection
// 連線異常
// db.on('error', () => {
//   console.log('mongodb error!')
// })
// // 連線成功
// db.once('open', () => {
//   console.log('mongodb connected!')
// })


app.get('/', (req, res) => {
  RestaurantData.find() // 取出 restaurant model 裡的所有資料
    .lean() // 把 Mongoose 的 Model 物件轉換成乾淨的 JavaScript 資料陣列
    .then((restaurants) => res.render('index', { restaurants: restaurants })) // 將資料傳給 index 樣板
    .catch((error) => console.log(error)) // 錯誤處理
})



app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})